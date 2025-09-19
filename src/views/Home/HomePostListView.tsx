import { getPostsHome } from "@/API/PostAPI";
import HomePostItem from "@/components/post/HomePostItem";
import { useQuery } from "@tanstack/react-query";

export default function HomePostListView() {
  const { data } = useQuery({
    queryKey: ['homePosts'],
    queryFn: getPostsHome,
    retry: 1
  })

  return (
    <div className="grid lg:grid-cols-2 grid-rows-4 gap-4 my-4 h-[calc(100vh-8rem)] container-blog">
      {data?.map((post, index) => (
        <HomePostItem key={post._id} post={post} index={index} />
      ))}
    </div>
  );
}
