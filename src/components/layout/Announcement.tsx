import Announcement from "@/types/post_objects/announcement";
import axios from "axios";
import AnnoucementClient from "./AnnoucementClient";
import { getActiveAnnouncementHandler } from "@/lib/handlers/getAnnouncement";

async function fetchAnnoucment(): Promise<Announcement | undefined> {
	const response = await getActiveAnnouncementHandler();

	if (response.success && response.announcement) {
		return response.announcement;
	}

	console.log(`API /api/get_announcement returned success: false`);
	return undefined;
}

export default async function AnnouncementCard() {
	const announcement = await fetchAnnoucment()

	if (!announcement) {
		return null
	}

	return (
		<>
			<AnnoucementClient announcement={announcement} />
		</>
	);
}