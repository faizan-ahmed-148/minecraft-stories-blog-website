"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { get_editor } from "../../Services/Apis";
import "./detail_post.scss";
import horizon_line from "../../../../public/assets/images/Horizonline.svg";
import Image from "next/image";
import { renderPaginationButtons } from "@/app/Components/Helper/Helper";

const EditorPosts = () => {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);

  const { editor_posts_data, editor_posts_loading, editor_posts_error } =
    useSelector((state) => state.editor);
 
  // Fetch posts whenever the page number changes
  useEffect(() => {
    get_editor(dispatch, pageNo);
  }, [dispatch, pageNo]);

  const totalPages = editor_posts_data?.posts?.last_page || 1;


  return (
    <>
  
    <div className="detail_post_container">
      <h1 className="detail_post_title">EDITOR'S PICK POSTS</h1>
      <div className="hori_line">
        <Image className="horizon-line" src={horizon_line} alt="horizon line" />
      </div>

      {/* {editor_posts_error && <p className="detail_post_error">Error fetching posts!</p>} */}

      <div className="detail_post_flex_container">
        {editor_posts_data?.posts?.data?.map((data, index) => (
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
      {/* <div className="pagination_controls">
                <button
                    className="pagination_button"
                    onClick={handlePrevPage}
                    disabled={pageNo === 1 || editor_posts_loading}
                >
                    Previous
                </button>
                <span className="pagination_info">Page {pageNo}</span>
                <button
                    className="pagination_button"
                    onClick={handleNextPage}
                    disabled={!editor_posts_data?.posts?.current_page ===  editor_posts_data?.posts?.last_page  || editor_posts_loading}
                >
                    Next
                </button>
            </div> */}

      {/* Pagination Controls */}
      <div className="pagination_control">
        {renderPaginationButtons(
          totalPages,
          pageNo,
          setPageNo,
          editor_posts_loading
        )}
      </div>
    </div>
    </>
  );
};

export default EditorPosts;
