
import axios from "axios";

import { fetchTopArticles } from "@/lib/application/get-top-articles";
import { notFound } from 'next/navigation';
import AuthorCard from "@/components/articles/AuthorDetailsCard";
import VoteComponent from "@/components/articles/VotingComponent";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import ArticleRankings from "@/components/collections/CollectionsTopArticles";
import NoticeSection from "@/components/notice/NoticeSection";
import getInitial from "@/helpers/get-initials";
import PopImage from "@/components/shared/ImagePop";
import Notice from "@/types/post_objects/notice";
import { getNoticeByIdHandler } from "@/lib/handlers/getNotice";
import { getNoticesHandler } from "@/lib/handlers/getNotices";

async function fetchNotice(notice_id: string): Promise<Notice> {
	const response = await getNoticeByIdHandler(notice_id);

	if (response.success && response.notice) {
		return response.notice;
	}

	console.log(`API /api/get_article/?id=${notice_id} returned success: false`);
	notFound(); // throws and never returns
}

async function fetchRelatedNotices({ category, excluding }: { category: string, excluding: string }): Promise<Notice[]> {
	try {
		const params = new URLSearchParams({ category, limit: "2", excluding });
		const response = await getNoticesHandler(params);

		if (response.success && Array.isArray(response.notices)) {
			return response.notices as Notice[];
		}

		console.log(`Handler returned success: false for category=${category} excluding=${excluding}`);
		return [];
	} catch (error: any) {
		console.error("Error fetching related articles:", error.message);
		return [];
	}
}

export default async function NoticePage({ searchParams }: { searchParams: Promise<{ id: string }> }) {

	const SearchParams = await searchParams;

	const notice_id = await SearchParams.id || '';

	const topArticles = await fetchTopArticles();

	const notice = await fetchNotice(notice_id);

	const relatedNotices = await fetchRelatedNotices({ category: notice?.category, excluding: notice_id });

	return (
		<>
			<div className="min-h-screen">
				<h1 className="text-4xl sm:text-5xl md:text-6xl font-oswald mt-3 sm:mt-4 md:mt-10 ml-3 sm:ml-5 md:ml-10">
					NOTICE
				</h1>
				<div className="flex flex-row mt-5 lg:ml-5">
					<div className="container mx-auto px-4 sm:px-6 lg:pr-8">
						<div className="flex flex-col pt-4 sm:pt-6">

							<div className="flex flex-col max-w-[900px]">
								<div className="flex flex-col lgplus:flex-row gap-5 lg:gap-10 lgplus:w-[110%] lg:max-w-[1400px]">
									<div className="lg:w-[575px]">
										<div className="content-component w-full">
											<h1 className="text-3xl sm:text-4xl lg:5xl font-oswald font-bold uppercase mt-4 max-w-full sm:max-w-[80%] md:max-w-[70%] lg:max-w-[90%] leading-tight">
												{notice.title}
											</h1>
											<Separator className="my-4" />
											<div
												className="sm:prose-base lg:prose-lg max-w-none lg:mb-4 sm:mb-10 text-justify"
												dangerouslySetInnerHTML={{ __html: notice?.content || '' }}
											></div>
											{notice.featuredImage && (
												<div className="relative w-full aspect-[16/9] mt-5">
													<PopImage
														src={notice.featuredImage || ''}
														alt="Featured Image"
														fill
														className="object-cover w-full h-full"
														sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
														priority
													/>
												</div>
											)}

											{notice.publisher && notice.publishedIn && (
												<div className="p-2 sm:p-3 flex flex-col sm:flex-row justify-between gap-3 bg-gray-50 mt-3">
													<AuthorCard
														name={notice.publisher[0].name}
														timestamp={notice.publishedIn.toLocaleString()}
														initials={getInitial(notice.publisher[0].name)}
														type="notice"
														position={notice.publisher[0].position || ''}
													/>
													<VoteComponent orientation="horizontal" voteCount={notice.voteCount || 0} post_id={notice._id || ''} post_type={"notice"} />
												</div>
											)}
										</div>
									</div>
									<div>
										<ArticleRankings articles={topArticles} />
									</div>
								</div>
							</div>
						</div>
						<div className="mb-8 mt-8 sm:mt-10 max-w-full md:max-w-2xl lg:max-w-3xl">
							<div className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl font-oswald font-bold uppercase text-gray-900 underline underline-offset-8 decoration-gray-200 decoration-1 mb-4 sm:mb-6">
								{`Similar Notices in ${notice.category}`}
							</div>
							<NoticeSection notices={relatedNotices} />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}