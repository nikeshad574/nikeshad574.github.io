import { Link, NavLink, useNavigate, useParams } from "react-router";
import { ArrowUpLeft, ChevronRightCircle, Globe, Loader } from "lucide-react";
import cns from "../../utils/classNames";
import {
  useGetAProjectById,
  useGetAllProject,
  useGetFeaturedProjects,
} from "../../hooks/project.hooks";
import ProjectCard from "../../components/ProjectCard";
import SEO from "../../components/SEO";

function SingleProject() {
  const { projectId } = useParams<{ projectId: string }>();
  const { project, isGettingProject, errorGettingProject } = useGetAProjectById(
    projectId || "",
  );
  const navigate = useNavigate();

  const skillIdsQuery =
    project?.skills
      ?.map((skill) => String(skill.id))
      .filter(Boolean)
      .join(",") || "";

  const similarProjectsQuery = skillIdsQuery
    ? `skills__id=${skillIdsQuery}&id=-${project?.id}&limit=3`
    : `id=-${project?.id}&limit=3`;

  const {
    projects: similarProjectsResp,
    isGettingProjects: isGettingSimilarProjects,
  } = useGetAllProject(similarProjectsQuery);

  const {
    projects: featuredProjectsResp,
    isGettingProjects: isGettingFeaturedProjects,
  } = useGetFeaturedProjects(3);

  const similarProjects =
    similarProjectsResp?.data?.filter(
      (item) => String(item.id) !== String(project?.id),
    ) || [];

  const projectSkills = project?.skills || [];

  if (isGettingProject) {
    return <div>Loading...</div>;
  }

  if (!project || errorGettingProject) {
    return (
      <div>
        Failed to get project.{" "}
        {errorGettingProject ? errorGettingProject.message : ""}
      </div>
    );
  }

  const projectSEOData = {
    title: project?.title || "Project",
    description: project?.content
      ? project.content.replace(/<[^>]+>/g, "").slice(0, 160)
      : "Project details",
    canonical: `https://nikeshad574.com/projects/${project.id}}`,
  };

  return (
    <section className="container flex gap-4">
      <SEO
        title={projectSEOData.title}
        description={projectSEOData.description}
        canonical={projectSEOData.canonical}
      />
      <div className=" w-full p-2">
        <div
          className={cns(
            "aspect-video w-full bg-primary-800 rounded-xl relative mb-2",
          )}
        >
          <img
            src={project.imageUrl}
            alt=""
            className="h-full rounded-xl w-full object-cover"
          />
          <div className=" bg-primary-900 pt-2 pl-2 rounded-tl-xl absolute right-0 bottom-0">
            <div className="flex items-center justify-center gap-2 p-2 bg-primary-800 rounded-xl  ring-primary-900">
              {project.githubUrl && (
                <Link
                  to={project.githubUrl}
                  target="_blank"
                  className="h-8 w-8 p-0.5 hover:text-primary-400"
                  title="View Project Code"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                  >
                    <title>GitHub</title>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </Link>
              )}

              {project.projectUrl && (
                <Link
                  to={project.projectUrl}
                  target="_blank"
                  className="h-8 w-8 p-0.5 hover:text-primary-400"
                  title="View Live Project"
                >
                  <Globe />
                </Link>
              )}

              <Link
                to="/"
                className="h-8 w-8 p-0.5 hover:text-primary-400"
                title="Read More"
              >
                <ChevronRightCircle />
              </Link>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-medium">{project.title}</h1>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          {projectSkills.map((skill) => (
            <Link
              to={`/projects?skills=${skill.id}`}
              className="px-2 py-1 rounded-lg bg-primary/20 hover:bg-primary"
              key={skill.id}
            >
              {skill.name}
            </Link>
          ))}
        </div>

        <div
          className="htmlContent flex flex-col my-4"
          dangerouslySetInnerHTML={{
            __html: project.content,
          }}
        />
      </div>

      <div className="flex flex-col w-full max-w-80 gap-2 p-2">
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl font-medium">More Projects</h2>
            <NavLink
              to="/projects"
              className="text-sm font-bold text-violet-400 hover:text-violet-600"
            >
              See More
            </NavLink>
          </div>

          {isGettingSimilarProjects && (
            <div className="p-2 flex items-center gap-2 text-sm">
              <Loader className="h-5 w-5 animate-spin" />
              Loading more projects...
            </div>
          )}

          {!isGettingSimilarProjects &&
            similarProjects &&
            similarProjects.length === 0 && (
              <div className="p-2 flex flex-col items-center gap-2 text-sm">
                <p>No similar projects found . . .</p>
              </div>
            )}

          {!isGettingSimilarProjects &&
            similarProjects &&
            similarProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                addSkillFilter={(skillId: string) => {
                  navigate(`/projects?skills=${skillId}`);
                }}
              />
            ))}
        </div>

        {!isGettingFeaturedProjects &&
          featuredProjectsResp &&
          featuredProjectsResp.filter((p) => p.id.toString() !== projectId)
            .length > 0 && (
            <div className="flex flex-col gap-4 mt-3">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xl font-medium">Featured Projects</h2>
                <NavLink
                  to="/projects"
                  className="text-sm font-bold text-violet-400 hover:text-violet-600"
                >
                  See More
                </NavLink>
              </div>

              {featuredProjectsResp
                .filter((p) => p.id.toString() !== projectId)
                .map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    addSkillFilter={(skillId: string) => {
                      navigate(`/projects?skills=${skillId}`);
                    }}
                  />
                ))}
            </div>
          )}
      </div>
    </section>
  );
}

export default SingleProject;
