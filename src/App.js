import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ClientSide from "./components/ClientSide";
import ServerSide from "./components/ServerSide";
import ReactPaginateLib from "./components/ReactPaginateLib";
import ReactQuery from "./components/ReactQuery";
import "./styles.css"; // Import styles if necessary

// Create a client for React Query
const queryClient = new QueryClient();

// The Home component with links to the four examples
const Home = () => {
  return (
    <div className="container">
      <h1 className="my-5">React pagination examples</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/client-side">Client-side</Link>
        </li>
        <li className="list-group-item">
          <Link to="/server-side">Server-side</Link>
        </li>
        <li className="list-group-item">
          <Link to="/react-paginate-lib">React Paginate library</Link>
        </li>
        <li className="list-group-item">
          <Link to="/react-query">React Query</Link>
        </li>
      </ul>
    </div>
  );
};

// The main App component with routing
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          =
          <Route path="/client-side" element={<ClientSide />} />
          <Route path="/server-side" element={<ServerSide />} />
          <Route path="/react-paginate-lib" element={<ReactPaginateLib />} />
          <Route path="/react-query" element={<ReactQuery />} />=
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
