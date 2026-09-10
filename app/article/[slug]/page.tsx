import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsArticleById } from "@/lib/supabase-news";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(date: string | null) {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "";

  return parsed.toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const id = Number(slug);

  if (!Number.isInteger(id)) {
    notFound();
  }

  let article;

  try {
    article = await getNewsArticleById(id);
  } catch {
    notFound();
  }

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <div className="mx-auto max-w-4xl px-5 py-8 md:px-8 md:py-12">
        <header className="mb-12 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            TECH<span className="text-white/40">NEWS</span>
          </Link>

          <Link
            href="/"
            className="text-sm text-white/40 transition-colors hover:text-white"
          >
            ← Về trang chủ
          </Link>
        </header>

        <article>
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-white/40">
            <span className="font-medium text-white/65">
              {article.source}
            </span>

            <span>•</span>

            <span>{formatDate(article.published_at)}</span>

            {article.score !== null && (
              <>
                <span>•</span>
                <span>
                  Điểm{" "}
                  <strong className="text-white/70">
                    {Number(article.score).toFixed(1)}
                  </strong>
                </span>
              </>
            )}
          </div>

          <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            {article.title_vi}
          </h1>

          {article.image && (
            <div className="mt-8 overflow-hidden rounded-xl bg-white/5">
              <img
                src={article.image}
                alt=""
                className="max-h-[520px] w-full object-cover"
              />
            </div>
          )}

          <section className="mt-10">
            <h2 className="mb-4 text-lg font-semibold">
              Tóm tắt bài viết
            </h2>

            <p className="text-base leading-8 text-white/65 md:text-lg">
              {article.summary_vi || article.description_vi}
            </p>
          </section>

          {article.analysis_vi && (
            <section className="mt-10 rounded-xl border border-white/10 bg-white/[0.025] p-6 md:p-8">
              <h2 className="mb-4 text-lg font-semibold">
                Vì sao đáng chú ý?
              </h2>

              <p className="leading-8 text-white/65 md:text-lg">
                {article.analysis_vi}
              </p>
            </section>
          )}

          <div className="mt-10 border-t border-white/10 pt-8">
            <p className="mb-4 text-sm text-white/35">
              Bài viết gốc từ {article.source}
            </p>

            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-opacity hover:opacity-80"
            >
              Đọc bài gốc →
            </a>
          </div>
        </article>

        <footer className="py-12 text-center text-xs text-white/25">
          TECHNEWS — Tổng hợp và phân tích tin công nghệ độc lập
        </footer>
      </div>
    </main>
  );
}
