"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";
const ProfilePage = ({ params }) => {
  const ID = params.profileID;
  // console.log(ID);
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
    // console.log(session?.user.id);
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${ID}/posts`);
      const data = await response.json();
      console.log(data);
      setPosts(data);
    };
    if (status === "authenticated") {
      fetchPosts();
    }
  }, [status]);
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt? "
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });
        const filterPost = posts.filter((p) => p._id !== post._id);
        setPosts(filterPost);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Profile
      name={ID === session?.user?.id ? "My" : posts[0]?.creator.username}
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
