import axios from 'axios';
import Image from 'next/image';

import Article from '@/types/post_objects/article';
import Notice from '@/types/post_objects/notice';
import { ArticlesResponse, NoticesResponse } from '@/types/api-responses';

import { fetchTopArticles } from '@/lib/application/get-top-articles';

import MainSection from '@/components/home/MainSection';
import ArticlesSection from '@/components/articles/ArticleSection';
import { Separator } from '@/components/ui/separator';
import NewsletterSignup from '@/components/home/NewsletterSection';
import { Header } from '@/components/layout/Header';
import { slides } from '@/config/site-config';
import Footer from '@/components/layout/Footer';
import { CarouselHome } from '@/components/home/Carousel';
import NotificationManager from '@/components/shared/NotificationManager';
import { getNoticesHandler } from '@/lib/handlers/getNotices';
import { getArticlesHandler } from '@/lib/handlers/getArticles';

export const dynamic = 'force-dynamic';


async function fetchArticlesByCategory(category: string): Promise<{ category: string; articles: Article[] }> {
	try {
		const params = new URLSearchParams({
			query: '',
			category,
			page: '1',
			limit: '4',
		});

		const response = await getArticlesHandler(params);

		if (response.success && Array.isArray(response.articles)) {
			return {
				category,
				articles: response.articles as Article[],
			};
		}

		console.log(`Handler returned success: false or no articles for category=${category}`);
		return { category, articles: [] };
	} catch (error: any) {
		console.error(`Error fetching articles for category ${category}:`, error.message);
		return { category, articles: [] };
	}
}

async function fetchNotices(): Promise<Notice[]> {
	try {
		const params = new URLSearchParams({ number: "4", limit: "4" });
		const response = await getNoticesHandler(params);

		if (response.success && Array.isArray(response.notices)) {
			return response.notices.filter((notice: Notice) => !notice.trashed);
		}

		console.log("Handler returned success: false for fetchNotices");
		return [];
	} catch (error: any) {
		console.error("Error fetching notices:", error.message);
		return [];
	}
}


export default async function Page() {

    const categories = ['BNKS', 'World', 'National'];

    const articlesDataPromises = categories.map((category: string) => fetchArticlesByCategory(category.toLocaleLowerCase()));

    const articlesData = await Promise.all(articlesDataPromises);

    const topArticlesData = await fetchTopArticles();
    
    const notices = await fetchNotices();

    const wordpress_ip = process.env.WORDPRESS_SITE_IP || "";

    return (
        <div className='relative'>
            {/* Header with sidebar trigger and branding */}
            <Header />
            {/* Carousel as the background */}
            <CarouselHome slides={slides} />
            <NotificationManager />
            <Separator orientation="horizontal" />
            <div className="w-full px-1 *:lg:px-5 min-h-screen relative select-none">

                <MainSection notices={notices} wordpress_ip={wordpress_ip} />

                <Separator orientation="horizontal" className="" />

                <div>
                    <ArticlesSection
                        category={categories[0]}
                        articles={articlesData[0].articles}
                    />
                    <Separator orientation="horizontal" className="mt-10" />
                </div>
                {/* Newsletter Signup after Literature */}
                <div className="flex flex-col justify-center pt-10 px-4 max-w-[1450px] mx-auto">
                    <NewsletterSignup articles={topArticlesData} />
                </div>

                <div>
                    <ArticlesSection
                        category={categories[1]}
                        articles={articlesData[1].articles}
                    />
                    <Separator orientation="horizontal" className="mt-10" />
                </div>
                <div>
                    <ArticlesSection
                        category={categories[2]}
                        articles={articlesData[2].articles}
                    />
                    <Separator orientation="horizontal" className="mt-10" />
                </div>

                <Image
                    src="/lightning_reversed.png"
                    alt="Lightning Reversed"
                    width={150}
                    height={150}
                    style={{
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none',
                    }}
                    draggable={false}
                    className="w-[20%] max-w-[300px] absolute hidden lg:block bottom-0"
                />
            </div>
            <Footer />
        </div>
    )
}