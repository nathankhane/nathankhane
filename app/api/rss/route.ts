import Parser from "rss-parser";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const parser = new Parser();
        const feed = await parser.parseURL("https://nathankhane.substack.com/feed");

        const posts = feed.items.map(item => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate
        }));

        return NextResponse.json(posts);
    } catch (error) {
        console.error('RSS fetch error:', error);
        return NextResponse.json([], { status: 500 });
    }
} 