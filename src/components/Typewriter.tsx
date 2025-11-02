import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Typewriter = ({
  strings = ["Hello World", "This is a typewriter effect", "Made with Motion"],
  typingSpeed = 50,
  deletingSpeed = 30,
  delayBetweenStrings = 2000,
  loop = true,
  cursor = true,
  cursorChar = "|",
  className = "",
}) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentString = strings[currentStringIndex];

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, delayBetweenStrings);
      return () => clearTimeout(pauseTimeout);
    }

    if (!isDeleting && currentText === currentString) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      const nextIndex = (currentStringIndex + 1) % strings.length;
      if (nextIndex === 0 && !loop) return;
      setCurrentStringIndex(nextIndex);
      return;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(currentString.substring(0, currentText.length - 1));
      } else {
        setCurrentText(currentString.substring(0, currentText.length + 1));
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [
    currentText,
    isDeleting,
    isPaused,
    currentStringIndex,
    strings,
    typingSpeed,
    deletingSpeed,
    delayBetweenStrings,
    loop,
  ]);

  return (
    <span className={className}>
      {currentText}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="inline-block"
        >
          {cursorChar}
        </motion.span>
      )}
    </span>
  );
};

export default Typewriter;
