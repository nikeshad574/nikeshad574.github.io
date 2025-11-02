import { motion } from "motion/react";
import Typewriter from "../../components/Typewriter";
import AnimatedBlob from "../../components/AnimatedBlob";
import SkillsTicker from "../../components/SkillsTicker";
import { Link } from "react-router";
import { ExternalLink, Globe, LinkIcon } from "lucide-react";
import ProjectCard from "../../components/ProjectCard";

function Home() {
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

        <p className="text-md text-center mb-4">
          A few highlights from the things I’ve been building lately.
        </p>

        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          <ProjectCard className="row-span-2" />
          <ProjectCard className="col-span-2" designType="horiz" />
          <ProjectCard
            className="col-span-2 col-start-2 row-start-2"
            designType="horiz"
          />
          {/* <ProjectCard className="col-start-2 row-start-3" designType="horiz" /> */}
        </div>
      </section>
    </section>
  );
}

export default Home;
