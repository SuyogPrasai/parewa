import axios from "axios";

import { fetchTopArticles } from "@/lib/application/get-top-articles";

import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import ArticleRankings from '@/components/collections/CollectionsTopArticles';
import VoteComponent from '@/components/articles/VotingComponent';
import AuthorCard from '@/components/articles/AuthorDetailsCard';
import PublisherCard from '@/components/shared/PublisherCard';
import SideArticleList from '@/components/articles/ArticleCollection';
import Article from "@/types/post_objects/article";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import getInitial from "@/helpers/get-initials";
import { getSingleArticleHandler } from "@/lib/handlers/getArticle";
import { getArticlesHandler } from "@/lib/handlers/getArticles";


async function fetchArticle(article_id: string): Promise<Article> {
	const response = await getSingleArticleHandler(article_id);

	if (response.success && response.article) {
		return response.article;
	}

	console.log(`API /api/get_article/?id=${article_id} returned success: false`);
	notFound(); // throws and never returns

}

async function fetchRelatedArticles({ category, excluding }: { category: string, excluding: string }): Promise<Article[]> {
	try {
		const params = new URLSearchParams({ category, limit: "2", excluding });
		const response = await getArticlesHandler(params);

		if (response.success && Array.isArray(response.articles)) {
			return response.articles as Article[];
		}

		console.log(`Handler returned success: false for category=${category} excluding=${excluding}`);
		return [];
	} catch (error: any) {
		console.error("Error fetching related articles:", error.message);
		return [];
	}
}

export default async function ArticlePage({ searchParams }: { searchParams: Promise<{ id: string }> }) {

	const SearchParams = await searchParams;

	const article_id = await SearchParams.id || '';

	const topArticles = await fetchTopArticles();

	const article: Article = await fetchArticle(article_id);

	const relatedArticles = await fetchRelatedArticles({ category: article.category, excluding: article_id });

	return (
		<>
			<div className="min-h-screen bg-white">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col pt-4 sm:pt-6">

						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-oswald font-bold uppercase mt-4 sm:mt-6 max-w-full sm:max-w-[80%] md:max-w-[70%] lg:max-w-[90%] underline underline-offset-4 decoration-1 decoration-gray-200 leading-tight">
							{article.title}
						</h1>

						<div className="flex flex-col mt-4 sm:mt-6 max-w-[1400px]">
							<div className="details-card w-full md:max-w-2xl lg:max-w-2xl">
								<p className="text-gray-600 font-roboto text-base sm:text-lg md:text-xl leading-relaxed">
									{article.oneLiner}
								</p>
								<div className="flex flex-col sm:flex-row sm:justify-between py-3 sm:py-4 gap-4">
									{article && (
										<div className="flex flex-col">

											<AuthorCard initials={getInitial(article.author)} name={article.author} timestamp={`${article.publishedIn}`} type="article" position={""} />
											<div className="flex flex-wrap items-center gap-2 mt-2 pl-2 sm:pl-3">
												{article.postTags.map((tag, index) => (
													<Badge key={index} variant="secondary" className="text-xs sm:text-sm font-medium px-1.5 sm:px-2 py-0.5">
														#{tag}
													</Badge>
												))}
											</div>
										</div>

									)}
									<VoteComponent orientation="horizontal" voteCount={article.voteCount || 0} post_id={article._id?.toString() || ""} post_type={"article"} />
								</div>

							</div>
							<div className="flex flex-col lgplus:flex-row gap-5 lg:gap-10 lgplus:w-[900px] lg:max-w-[1400px]">
								<div className="lgplus:w-[700px]">
									<div className="content-component w-full ">
										<Separator className="my-4" />
										<div className="relative w-full aspect-[16/9]">
											<Image
												src={article.featuredImage || ''}
												alt="Featured Image"
												fill
												className="object-cover w-full h-full"
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
												priority
											/>
										</div>
										<div
											className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mt-4 lg:mb-4 sm:mb-10"
											dangerouslySetInnerHTML={{ __html: article?.content || '' }}
										></div>
									</div>
								</div>
								{/* <div>
									<ArticleRankings articles={topArticles} />
								</div> */}
							</div>
						</div>
					</div>
					<div className="publisher lg:mt-0 sm:mt-10">
						{article && article.publisher && (
							<PublisherCard
								initials={article.publisher[0].name[0]}
								name={article.publisher[0].name}
								established={article.publishedIn.toString()}
								position={article.publisher[0].position}
							/>
						)}
					</div>
					<div className="mb-8 mt-8 sm:mt-10 max-w-full md:max-w-2xl lg:max-w-3xl">
						<h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl font-oswald font-bold uppercase text-gray-900 underline underline-offset-8 decoration-gray-200 decoration-1 mb-4 sm:mb-6">
							{`Some Latest Articles in ${article.category}`}
						</h2>
						<SideArticleList articles={relatedArticles} variant="simple" />
					</div>
				</div>
			</div>
		</>
	)
}