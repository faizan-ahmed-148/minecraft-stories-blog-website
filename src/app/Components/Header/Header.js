"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi"; // Menu icon
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai";
import Image from "next/image";
import { IoSearch } from "react-icons/io5"; // Search icon

import "./Header.scss"; // SCSS styles
import logo from "../../../../public/assets/images/logo.png"; // Adjust path as needed
import { useDispatch, useSelector } from "react-redux";
import { getSettings } from "@/app/Services/Apis";
import { set_settings_clear_error } from "@/app/Context/Settings";
import { toast } from "react-toastify";
import Loading from "../Helper/Loading";
import { useRouter } from "next/navigation";
import { getParsedDataFromLocalStorage } from "../Helper/Helper";
import { set_login_data } from "@/app/Context/Auth";
import axios from "axios";

export default function Header() {
  const dispatch = useDispatch()
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [clientLoaded, setClientLoaded] = useState(false);
  const {login_data} = useSelector(
    (state) => state.login
  );
  const router = useRouter()
  const {settings_data } = useSelector(
    (state) => state.minecraft_settings
  );


  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://admin.minecraftstories.gg/client/searchPost?page=1&search=${searchQuery}`
        );
        setSearchResults(response.data.posts.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }, 700); // 500ms debounce delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  console.log(settings_data,'settings_data');

  // const user_info = getParsedDataFromLocalStorage('user_info');
  // useEffect(() => {
  //   getSettings(dispatch);
  // }, [dispatch]);
  // useEffect(() => {
  //   if (settings_error) {
  //     toast.error(settings_error);
  //     dispatch(set_settings_clear_error());
  //   }
   
  // }, [settings_error, dispatch]);
  const handleClick = (e) => {
    e.preventDefault()
    router.push('/auth/login')
  }
 
  const handleCloseSearch = () => {
    setSearchResults([]);
    setSearchQuery("");
  };

  const handleLogout = () => {
    localStorage.removeItem("user_info");
    dispatch(set_login_data(null))
    router.push("/auth/login");
  };

  useEffect(() => {
    setClientLoaded(true);
  }, []);
  return (
    clientLoaded && (
    // !settings_loading  ? (
    <header>
      {/* Top bar with welcome text */}
      <div className="top-bar">
        <p>{settings_data?.settings?.navbar_marquee}</p>
        <div className="search-container">
          <input type="text" placeholder="Search..."         
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
          <IoSearch className="search-icon "  style={{marginRight: 15}}/>
          {login_data?.token ? (
            <div className="profile-container  ">
              <Image
                src={login_data?.user?.avatar}
                alt="Profile"
                width={40}
                height={40}
                className="profile-image"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
            <p>{login_data?.user?.username  ? login_data?.user?.username : login_data?.user?.name }</p>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link href="/profile">Profile</Link>
                  <Link href="/article/new-article">Create Article</Link>
                  <Link href="/article/your-article">Your Articles</Link>

                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
            <button className="account-button" onClick={handleClick}>
              My Account
            </button>
            </>
          )}
        </div>
        {searchResults.length > 0 && (
            <div className="search-results">
              <div className="head-search">
              <h3>Search Results:</h3>
              <div className="close-button" onClick={handleCloseSearch}>
                X
              </div>
              </div>
              <ul>
                {searchResults.map((result) => (
                  <li key={result?.id}>
                    {result.image && (
                       <Image
                          width={500}
                          height={500}
                        src={result?.image}
                        alt={result.title}
                        className="search-result-image"
                      />
                    )}
                    <Link href={`/posts/${result?.slug}`}>{result?.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>

      {/* Main header */}
      <div className="main-header">
        <Link href='/' className="logo">
          <Image width="100" height="100" src={settings_data?.settings?.logo} alt="Minecraft Logo" />
        </Link>

        <FiMenu className="menu-icon" onClick={() => setMenuOpen(!menuOpen)} />

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <Link href="/">Home</Link>
          <Link href="/list/categories">Categories</Link>
          <Link href="/news-feed">News</Link>
          <Link href="/videos">Videos</Link>

          <div className="social-icons">
            {settings_data?.settings?.url_fb ? <a href={settings_data?.settings?.url_fb} target="_blank">
              <FaFacebook size="1.5rem" />
            </a> : null}
               {settings_data?.settings?.url_twitter ? <a href={settings_data?.settings?.url_twitter} target="_blank">
              <AiFillTwitterCircle size="1.7rem" />
            </a>: null}
            {settings_data?.settings?.url_insta ?  <a href={settings_data?.settings?.url_insta} target="_blank">
              <FaSquareInstagram size="1.5rem" />
            </a>: null}
            {settings_data?.settings?.youtube_url ?   <a href={settings_data?.settings?.youtube_url} target="_blank">
              <FaYoutube size="1.7rem" />
            </a>: null}
          </div>
        </nav>
      </div> {/* Display search results */}


    </header>
        )
    // ):(<Loading />)
  );
}