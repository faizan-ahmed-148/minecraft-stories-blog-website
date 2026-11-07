"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import "../editor-pick-posts/detail_post.scss";
import { get_trending } from "../../Services/Apis";
import horizon_line from "../../../../public/assets/images/Horizonline.svg";
import Image from "next/image";
import { renderPaginationButtons } from "@/app/Components/Helper/Helper";
const TrendingListPosts = () => {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);

  const { trending_posts_data, trending_posts_loading, trending_posts_error } =
    useSelector((state) => state.trending);

  useEffect(() => {
    get_trending(dispatch, pageNo);
  }, [dispatch, pageNo]);

  const totalPages = trending_posts_data?.posts?.last_page || 1;


  return (
    <>

    <div className="detail_post_container">
      <h1 className="detail_post_title">HOT TRENDING POSTS</h1>
      <div className="hori_line">
        <Image className="horizon-line" src={horizon_line} alt="horizon line" />
      </div>

      {/* {trending_posts_error && <p className="detail_post_error">Error fetching posts!</p>} */}

      <div className="detail_post_flex_container">
        {trending_posts_data?.posts?.data?.map((data, index) => (
          <Link
            href={`/posts/${data?.slug}`}
            key={index}
            className="detail_post_card"
          >
            <div className="detail_post_img_wrapper">
                <Image
                width={500}
                height={500}
                className="detail_post_img"
                src={data?.image}
                alt={data?.title}
              />
                  <div className="detail_post_con_views"><span>Views : </span>{data?.views}</div>

            </div>
            <h6 className="detail_post_card_title text-truncate">
              {data?.title}
            </h6>
          </Link>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="pagination_control">
        {renderPaginationButtons(
          totalPages,
          pageNo,
          setPageNo,
          trending_posts_loading
        )}
      </div>
    </div>
    </>
  );
};

export default TrendingListPosts;
