import { BadgeX, Filter, Loader } from "lucide-react";
import ProjectCard from "../../components/ProjectCard";
import { useEffect, useState } from "react";
import ProjectFiltersOverlay from "./ProjectFiltersOverlay";
import { useGetInfiniteProjects } from "../../hooks/project.hooks";
// import { useInView } from "motion/react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router";
import { useGetSkills } from "../../hooks/skill.hooks";
import { AnimatePresence } from "motion/react";

const limit = 6;

function Projects() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchParam, setSearchParam] = useSearchParams();
  const { ref, inView } = useInView();
  const { skills, isLoading: isGettingSkills } = useGetSkills();

  const paramSkills =
    searchParam.get("skills")?.split(",").filter(Boolean) || [];
  const {
    projectsPages,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetInfiniteProjects(paramSkills, limit);

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [inView]);

  const filterSkills =
    skills?.rows.filter((skill) => paramSkills.includes(skill.$id)) || [];

  const removeItemFromSkillFilter = (skillId: string) => {
    if (!paramSkills.includes(skillId)) return;
    const updatedSkills = paramSkills.filter((id) => id !== skillId);
    if (updatedSkills.length <= 0) {
      searchParam.delete("skills");
      setSearchParam(searchParam);
    } else {
      searchParam.set("skills", updatedSkills.join(","));
      setSearchParam(searchParam);
    }
  };

  const addItemToSkillFilter = (skillId: string) => {
    if (paramSkills.includes(skillId)) return;
    const updatedSkills = Array.from(new Set([...paramSkills, skillId]));
    searchParam.set("skills", updatedSkills.join(","));
    setSearchParam(searchParam);
  };

  return (
    <section className="flex flex-col pb-10">
      <div className="container flex flex-wrap gap-2 md:gap-4 items-center justify-between">
        <h1 className="text-3xl font-medium">Projects</h1>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap">
            {!isGettingSkills &&
              skills &&
              filterSkills.map((skill) => (
                <div
                  key={skill.$id}
                  className="flex items-center gap-2 p-1 rounded-md bg-primary-500 m-1"
                >
                  {skill.name}
                  <span onClick={() => removeItemFromSkillFilter(skill.$id)}>
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

      {isLoading && (
        <div className="container">
          <Loader className="h-6 w-6 animate-spin" />
        </div>
      )}

      {!isLoading && error && (
        <div className="container text-red-500">
          <p>{error.message}</p>
        </div>
      )}

      {/* Container for Project Cards */}
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 mb-6">
        <AnimatePresence>
          {!isLoading &&
            projectsPages &&
            projectsPages.pages.map((page) =>
              page.rows.map((project, index) => (
                <ProjectCard
                  key={project.$id}
                  project={project}
                  addSkillFilter={addItemToSkillFilter}
                  index={index}
                />
              ))
            )}
        </AnimatePresence>
      </div>

      {isFetchingNextPage && (
        <div className="container flex items-center justify-center p-2 gap-2">
          <Loader className="h-5 w-5 animate-spin" />
          <span className="text-slate-500">Getting More Projects . . .</span>
        </div>
      )}

      {!isFetchingNextPage && !isLoading && !hasNextPage && (
        <div className="flex items-center justify-center p-2 gap-2 text-slate-500">
          <p>* * That's All * *</p>
        </div>
      )}

      {hasNextPage && (
        <div ref={ref} className="opacity-0">
          Finding More Tasks ...
        </div>
      )}

      <ProjectFiltersOverlay
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        existingSkills={paramSkills}
        onChooseSkill={addItemToSkillFilter}
        onRemoveChooseSkill={removeItemFromSkillFilter}
      />
    </section>
  );
}

export default Projects;
