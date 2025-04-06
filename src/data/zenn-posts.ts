// Zenn APIのレスポンス型定義
interface ZennApiUser {
  id: number;
  username: string;
  name: string;
  avatar_small_url: string;
}

interface ZennApiArticle {
  id: number;
  post_type: string;
  title: string;
  slug: string;
  published: boolean;
  comments_count: number;
  liked_count: number;
  body_letters_count: number;
  article_type: string;
  emoji: string;
  is_suspending_private: boolean;
  published_at: string;
  body_updated_at: string | null;
  source_repo_updated_at: string | null;
  path: string;
  user: ZennApiUser;
  publication: string | null;
}

interface ZennApiResponse {
  articles: ZennApiArticle[];
}

// Zenn記事のデータ型定義
export interface ZennPost {
  id: string;
  title: string;
  slug: string;
  pubDate: Date;
  url: string;
}

// Zennユーザー名 - 必要に応じて変更可能
const ZENN_USERNAME = 'takumi';

// Zennの記事を取得する関数
export async function getZennPosts(): Promise<ZennPost[]> {
  try {
    // Zenn APIから記事を取得
    const response = await fetch(`https://zenn.dev/api/articles?username=${ZENN_USERNAME}&order=latest`);
    
    if (!response.ok) {
      console.error(`Zenn API request failed: ${response.status}`);
      return getFallbackZennPosts(); // APIが失敗した場合はフォールバックデータを返す
    }
    
    const data = await response.json() as ZennApiResponse;
    
    // APIレスポンスから必要なデータを抽出して整形
    return data.articles.map(article => ({
      id: `zenn-${article.id}`,
      title: article.title,
      slug: article.slug,
      pubDate: new Date(article.published_at),
      url: `https://zenn.dev/${article.user.username}/articles/${article.slug}`
    }));
  } catch (error) {
    console.error('Error fetching Zenn posts:', error);
    return getFallbackZennPosts(); // エラーが発生した場合はフォールバックデータを返す
  }
}

// APIが失敗した場合のフォールバックデータ
function getFallbackZennPosts(): ZennPost[] {
  return [
    {
      id: "zenn-1",
      title: "Astroでブログサイトを作る方法",
      slug: "building-blog-with-astro",
      pubDate: new Date("2025-03-30"),
      url: "https://zenn.dev/takumi/articles/building-blog-with-astro"
    },
    {
      id: "zenn-2",
      title: "TypeScriptの基本と応用テクニック",
      slug: "typescript-basics-and-advanced",
      pubDate: new Date("2025-03-25"),
      url: "https://zenn.dev/takumi/articles/typescript-basics-and-advanced"
    },
    {
      id: "zenn-3",
      title: "フロントエンドのパフォーマンス最適化",
      slug: "frontend-performance-optimization",
      pubDate: new Date("2025-03-20"),
      url: "https://zenn.dev/takumi/articles/frontend-performance-optimization"
    },
    {
      id: "zenn-4",
      title: "ReactとAstroの違いを理解する",
      slug: "understanding-react-and-astro",
      pubDate: new Date("2025-03-15"),
      url: "https://zenn.dev/takumi/articles/understanding-react-and-astro"
    },
    {
      id: "zenn-5",
      title: "CSSの新機能と活用方法",
      slug: "new-css-features",
      pubDate: new Date("2025-03-10"),
      url: "https://zenn.dev/takumi/articles/new-css-features"
    }
  ];
}