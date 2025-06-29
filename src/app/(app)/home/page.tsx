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

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.PAREWA_BASE_URI

async function fetchArticlesByCategory(category: string) {
    try {
        const response = await axios.get<ArticlesResponse>(`${BASE_URL}/api/get_articles`, {
            params: {
                query: '',
                category,
                page: 1,
                limit: 4,
            }
        });

        if (response.data.success && response.data.articles.length > 0) {
            return {
                category,
                articles: response.data.articles,
            };
        }
        return { category, articles: [] };

    } catch (error: any) {
        console.error(`Error fetching articles for category ${category}:`, error);
        return { category, articles: [] };
    }
}

async function fetchNotices(): Promise<Notice[]> {
    try {
        const response = await axios.get<NoticesResponse>(
            `${BASE_URL}/api/get_news?&number=4&limit=4`
        );
        if (response.data.success) {
            return response.data.notices.filter((notice: Notice) => !notice.trashed);
        }
        return [];

    } catch (error) {
        console.error('Error fetching notices:', error);
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