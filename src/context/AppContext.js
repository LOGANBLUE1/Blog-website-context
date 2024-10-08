import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../baseUrl";

export const AppContext = createContext();//step 1: create context

export default function AppContextProvider({ children }) {//step 2: create context provider
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const navigate = useNavigate();

  // Fetch Blog Data
  const fetchBlogPosts = async (page = 1, tag=null, category) => {
    setLoading(true);
    let url = `${baseUrl}?page=${page}`;
    if(tag) {
      url += `&tag=${tag}`;
    }
    if(category) {
      url += `&category=${category}`;
    }
    console.log("URL is: ", url);

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!data.posts || data.posts.length === 0)
        throw new Error("Something Went Wrong");

      console.log("Api Response", data);

      setPage(data.page);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log("Error in Fetching BlogPosts", error);
      setPage(1);
      setPosts([]);
      setTotalPages(null);
    }

    setLoading(false);
  };

  // Handle When Next and Previous button are clicked
  const handlePageChange = (page) => {
    // fetchBlogPosts(page);
    navigate( { search: `?page=${page}`});
    setPage(page);
  };

  const value = {
    posts,
    setPosts,
    loading,
    setLoading,
    page,
    setPage,
    totalPages,
    setTotalPages,
    fetchBlogPosts,
    handlePageChange,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
