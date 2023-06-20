"use client";

import { useEffect, useRef, useState } from "react";
import PromptCard from "./PromptCard";
import { useRouter } from "next/navigation";
const PromptCardList = ({ data, handleTagClick }) => {
  const router = useRouter();
  return (
    <div className="mt-16 w-full md:min-w-[660px] flex-center flex-wrap gap-3 mb-4">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleClick={() => router.push(`/profile/${post.creator._id}`)}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const search = useRef();
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      // console.log("hello");
      const response = await fetch("/api/prompt", { cache: "no-store" });
      const data = await response.json();
      // console.log(data);
      setPosts(data);
      setFilter(data);
    };
    fetchPosts();
  }, []);

  const handleSearchChange = () => {
    let query = search.current.value;
    if (query.length > 0) {
      const searchData = posts?.filter(
        (post) =>
          post.prompt.toLowerCase().includes(query.toLowerCase()) ||
          post.tag.toLowerCase().includes(query.toLowerCase())
      );
      if (searchData.length === posts.length) {
        setFilter([]);
      } else {
        setFilter(searchData);
      }
    } else {
      setFilter(posts);
    }
  };
  const handleTagClick = (tag) => {
    search.current.value = tag;
    let query = search.current.value;
    const searchData = posts?.filter((post) =>
      post.tag.toLowerCase().includes(query.toLowerCase())
    );
    setFilter(searchData);
  };
  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="search"
          placeholder="Search for a tag or a username"
          required
          ref={search}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>
      <PromptCardList data={filter} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
