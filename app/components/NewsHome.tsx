"use client";

import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

type Article = {
  rank: number;
  title: string;
  titleVi: string;
  source: string;
  description: string;
  descriptionVi: string;
  publishedAt: string;
  link: string;
  image: string;
  score: number;
};

type Props = {
  articles: Article[];
};

export default function NewsHome({ articles }: Props) {
  const [language, setLanguage] = useState<"vi" | "en">("vi");

  const isVietnamese = language === "vi";

  const hero = articles[0];
  const trending = articles.slice(1, 5);
  const latest = articles.slice(5, 30);

  const text = {
    brand: "TECHNEWS",
    eyebrow: isVietnamese
      ? "TIN CÔNG NGHỆ NỔI BẬT"
      : "TOP TECHNOLOGY NEWS",
    headline: isVietnamese
      ? "Những câu chuyện công nghệ đáng chú ý."
      : "The stories that matter.",
    stories: isVietnamese ? "tin nổi bật" : "stories",
    updated: isVietnamese
      ? "Cập nhật từ các nguồn công nghệ lớn"
      : "Updated from major tech publications",
    trending: isVietnamese ? "Đáng chú ý" : "Trending",
    topStories: isVietnamese ? "Tin nổi bật" : "Top stories",
    latest: isVietnamese ? "Tin mới nhất" : "Latest",
    moreNews: isVietnamese
      ? "Thêm tin công nghệ"
      : "More technology news",
    score: isVietnamese ? "Điểm biên tập" : "Editor score",
    footer: isVietnamese
      ? "Tổng hợp tin công nghệ độc lập"
      : "Independent technology news aggregation",
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-white/10 bg-[#080808]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="text-2xl font-bold tracking-tight">
            TECH<span className="text-cyan-400">NEWS</span>
          </a>

          <div className="flex items-center gap-6">
            <nav className="hidden gap-6 text-sm text-white/70 md:flex">
              <a href="#" className="hover:text-white">AI</a>
              <a href="#" className="hover:text-white">Apple</a>
              <a href="#" className="hover:text-white">Google</a>
              <a href="#" className="hover:text-white">Microsoft</a>
              <a href="#" className="hover:text-white">Security</a>
              <a href="#" className="hover:text-white">Science</a>
            </nav>

            <LanguageSwitcher
              language={language}
              onChange={setLanguage}
            />
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
              {text.eyebrow}
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {text.headline}
            </h1>
          </div>

          <div className="hidden text-right text-sm text-white/40 md:block">
            <div>{articles.length} {text.stories}</div>
            <div>{text.updated}</div>
          </div>
        </div>

        {hero && (
          <a
            href={hero.link}
            target="_blank"
            rel="noreferrer"
            className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/5"
          >
            <div className="grid md:grid-cols-2">
              <div className="aspect-[16/10] overflow-hidden bg-white/5">
                <img
                  src={
                    hero.image ||
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
                  }
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="mb-4 flex items-center gap-3 text-sm">
                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-cyan-400">
                    #{hero.rank}
                  </span>

                  <span className="text-white/50">
                    {hero.source}
                  </span>
                </div>

                <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                  {isVietnamese ? hero.titleVi : hero.title}
                </h2>

                <p className="mt-5 line-clamp-4 text-base leading-7 text-white/60">
                  {isVietnamese
                    ? hero.descriptionVi
                    : hero.description}
                </p>

                <div className="mt-6 text-sm text-white/40">
                  {text.score}: {hero.score.toFixed(1)}
                </div>
              </div>
            </div>
          </a>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{text.trending}</h2>
          <span className="text-sm text-white/40">
            {text.topStories}
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {trending.map((article) => (
            <a
              key={article.link}
              href={article.link}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
            >
              <div className="aspect-[16/10] overflow-hidden bg-white/5">
                <img
                  src={
                    article.image ||
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
                  }
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <div className="mb-3 text-xs text-white/40">
                  #{article.rank} · {article.source}
                </div>

                <h3 className="line-clamp-3 text-lg font-semibold leading-7">
                  {isVietnamese
                    ? article.titleVi
                    : article.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{text.latest}</h2>
          <span className="text-sm text-white/40">
            {text.moreNews}
          </span>
        </div>

        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
          {latest.map((article) => (
            <a
              key={article.link}
              href={article.link}
              target="_blank"
              rel="noreferrer"
              className="group flex gap-5 p-5 transition hover:bg-white/[0.04]"
            >
              <div className="hidden w-32 shrink-0 overflow-hidden rounded-xl bg-white/5 sm:block">
                <img
                  src={
                    article.image ||
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80"
                  }
                  alt=""
                  className="h-full min-h-24 w-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <div className="mb-2 text-xs text-white/40">
                  #{article.rank} · {article.source}
                </div>

                <h3 className="text-lg font-semibold leading-7 group-hover:text-cyan-300">
                  {isVietnamese
                    ? article.titleVi
                    : article.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/50">
                  {isVietnamese
                    ? article.descriptionVi
                    : article.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/30">
        TECHNEWS · {text.footer}
      </footer>
    </main>
  );
}
