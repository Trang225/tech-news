"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

type Language = "vi" | "en";

type Article = {
  id: number;
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

function formatDate(date: string, language: Language) {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "";

  return parsed.toLocaleDateString(
    language === "vi" ? "vi-VN" : "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

export default function NewsHome({ articles }: Props) {
  const [language, setLanguage] = useState<Language>("vi");

  const text = {
    vi: {
      eyebrow: "TOP 30 CÂU CHUYỆN CÔNG NGHỆ",
      updated: "Được chọn và xếp hạng bằng AI",
      score: "Điểm",
      readMore: "Xem phân tích →",
      footer: "Tổng hợp và phân tích tin công nghệ độc lập",
    },
    en: {
      eyebrow: "TOP 30 TECHNOLOGY STORIES",
      updated: "Selected and ranked with AI",
      score: "Score",
      readMore: "Read analysis →",
      footer: "Independent technology news aggregation and analysis",
    },
  }[language];

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
        {/* Header */}
        <header className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            TECH<span className="text-white/40">NEWS</span>
          </Link>

          <LanguageSwitcher
            language={language}
            onChange={setLanguage}
          />
        </header>

        {/* Intro */}
        <section className="mb-8">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] text-white/40">
            {text.eyebrow}
          </p>

          <p className="text-sm text-white/45">
            {text.updated}
          </p>
        </section>

        {/* News list */}
        <section className="border-t border-white/10">
          {articles.map((article, index) => {
            const title =
              language === "vi"
                ? article.titleVi
                : article.title;

            const description =
              language === "vi"
                ? article.descriptionVi
                : article.description;

            const isFirst = index === 0;

            return (
              <Link
                key={article.id}
                href={`/article/${article.id}`}
                className="group block border-b border-white/10 py-6 transition-colors hover:bg-white/[0.025] md:py-7"
              >
                <article className="flex gap-5 md:gap-8">
                  {/* Rank */}
                  <div className="w-8 shrink-0 pt-1 text-sm tabular-nums text-white/30 md:w-10">
                    #{article.rank}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/35">
                      <span className="font-medium text-white/55">
                        {article.source}
                      </span>

                      <span>•</span>

                      <span>
                        {formatDate(article.publishedAt, language)}
                      </span>
                    </div>

                    <h2
                      className={`max-w-3xl font-semibold tracking-tight transition-colors group-hover:text-white/80 ${
                        isFirst
                          ? "text-2xl leading-tight md:text-3xl"
                          : "text-lg leading-snug md:text-xl"
                      }`}
                    >
                      {title}
                    </h2>

                    {description && (
                      <p
                        className={`mt-2 max-w-3xl leading-relaxed text-white/45 ${
                          isFirst
                            ? "text-sm md:text-base"
                            : "line-clamp-2 text-sm"
                        }`}
                      >
                        {description}
                      </p>
                    )}

                    <div className="mt-4 flex items-center gap-4 text-xs">
                      <span className="text-white/35">
                        {text.score}{" "}
                        <span className="font-semibold text-white/65">
                          {article.score?.toFixed(1)}
                        </span>
                      </span>

                      <span className="text-white/35 transition-colors group-hover:text-white/70">
                        {text.readMore}
                      </span>
                    </div>
                  </div>

                  {/* Image */}
                  {article.image && (
                    <div
                      className={`relative shrink-0 overflow-hidden rounded-lg bg-white/5 ${
                        isFirst
                          ? "h-32 w-44 md:h-40 md:w-60"
                          : "h-24 w-32 md:h-28 md:w-44"
                      }`}
                    >
                      <img
                        src={article.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                </article>
              </Link>
            );
          })}
        </section>

        {/* Footer */}
        <footer className="py-10 text-center text-xs text-white/25">
          {text.footer}
        </footer>
      </div>
    </main>
  );
}
