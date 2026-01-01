import { useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import type { SkillRowResp } from "../types/skill.types";
import { useNavigate } from "react-router";

interface SkillsTickerProps {
  skills: SkillRowResp[];
}

const SkillsTicker = ({ skills }: SkillsTickerProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const xTranslation = useMotionValue(0);
  const navigate = useNavigate();

  const duplicatedSkills = [...skills, ...skills];

  const skillWidth = 216;
  const resetPoint = -(skillWidth * skills.length);

  useAnimationFrame((_, delta) => {
    if (!isPaused) {
      let newValue = xTranslation.get() - delta * 0.03;

      if (newValue < resetPoint) {
        newValue = 0;
      }

      xTranslation.set(newValue);
    }
  });

  const handleClick = (skill: SkillRowResp) => {
    navigate(`/projects?skills=${encodeURIComponent(skill.$id)}`);
  };

  return (
    <div className="relative overflow-hidden py-8">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-primary-900/50 rounded-4xl to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-primary-900/50 rounded-4xl to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-6"
        style={{
          x: xTranslation,
          width: "max-content",
        }}
        onHoverStart={() => setIsPaused(true)}
        onHoverEnd={() => setIsPaused(false)}
      >
        {duplicatedSkills.map((skill, index) => (
          <motion.div
            key={index}
            className={`relative  rounded-2xl p-6 min-w-[150px] cursor-pointer shadow-2xl`}
            whileHover={{
              scale: 1.2,
              rotate: 4,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(skill)}
          >
            <div className="text-center flex flex-col items-center gap-0.5">
              <img
                src={skill.imageURL}
                className="text-5xl h-16 w-16 rounded-md"
                alt=""
              />
              <h3 className="text-white text-md font-medium">{skill.name}</h3>
            </div>

            <div className="absolute inset-0 from-transparent via-white/10 to-transparent rounded-2xl" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SkillsTicker;
