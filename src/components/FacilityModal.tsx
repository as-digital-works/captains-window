import { ImageIcon, MapPin, Phone, User } from "lucide-react";
import { Modal } from "./Modal";
import { useFacilityModal } from "../context/FacilityModalContext";

export function FacilityModal() {
  const { location, close } = useFacilityModal();

  return (
    <Modal isOpen={!!location} onClose={close}>
      {location && (
        <div>
          <div className="relative aspect-[16/9] bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 flex items-center justify-center rounded-t-3xl overflow-hidden">
            {location.image ? (
              <img src={location.image} alt={location.name} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <>
                <ImageIcon size={40} className="text-white/25" strokeWidth={1.2} />
                <span className="absolute top-4 left-4 text-[10px] tracking-widest uppercase text-white/40">
                  Photos coming soon
                </span>
              </>
            )}
          </div>
          <div className="p-6 md:p-8">
            <span className="inline-block mb-3 rounded-full bg-red-50 border border-red-500/20 px-3 py-1 text-[10px] tracking-widest uppercase text-red-600">
              {location.categoryLabel}
            </span>
            <h3 className="font-display text-2xl text-navy-900 mb-3">{location.name}</h3>
            <p className="text-sm md:text-base text-ink-600 leading-relaxed">
              {location.description ?? `Details about our ${location.name} facility coming soon.`}
            </p>

            {location.address || location.category === "ground-training" ? (
              <div className="mt-5 space-y-1.5 text-sm text-ink-600">
                {location.address ? (
                  <div className="flex items-start gap-2">
                    <MapPin size={15} className="shrink-0 mt-0.5 text-red-600" />
                    <span>{location.address}</span>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 italic text-ink-400">
                    <MapPin size={15} className="shrink-0 mt-0.5" />
                    <span>Address and contact number to be added</span>
                  </div>
                )}
              </div>
            ) : null}

            <div className="mt-6 rounded-2xl border border-navy-900/10 bg-blue-50/40 p-5 flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-navy-900/10 text-red-600">
                {location.contactPhones?.length ? <Phone size={18} /> : <User size={18} />}
              </span>
              <div>
                <div className="text-xs tracking-widest uppercase text-ink-400 mb-1">
                  {location.contactPhones?.length ? `Call Us About ${location.name}` : `Why ${location.name}`}
                </div>
                {location.contactPhones?.length ? (
                  <div className="flex flex-col gap-1">
                    {location.contactPhones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/\s/g, "")}`}
                        className="text-sm font-semibold text-red-600 hover:text-red-700"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-ink-600">{location.highlight ?? "Details to be added."}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
