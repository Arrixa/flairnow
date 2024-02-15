"use client"
import * as React from "react"
import { ChevronsUpDown, Search } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/app/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover"
import { useState, useEffect } from "react";
import { ScrollArea } from "@/app/components/ui/scroll-area"
import { Country, CommandInputProps, CodeSelectProps } from "@/lib/interfaces"

const CustomCommandInput: React.FC<CommandInputProps> = ({ placeholder, onChange }) => (
  <input
    type="text"
    placeholder={placeholder}
    onChange={onChange}
    className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
  />
);


export function CodeSelect({ onChange, value }: CodeSelectProps)  {
  const [open, setOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState(value);
  const [displayed, setDisplayed] = useState('');
  const [searchText, setSearchText] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/countries', {
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


  const filteredCountries = countries.map((country) => {
    const cleanedDialCode = country.dialCode.replace(/\+/g, '');
    return { ...country, dialCode: cleanedDialCode };
  }).filter((country) =>
    (country.name.toLowerCase().includes(searchText.toLowerCase()) ||
    country.dialCode.toLowerCase().includes(searchText.toLowerCase())) &&
    country.dialCode
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
        <Button variant="combobox" role="combobox" aria-expanded={open} className="justify-between text-foreground">
          {displayed ? displayed : "Code"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
          <Command>
            <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CustomCommandInput
              placeholder="Search country code..."
              onChange={(e) => setSearchText(e.target.value)}
            />
            <CommandEmpty>No country code found.</CommandEmpty>
            </div>
            <CommandGroup>
              {filteredCountries.map((country) => (
                <CommandItem
                  key={country.name}
                  value={country.dialCode}
                  onSelect={() => handleSelect(country)}
                >
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
