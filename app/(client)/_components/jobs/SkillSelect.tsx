import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/app/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Button } from "@/app/components/ui/button";
import { capitaliseFirstLetter } from "@/lib/capitiliseFirstLetter";

type Skill = Record<"value" | "label", string>;

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


const SkillSelect = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Skill[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [filteredSkills, setFilteredSkills] = React.useState<string[]>([]);

  React.useEffect(() => {
    // Filter skills based on user input
    setFilteredSkills(
      TECH_SKILLS.filter((skill) =>
        skill.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue]);

  const handleUnselect = React.useCallback((skill: Skill) => {
    setSelected((prev) => prev.filter((s) => s.value !== skill.value));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "" && selected.length > 0) {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behavior of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [selected]
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selected.map((skill) => (
            <Badge key={skill.value} variant="secondary">
              {skill.label}
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
                const newSkill = {
                  value: inputValue,
                  label: capitaliseFirstLetter(inputValue),
                };
                setSelected((prev) => [...prev, newSkill]);
                setInputValue("");
              }
            }}
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && (filteredSkills.length > 0 || selected.length > 0) ? (
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
                    const newSkill = {
                      value: skill,
                      label: capitaliseFirstLetter(skill),
                    };
                    setSelected((prev) => [...prev, newSkill]);
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
}

export default SkillSelect;
