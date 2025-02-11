import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const articles = [
    {
        title: "A Forensics Company Tells Cops It Can Use DNA to Predict a Suspect’s Face",
        subtitle: "Scientists worry the tool will deepen racial bias.",
        author: "Jordan Smith",
        image: "/carousel_background_2.jpg",
        link: "/article/forensics-dna",
    },
    {
        title: "Trans Women in Federal Custody Face the Terror of Being Transferred to Men’s Prisons",
        author: "Shawn Musgrave",
        image: "/carousel_background_2.jpg",
        link: "/article/trans-women-custody",
    },
    {
        title: "The War on Immigrants: They Flee Russia as Dissidents Seeking Asylum.",
        author: "Diana Kruzman",
        image: "/carousel_background_2.jpg",
        link: "/article/war-on-immigrants",
    },
    {
        title: "Trump’s Anti-Trans Executive Order Is Unscientific Nonsense",
        author: "Natasha Lennard",
        image: "/carousel_background_2.jpg",
        link: "/article/trump-anti-trans",
    },
];

export default function ArticlesSection() {
    return (
        <section className="container mx-auto my-10 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6 md:text-3xl text-gray-900">
                Justice
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Article */}
                <MainArticleCard article={articles[0]} />

                {/* Side Articles */}
                <div className="flex flex-col gap-6 md:col-span-1">
                    {articles.slice(1).map((article) => (
                        <SideArticleCard key={article.link} article={article} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function MainArticleCard({ article }) {
    return (
        <article className="md:col-span-2">
            <Card className="h-full hover:shadow-lg transition-shadow duration-200 rounded-lg overflow-hidden">
                <Link href={article.link} className="block relative h-56 md:h-72 lg:h-80">
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 67vw, 50vw"
                        className="object-cover rounded-t-lg"
                        priority
                    />
                </Link>
                <CardContent className="p-6 bg-white">
                    <h3 className="text-lg font-bold mb-2 md:text-xl">
                        <Link href={article.link} className="hover:text-blue-600 transition-colors duration-200">
                            {article.title}
                        </Link>
                    </h3>
                    {article.subtitle && (
                        <p className="text-sm text-gray-600 mb-2">{article.subtitle}</p>
                    )}
                    <span className="text-blue-600 text-sm font-medium">{article.author}</span>
                </CardContent>
            </Card>
        </article>
    );
}

function SideArticleCard({ article }) {
    return (
        <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-200 rounded-lg">
            <Link href={article.link} className="flex flex-col md:flex-row h-full">
                <div className="relative w-full  md:w-40 flex-shrink-0">
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <CardContent className="p-4 flex-1 bg-white">
                    <h3 className="text-sm font-bold mb-2 hover:text-blue-600 transition-colors duration-200">
                        {article.title}
                    </h3>
                    <span className="text-blue-600 text-xs font-medium">{article.author}</span>
                </CardContent>
            </Link>
        </Card>
    );
}
