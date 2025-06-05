"use client";

import { useEffect } from "react";

export default function ContentCreationSection() {
    useEffect(() => {
        // Load TikTok embed script
        if (!document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://www.tiktok.com/embed.js';
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <div className="space-y-12">
            {/* Content Creation Section */}
            <h2 className="text-3xl font-semibold mt-16">Content Creation</h2>

            {/* TikTok Videos - 3 side by side */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="flex justify-center">
                    <blockquote
                        className="tiktok-embed"
                        cite="https://www.tiktok.com/@nathankmorales/video/7499259227735706923"
                        data-video-id="7499259227735706923"
                        style={{ maxWidth: "325px", minWidth: "200px" }}
                    >
                        <section>
                            <a target="_blank" title="@nathankmorales" href="https://www.tiktok.com/@nathankmorales?refer=embed">@nathankmorales</a> reminder{" "}
                            <a title="presenceispower" target="_blank" href="https://www.tiktok.com/tag/presenceispower?refer=embed">#presenceispower</a>{" "}
                            <a target="_blank" title="♬ sonido original - Cristian" href="https://www.tiktok.com/music/sonido-original-7299651495773981446?refer=embed">♬ sonido original - Cristian</a>
                        </section>
                    </blockquote>
                </div>

                <div className="flex justify-center">
                    <blockquote
                        className="tiktok-embed"
                        cite="https://www.tiktok.com/@nathankmorales/video/7448001294297582890"
                        data-video-id="7448001294297582890"
                        style={{ maxWidth: "325px", minWidth: "200px" }}
                    >
                        <section>
                            <a target="_blank" title="@nathankmorales" href="https://www.tiktok.com/@nathankmorales?refer=embed">@nathankmorales</a>{" "}
                            <a title="ad" target="_blank" href="https://www.tiktok.com/tag/ad?refer=embed">#ad</a>{" "}
                            <a title="amazonaffiliate" target="_blank" href="https://www.tiktok.com/tag/amazonaffiliate?refer=embed">#amazonaffiliate</a>{" "}
                            <a title="bayarea" target="_blank" href="https://www.tiktok.com/tag/bayarea?refer=embed">#bayarea</a>{" "}
                            <a title="losingbetscanbefun" target="_blank" href="https://www.tiktok.com/tag/losingbetscanbefun?refer=embed">#losingbetscanbefun</a>{" "}
                            <a target="_blank" title="♬ original sound - nate" href="https://www.tiktok.com/music/original-sound-7448001252992076590?refer=embed">♬ original sound - nate</a>
                        </section>
                    </blockquote>
                </div>

                <div className="flex justify-center">
                    <blockquote
                        className="tiktok-embed"
                        cite="https://www.tiktok.com/@nathankmorales/video/7456622147159510314"
                        data-video-id="7456622147159510314"
                        style={{ maxWidth: "325px", minWidth: "200px" }}
                    >
                        <section>
                            <a target="_blank" title="@nathankmorales" href="https://www.tiktok.com/@nathankmorales?refer=embed">@nathankmorales</a>{" "}
                            <a title="santacon" target="_blank" href="https://www.tiktok.com/tag/santacon?refer=embed">#SantaCon</a>{" "}
                            <a title="sanfrancisco" target="_blank" href="https://www.tiktok.com/tag/sanfrancisco?refer=embed">#sanfrancisco</a>{" "}
                            <a target="_blank" title="♬ Rockin&#39; Around The Christmas Tree - Brenda Lee" href="https://www.tiktok.com/music/RockinAround-The-Christmas-Tree-6814378834477975553?refer=embed">♬ Rockin&#39; Around The Christmas Tree - Brenda Lee</a>
                        </section>
                    </blockquote>
                </div>
            </div>

            {/* YouTube Video */}
            <div className="mt-12 flex justify-center">
                <div className="w-full max-w-4xl">
                    <iframe
                        width="100%"
                        height="400"
                        src="https://www.youtube.com/embed/YQvKEsR1Mp4?si=VgY4LgdJM9PeOJ3U&amp;start=136"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
} 