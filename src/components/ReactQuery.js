// Posts.js
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import ".././styles.css"; // Ensure styles are imported if necessary

// Fetch posts with pagination
const fetchPosts = async ({ queryKey }) => {
  const [_, page] = queryKey; // Destructure to get the current page from queryKey
  const postsPerPage = 10;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${postsPerPage}`
  );
  const totalPosts = res.headers.get("X-Total-Count"); // Get total number of posts
  const data = await res.json();
  return { data, totalPosts };
};

const ReactQuery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Fetch posts with React Query v5 signature
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: fetchPosts,
    placeholderData: (prevData) => prevData ?? { data: [], totalPosts: 0 }, // Use placeholderData to keep previous data // Keep previous data while fetching new data
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching posts</p>;

  const pageCount = Math.ceil(data.totalPosts / postsPerPage);

  // Handle page click
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1); // Fix: Add 1 to convert from 0-based index to 1-based
  };

  return (
    <div className="container">
      <h1 className="my-5">Blog Posts with React Query v5</h1>

      {/* Render posts */}
      <ul className="list-group mb-4">
        {data.data.map((post) => (
          <li key={post.id} className="list-group-item">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>

      {/* Render pagination buttons */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2} // How many pages to show at the beginning and end
        pageRangeDisplayed={3} // How many pages to show around the current page
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default ReactQuery;
