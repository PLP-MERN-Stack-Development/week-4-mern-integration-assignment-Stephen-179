// src/pages/Dashboard.jsx

import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserPosts = async () => {
    try {
      const res = await API.get("/posts/user");
      setPosts(res.data.data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
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

  if (posts.length === 0) {
    return <p className="text-center text-gray-500">You have not created any posts yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Card key={post._id} className="hover:shadow-lg transition duration-300">
          <CardContent>
            <CardTitle className="text-lg font-bold mb-2">{post.title}</CardTitle>
            <CardDescription className="mb-2">{post.excerpt}</CardDescription>
            <Link to={`/post/${post.slug}`} className="text-blue-600 hover:underline">
              View Post
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Dashboard;
