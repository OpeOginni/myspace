// export const dynamic = "force-dynamic"; // Always fetch the latest data
// export const revalidate = 420; // Update the Chache every <n> seconds

interface Post {
  title: string;
  content: string;
  slug: string;
}

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  // This dynamic fetching is used to get data that doesnt change that much
  const posts: Post[] = await fetch("http:/localhost:300/api/content").then(
    (res) => res.json()
  );

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  // deduped
  const posts: Post[] = await fetch("http:/localhost:300/api/content").then(
    (res) => res.json()
  );
  const post = posts.find((post) => post.slug === params.slug)!;
  // we add the ! no-null assertion operator, this tells typescript that we know
  // for sure that there will be data returned
  return (
    <div>
      <h1>{post.title}</h1>
      <h1>{post.content}</h1>
    </div>
  );
}
