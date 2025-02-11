import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
  
  function UserHoverCard() {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <p className="text-xs text-muted-foreground mb-2 cursor-pointer hover:underline">
            @username
          </p>
        </HoverCardTrigger>
        <HoverCardContent 
          className="w-64 p-4 shadow-lg border bg-white"
          side="top" 
          align="start" 
          sideOffset={4} // Adjust distance
        >
          <div className="flex">
          <p className="text-sm font-medium">BKM | </p>
          <p className="text-xs font-thin">@bkm</p>

          </div>
          <p className="text-xs text-muted-foreground">
            Moderator • Contributor
          </p>
          <p className="text-xs text-muted-foreground">Senior Developer</p>
        </HoverCardContent>
      </HoverCard>
    )
  }
  
  export default UserHoverCard
  