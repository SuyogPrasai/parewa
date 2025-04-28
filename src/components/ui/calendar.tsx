import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card" // Import Card Components

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [events, setEvents] = useState<any[]>([]) // Store fetched events
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Helper function to format the date as YYYY/MM/DD
  const formatDate = (date: string) => {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);
    return `${year}/${month}/${day}`;
  }

  // Fetch events from the server when a new date is selected
  useEffect(() => {
    if (!selectedDate) return

    // Ensure the date is formatted as YYYYMMDD
    const formattedDate = selectedDate
      .toLocaleDateString('en-CA') // This ensures the date format is YYYY-MM-DD
      .replace(/-/g, ''); // Remove hyphens to match the backend format (YYYYMMDD)
    console.log("Fetching events for date:", formattedDate)

    const fetchEvents = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`http://localhost:3001/api/calendar?date=${formattedDate}`)
        console.log("API Response:", response)

        if (!response.ok) {
          throw new Error("No events found or an error occurred.")
        }

        const data = await response.json()
        console.log("Fetched Events:", data)

        setEvents(data.events || [])
      } catch (err: any) {
        setError(err.message || "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [selectedDate])

  return (
    <div>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: cn(
            "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
            props.mode === "range"
              ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
              : "[&:has([aria-selected])]:rounded-md"
          ),
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
          ),
          day_range_start: "day-range-start",
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ className, ...props }) => (
            <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
          ),
          IconRight: ({ className, ...props }) => (
            <ChevronRight className={cn("h-4 w-4", className)} {...props} />
          ),
        }}
        onDayClick={(date) => setSelectedDate(date)} // Set selected date
        {...props}
      />

      {/* Display events for the selected date */}
      <div className="mt-6">
        {loading && <p>Loading events...</p>}
        {error && <p>{error}</p>}
        {events.length > 0 ? (
          events.map((event: any, index) => (
            <Card key={index} className="mb-4">
              <CardHeader>
                <CardTitle>{event.Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Start Date:</strong> {formatDate(event.start_date)}</p>
                <p><strong>End Date:</strong> {formatDate(event.end_date)}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No events found for this date.</p>
        )}
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
