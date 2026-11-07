"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostDetailSection from "./PostDetailSection";
import {  set_single_posts_data } from "../Context/Posts";
import Loading from "../Components/Helper/Loading";
import CommentSection from "./CommentSection";

const MainContainerPost = ({data}) => {
  const dispatch = useDispatch();
  const { single_posts_data} =
    useSelector((state) => state.single_post);
  const fetchData = async () => {
    if (data) {
      dispatch(set_single_posts_data(data))
    }
  };
  useEffect(() => {
    fetchData();
    
  }, [dispatch,data]);

  return (
    <>
    {!data ? <Loading /> :
    <>
      <PostDetailSection single_posts_data={single_posts_data?.post} />
      <CommentSection  comments={single_posts_data?.post?.comments} />
      </>}
      </>
  );
};

export default MainContainerPost;
