"use client";

import { useEffect } from "react";

export default function ContentCreationSection() {
    useEffect(() => {
        // Preload TikTok embed script for faster loading
        if (!document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://www.tiktok.com/embed.js';
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        }
    }, []);

    return (
        <div className="space-y-16">
            {/* Content Creation Header */}
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-semibold mt-16">Content Creation</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Exploring creativity, rhythm, and the art of storytelling through short-form content.
                </p>
            </div>

            {/* Latest Insights - Newest TikToks */}
            <div className="space-y-8">
                <div className="text-center">
                    <h3 className="text-2xl font-medium text-foreground mb-2">Latest Insights</h3>
                    <p className="text-muted-foreground">Recent thoughts on creativity and rhythm</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 justify-items-center">
                    <div className="w-full max-w-[400px]">
                        <blockquote
                            className="tiktok-embed"
                            cite="https://www.tiktok.com/@nathankmorales/video/7528959342104694029"
                            data-video-id="7528959342104694029"
                            style={{ minHeight: '600px', maxWidth: '605px', minWidth: '325px' }}
                        >
                            <section>
                                <a target="_blank" title="@nathankmorales" href="https://www.tiktok.com/@nathankmorales?refer=embed">@nathankmorales</a> thinking out loud{" "}
                                <a title="rhythm" target="_blank" href="https://www.tiktok.com/tag/rhythm?refer=embed">#rhythm</a>{" "}
                                <a title="tips" target="_blank" href="https://www.tiktok.com/tag/tips?refer=embed">#tips</a>{" "}
                                <a target="_blank" title="♬ Nights - Frank Ocean" href="https://www.tiktok.com/music/Nights-6730472557637535745?refer=embed">♬ Nights - Frank Ocean</a>
                            </section>
                        </blockquote>
                    </div>

                    <div className="w-full max-w-[400px]">
                        <blockquote
                            className="tiktok-embed"
                            cite="https://www.tiktok.com/@nathankmorales/video/7530832917510098190"
                            data-video-id="7530832917510098190"
                            style={{ minHeight: '600px', maxWidth: '605px', minWidth: '325px' }}
                        >
                            <section>
                                <a target="_blank" title="@nathankmorales" href="https://www.tiktok.com/@nathankmorales?refer=embed">@nathankmorales</a> when do you feel most creative?{" "}
                                <a title="window" target="_blank" href="https://www.tiktok.com/tag/window?refer=embed">#window</a>{" "}
                                <a title="creativity" target="_blank" href="https://www.tiktok.com/tag/creativity?refer=embed">#creativity</a>{" "}
                                <a title="illcallyouback" target="_blank" href="https://www.tiktok.com/tag/illcallyouback?refer=embed">#illcallyouback</a>{" "}
                                <a target="_blank" title="♬ Airplane Mode - Limbo" href="https://www.tiktok.com/music/Airplane-Mode-6763578103957555201?refer=embed">♬ Airplane Mode - Limbo</a>
                            </section>
                        </blockquote>
                    </div>
                </div>
            </div>

            {/* Brand Storytelling - Original TikToks */}
            <div className="space-y-8">
                <div className="text-center">
                    <h3 className="text-2xl font-medium text-foreground mb-2">Brand Storytelling</h3>
                    <p className="text-muted-foreground">Authentic moments and strategic messaging in action</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 xl:gap-12 justify-items-center">
                    <div className="w-full max-w-[400px] lg:max-w-[350px] xl:max-w-[400px]">
                        <blockquote
                            className="tiktok-embed"
                            cite="https://www.tiktok.com/@nathankmorales/video/7499259227735706923"
                            data-video-id="7499259227735706923"
                            style={{ minHeight: '600px' }}
                        >
                            <section>
                                <a target="_blank" title="@nathankmorales" href="https://www.tiktok.com/@nathankmorales?refer=embed">@nathankmorales</a> reminder{" "}
                                <a title="presenceispower" target="_blank" href="https://www.tiktok.com/tag/presenceispower?refer=embed">#presenceispower</a>{" "}
                                <a target="_blank" title="♬ sonido original - Cristian" href="https://www.tiktok.com/music/sonido-original-7299651495773981446?refer=embed">♬ sonido original - Cristian</a>
                            </section>
                        </blockquote>
                    </div>

                    <div className="w-full max-w-[400px] lg:max-w-[350px] xl:max-w-[400px]">
                        <blockquote
                            className="tiktok-embed"
                            cite="https://www.tiktok.com/@nathankmorales/video/7448001294297582890"
                            data-video-id="7448001294297582890"
                            style={{ minHeight: '600px' }}
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

                    <div className="w-full max-w-[400px] lg:max-w-[350px] xl:max-w-[400px]">
                        <blockquote
                            className="tiktok-embed"
                            cite="https://www.tiktok.com/@nathankmorales/video/7456622147159510314"
                            data-video-id="7456622147159510314"
                            style={{ minHeight: '600px' }}
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
            </div>

            {/* YouTube Video */}
            <div className="space-y-8">
                <div className="text-center">
                    <h3 className="text-2xl font-medium text-foreground mb-2">Long-Form Content</h3>
                    <p className="text-muted-foreground">Deep dives and extended conversations</p>
                </div>

                <div className="flex justify-center">
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
        </div>
    );
} 