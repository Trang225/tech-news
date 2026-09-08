import Link from "next/link";

const categories = [
  "AI",
  "Apple",
  "Google",
  "Microsoft",
  "Smartphone",
  "Security",
  "Science",
];

const latestNews = [
  {
    category: "AI",
    title: "AI assistants are becoming the new interface for the internet",
    time: "2 hours ago",
    slug: "ai-agents",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
  },
  {
    category: "Apple",
    title: "Apple is preparing its next generation of devices",
    time: "4 hours ago",
    slug: "apple",
    image:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=900&q=80",
  },
  {
    category: "Google",
    title: "Google expands its AI ecosystem with new tools",
    time: "6 hours ago",
    slug: "google",
    image:
      "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=900&q=80",
  },
  {
    category: "Security",
    title: "New security threats are changing how companies protect data",
    time: "8 hours ago",
    slug: "security",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80",
  },
];

const trending = [
  {
    title: "The AI race is entering a new phase",
    slug: "ai-agents",
  },
  {
    title: "What comes next for smartphones?",
    slug: "apple",
  },
  {
    title: "Cybersecurity becomes a top priority",
    slug: "security",
  },
  {
    title: "The technology shaping the next decade",
    slug: "google",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07101a] text-white">
      {/* Top bar */}
      <div className="border-b border-white/10 bg-[#050b12] px-6 py-2">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[11px] uppercase tracking-[0.2em] text-slate-500">
          <span>The future of technology</span>
          <span>September 5, 2026</span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07101a]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-black tracking-tight">
            TECH<span className="text-cyan-400">NEWS</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 lg:flex">
            {categories.slice(0, 5).map((category) => (
              <Link
                key={category}
                href={`/?category=${category}`}
                className="transition hover:text-cyan-400"
              >
                {category}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400 sm:block">
              VI / EN
            </button>

            <button className="rounded-full border border-white/10 px-4 py-2 text-sm transition hover:border-cyan-400 hover:text-cyan-400">
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Category bar */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-6 py-4 text-sm text-slate-400">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/?category=${category}`}
              className="whitespace-nowrap transition hover:text-cyan-400"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-8 pt-10">
        <div className="grid gap-6 lg:grid-cols-[1.6fr_0.8fr]">
          <Link
            href="/article/ai-agents"
            className="group relative block min-h-[500px] overflow-hidden rounded-[28px] border border-white/10"
          >
            <img
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=85"
              alt="Artificial intelligence"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            <div className="absolute bottom-0 left-0 max-w-3xl p-8 md:p-10">
              <div className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                Featured · AI
              </div>

              <h1 className="text-4xl font-black leading-tight md:text-6xl">
                The Future of AI Is Moving From Chatbots to Intelligent Agents
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                The next generation of AI is becoming more autonomous,
                proactive, and capable of completing tasks on behalf of users.
              </p>

              <div className="mt-6 text-sm font-semibold text-white">
                Read full story →
              </div>
            </div>
          </Link>

          {/* Trending */}
          <aside className="rounded-[28px] border border-white/10 bg-[#0c131e] p-7">
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              Trending
            </div>

            <h2 className="text-2xl font-bold">What readers are watching</h2>

            <div className="mt-6">
              {trending.map((item, index) => (
                <Link
                  key={item.title}
                  href={`/article/${item.slug}`}
                  className="group flex gap-5 border-b border-white/10 py-6 last:border-0"
                >
                  <span className="text-3xl font-black text-slate-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="font-semibold leading-6 text-slate-200 transition group-hover:text-cyan-400">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs uppercase tracking-wider text-slate-500">
                      Read story →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* Latest News */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              Latest News
            </div>

            <h2 className="mt-2 text-3xl font-black md:text-4xl">
              Fresh from the tech world
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {latestNews.map((news) => (
            <Link
              key={news.slug}
              href={`/article/${news.slug}`}
              className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#0c131e] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
            >
              <div className="overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-cyan-400">
                  <span>{news.category}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-500">{news.time}</span>
                </div>

                <h3 className="mt-4 text-xl font-bold leading-7 text-slate-100 transition group-hover:text-cyan-400">
                  {news.title}
                </h3>

                <div className="mt-5 text-sm font-semibold text-slate-400">
                  Read article →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Editorial */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid overflow-hidden rounded-[28px] border border-white/10 bg-[#0c131e] md:grid-cols-2">
          <div className="p-8 md:p-12">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              Editorial
            </div>

            <h2 className="mt-4 text-3xl font-black md:text-4xl">
              Technology is changing faster than ever.
            </h2>

            <p className="mt-5 leading-8 text-slate-400">
              TECH NEWS brings together the most important stories across AI,
              devices, software, cybersecurity, and science.
            </p>

            <Link
              href="/article/ai-agents"
              className="mt-7 inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-semibold transition hover:border-cyan-400 hover:text-cyan-400"
            >
              Explore technology →
            </Link>
          </div>

          <div className="min-h-[300px]">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85"
              alt="Technology"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[28px] border border-cyan-400/20 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 p-8 text-center md:p-12">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            Newsletter
          </div>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Stay ahead of technology
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Get the most important technology stories delivered to your inbox.
          </p>

          <div className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-cyan-400"
            />

            <button className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-cyan-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm text-slate-500 md:flex-row">
          <div>
            <div className="text-xl font-black text-white">
              TECH<span className="text-cyan-400">NEWS</span>
            </div>

            <p className="mt-2">
              Independent technology news and analysis.
            </p>
          </div>

          <div className="flex gap-6">
            <Link href="/" className="hover:text-cyan-400">
              Home
            </Link>
            <span>VI / EN</span>
          </div>
        </div>
      </footer>
    </main>
  );
}