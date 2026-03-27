import { CircleCheckBig, Loader2 } from "lucide-react";
import OverlayModal from "../../components/OverlayModal";
import { useEffect, useState } from "react";
import { useGetAllInfiniteSkill } from "../../hooks/skill.hooks";
import { useInView } from "react-intersection-observer";

interface ProjectFiltersOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  existingSkills: string[];
  onChooseSkill: (skillId: string) => void;
  onRemoveChooseSkill: (skillId: string) => void;
}

function ProjectFiltersOverlay({
  isOpen: showFilters,
  onClose,
  existingSkills,
  onChooseSkill,
  onRemoveChooseSkill,
}: ProjectFiltersOverlayProps) {
  const [searchTxt, setSearchTxt] = useState<string>("");
  const { ref, inView } = useInView();
  const skillQuery = searchTxt
    ? `search=${encodeURIComponent(searchTxt)}&limit=20`
    : "limit=20";
  const {
    skillPages,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllInfiniteSkill(skillQuery);

  useEffect(() => {
    if (inView && hasNextPage && !isLoading && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isLoading, isFetchingNextPage, fetchNextPage]);

  return (
    <OverlayModal isOpen={showFilters} onClose={onClose}>
      <div className="flex items-center gap-4 mb-2">
        <h2 className="text-2xl">Skills</h2>
        <input
          type="text"
          className="border-b outline-none border-primary-300 w-full mr-4 px-2"
          placeholder="Search skills..."
          value={searchTxt}
          onChange={(e) => setSearchTxt(e.target.value)}
        />
      </div>

      <div className="max-h-60 flex items-center flex-wrap gap-3 mt-3">
        {isLoading && (
          <div>
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}

        {!isLoading && error && (
          <div className="text-red-500">
            <p>{error.message}</p>
          </div>
        )}

        {!isLoading &&
          skillPages &&
          skillPages.pages
            .flatMap((page) => page.data)
            .map((skill) => (
              <div
                key={skill.id}
                className="relative flex gap-2 px-4 py-2 bg-primary-500 rounded-full cursor-pointer hover:bg-primary-600"
                onClick={() => {
                  if (existingSkills.includes(String(skill.id))) {
                    onRemoveChooseSkill(String(skill.id));
                  } else {
                    onChooseSkill(String(skill.id));
                  }
                }}
              >
                {existingSkills.includes(String(skill.id)) && (
                  <CircleCheckBig className="text-green-500 h-5 w-5 absolute -top-2 right-0 flex items-center justify-center" />
                )}
                <img
                  src={skill.imageURL}
                  alt=""
                  className="h-6 w-6 rounded-full"
                />
                {skill.name}
              </div>
            ))}

        {isFetchingNextPage && (
          <div>
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}

        {hasNextPage && (
          <div ref={ref} className="opacity-0">
            Finding More Skills ...
          </div>
        )}
      </div>
    </OverlayModal>
  );
}

export default ProjectFiltersOverlay;
