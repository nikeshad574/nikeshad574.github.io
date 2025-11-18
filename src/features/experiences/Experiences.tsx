import { motion } from "motion/react";
import cns from "../../utils/classNames";

function Experiences() {
  return (
    <section className="container flex flex-col gap-6 py-12 mb-8">
      <h1 className="text-3xl font-medium">My Experiences</h1>

      <div className="flex gap-4 p-4">
        <div className="w-2 bg-primary-600 rounded-md" />

        <motion.div className="flex flex-col gap-8">
          {Array.from({ length: 10 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={cns(
                "p-4 pt-6 mt-1 rounded-md bg-primary-800 relative",
                index % 2 === 0 ? "max-w-3xl" : "max-w-4xl"
              )}
            >
              <div className="absolute w-7 h-7 bg-primary-600 rounded-full left-0 top-0 z-10 -translate-x-8.5 flex items-center justify-center p-1.5">
                <div className="w-full h-full bg-primary-900 rounded-full" />
              </div>

              <div className="bg-primary-600 absolute -top-4 left-0 px-2 py-1 rounded-md border-r-4 border-b-4 border-gray-900 font-medium text-sm">
                {2020 - index * 2} - {2022 - index * 2}
              </div>

              <h2 className="text-lg font-medium mb-1">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Provident, similique?
              </h2>

              <div className="text-md text-gray-300">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus fuga quaerat corporis tenetur, perferendis ad
                  libero rerum id culpa sint. Dolor reprehenderit recusandae
                  cum.
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Experiences;
