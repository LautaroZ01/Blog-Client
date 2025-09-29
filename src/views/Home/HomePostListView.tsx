import { getPostsHome } from "@/API/PostAPI";
import HomePostItem from "@/components/post/HomePostItem";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function HomePostListView() {
  const { data } = useQuery({
    queryKey: ['homePosts'],
    queryFn: getPostsHome,
    retry: 1
  })

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-4 gap-4 my-4 min-h-[calc(100vh-8rem)] container-blog" id="posts">
        {data?.map((post, index) => (
          <HomePostItem key={post._id} post={post} index={index} />
        ))}
      </section>
      <div className="flex justify-center my-10">
        <Link to={'/post'} className="btn-primary">Ver todos los posts</Link>
      </div>
    </>
  );
}
