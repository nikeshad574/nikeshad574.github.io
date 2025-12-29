import { Link, NavLink, useNavigate, useParams } from "react-router";
import { ArrowUpLeft, ChevronRightCircle, Globe, Loader } from "lucide-react";
import cns from "../../utils/classNames";
import {
  useGetSimilarProject,
  useGetSingleProject,
} from "../../hooks/project.hooks";
import { useGetSkills } from "../../hooks/skill.hooks";
import ProjectCard from "../../components/ProjectCard";

function SingleProject() {
  const { projectId } = useParams<{ projectId: string }>();
  const { project, isLoading, error } = useGetSingleProject(projectId!);
  const { skills } = useGetSkills();
  const navigate = useNavigate();

  const { similarProjects, isLoading: isGettingSimilarProjects } =
    useGetSimilarProject(project?.skills!, project?.$id!, 3);

  const projectSkills =
    skills?.rows.filter((skill) => project?.skills?.includes(skill.$id)) || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!project || error) {
    return <div>Failed to get project. {error ? error.message : ""}</div>;
  }

  console.log(similarProjects);

  return (
    <section className="container flex gap-4">
      <div className=" w-full p-2">
        <div
          className={cns(
            "aspect-video w-full bg-primary-800 rounded-xl relative mb-2"
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
              to={`/projects?skills=${skill.$id}`}
              className="px-2 py-1 rounded-lg bg-primary/20 hover:bg-primary"
              key={skill.$id}
            >
              {skill.name}
            </Link>
          ))}
        </div>

        <div
          className="htmlContent flex flex-col gap-2 mt-4"
          dangerouslySetInnerHTML={{
            __html: project.content,
          }}
        />
      </div>

      <div className="w-full max-w-80 flex flex-col gap-4 p-2">
        <h2 className="text-xl font-medium">More Projects</h2>

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
              key={project.$id}
              project={project}
              addSkillFilter={(skillId: string) => {
                navigate(`/projects?skills=${skillId}`);
              }}
            />
          ))}

        <NavLink
          to="/projects"
          className="px-4 py-2 flex items-center justify-center gap-2 w-fit mx-auto bg-primary hover:bg-primary-600 text-white rounded-lg"
        >
          View All <ArrowUpLeft />
        </NavLink>
      </div>
    </section>
  );
}

export default SingleProject;
