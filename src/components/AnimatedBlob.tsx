import { motion } from "motion/react";

function AnimatedBlob() {
  const bobAnimationDValues = [
    "M62.9,-17.5C71.6,6.6,62.1,39.5,38.9,57.4C15.6,75.2,-21.5,77.9,-45.9,60.7C-70.3,43.6,-82.1,6.5,-72.3,-18.9C-62.6,-44.4,-31.3,-58.3,-2.1,-57.6C27,-56.9,54.1,-41.6,62.9,-17.5Z",
    "M56.4,-13.6C66.1,11.5,62.1,45.8,41.2,62.3C20.3,78.7,-17.5,77.4,-35.1,61.5C-52.8,45.6,-50.2,15,-41,-9.4C-31.8,-33.8,-15.9,-52.1,3.7,-53.3C23.3,-54.6,46.7,-38.7,56.4,-13.6Z",
    "M65.7,-26.3C72.2,-1.4,55.6,26.2,33.9,40.4C12.2,54.7,-14.5,55.7,-32.1,43.2C-49.6,30.6,-58,4.5,-51.2,-21C-44.3,-46.5,-22.1,-71.3,3.7,-72.5C29.6,-73.8,59.2,-51.3,65.7,-26.3Z",
    "M65.7,-19.8C73.3,2.2,59.6,32.7,36.8,48.9C14,65.1,-18,66.9,-39.4,51.9C-60.9,36.9,-71.8,5,-63.5,-17.9C-55.1,-40.9,-27.6,-54.8,0.7,-55.1C29,-55.3,58,-41.8,65.7,-19.8Z",
  ];

  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="blobClip">
          <motion.path
            fill="#FF0066"
            initial={{ d: bobAnimationDValues[0] }}
            animate={{
              d: bobAnimationDValues,
            }}
            transition={{
              duration: 20,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
            transform="translate(100 100)"
          />
        </clipPath>
      </defs>

      <image
        href="me_photo.png"
        width="100%"
        height="100%"
        clipPath="url(#blobClip)"
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  );
}

export default AnimatedBlob;
