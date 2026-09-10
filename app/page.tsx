import { getNewsFromSupabase } from "@/lib/supabase-news";

import NewsHome from "./components/NewsHome";

export default async function Home() {
  const news = await getNewsFromSupabase();

  const articles = news.map((article, index) => ({
    id: article.id,
    rank: index + 1,
    title: article.title,
    titleVi: article.title_vi,
    source: article.source,
    description: article.description ?? "",
    descriptionVi: article.description_vi ?? "",
    publishedAt: article.published_at ?? "",
    link: article.link,
    image: article.image ?? "",
    score: article.score ?? 0,
  }));

  return <NewsHome articles={articles} />;
}
