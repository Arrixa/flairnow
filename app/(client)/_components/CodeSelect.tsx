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

interface CodeSelectProps {
  onChange: (value: string) => void;
  value: string;
}

export function CodeSelect({ onChange, value }: CodeSelectProps) {
  const [open, setOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState(value);
  const [displayed, setDisplayed] = useState('')

  const [countries, setCountries] = useState<Country[]>([]);
  console.log(countries)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/countries", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("res", response)

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('data:', data)

        if (!data.error) {
          setCountries(data.data);
        } else {
          console.error("Error fetching country data:", data.msg);
        }
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelect = (currentValue: string[]) => {
    setSelectedCode(currentValue[0]);
    setDisplayed(currentValue[1])
    setOpen(false);
    onChange(currentValue[0]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="combobox" role="combobox" aria-expanded={open} className="w-[40%] justify-between">
          {displayed ? displayed : "Country code"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
          <Command>
            <CommandInput placeholder="Search country code..." />
            <CommandEmpty>No country code found.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.name}
                  value={country.dialCode}
                  onSelect={() => handleSelect([country.dialCode, country.unicodeFlag])}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCode === country.unicodeFlag ? "opacity-100" : "opacity-0"
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
