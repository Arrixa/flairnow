"use client"
import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
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
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Country } from "@/lib/interfaces"

// FTM-2 / FTM-20 19. Country name select

export function CountrySelect({ onChange, value }: { onChange: (value: string) => void; value: string }) {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(value);
  const [displayed, setDisplayed] = useState(selectedCountry);
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
          // Sort the countries based on the name property
          const sortedCountries =  data.data.sort((a: Country, b: Country) =>
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


  const handleSelect = (selectedCountry: Country) => {
    // console.log("Selected country:", selectedCountry)
    setSelectedCountry(selectedCountry.name);
    setDisplayed(`${selectedCountry.name} ${String.fromCharCode(160)} ${selectedCountry.unicodeFlag}`);
    setOpen(false);
    onChange(selectedCountry.name);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="combobox" role="combobox" aria-expanded={open} className="w-full justify-between text-foreground  bg-background">
          {displayed ? displayed : "Select country..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 bg-background" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-y-auto p-0 bg-background">
        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4 bg-background">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries?.map((country) => (
                <CommandItem
                  key={country.name}
                  value={country.name}
                  onSelect={() => handleSelect(country)}
                >
                  <span role="img" aria-label="flag">
                  {country.unicodeFlag}
                </span>
                &nbsp; &nbsp;{country.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

