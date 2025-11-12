import { BadgeX, Cross, Filter } from "lucide-react";
import ProjectCard from "../../components/ProjectCard";

function Projects() {
  return (
    <section className="flex flex-col pb-10">
      <div className="container flex flex-wrap gap-2 md:gap-4  items-center justify-between">
        <h1 className="text-3xl font-medium">Projects</h1>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-1 rounded-md bg-primary-500 m-1"
              >
                React Js
                <span>
                  <BadgeX className="h-4 w-4 cursor-pointer" />
                </span>
              </div>
            ))}
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-primary rounded-md cursor-pointer">
            <Filter className="h-5 w-5" />
            Filters
          </button>
        </div>
      </div>

      {/* Container for Project Cards */}
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCard key={index} />
        ))}
      </div>

      <button className="cursor-pointer mx-auto bg-primary hover:bg-primary-800 px-4 py-2 rounded-md">
        Load More...
      </button>
    </section>
  );
}

export default Projects;
