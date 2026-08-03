"use client"

import { useEffect, useState } from "react"

import { Calendar } from "@/components/ui/calendar"
import { EventsResponseSchema } from "@/schemas/backend_schemas/eventsSchema"

import EventCard from "./EventCard"

function SideCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<{ title: string; datetime: string; slug: string }[]>([])

  useEffect(() => {
    if (!date) return

    const fetchEvents = async () => {
      try {
        // Convert local date to UTC to avoid timezone assumptions on server
        const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
        const formattedDate = utcDate.toISOString().split("T")[0]

        const params = new URLSearchParams({ date: formattedDate })

        const res = await fetch(`/api/get_events?${params.toString()}`)

        if (!res.ok) {
          throw new Error("Network response was not ok")
        }

        const parsed = EventsResponseSchema.safeParse(await res.json())
        if (!parsed.success) {
          console.error("Unexpected events response shape:", parsed.error)
          setEvents([])
          return
        }

        setEvents(
          parsed.data.events.map((event) => ({
            title: event.title,
            datetime: event.date,
            slug: event.slug,
          }))
        )
      } catch (error) {
        console.error("Failed to fetch events:", error)
        setEvents([])
      }
    }
    fetchEvents()
  }, [date])

  return (
    <div className="flex flex-col gap-5 md:w-[23vw]">
      <div className="mx-auto flex w-full flex-col max-w-[25rem]">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-full font-sans"
        />
      </div>
      <div className="flex flex-col gap-3 px-10">
        <div className="title font-heading text-2xl w-full text-center text-primary-foreground p-2 relative isolate">
          <div
            className="absolute inset-0 -z-10 mx-auto w-2/3 min-w-[6.25rem] max-w-[12.5rem] bg-primary"
            style={{ clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)" }}
          ></div>
          Events
        </div>

        <div className="cards flex flex-col gap-3">
          {events.length === 0 ? (
            <p className="mt-6 text-center text-lg text-muted-foreground">No events</p>
          ) : (
            events.map((event) => (
              <EventCard key={event.slug} title={event.title} datetime={event.datetime} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default SideCalendar