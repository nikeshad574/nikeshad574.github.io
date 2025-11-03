import { motion, type HTMLMotionProps } from "framer-motion";
import { useState } from "react";
import cns from "../utils/classNames";

interface GlowingButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}

export default function GlowingButton({
  children,
  className,
  ...props
}: GlowingButtonProps) {
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      className={cns(
        "relative overflow-hidden group cursor-pointer",
        className
      )}
      {...props}
    >
      {!isHover && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: `conic-gradient(from var(--angle), transparent 70%, #3b82f6 80%, #60a5fa 90%, transparent 100%)`,
            padding: "2px",
          }}
          animate={{
            "--angle": ["0deg", "360deg"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-full h-full bg-primary-700 rounded-lg" />
        </motion.div>
      )}

      {isHover && (
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
          style={{
            background: `conic-gradient(from var(--angle), transparent 70%, #3b82f6 80%, #60a5fa 90%, transparent 100%)`,
            padding: "2px",
          }}
          animate={{
            "--angle": ["0deg", "360deg"],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-full h-full bg-primary-800 rounded-lg" />
        </motion.div>
      )}

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
