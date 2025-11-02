import { motion } from "motion/react";
import Typewriter from "../../components/Typewriter";
import AnimatedBlob from "../../components/AnimatedBlob";
import SkillsTicker from "../../components/SkillsTicker";
import ProjectCard from "../../components/ProjectCard";
import useInnerScreen from "../../hooks/useInnerScreen";
import { SquareArrowUpRight } from "lucide-react";

function Home() {
  const { innerW } = useInnerScreen();

  return (
    <section className="flex flex-col gap-10 pb-10">
      <section className="container h-screen h-full-minus-nav flex flex-col sm:flex-row">
        <div className="p-2 w-full flex flex-col gap-3 justify-center">
          <h1 className="text-3xl font-medium">Hi, I’m Nikesh Adhikari.</h1>
          <div className="flex gap-2 mb-2">
            <span className="h-full w-1 bg-primary-500 rounded-md" />

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Typewriter
                strings={[
                  "Fullstack Developer",
                  "Tech Enthusiast",
                  "MERN + Laravel Experienced",
                  "AI Integrator",
                ]}
                typingSpeed={80}
                deletingSpeed={50}
                delayBetweenStrings={2000}
              />
            </motion.p>
          </div>
          <p className="text-lg mb-2">
            A full stack developer crafting clean, functional, and creative
            digital experiences.
          </p>

          <motion.button
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer hover:bg-primary-600 bg-primary w-fit font-medium px-4 py-2 rounded-md"
          >
            Learn More
          </motion.button>
        </div>

        <div className="sm:w-xl h-96 sm:h-full flex items-center justify-center relative">
          <div className="w-full lg:w-lg absolute">
            <AnimatedBlob />
          </div>
        </div>
      </section>

      <section className="container">
        <SkillsTicker />
      </section>

      <section className="container">
        <h2 className="text-3xl font-medium mb-4 flex justify-center gap-2 mx-auto">
          <span className="w-1.5 bg-primary rounded-md" />
          Featured Projects
        </h2>

        <p className="text-md text-center mb-6">
          A few highlights from the things I’ve been building lately.
        </p>

        <div className="flex flex-wrap md:grid md:grid-cols-3 md:grid-rows-2 gap-4 mb-8">
          <ProjectCard
            className="md:row-span-2"
            designType={innerW < 768 && innerW > 640 ? "horiz" : "vert"}
          />
          <ProjectCard
            className="md:col-span-2 "
            designType={innerW > 640 ? "horiz" : "vert"}
          />
          <ProjectCard
            className="md:col-span-2 md:col-start-2 md:row-start-2"
            designType={innerW > 640 ? "horiz" : "vert"}
          />
        </div>

        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 5px 5px rgba(61, 55, 255,0.2)",
          }}
          className="cursor-pointer mx-auto flex items-center gap-2 px-4 py-3 bg-primary rounded-md font-medium"
        >
          More Projects
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              delay: 1,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "linear",
            }}
          >
            <SquareArrowUpRight strokeWidth={1} />
          </motion.span>
        </motion.button>
      </section>
    </section>
  );
}

export default Home;
