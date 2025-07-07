import { Suspense } from 'react';
import { fetchArticles } from '@/lib/application/get-articles';
import SideArticleList from '@/components/articles/ArticleCollection';
import PaginationControls from '@/components/shared/Pagination';
import CollectionsDateHeader from '@/components/shared/CollectionsDateHeader';
import { CreditsCard } from '@/components/shared/CreditCard';
import Image from 'next/image';

export default async function CredtsPage() {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-oswald mt-4 sm:mt-5 ml-4 sm:ml-5">
                    CREDITS
                </h1>
                <div className="categories my-10 mx-5 flex flex-col gap-5">
                    <CreditsCard
                        name="Niva Sharma"
                        role="Creative Head"
                        bio="Designs UI/UX with emotion. Creates interfaces that speak to users."
                        imageUrl="/notification_icon.png"
                        tags={['design', 'illustration', 'uiux']}
                        photoPosition="left"
                        socialLinks={{
                            github: 'https://github.com/niva',
                            twitter: 'https://twitter.com/nivadesigns',
                            linkedin: 'https://linkedin.com/in/nivasharma',
                        }}
                    />
                    <CreditsCard
                        name="Niva Sharma"
                        role="Creative Head"
                        bio="Designs UI/UX with emotion. Creates interfaces that speak to users."
                        imageUrl="/notification_icon.png"
                        tags={['design', 'illustration', 'uiux']}
                        photoPosition="right"
                        socialLinks={{
                            github: 'https://github.com/niva',
                            twitter: 'https://twitter.com/nivadesigns',
                            linkedin: 'https://linkedin.com/in/nivasharma',
                        }}
                    />
                    <CreditsCard
                        name="Niva Sharma"
                        role="Creative Head"
                        bio="Designs UI/UX with emotion. Creates interfaces that speak to users."
                        imageUrl="/notification_icon.png"
                        tags={['design', 'illustration', 'uiux']}
                        photoPosition="left"
                        socialLinks={{
                            github: 'https://github.com/niva',
                            twitter: 'https://twitter.com/nivadesigns',
                            linkedin: 'https://linkedin.com/in/nivasharma',
                        }}
                    />
                    <CreditsCard
                        name="Niva Sharma"
                        role="Creative Head"
                        bio="Designs UI/UX with emotion. Creates interfaces that speak to users."
                        imageUrl="/notification_icon.png"
                        tags={['design', 'illustration', 'uiux']}
                        photoPosition="right"
                        socialLinks={{
                            github: 'https://github.com/niva',
                            twitter: 'https://twitter.com/nivadesigns',
                            linkedin: 'https://linkedin.com/in/nivasharma',
                        }}
                    />
                    <CreditsCard
                        name="Niva Sharma"
                        role="Creative Head"
                        bio="Designs UI/UX with emotion. Creates interfaces that speak to users."
                        imageUrl="/notification_icon.png"
                        tags={['design', 'illustration', 'uiux']}
                        photoPosition="left"
                        socialLinks={{
                            github: 'https://github.com/niva',
                            twitter: 'https://twitter.com/nivadesigns',
                            linkedin: 'https://linkedin.com/in/nivasharma',
                        }}
                    />
                    <CreditsCard
                        name="Niva Sharma"
                        role="Creative Head"
                        bio="Designs UI/UX with emotion. Creates interfaces that speak to users."
                        imageUrl="/notification_icon.png"
                        tags={['design', 'illustration', 'uiux']}
                        photoPosition="right"
                        socialLinks={{
                            github: 'https://github.com/niva',
                            twitter: 'https://twitter.com/nivadesigns',
                            linkedin: 'https://linkedin.com/in/nivasharma',
                        }}
                    />
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
        </>
    );
}

