import Parser from "rss-parser";

export const metadata = { title: "Business ≡ Poetry – Blog" };

interface RSSItem {
    title?: string;
    link?: string;
    pubDate?: string;
    contentSnippet?: string;
}

export default async function Blog() {
    const parser = new Parser();
    const feed = await parser.parseURL("https://nathankhane.substack.com/feed");
    const posts = feed.items.slice(0, 10);

    return (
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
            <section className="space-y-6 sm:space-y-8">
                <h1 className="text-3xl sm:text-4xl font-bold">Business ≡ Poetry</h1>
                <div className="space-y-4">
                    {posts.map((post: RSSItem) => (
                        <a
                            key={post.link}
                            href={post.link}
                            target="_blank"
                            rel="noreferrer"
                            className="block p-4 sm:p-6 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 hover:scale-[1.02]"
                        >
                            <h2 className="text-lg sm:text-xl font-semibold leading-tight">{post.title}</h2>
                            <p className="text-sm opacity-70 mt-1">{post.pubDate}</p>
                            <p className="mt-2 text-sm sm:text-base leading-relaxed opacity-80">{post.contentSnippet}</p>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
} 