'use client';
import { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import Image from 'next/image';

interface CalendarEvent {
  title: string;
  date: Date;
  description: string;
}

const SideCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await fetch('/api/events');
  //       // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  //       const data = await response.json();
  //       setEvents(data.map((event: any) => ({
  //         ...event,
  //         date: new Date(event.date),
  //       })));
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //     }
  //   };

  //   fetchEvents();
  // }, []);

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === date.getFullYear() &&
      eventDate.getMonth() === date.getMonth();
  });

  return (
    <div className="relative">

      <Card className="bg-background shadow-lg border-border/50 relative z-1">
        <CardHeader className="pb-2 px-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {format(date, 'MMMM yyyy')}
            </h2>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 md:space-y-2  justify-center lg:space-y-6 px-4 flex flex-col md:flex-row lg:flex-col ">
          <div className="rounded-lg border p-2 shadow-sm max-w-[275px]">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(day) => day && setDate(day)}
              className="rounded-md"
            />
          </div>

          <div className="md:p-4 w-full">
            <h3 className="text-lg font-semibold text-center px-8 lg:text-left md:text-left">Events</h3>
            <div className=" max-h-[500px] overflow-y-auto pr-2">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
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
      <div className="min-w-[150px]">
        <Image
          src="/eagle_image.png"
          alt="Eagle Logo"
          width={150}
          height={150}
          className="object-contain absolute right-[-50%] bottom-[-10%] w-[100%] z-[1]"
        />
      </div>
    </div>
  );
};

export default SideCalendar;