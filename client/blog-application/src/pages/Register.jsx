// src/pages/CreatePost.jsx

import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function CreatePost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("excerpt", formData.excerpt);
      data.append("content", formData.content);
      if (formData.image) {
        data.append("image", formData.image);
      }

      await API.post("/posts", data);
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="excerpt"
          placeholder="Excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={5}
          required
        />
        <Input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </Button>
      </form>
    </div>
  );
}

export default CreatePost;
