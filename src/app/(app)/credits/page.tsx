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
                        name="6229 Suyog"
                        role="The Main Programmer"
                        bio="I'm Suyog Prasai—just a student with Wi-Fi, a vision, and too much caffeine. I built Parewa to turn boring school notices into something you'd actually want to read. Code is my canvas, and clean UI is my love language. Let’s just say—I debug for fun."
                        imageUrl="/team/Suyog.jpg"
                        tags={['design', 'logic', 'vibecoder']}
                        photoPosition="left"
                        socialLinks={{
                            github: 'https://github.com/suyogprasai',
                            linkedin: 'https://www.linkedin.com/in/suyogprasai/',
                        }}
                    />
                    <CreditsCard
                        name="6202 Shreya"
                        role="Creative Head"
                        bio="A proactive and committed member of the Parewa team, known for her reliability, initiative, and strong sense of responsibility. She consistently meets deadlines, communicates effectively, and contributes meaningfully to team goals. Shreya maintains a positive working relationship with peers and coordinators, often stepping up to support tasks beyond her role. Her performance reflects a high level of trustworthiness and dedication to the team's mission. "
                        imageUrl="/team/Shreya.png"
                        tags={['design', 'illustration', 'uiux']}
                        photoPosition="right"
                        socialLinks={{
                            linkedin: 'https://www.linkedin.com/in/shreya-paudel202/',
                            instagram: 'https://www.instagram.com/shrewaaaaah/',
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

