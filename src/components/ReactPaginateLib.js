import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ".././styles.css"; // Add this line to link the CSS file

const ReactPaginateLib = () => {
  const [posts, setPosts] = useState([]); // State to hold posts
  const [loading, setLoading] = useState(false); // Loading state
  const [pageCount, setPageCount] = useState(0); // Total number of pages
  const [currentPage, setCurrentPage] = useState(0); // Current page (0-indexed)
  const postsPerPage = 10; // Number of posts per page

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        // Fetch posts for the current page from the API using _page and _limit
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${
            currentPage + 1
          }&_limit=${postsPerPage}`
        );
        const data = await res.json();

        // Get total number of posts from the "X-Total-Count" header
        const totalPosts = res.headers.get("X-Total-Count");
        setPageCount(Math.ceil(totalPosts / postsPerPage)); // Set total number of pages

        setPosts(data); // Set the current page posts
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]); // Re-fetch posts when the currentPage changes

  // Handle page click
  const handlePageClick = (data) => {
    setCurrentPage(data.selected); // React-paginate passes selected page (0-indexed)
  };

  return (
    <div className="container">
      <h1 className="my-5">Blog Posts with React-Paginate</h1>

      {loading ? <p>Loading...</p> : <PostList posts={posts} />}

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount} // Total number of pages
        marginPagesDisplayed={2} // How many pages to show at the beginning and end
        pageRangeDisplayed={3} // How many pages to show around the current page
        onPageChange={handlePageClick} // What happens when a page is clicked
        containerClassName={"pagination"} // CSS class for the pagination container
        activeClassName={"active"} // CSS class for the active page
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

export default ReactPaginateLib;
