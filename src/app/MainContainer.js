"use client";
import React, { useEffect, useState } from "react";
import "../app/Components/MainContainer.scss";
import EditorPost from "../app/Components/View/EditorPost";
import RecentPost from "../app/Components/View/RecentPost";
import TwitchBox from "../app/Components/View/TwitchBox";
import ActivityBox from "../app/Components/View/ActivityBox";
import HotTrendingPosts from "../app/Components/View/HotTrendingPosts";
import { useDispatch, useSelector } from "react-redux";
import {
  get_activities,
  get_editor,
  get_featured_post,
  get_recent,
  get_trending,
} from "../app/Services/Apis";
import { toast } from "react-toastify";
import {
  set_editor_posts_clear_error,
  set_recent_posts_clear_error,
  set_trending_posts_clear_error,
} from "../app/Context/Posts";
import Loading from "./Components/Helper/Loading";
import FeaturedPost from "./Components/View/FeaturedPost";
import PromotionContainer from "./posts/PromotionContainer";
import FeaturedPostCon from "./Components/View/FeaturedPostCon";
import { usePathname } from "next/navigation";

const MainContainer = () => {
  const dispatch = useDispatch();
  const { settings_data } = useSelector((state) => state.minecraft_settings);
  const [useClient, setClient]= useState(false)
  const { trending_posts_data, trending_posts_loading, trending_posts_error } =
    useSelector((state) => state.trending);
  const { editor_posts_data, editor_posts_loading, editor_posts_error } =
    useSelector((state) => state.editor);
  const { recent_posts_data, recent_posts_loading, recent_posts_error } =
    useSelector((state) => state.recent);
  const { activities_data, activities_error, activities_loading } = useSelector(
    (state) => state.get_activities
  );
  const { featured_post_data, featured_post_error, featured_post_loading } =
    useSelector((state) => state.get_featured);
  const [pageNoActivities, setPageNoActivities] = useState(1);

  const [allpost, setAllPosts] = useState([]);
  const dataPost = activities_data?.activities?.data || [];
  const activitiesTotalPages = activities_data?.activities?.last_page || 1;
  const pathname = usePathname();
  const currentUrl = `${process.env.NEXT_PUBLIC_URL}${pathname}`; 
  useEffect(() => {
    // If there's no new data, do nothing
    if (!dataPost?.length) return;

    // If page = 1, just replace (or decide if you want to append)
    if (pageNoActivities === 1) {
      setAllPosts(dataPost);
    } else {
      // Otherwise, append new data to existing data
      setAllPosts((prevPosts) => [...prevPosts, ...dataPost]);
    }
  }, [dataPost]);

  // Fetch settings on component mount
  useEffect(() => {
    get_trending(dispatch);
  }, [dispatch]);
  useEffect(() => {
    get_editor(dispatch);
  }, [dispatch]);
  useEffect(() => {
    get_recent(dispatch);
  }, [dispatch]);

  useEffect(() => {
    get_activities(dispatch, pageNoActivities);
  }, [dispatch, pageNoActivities]);

  useEffect(() => {
    get_featured_post(dispatch);
  }, [dispatch]);

  // Handle errors and display toast notifications
  // useEffect(() => {

  //   if (trending_posts_error) {
  //     toast.error(trending_posts_error);
  //     dispatch(set_trending_posts_clear_error());
  //   }
  //   if (editor_posts_error) {
  //     toast.error(editor_posts_error);
  //     dispatch(set_editor_posts_clear_error());
  //   }
  //   if (recent_posts_error) {
  //     toast.error(recent_posts_error);
  //     dispatch(set_recent_posts_clear_error());
  //   }
  // }, [ trending_posts_error, recent_posts_error, editor_posts_error, dispatch]);
useEffect(()=>{
  setClient(true)
},[])
  return (
    // !trending_posts_loading? (
    <>
{useClient && (
    <div className="blog-container">
      <h1>Minecraft Stories – Ultimate Minecraft Guides & Tutorials</h1>
      <div
        className={`featred-wrapper ${
          settings_data?.settings?.promotion ||
          (settings_data?.settings?.adsense_pubid &&
            settings_data?.settings?.adsense_slotid)
            ? "half"
            : "full"
        }`}
      >
        <FeaturedPost
          featured_post_data={featured_post_data}
          featured_post_loading={featured_post_loading}
        />
        <PromotionContainer />
      </div>
      <div className="featured-posts-con">
        <FeaturedPostCon
          dataPost={featured_post_data}
          featured_post_loading={featured_post_loading}
        />
      </div>
      <div className="hot-trending-posts">
        <HotTrendingPosts
          dataPost={trending_posts_data}
          trending_posts_loading={trending_posts_loading}
        />
      </div>

      <div className="editor-twitch ">
        <EditorPost
          dataPost={editor_posts_data}
          editor_posts_loading={editor_posts_loading}
        />
        <TwitchBox />
      </div>
      <div className="recent-activity ">
        <RecentPost
          dataPost={recent_posts_data}
          recent_posts_loading={recent_posts_loading}
        />
        <ActivityBox
          activities_loading={activities_loading}
          activities_data={allpost}
          setPageNoActivities={setPageNoActivities}
          pageNoActivities={pageNoActivities}
          activitiesTotalPages={activitiesTotalPages}
        />
      </div>
    </div>)}
    </>
    // ) : (<Loading />)
  );
};

export default MainContainer;
