'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar"; // Import Calendar component

interface CalendarEvent {
  title: string;
  date: Date;
  description: string;
}

const SideCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Fetch events for the selected date
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const formattedDate = format(date, 'yyyy-MM-dd');  // Format the date to yyyy-MM-dd
        const response = await fetch(`http://localhost:5000/events?date=${formattedDate}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setEvents(data.events.map((event: any) => ({
          title: event.title,
          description: event.description,
          date: new Date(event.start_date),
        })));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [date]);  // Re-fetch events whenever the selected date changes

  return (
    <Card className="bg-background shadow-lg border-border/50">
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {format(date, 'MMMM yyyy')}
          </h2>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 md:space-y-2 justify-center lg:space-y-6 px-4 flex flex-col md:flex-row lg:flex-col">
        <div className="rounded-lg border p-2 shadow-sm max-w-[275px]">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(day) => day && setDate(day)} // Use onSelect instead of onDaySelect
            className="rounded-md"
          />
        </div>

        <div className="md:p-4 w-full">
          <h3 className="text-lg font-semibold text-center px-8 lg:text-left md:text-left">Events</h3>
          <div className="max-h-[500px] overflow-y-auto pr-2">
            {events.length > 0 ? (
              events.map((event) => (
                <Card key={`${event.date.getTime()}-${event.title}`} 
                      className="group hover:bg-accent/50 transition-colors shadow-sm">
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm font-medium">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0 text-sm text-muted-foreground">
                    <p className="mb-1 line-clamp-2">{event.description}</p>
                    <time className="text-xs text-muted-foreground/70">
                      {format(event.date, 'MMM dd, yyyy - hh:mm a')}
                    </time>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center text-sm text-muted-foreground py-4">
                No events for this month
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SideCalendar;
