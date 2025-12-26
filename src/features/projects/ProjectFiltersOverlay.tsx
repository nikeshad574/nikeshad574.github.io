import { CircleCheckBig, Loader2 } from "lucide-react";
import OverlayModal from "../../components/OverlayModal";
import { useState } from "react";
import { useGetSearchSkills } from "../../hooks/skill.hooks";

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
  const { skills, isLoading, error } = useGetSearchSkills(searchTxt);

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
          skills &&
          skills.rows.map((skill) => (
            <div
              key={skill.$id}
              className="relative flex gap-2 px-4 py-2 bg-primary-500 rounded-full cursor-pointer hover:bg-primary-600"
              onClick={() => {
                if (existingSkills.includes(skill.$id)) {
                  onRemoveChooseSkill(skill.$id);
                } else {
                  onChooseSkill(skill.$id);
                }
              }}
            >
              {existingSkills.includes(skill.$id) && (
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
      </div>
    </OverlayModal>
  );
}

export default ProjectFiltersOverlay;
