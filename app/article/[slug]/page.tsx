import Link from "next/link";

type Article = {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
};

const articles: Record<string, Article> = {
  "ai-agents": {
    category: "AI",
    title: "The Future of AI Is Moving From Chatbots to Intelligent Agents",
    excerpt:
      "AI is evolving beyond simple conversations. The next generation of systems can understand goals, plan tasks, and take action.",
    date: "September 5, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=85",
    content: [
      "Artificial intelligence is entering a new phase. Instead of simply responding to questions, modern AI systems are increasingly designed to understand goals and complete tasks.",
      "This shift is moving the technology from chatbots toward intelligent agents that can reason through multiple steps, use software tools, and interact with digital services.",
      "For users, the biggest change may be that AI becomes less like a search box and more like a digital assistant that can actually get things done.",
      "Companies are also exploring how these systems can automate research, customer support, software development, data analysis, and many other workflows.",
      "The technology is still developing, but intelligent agents could become one of the most important interfaces between people and computers over the next few years.",
    ],
  },

  apple: {
    category: "Apple",
    title: "Apple Is Preparing Its Next Generation of Devices",
    excerpt:
      "Apple continues to develop new hardware and software experiences designed to make technology more personal and intelligent.",
    date: "September 5, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1600&q=85",
    content: [
      "Apple's product ecosystem continues to evolve as the company combines new hardware capabilities with increasingly intelligent software.",
      "The next generation of devices is expected to focus heavily on performance, efficiency, and deeper integration between products.",
      "For users, this could mean smoother experiences across phones, computers, tablets, and other devices.",
      "Apple's long-term strategy increasingly depends on making its ecosystem feel connected while keeping the experience simple.",
      "The result could be a new generation of personal technology that feels more adaptive and useful in everyday life.",
    ],
  },

  google: {
    category: "Google",
    title: "Google Expands Its AI Ecosystem With New Tools",
    excerpt:
      "Google is continuing to integrate artificial intelligence across search, productivity, software, and consumer services.",
    date: "September 5, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=1600&q=85",
    content: [
      "Google is expanding the role of artificial intelligence across its products and services.",
      "The company is combining AI with search, productivity tools, cloud services, and consumer applications.",
      "One of the biggest opportunities is helping users find information and complete tasks with fewer steps.",
      "As AI becomes more deeply integrated into everyday software, competition between major technology companies is becoming increasingly intense.",
      "Google's ecosystem gives it a significant advantage because AI can be connected across many different services.",
    ],
  },

  security: {
    category: "Security",
    title: "New Security Threats Are Changing How Companies Protect Data",
    excerpt:
      "As technology becomes more connected, organizations are facing a rapidly changing cybersecurity landscape.",
    date: "September 5, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1600&q=85",
    content: [
      "Cybersecurity has become one of the most important challenges facing modern organizations.",
      "Companies now have to protect cloud systems, remote workers, connected devices, applications, and increasingly sophisticated AI systems.",
      "Security teams are responding by using automation and artificial intelligence to identify suspicious activity faster.",
      "At the same time, attackers are also using new technologies to create more convincing and sophisticated attacks.",
      "The future of cybersecurity will depend on continuous monitoring, strong security practices, and rapid responses to new threats.",
    ],
  },
};

const related = [
  {
    slug: "ai-agents",
    title: "The Future of AI Is Moving From Chatbots to Intelligent Agents",
  },
  {
    slug: "apple",
    title: "Apple Is Preparing Its Next Generation of Devices",
  },
  {
    slug: "google",
    title: "Google Expands Its AI Ecosystem With New Tools",
  },
  {
    slug: "security",
    title: "New Security Threats Are Changing How Companies Protect Data",
  },
];

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    return (
      <main className="min-h-screen bg-[#07101a] px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
            TECH NEWS
          </p>

          <h1 className="text-4xl font-bold">Article not found</h1>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-cyan-400 px-6 py-3 font-semibold text-black"
          >
            Back to homepage
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07101a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07101a]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-black tracking-tight">
            TECH<span className="text-cyan-400">NEWS</span>
          </Link>

          <nav className="hidden gap-7 text-sm font-medium text-slate-300 md:flex">
            <Link href="/" className="transition hover:text-cyan-400">
              Home
            </Link>
            <Link href="/?category=AI" className="transition hover:text-cyan-400">
              AI
            </Link>
            <Link href="/?category=Apple" className="transition hover:text-cyan-400">
              Apple
            </Link>
            <Link href="/?category=Google" className="transition hover:text-cyan-400">
              Google
            </Link>
            <Link
              href="/?category=Security"
              className="transition hover:text-cyan-400"
            >
              Security
            </Link>
          </nav>

          <div className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-slate-300">
            VI / EN
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <Link
              href="/"
              className="text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              ← Back to TECH NEWS
            </Link>

            <div className="mt-8 max-w-4xl">
              <div className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
                {article.category}
              </div>

              <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
                {article.title}
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-400">
                {article.excerpt}
              </p>

              <div className="mt-7 flex flex-wrap gap-4 text-sm text-slate-500">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
                <span>•</span>
                <span>TECH NEWS Editorial</span>
              </div>
            </div>

            <div className="mt-10 overflow-hidden rounded-[28px] border border-white/10">
              <img
                src={article.image}
                alt={article.title}
                className="h-[300px] w-full object-cover md:h-[500px]"
              />
            </div>

            <div className="mt-10 max-w-3xl">
              {article.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-7 text-lg leading-9 text-slate-300"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Related stories */}
          <aside className="lg:pt-24">
            <div className="sticky top-28 rounded-3xl border border-white/10 bg-[#0c131e] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                Related Stories
              </p>

              <div className="mt-5 divide-y divide-white/10">
                {related
                  .filter((item) => item.slug !== slug)
                  .map((item) => (
                    <Link
                      key={item.slug}
                      href={`/article/${item.slug}`}
                      className="block py-5 first:pt-0 last:pb-0"
                    >
                      <p className="text-sm font-semibold leading-6 text-slate-200 transition hover:text-cyan-400">
                        {item.title}
                      </p>
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm text-slate-500 md:flex-row">
          <p>© 2026 TECH NEWS</p>

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