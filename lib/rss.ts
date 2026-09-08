import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: [
      ["media:content", "mediaContent"],
      ["media:thumbnail", "mediaThumbnail"],
      ["enclosure", "enclosure"],
    ],
  },
});

const RSS_FEEDS = [
  {
    name: "TechCrunch",
    url: "https://techcrunch.com/feed/",
  },
  {
    name: "The Verge",
    url: "https://www.theverge.com/rss/index.xml",
  },
  {
    name: "Ars Technica",
    url: "https://feeds.arstechnica.com/arstechnica/index",
  },
  {
    name: "WIRED",
    url: "https://www.wired.com/feed/rss",
  },
  {
    name: "Engadget",
    url: "https://www.engadget.com/rss.xml",
  },
  {
    name: "TechRadar",
    url: "https://www.techradar.com/rss",
  },
  {
    name: "CNET",
    url: "https://www.cnet.com/rss/news/",
  },
  {
    name: "ZDNET",
    url: "https://www.zdnet.com/news/rss.xml",
  },
  {
    name: "Tom's Hardware",
    url: "https://www.tomshardware.com/feeds/all",
  },
  {
    name: "VentureBeat",
    url: "https://venturebeat.com/feed/",
  },
];

export type NewsItem = {
  source: string;
  title: string;
  link: string;
  description: string;
  publishedAt: string;
  image: string;
};

const TECH_KEYWORDS = [
  "ai",
  "artificial intelligence",
  "machine learning",
  "openai",
  "chatgpt",
  "gemini",
  "anthropic",
  "claude",
  "copilot",
  "robot",
  "robotics",
  "technology",
  "tech",
  "software",
  "hardware",
  "computer",
  "laptop",
  "desktop",
  "cpu",
  "gpu",
  "chip",
  "semiconductor",
  "processor",
  "nvidia",
  "amd",
  "intel",
  "apple",
  "iphone",
  "ipad",
  "macbook",
  "android",
  "smartphone",
  "samsung",
  "google",
  "microsoft",
  "windows",
  "cybersecurity",
  "security",
  "hack",
  "hacker",
  "malware",
  "ransomware",
  "privacy",
  "internet",
  "web",
  "browser",
  "cloud",
  "aws",
  "azure",
  "startup",
  "startups",
  "venture",
  "gadget",
  "gadgets",
  "wearable",
  "smartwatch",
  "electric vehicle",
  "ev",
  "autonomous",
  "space",
  "nasa",
  "satellite",
  "quantum",
  "gaming",
  "video game",
  "console",
];

const NON_TECH_KEYWORDS = [
  "football",
  "soccer",
  "basketball",
  "baseball",
  "tennis",
  "golf",
  "rugby",
  "cricket",
  "afl",
  "nfl",
  "nba",
  "mlb",
  "nhl",
  "premier league",
  "champions league",
  "recipe",
  "cooking",
  "dishwasher",
  "vacuum cleaner",
  "washing machine",
  "mattress",
  "furniture",
  "fashion",
  "beauty",
  "makeup",
  "celebrity",
  "movie review",
  "tv review",
  "reality tv",
];

const LOW_NEWS_VALUE_KEYWORDS = [
  "review",
  "hands-on",
  "first impressions",
  "how to",
  "how-to",
  "tutorial",
  "buying guide",
  "deals",
  "deal:",
  "coupon",
  "discount",
  "gift guide",
  "tips",
  "watch live",
  "podcast",
  "quiz",
  "best ",
  "vs.",
  "versus",
  "comparison",
];

const ENTERTAINMENT_KEYWORDS = [
  "movie",
  "movies",
  "film",
  "films",
  "tv show",
  "tv series",
  "television series",
  "actor",
  "actress",
  "celebrity",
  "hollywood",
  "netflix",
  "disney",
  "marvel",
  "dc universe",
  "kickstarter",
  "crowdfunding",
];

const MINOR_UPDATE_KEYWORDS = [
  "quietly adds",
  "quietly added",
  "small update",
  "minor update",
  "new icon",
  "new emoji",
  "new wallpaper",
  "bug fix",
  "bug fixes",
  "maintenance update",
  "rolling out to some users",
];

const IMPORTANT_KEYWORDS = [
  "launch",
  "launched",
  "launches",
  "announces",
  "announced",
  "unveils",
  "unveiled",
  "introduces",
  "introduced",
  "acquires",
  "acquisition",
  "funding",
  "raises",
  "valuation",
  "lawsuit",
  "ban",
  "banned",
  "breach",
  "hack",
  "hacked",
  "attack",
  "cyberattack",
  "ransomware",
  "security flaw",
  "vulnerability",
  "outage",
  "shutdown",
  "investigation",
  "regulator",
  "regulation",
  "government",
  "policy",
  "chip",
  "semiconductor",
  "nvidia",
  "openai",
  "google",
  "apple",
  "microsoft",
  "meta",
  "amazon",
  "anthropic",
  "robotics",
  "robotaxi",
];

function normalizeTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isTechNews(item: NewsItem) {
  const text = `${item.title} ${item.description}`.toLowerCase();

  const hasNonTechKeyword = NON_TECH_KEYWORDS.some((keyword) =>
    text.includes(keyword)
  );

  if (hasNonTechKeyword) {
    return false;
  }

  return TECH_KEYWORDS.some((keyword) => text.includes(keyword));
}

function isNewsWorthKeeping(item: NewsItem) {
  const title = item.title.toLowerCase();

  const isLowValue = LOW_NEWS_VALUE_KEYWORDS.some((keyword) =>
    title.includes(keyword)
  );

  if (isLowValue) {
    return false;
  }

  const isEntertainment = ENTERTAINMENT_KEYWORDS.some((keyword) =>
    title.includes(keyword)
  );

  if (isEntertainment) {
    return false;
  }

  const isMinorUpdate = MINOR_UPDATE_KEYWORDS.some((keyword) =>
    title.includes(keyword)
  );

  if (isMinorUpdate) {
    return false;
  }

  return true;
}

function isRecentNews(item: NewsItem) {
  if (!item.publishedAt) {
    return false;
  }

  const publishedTime = new Date(item.publishedAt).getTime();

  if (Number.isNaN(publishedTime)) {
    return false;
  }

  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;

  return now - publishedTime <= sevenDays;
}

function titleSimilarity(a: string, b: string) {
  const wordsA = new Set(normalizeTitle(a).split(" ").filter(Boolean));
  const wordsB = new Set(normalizeTitle(b).split(" ").filter(Boolean));

  if (wordsA.size === 0 || wordsB.size === 0) {
    return 0;
  }

  let intersection = 0;

  for (const word of wordsA) {
    if (wordsB.has(word)) {
      intersection++;
    }
  }

  const union = new Set([...wordsA, ...wordsB]).size;

  return intersection / union;
}

function removeSimilarTitles(items: NewsItem[]) {
  const result: NewsItem[] = [];

  for (const item of items) {
    const isDuplicate = result.some(
      (existing) => titleSimilarity(existing.title, item.title) >= 0.75
    );

    if (!isDuplicate) {
      result.push(item);
    }
  }

  return result;
}

function calculatePreScore(item: NewsItem) {
  const text = `${item.title} ${item.description}`.toLowerCase();

  let score = 0;

  const importantMatches = IMPORTANT_KEYWORDS.filter((keyword) =>
    text.includes(keyword)
  ).length;

  score += Math.min(importantMatches * 2, 10);

  const hoursSincePublication =
    (Date.now() - new Date(item.publishedAt).getTime()) /
    (1000 * 60 * 60);

  if (hoursSincePublication <= 12) {
    score += 6;
  } else if (hoursSincePublication <= 24) {
    score += 5;
  } else if (hoursSincePublication <= 48) {
    score += 4;
  } else if (hoursSincePublication <= 72) {
    score += 3;
  } else {
    score += 1;
  }

  return score;
}

export async function getTechNews(): Promise<NewsItem[]> {
  const results: NewsItem[] = [];

  for (const feed of RSS_FEEDS) {
    try {
      console.log(`Fetching RSS: ${feed.name}`);

      const data = await parser.parseURL(feed.url);

      for (const item of data.items.slice(0, 20)) {
        const mediaContent = item.mediaContent as
          | { $?: { url?: string }; url?: string }
          | undefined;

        const mediaThumbnail = item.mediaThumbnail as
          | { $?: { url?: string }; url?: string }
          | undefined;

        const image =
          item.enclosure?.url ||
          mediaContent?.$?.url ||
          mediaContent?.url ||
          mediaThumbnail?.$?.url ||
          mediaThumbnail?.url ||
          "";

        results.push({
          source: feed.name,
          title: item.title?.trim() ?? "",
          link: item.link?.trim() ?? "",
          description:
            item.contentSnippet?.trim() ??
            item.content?.trim() ??
            "",
          publishedAt: item.isoDate ?? item.pubDate ?? "",
          image,
        });
      }
    } catch (error) {
      console.error(`RSS error from ${feed.name}:`, error);
    }
  }

  // 1. Dữ liệu hợp lệ
  const validNews = results.filter(
    (item) => item.title !== "" && item.link !== ""
  );

  // 2. Tin liên quan đến công nghệ
  const techNews = validNews.filter(isTechNews);

  // 3. Loại review, how-to, deals, giải trí và cập nhật nhỏ
  const newsWorthKeeping = techNews.filter(isNewsWorthKeeping);

  // 4. Chỉ giữ tin trong 7 ngày
  const recentNews = newsWorthKeeping.filter(isRecentNews);

  // 5. Loại trùng link
  const uniqueByLink = recentNews.filter(
    (item, index, self) =>
      index === self.findIndex((news) => news.link === item.link)
  );

  // 6. Ưu tiên tin quan trọng + mới
  const preScoredNews = uniqueByLink
    .map((item) => ({
      item,
      preScore: calculatePreScore(item),
    }))
    .sort((a, b) => b.preScore - a.preScore)
    .map(({ item }) => item);

  // 7. Loại các tiêu đề gần giống nhau
  const uniqueNews = removeSimilarTitles(preScoredNews);

  // 8. Chỉ đưa tối đa 60 ứng viên tốt nhất cho Gemini
  const candidates = uniqueNews.slice(0, 60);

  console.log(`Total RSS articles: ${results.length}`);
  console.log(`After tech filter: ${techNews.length}`);
  console.log(`After news-value filter: ${newsWorthKeeping.length}`);
  console.log(`After 7-day filter: ${recentNews.length}`);
  console.log(`After duplicate filter: ${uniqueNews.length}`);
  console.log(`Gemini candidates: ${candidates.length}`);

  return candidates;
}