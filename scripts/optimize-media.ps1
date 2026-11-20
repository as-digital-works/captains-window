<#
.SYNOPSIS
  Optimise client photos/videos for the website.

.DESCRIPTION
  Images (.jpg/.jpeg/.png/.heic/.webp) -> WebP, max 1600px on the long edge, quality 80.
  Videos (.mp4/.mov/.m4v/.avi/.mkv)    -> MP4 H.264, max 1080p, CRF 28, preset veryfast,
                                          audio stripped (unless -KeepAudio), faststart,
                                          plus a WebP poster frame taken at 1s.
  Warns about any output still over 15 MB.

.EXAMPLE
  .\scripts\optimize-media.ps1 -Source "D:\client\gurgaon" -Name gurgaon
  # -> public/images/gallery/gurgaon/gurgaon-01.webp ...
  # -> public/videos/gallery/gurgaon/gurgaon-video-01.mp4 + poster .webp in the images folder
#>
param(
  [Parameter(Mandatory)] [string] $Source,
  [Parameter(Mandatory)] [string] $Name,
  [string] $ImageOut = "public/images/gallery/$Name",
  [string] $VideoOut = "public/videos/gallery/$Name",
  [int]    $MaxHeight = 1080,
  [switch] $KeepAudio
)

$ErrorActionPreference = "Stop"
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) { throw "ffmpeg not found on PATH (winget install Gyan.FFmpeg)" }

New-Item -ItemType Directory -Force $ImageOut, $VideoOut | Out-Null
$imgExt = '.jpg', '.jpeg', '.png', '.heic', '.webp'
$vidExt = '.mp4', '.mov', '.m4v', '.avi', '.mkv'
$files  = Get-ChildItem -LiteralPath $Source -File | Sort-Object Name
$i = 0; $v = 0; $report = @()

foreach ($f in $files) {
  $ext = $f.Extension.ToLower()
  if ($imgExt -contains $ext) {
    $i++
    $out = Join-Path $ImageOut ("{0}-{1:D2}.webp" -f $Name, $i)
    ffmpeg -hide_banner -loglevel error -y -i $f.FullName `
      -vf "scale='if(gt(iw,ih),min(1600,iw),-2)':'if(gt(iw,ih),-2,min(1600,ih))'" `
      -c:v libwebp -quality 80 -compression_level 6 $out
    $report += [pscustomobject]@{ Source = $f.Name; Output = $out }
  }
  elseif ($vidExt -contains $ext) {
    $v++
    $base   = "{0}-video-{1:D2}" -f $Name, $v
    $out    = Join-Path $VideoOut "$base.mp4"
    $poster = Join-Path $ImageOut "$base.webp"
    $audio  = if ($KeepAudio) { @('-c:a', 'aac', '-b:a', '96k') } else { @('-an') }
    $args2 = @('-hide_banner', '-loglevel', 'error', '-y', '-i', $f.FullName,
      '-vf', "scale=-2:'min($MaxHeight,ih)'", '-c:v', 'libx264', '-crf', '28', '-preset', 'veryfast',
      '-pix_fmt', 'yuv420p', '-movflags', '+faststart') + $audio + @($out)
    & ffmpeg @args2
    ffmpeg -hide_banner -loglevel error -y -ss 1 -i $out -frames:v 1 `
      -vf "scale='min(1600,iw)':-2" -c:v libwebp -quality 80 $poster
    $report += [pscustomobject]@{ Source = $f.Name; Output = $out }
    $report += [pscustomobject]@{ Source = "$($f.Name) (poster)"; Output = $poster }
  }
}

$report | ForEach-Object {
  $mb = [math]::Round((Get-Item $_.Output).Length / 1MB, 2)
  $_ | Add-Member -NotePropertyName SizeMB -NotePropertyValue $mb -PassThru
} | Format-Table -AutoSize

$big = $report | Where-Object { (Get-Item $_.Output).Length -gt 15MB }
if ($big) { Write-Warning "Still over 15 MB: $($big.Output -join ', ') - try -MaxHeight 720" }
