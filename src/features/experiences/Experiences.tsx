import { motion } from "motion/react";
import cns from "../../utils/classNames";
import { useGetInfiniteExperiences } from "../../hooks/experience.hooks";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Loader } from "lucide-react";

function Experiences() {
  const {
    experiences,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useGetInfiniteExperiences(6);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <section className="container flex flex-col gap-6 py-12 mb-8">
      <h1 className="text-3xl font-medium">My Experiences</h1>

      {isLoading && (
        <div className="container flex items-center justify-center p-2 gap-2">
          <Loader className="h-5 w-5 animate-spin" />
          <span className="text-slate-500">Getting Experiences . . .</span>
        </div>
      )}

      {!isLoading && error && (
        <div className="container text-red-500">
          <p>{error.message}</p>
        </div>
      )}

      <div className="flex gap-4 p-4">
        <div className="w-2 bg-primary-600 rounded-md" />

        <motion.div className="flex flex-col gap-8">
          {!isLoading &&
            experiences &&
            experiences.pages &&
            experiences.pages.map((page) =>
              page.rows.map((experience, index) => (
                <motion.div
                  key={experience.$id}
                  className={cns(
                    "p-4 pt-6 mt-1 rounded-md bg-primary-800 relative",
                    index % 2 === 0 ? "max-w-3xl" : "max-w-4xl"
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: ((index % 2) + 1) * 0.4,
                    duration: 0.4,
                  }}
                >
                  <div className="absolute w-7 h-7 bg-primary-600 rounded-full left-0 top-0 z-10 -translate-x-8.5 flex items-center justify-center p-1.5">
                    <div className="w-full h-full bg-primary-900 rounded-full" />
                  </div>

                  <div className="bg-primary-600 absolute -top-4 left-0 px-2 py-1 rounded-md border-r-4 border-b-4 border-gray-900 font-medium text-sm">
                    {experience.time}
                  </div>

                  <h2 className="text-lg font-medium mb-1">
                    {experience.title}
                  </h2>

                  <div className="text-md text-gray-300">
                    <p>{experience.description}</p>
                  </div>
                </motion.div>
              ))
            )}
        </motion.div>
      </div>

      {isFetchingNextPage && (
        <div className="container flex items-center justify-center p-2 gap-2">
          <Loader className="h-5 w-5 animate-spin" />
          <span className="text-slate-500">Getting More Experiences . . .</span>
        </div>
      )}

      {!isFetchingNextPage && !isLoading && !hasNextPage && (
        <div className="flex items-center justify-center p-2 gap-2 text-slate-500">
          <p>* * That's All * *</p>
        </div>
      )}

      {hasNextPage && (
        <div ref={ref} className="opacity-0">
          Finding More experiences ...
        </div>
      )}
    </section>
  );
}

export default Experiences;
