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
      eyebrow: "TECHNOLOGY, CURATED DAILY",
      heading: "30 tin công nghệ đáng chú ý nhất hôm nay.",
      description:
        "Được chọn lọc, xếp hạng và tóm tắt bằng AI để bạn nắm những gì thực sự đáng quan tâm.",
      score: "AI Score",
      readMore: "Xem phân tích",
      footer: "Tin công nghệ được chọn lọc và phân tích bằng AI.",
    },

    en: {
      eyebrow: "TECHNOLOGY, CURATED DAILY",
      heading: "30 technology stories worth knowing today.",
      description:
        "Curated, ranked and summarized with AI so you can focus on what actually matters.",
      score: "AI Score",
      readMore: "Read analysis",
      footer: "Technology news curated and analyzed with AI.",
    },
  }[language];

  return (
    <main className="min-h-screen bg-[#08090b] text-white">
      <div className="mx-auto max-w-[1240px] px-5 pb-16 pt-7 md:px-10 md:pb-24 md:pt-9">

        {/* Header */}
        <header className="flex items-center justify-between pb-8 md:pb-10">
          <Link
            href="/"
            className="text-[22px] font-semibold tracking-[-0.04em] md:text-2xl"
          >
            <span className="text-[#5F8FF7]">TECH</span><span className="text-white/85">NEWS</span>
          </Link>

          <LanguageSwitcher
            language={language}
            onChange={setLanguage}
          />
        </header>

        {/* Intro */}
        <section className="pb-10 pt-8 md:pb-14 md:pt-12">
          <p className="mb-4 text-xs font-medium tracking-[0.22em] text-white/70 md:text-sm">
            {language === "vi"
              ? "TOP 30 CÂU CHUYỆN CÔNG NGHỆ"
              : "TOP 30 TECHNOLOGY STORIES"}
          </p>

          <p className="text-[14px] text-white/45 md:text-[15px]">
            {language === "vi"
              ? "Được chọn và xếp hạng bằng AI"
              : "Selected and ranked with AI"}
          </p>
        </section>

        {/* News list */}
        <section className="border-t border-white/12">
          {articles.map((article, index) => {
            const title =
              language === "vi"
                ? article.titleVi || article.title
                : article.title;

            const description =
              language === "vi"
                ? article.descriptionVi || article.description
                : article.description;

            const isFirst = index === 0;

            return (
              <Link
                key={article.id}
                href={`/article/${article.id}`}
                className="group block border-b border-white/10 transition-colors duration-300 hover:bg-white/[0.025]"
              >
                <article
                  className={`grid gap-5 py-8 md:grid-cols-[76px_minmax(0,1fr)_220px] md:gap-8 md:py-10 ${
                    isFirst
                      ? "md:grid-cols-[76px_minmax(0,1fr)_300px] md:py-12"
                      : ""
                  }`}
                >
                  {/* Rank */}
                  <div className="flex items-start">
                    <span
                      className={`font-medium tabular-nums tracking-[-0.04em] ${
                        isFirst
                          ? "text-4xl text-[#377DFF] md:text-5xl"
                          : "text-3xl text-white/22 md:text-4xl"
                      }`}
                    >
                      {String(article.rank).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="min-w-0">
                    <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-white/35 md:text-sm">
                      <span className="font-medium text-white/65">
                        {article.source}
                      </span>

                      <span className="text-white/20">•</span>

                      <span>
                        {formatDate(article.publishedAt, language)}
                      </span>
                    </div>

                    <h2
                      className={`max-w-4xl font-semibold tracking-[-0.035em] transition-colors duration-300 group-hover:text-[#6EA0FF] ${
                        isFirst
                          ? "text-[30px] leading-[1.12] md:text-[40px] md:leading-[1.08]"
                          : "text-[25px] leading-[1.18] md:text-[31px] md:leading-[1.15]"
                      }`}
                    >
                      {title}
                    </h2>

                    {description && (
                      <p
                        className={`mt-4 max-w-3xl text-white/48 ${
                          isFirst
                            ? "text-[17px] leading-7 md:text-[19px] md:leading-8"
                            : "line-clamp-3 text-[16px] leading-7 md:text-[18px] md:leading-8"
                        }`}
                      >
                        {description}
                      </p>
                    )}

                    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                      <span className="inline-flex items-center gap-2 text-white/40">
                        {text.score}
                        <span className="rounded-full bg-[#377DFF]/12 px-2.5 py-1 font-semibold text-[#72A2FF]">
                          {article.score?.toFixed(1)}
                        </span>
                      </span>

                      <span className="font-medium text-white/45 transition-colors duration-300 group-hover:text-[#6EA0FF]">
                        {text.readMore} →
                      </span>
                    </div>
                  </div>

                  {/* Image */}
                  {article.image && (
                    <div
                      className={`relative order-first overflow-hidden rounded-2xl bg-white/5 md:order-none ${
                        isFirst
                          ? "aspect-[16/10] md:h-[190px]"
                          : "aspect-[16/10] md:h-[150px]"
                      }`}
                    >
                      <img
                        src={article.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                      />

                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
                    </div>
                  )}
                </article>
              </Link>
            );
          })}
        </section>

        {/* Footer */}
        <footer className="pt-14 text-center text-sm text-white/25">
          {text.footer}
        </footer>
      </div>
    </main>
  );
}
