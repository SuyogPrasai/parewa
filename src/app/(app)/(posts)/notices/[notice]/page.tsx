
import axios from "axios";

import { fetchTopArticles } from "@/lib/actions/get-top-articles";
import NoticeDetail from "@/components/notice/NoticeDetail";


async function fetchNotice(notice_id: string) {
	try {
		const response = await axios.get(`${process.env.SITE_BASE_URI}/api/get_notice/?id=${notice_id}`);

		if (response.data.success) {
			return response.data.notice;
		}
		console.log(`API ${process.env.SITE_BASE_URI}/api/get_notice/?id=${notice_id} returned success: false`)
		return null
	}
	catch (error: any) {
		console.error('Error fetching notice:', error.message);
		return null

	}
}


async function fetchRelatedNotices(category: string) {
	try {
		const response = await axios.get(`${process.env.SITE_BASE_URI}/api/get_news?category=${category}&limit=3`);

		if (response.data.success) {
			return response.data.notices;
		}
		console.log(`API ${process.env.SITE_BASE_URI}/api/get_news?category=${category} returned success: false`)
		return []
	}
	catch (error: any) {
		console.error('Error fetching notices:', error.message);
		return []

	}
}

export default async function NoticePage({ searchParams }: { searchParams: Promise<{ id: string }> }) {

	const SearchParams = await searchParams;

	const notice_id = await SearchParams.id || '';

	const topArticles = await fetchTopArticles();

	const notice = await fetchNotice(notice_id);

	const relatedNotices = await fetchRelatedNotices(notice?.category);

	return (
		<>
			<div className="min-h-screen">
				<h1 className="text-4xl sm:text-5xl md:text-6xl font-oswald mt-3 sm:mt-4 md:mt-10 ml-3 sm:ml-5 md:ml-10">
					NOTICE
				</h1>
				<div className="flex flex-row mt-5 lg:ml-5">

					<NoticeDetail
						Notice={notice}
						Articles={topArticles}
						Notices={relatedNotices}
					/>
				</div>
			</div>
		</>
	)
}