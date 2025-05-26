'use client';
import { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import Image from 'next/image';
import axios from 'axios';
import getFormattedDate from '../helpers/getDateInFormat';
import { Event } from '@/models/Event';
import { ScrollArea } from './ui/scroll-area';

const SideCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const formattedSelectedDate = getFormattedDate(date);
    axios
      .get("/api/get_events?date=" + formattedSelectedDate)
      .then((response) => {
        if (response.data.success) {
          setEvents(response.data.events);
        }
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, [date]);

  return (
    <Card className="bg-background shadow-lg border-border/50 p-2">
      <CardHeader className="p-3">

        <h2 className="text-lg font-semibold px-2 font-oswald">
          {format(date, 'dd MMMM, yyyy')}
        </h2>

      </CardHeader>

      <CardContent className="justify-center flex flex-col md:flex-row lg:flex-col p-2">
        <div className="rounded-lg border shadow-sm max-w-[275px] mx-auto lg:mb-0 mb-5">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(day) => day && setDate(day)}
            className="p-5"
          />
        </div>

        <div className="w-full p-2">
          <h3 className="text-lg font-semibold text-center pb-2 lg:text-left md:text-left mt-5 font-oswald">Events</h3>
          <div className=" max-h-[500px] overflow-y-auto ">
            <ScrollArea className="h-[200px] w-[250px] rounded-md p-2">
              {events.length > 0 ? (
                events.map((event) => (
                  <Card
                    key={`${event.start_date}-${event.title}`}
                    className="shadow-none mb-2 rounded-none border-none relative flex items-center" // Added flex and items-center
                  >
                    <div className="bg-primary h-full w-[2px] absolute left-0 top-0 rounded-2xl"></div> {/* h-full and top-0 */}
                    <CardHeader className="p-3 pl-5 flex-grow"> {/* Added pl-5 and flex-grow */}
                      <CardTitle className="text-sm font-medium text-wrap font-roboto">
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                ))
              ) : (
                <div className="text-center text-sm text-muted-foreground py-4 font-roboto">
                  No events for this day
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SideCalendar;