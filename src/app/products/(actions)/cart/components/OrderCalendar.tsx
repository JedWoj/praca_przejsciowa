"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addMinutes, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useCartContext } from "@/app/context/CartContext";

export default function OrderCalendar() {
  const { dueDate, setDueDate } = useCartContext();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          {dueDate ? (
            format(dueDate, "yyyy-MM-dd")
          ) : (
            <span>Set order due date</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={dueDate}
          onSelect={setDueDate}
          disabled={(date) =>
            date < new Date() || date > addMinutes(new Date(), 60 * 24 * 30)
          }
        />
      </PopoverContent>
    </Popover>
  );
}
