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
        <section className="mx-auto max-w-3xl space-y-8">
            <h1 className="text-4xl font-bold">Business ≡ Poetry</h1>
            {posts.map((post: RSSItem) => (
                <a
                    key={post.link}
                    href={post.link}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="text-sm opacity-70">{post.pubDate}</p>
                    <p className="mt-2">{post.contentSnippet}</p>
                </a>
            ))}
        </section>
    );
} 