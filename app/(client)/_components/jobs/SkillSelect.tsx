import React, { useState, useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/app/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Button } from "@/app/components/ui/button";
import { capitaliseFirstLetter } from "@/lib/capitiliseFirstLetter";

interface SkillSelectProps {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
}

const TECH_SKILLS = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  ".Net",
  "Java",
  "Ruby",
  "Go",
  "C++",
  "Kotlin",
  "Swift",
  "Agile",
  "Scrum",
];

const SkillSelect: React.FC<SkillSelectProps> = ({ selectedSkills, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredSkills, setFilteredSkills] = useState<string[]>([]);

  useEffect(() => {
    // Filter skills based on user input
    setFilteredSkills(
      TECH_SKILLS.filter((skill) =>
        skill.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue]);

  const handleUnselect = useCallback((skill: string) => {
    const newSkills = selectedSkills.filter((s) => s !== skill);
    onChange(newSkills);
  }, [selectedSkills, onChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;

      if (input) {
        if (e.key === "Enter" && inputValue.trim() !== "") {
          const newSkill = capitaliseFirstLetter(inputValue);
          const newSkills = [...selectedSkills, newSkill];

          // Update the parent component's state with the new skills
          onChange(newSkills);

          // Clear the input value
          setInputValue("");
        }

        if ((e.key === "Delete" || e.key === "Backspace") && input.value === "" && selectedSkills.length > 0) {
          const lastSkill = selectedSkills[selectedSkills.length - 1];
          handleUnselect(lastSkill);
        }

        // This is not a default behavior of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [inputValue, selectedSkills, onChange, handleUnselect]
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selectedSkills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(skill);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(skill)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Add or select skills..."
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputValue.trim() !== "") {
                const newSkill = capitaliseFirstLetter(inputValue);
                onChange([...selectedSkills, newSkill]);
                setInputValue("");
              }
            }}
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && (filteredSkills.length > 0 || selectedSkills.length > 0) ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-[150px] overflow-auto">
              {filteredSkills.map((skill) => (
                <CommandItem
                  key={skill}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={() => {
                    setInputValue("");
                    const newSkill = capitaliseFirstLetter(skill);
                    onChange([...selectedSkills, newSkill]);
                  }}
                  className={"cursor-pointer"}
                >
                  {skill}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
};

export default SkillSelect;