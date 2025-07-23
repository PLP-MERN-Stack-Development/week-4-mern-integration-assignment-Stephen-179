import { useEffect, useState } from "react";
import API from "../api/axios";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Skeleton key={idx} className="h-40 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Card key={post._id} className="hover:shadow-lg transition duration-300">
          <CardContent>
            <CardTitle className="text-lg font-bold mb-2">{post.title}</CardTitle>
            <CardDescription className="mb-2">{post.excerpt}</CardDescription>
            <Link to={`/post/${post.slug}`} className="text-blue-600 hover:underline">
              Read More
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Home;
