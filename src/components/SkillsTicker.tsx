import { useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

interface ISkills {
  name: string;
  icon: string;
}

const SkillsTicker = () => {
  const [isPaused, setIsPaused] = useState(false);
  const xTranslation = useMotionValue(0);

  const skills: ISkills[] = [
    { name: "HTML", icon: "🌐" },
    { name: "CSS", icon: "🎨" },
    { name: "JavaScript", icon: "⚡" },
    { name: "React", icon: "⚛️" },
    { name: "Node.js", icon: "🟢" },
    { name: "MongoDB", icon: "🍃" },
    { name: "TypeScript", icon: "📘" },
    { name: "Tailwind", icon: "💨" },
    { name: "Next.js", icon: "▲" },
    { name: "Express", icon: "🚂" },
    { name: "GraphQL", icon: "◈" },
    { name: "Docker", icon: "🐳" },
  ];

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

  const handleClick = (skill: ISkills) => {
    alert(`You clicked on ${skill.name}!`);
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
            <div className="text-center">
              <div className="text-5xl mb-3">{skill.icon}</div>
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
