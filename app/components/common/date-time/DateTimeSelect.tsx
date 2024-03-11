"use client";
 
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/utils/utils";
import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { TimePickerDemo } from "./TimePicker";

interface DatePickerProps {
  selectedDate?: Date;
  onSelectDate: (date: Date) => void;
}
 
export function DateTimeSelect({ selectedDate, onSelectDate }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(selectedDate);

  const handleSelect = (selectedDate: Date) => {
    setDate(selectedDate);
    onSelectDate(selectedDate);
  };
 
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP HH:mm:ss") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => handleSelect(selectedDate as Date)}
          initialFocus
        />
        <div className="p-3 border-t border-border">
          <TimePickerDemo setDate={setDate} date={date} />
        </div>
      </PopoverContent>
    </Popover>
  );
}