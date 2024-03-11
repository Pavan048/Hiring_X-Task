import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/api/posts?page=${page}`);
      const { data } = response.data;
      setPosts(prevPosts => [...prevPosts, ...data]);
      setPage(prevPage => prevPage + 1);
      if (data.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more posts</p>}
      >
        {posts.map(post => (
          <div key={post._id}>
            <h2>{post.name}</h2>
            <p>{post.description}</p>
            <img src={post.image} alt={post.name} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PostList;
