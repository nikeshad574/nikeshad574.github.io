import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface OverlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function OverlayModal({ isOpen, onClose, children }: OverlayModalProps) {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    if (isOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";

      if (scrollBarWidth > 0) {
        const prevPad = parseFloat(prevPaddingRight) || 0;
        document.body.style.paddingRight = `${prevPad + scrollBarWidth}px`;
      }
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed inset-0 z-50 bg-primary-800/60 backdrop-blur-[3px] flex items-center justify-center"
        >
          <div className="relative w-full max-w-xl rounded-md p-4 bg-primary">
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </button>

            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default OverlayModal;
