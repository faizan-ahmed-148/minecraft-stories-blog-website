"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import "../editor-pick-posts/detail_post.scss";
import { get_all_category } from "@/app/Services/Apis";
import horizon_line from "../../../../public/assets/images/Horizonline.svg";
import Image from "next/image";
import Loading from "@/app/Components/Helper/Loading";
const Categories = () => {
  const dispatch = useDispatch();

  const {
    get_all_categories_data,
    get_all_categories_loading,
    get_all_categories_error,
  } = useSelector((state) => state.all_category);

  useEffect(() => {
    get_all_category(dispatch);
  }, [dispatch]);

  return (
    <>
    
    <div className="detail_post_container">
      <h1 className="detail_post_title">Categories</h1>
      <div className="hori_line">
        <Image className="horizon-line" src={horizon_line} alt="horizon line" />
      </div>

      {/* {recent_posts_error && <p className="detail_post_error">Error fetching posts!</p>} */}

      <div className="detail_post_flex_container">
        {!get_all_categories_loading ? (
          get_all_categories_data?.categories?.map((data, index) => (
            <Link
              href={`/list/categories/${data?.slug}`}
              key={index}
              className="detail_post_card"
            >
              <div className="detail_post_img_wrapper">
                <Image
                  className="detail_post_img"
                  src={data?.image}
                  alt={data?.name}
                  width={500}
                  height={500}
                />
              </div>
              <h6 className="detail_post_card_title text-truncate">
                {data?.name}
              </h6>
            </Link>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
    </>
  );
};

export default Categories;
