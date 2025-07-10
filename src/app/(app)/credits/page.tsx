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
                        bio="I'm Suyog Prasai—just a student with Wi-Fi, a vision, and too much caffeine. I built Parewa to turn boring school notices into something you'd actually want to read. Let’s just say—I debug for fun."
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
                        bio="Handles both documentation and social media at Parewa with consistency and creativity. From drafting clear content to managing engaging posts, she ensures timely delivery and maintains quality. A dependable contributor who supports the team’s communication efforts while aligning with Parewa’s voice and goals."
                        imageUrl="/team/Shreya.png"
                        tags={['design', 'illustration', 'uiux']}
                        photoPosition="right"
                        socialLinks={{
                            linkedin: 'https://www.linkedin.com/in/shreya-paudel202/',
                            instagram: 'https://www.instagram.com/shrewaaaaah/',
                        }}
                    />
                    <CreditsCard
                        name="6223 Adish"
                        role="Video Logistics"
                        bio="A valuable helper since the initial stages of development of Parewa.  A well-rounded spokesperson who is always there for any sorts of presentation to support the project. From documentation to Wordpress UI to new ideas, truly a reliable person, you can lean back on."
                        imageUrl="/team/Adish.jpg"
                        tags={['video', 'youtube', 'uiux']}
                        photoPosition="left"
                        socialLinks={{
                            github: 'https://github.com/Valorant-rocks',
                            linkedin: 'https://www.linkedin.com/in/adish-uprety-a3b081304/',
                            instagram: 'https://www.instagram.com/disw__/',
                        }}
                    />
                    <CreditsCard
                        name="6199 Anjelita"
                        role="Creative Head"
                        bio="Anjelita actively contributed to the Parewa project by supporting the documentation process. She prepared and refined clear, user-friendly materials explaining the software’s features and usage. Through this collaboration with Class 12 students, she enhanced her communication skills and gained valuable insight into software development and teamwork."
                        imageUrl="/team/Angelita.jpg"
                        tags={['design', 'illustration', 'uiux']}
                        photoPosition="right"
                        socialLinks={{
                           instagram: 'https://www.instagram.com/sparkles7_spring/'
                        }}
                    />
                    <CreditsCard
                        name="6234 Niva"
                        role="HeadDesigner"
                        bio="A design contributor at Parewa, Niva has played a key role in shaping the team’s visual identity. She designed the official Parewa logo and continues to support the team with thoughtful and consistent design work. With a keen eye for detail and a strong sense of visual balance, she contributes to creating materials that align with Parewa’s creative vision."
                        imageUrl="/team/Niva.jpeg"
                        tags={['design', 'illustration', 'uiux']}
                        photoPosition="left"
                        socialLinks={{
                            instagram: 'https://www.instagram.com/nivaaaa__/',
                        }}
                    />
                    <CreditsCard
                        name="XXXX Nigma"
                        role="Creative Head"
                        bio="Created the custom loading animation for the app and contributed creative feedback to enhance its visual appeal and user experience."
                        imageUrl="/team/Nigma.jpeg"
                        tags={['design', 'illustration', 'uiux']}
                        photoPosition="right"
                        socialLinks={{
                            instagram: 'https://www.instagram.com/ningchiling',
                        }}
                    />
                </div>
            </div>
        </>
    );
}

