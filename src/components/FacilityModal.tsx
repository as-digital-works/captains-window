import { ImageIcon } from "lucide-react";
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
          </div>
        </div>
      )}
    </Modal>
  );
}
