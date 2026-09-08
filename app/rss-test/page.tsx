import { getTechNews } from "@/lib/rss";

export default async function RssTestPage() {
  const news = await getTechNews();

  return (
    <main className="min-h-screen bg-[#07101a] px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-black">
          TECH NEWS — RSS TEST
        </h1>

        <p className="mt-3 text-slate-400">
          Tin lấy trực tiếp từ các nguồn RSS.
        </p>

        <div className="mt-10 space-y-5">
          {news.map((item, index) => (
            <article
              key={`${item.link}-${index}`}
              className="rounded-2xl border border-white/10 bg-[#0c131e] p-6"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                {item.source}
              </div>

              <h2 className="mt-2 text-xl font-bold">
                {item.title}
              </h2>

              <p className="mt-3 leading-7 text-slate-400">
                {item.description}
              </p>

              <div className="mt-4 text-xs text-slate-500">
                {item.publishedAt}
              </div>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  Read original article →
                </a>
              )}
            </article>
          ))}
        </div>

        {news.length === 0 && (
          <div className="mt-10 rounded-2xl border border-red-400/20 bg-red-400/5 p-6 text-red-300">
            Không lấy được tin RSS.
          </div>
        )}
      </div>
    </main>
  );
}