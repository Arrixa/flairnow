"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/app/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/app/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover"
import { useState, useEffect } from "react";
import { ScrollArea } from "@/app/components/ui/scroll-area"


interface Country {
  name: string;
  unicodeFlag: string;

  dialCode: string;
}

interface CommandInputProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomCommandInput: React.FC<CommandInputProps> = ({ placeholder, onChange }) => (
  <input
    type="text"
    placeholder={placeholder}
    onChange={onChange}
    className="w-full border-none focus:outline-none"
  />
);

interface CodeSelectProps {
  onChange: (value: string) => void;
  value: string;
}

export function CodeSelect({ onChange, value }: CodeSelectProps)  {
  const [open, setOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState(value);
  const [displayed, setDisplayed] = useState('');
  const [searchText, setSearchText] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/countries", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.error) {
           // Filter out countries with no dialCode
        const filteredCountries = data.data.filter((country: Country) => country.dialCode);
          // Sort the countries based on the name property
          const sortedCountries =  filteredCountries.sort((a: Country, b: Country) =>
            a.name.localeCompare(b.name)
          );
          setCountries(sortedCountries);
        } else {
          console.error("Error fetching country data:", data.msg);
        }
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchData();
  }, []);


  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelect = (country: Country) => {
    setSelectedCode(country.dialCode);
    setDisplayed(country.unicodeFlag);
    setOpen(false);
    onChange(country.dialCode);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="combobox" role="combobox" aria-expanded={open} className="w-[40%] justify-between">
          {displayed ? displayed : "Country code"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
          <Command>
            <CustomCommandInput
              placeholder="Search country code..."
              onChange={(e) => setSearchText(e.target.value)}
            />
            <CommandEmpty>No country code found.</CommandEmpty>
            <CommandGroup>
              {filteredCountries.map((country) => (
                <CommandItem
                  key={country.name}
                  value={country.dialCode}
                  onSelect={() => handleSelect(country)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCode === displayed ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span role="img" aria-label="flag">
                    {country.unicodeFlag}
                  </span>
                  &nbsp; &nbsp;{country.dialCode}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
