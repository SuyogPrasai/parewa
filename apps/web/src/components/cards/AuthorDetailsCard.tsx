import Image from "next/image";

import ShareArticleButton from "../misc/ShareArticleButton";
import { Badge } from "../ui/badge";

type AuthorDetailsCardProps = {
  displayName: string;
  role: string;
  publishedAt: string;
  tags: string[];
  displayPictureUrl: string;
};

function AuthorDetailsCard({
  displayName,
  role,
  publishedAt,
  tags,
  displayPictureUrl,
}: AuthorDetailsCardProps) {
  const formattedDate = publishedAt
    ? new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(publishedAt))
    : "";

  return (
    <div className="m-3 flex flex-col items-start gap-3">
      <div className="flex w-full items-start justify-between gap-3">
        <div className="flex gap-3">
          {displayPictureUrl ? (
            <Image
              src={displayPictureUrl}
              alt={displayName}
              width={48}
              height={48}
              className="h-[4.5rem] w-[4.5rem] shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-medium text-foreground">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-lg font-mono font-bold leading-none">{displayName}</span>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="default"
                      className="rounded-full bg-accent p-3 text-sm font-normal text-muted"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            {role && (
              <span className="font-mono text-sm text-muted-foreground">{role}</span>
            )}
            <span className="font-mono text-sm text-muted-foreground">
              Published: {formattedDate}
            </span>
          </div>
        </div>

        <ShareArticleButton size="sm" className="my-auto shrink-0 rounded-none p-4 text-xs hover:bg-primary-foreground/10" />
      </div>
    </div>
  );
}

export default AuthorDetailsCard;