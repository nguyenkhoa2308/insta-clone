import { posts } from "~/lib/data";
import StoryBar from "~/app/(main)/components/feed/StoryBar";
import PostCard from "~/app/(main)/components/feed/PostCard";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <StoryBar />
      <div className="flex flex-col gap-6 max-w-[560px] w-full">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
