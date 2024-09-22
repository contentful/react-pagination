import React, { useState, useEffect } from "react";
import ".././styles.css"; // Add this line to link the CSS file

const ServerSide = () => {
  const [posts, setPosts] = useState([]); // State to hold posts
  const [loading, setLoading] = useState(false); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPosts, setTotalPosts] = useState(0); // Total number of posts
  const [postsPerPage] = useState(5); // Number of posts per page

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${postsPerPage}`
      );
      const data = await res.json();

      const totalPosts = res.headers.get("X-Total-Count");

      setPosts(data);
      setTotalPosts(totalPosts);
      setLoading(false);
    };

    fetchPosts();
  }, [currentPage, postsPerPage]); // Fetch the next page of posts when the current page changes

  return (
    <div className="container">
      <h1 className="my-5">Blog Posts</h1>
      {loading ? <p>Loading...</p> : <PostList posts={posts} />}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        currentPage={currentPage}
        paginate={setCurrentPage} // Passing setCurrentPage to handle page change
      />
    </div>
  );
};

const PostList = ({ posts }) => {
  return (
    <ul className="list-group mb-4">
      {posts.map((post) => (
        <li key={post.id} className="list-group-item">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
};

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (e, number) => {
    e.preventDefault(); // Prevent default anchor behavior
    paginate(number);
  };

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <a
              onClick={(e) => handleClick(e, number)} // Added e.preventDefault()
              href="!#"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ServerSide;
