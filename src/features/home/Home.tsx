import { motion } from "motion/react";
import Typewriter from "../../components/Typewriter";
import AnimatedBlob from "../../components/AnimatedBlob";

function Home() {
  return (
    <section>
      <section className="container h-full-minus-nav flex flex-col sm:flex-row">
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

        <div className="w-xl h-96 sm:h-full flex items-center justify-center relative">
          <div className="w-full lg:w-lg absolute">
            <AnimatedBlob />
          </div>
        </div>
      </section>
    </section>
  );
}

export default Home;
