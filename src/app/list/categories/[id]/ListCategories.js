"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import "../../editor-pick-posts/detail_post.scss";
import horizon_line from "../../../../../public/assets/images/Horizonline.svg";
import Image from "next/image";
import { get_category_slug } from "@/app/Services/Apis";
import { useParams, usePathname } from "next/navigation";
import { renderPaginationButtons } from "@/app/Components/Helper/Helper";
import Loading from "@/app/Components/Helper/Loading";
const ListCategories = () => {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);
  const params = useParams();
  const {
    get_Post_by_category_data,
    get_Post_by_category_loading,
    get_Post_by_category_error,
  } = useSelector((state) => state.slug_category);
  useEffect(() => {
    get_category_slug(dispatch, pageNo, params?.id);
  }, [dispatch, pageNo, params?.id]);
  console.log(get_Post_by_category_data, "get_Post_by_category_data");
  const totalPages = get_Post_by_category_data?.posts?.last_page || 1;

  
  return (
    <>
    
    <div className="detail_post_container">
    <h1 className="detail_post_title">Categories Posts</h1>
    <div className="hori_line">
      <Image className="horizon-line" src={horizon_line} alt="horizon line" />
    </div>

    {/* {recent_posts_error && <p className="detail_post_error">Error fetching posts!</p>} */}

    <div className="detail_post_flex_container">
      {!get_Post_by_category_loading ? (
        get_Post_by_category_data?.posts?.data?.map((data, index) => (
          <Link
            href={`/posts/${data?.slug}`}
            key={index}
            className="detail_post_card"
          >
            <div className="detail_post_img_wrapper">
              <Image
                width={500}
                height={500}
                 src={data?.image}
                className="detail_post_img"
                alt={data?.title}
              
              />
                <div className="detail_post_con_views"><span>Views : </span>{data?.views}</div>

            </div>
            <h6 className="detail_post_card_title text-truncate">
              {data?.title}
            </h6>
          </Link>
        ))
      ) : (
        <Loading />
      )}
    </div>

    {/* Pagination controls */}
    <div className="pagination_control">
      {renderPaginationButtons(
        totalPages,
        pageNo,
        setPageNo,
        get_Post_by_category_loading
      )}
    </div>
  </div>
    </>
  );
};

export default ListCategories;
