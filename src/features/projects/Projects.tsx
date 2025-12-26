import { BadgeX, Filter, Loader } from "lucide-react";
import ProjectCard from "../../components/ProjectCard";
import { useState } from "react";
import ProjectFiltersOverlay from "./ProjectFiltersOverlay";
import { useGetAllProjects } from "../../hooks/project.hooks";

function Projects() {
  const [showFilters, setShowFilters] = useState(false);
  const { projects, isLoading, error } = useGetAllProjects();

  return (
    <section className="flex flex-col pb-10">
      <div className="container flex flex-wrap gap-2 md:gap-4 items-center justify-between">
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

          <button
            className="flex items-center gap-2 px-4 py-2 bg-primary rounded-md cursor-pointer"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5" />
            Filters
          </button>
        </div>
      </div>

      {/* Container for Project Cards */}
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 mb-6">
        {isLoading && (
          <div>
            <Loader className="h-6 w-6 animate-spin" />
          </div>
        )}

        {!isLoading && error && (
          <div className="text-red-500">
            <p>{error.message}</p>
          </div>
        )}

        {!isLoading &&
          projects &&
          projects.rows.map((project) => (
            <ProjectCard key={project.$id} project={project} />
          ))}
      </div>

      <button className="cursor-pointer mx-auto bg-primary hover:bg-primary-800 px-4 py-2 rounded-md">
        Load More...
      </button>

      <ProjectFiltersOverlay
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
      />
    </section>
  );
}

export default Projects;
