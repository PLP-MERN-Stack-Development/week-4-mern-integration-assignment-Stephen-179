import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      const res = await API.get(`/posts/${slug}`);
      setPost(res.data.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line
  }, [slug]);

  if (loading) {
    return <Skeleton className="h-[400px] w-full rounded-xl" />;
  }

  if (!post) {
    return <div className="text-center text-red-500 mt-10">Post not found.</div>;
  }

  return (
    <Card className="max-w-3xl mx-auto my-8 p-4">
      <CardContent>
        <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
        <CardDescription className="mb-4">
          <Badge>{post.category?.name || "Uncategorized"}</Badge>{" "}
          <span className="text-gray-500">| Views: {post.viewCount}</span>
        </CardDescription>

        {post.featuredImage && (
          <img
            src={`http://localhost:5000/uploads/${post.featuredImage}`}
            alt={post.title}
            className="w-full h-auto rounded-lg mb-4"
          />
        )}

        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="mt-4">
          {post.tags && post.tags.map((tag, idx) => (
            <Badge key={idx} variant="secondary" className="mr-1 mb-1">
              #{tag}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-gray-600 mt-4">
          Author: {post.author?.name || "Unknown"}
        </p>
      </CardContent>
    </Card>
  );
}

export default PostDetail;
