import React, { useEffect, useState } from "react";
import Link from "next/link";
import horizon_line from '../../../public/assets/images/Horizonline.svg';
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux";
import { get_recent } from "../Services/Apis";
import Spinner from "../Components/spinner";

const Newsfeedrecent = () => {
  const dispatch = useDispatch();
  const { recent_posts_data, recent_posts_loading } = useSelector(
    (state) => state.recent
  );

  const [pageNo, setPageNo] = useState(1); // Track current page
  const [allPosts, setAllPosts] = useState([]); // To hold all posts across pages

  const dataPost = recent_posts_data?.posts?.data || [];
  const totalPages = recent_posts_data?.posts?.last_page || 1;

  useEffect(() => {
    get_recent(dispatch, pageNo);
  }, [dispatch, pageNo]);

  const handleLoadMore = (e) => {
    e.preventDefault();
    if (pageNo < totalPages) {
      setPageNo(pageNo + 1); // Increment page number to load next page
    }
  };
  useEffect(() => {
    // If there's no new data, do nothing
    if (!dataPost?.length) return;

    // If page = 1, just replace (or decide if you want to append)
    if (pageNo === 1) {
      setAllPosts(dataPost);
    } else {
      // Otherwise, append new data to existing data
      setAllPosts((prevPosts) => [...prevPosts, ...dataPost]);
    }
  }, [dataPost]);

  return (
    <div className="news-feed-recent-box">
      <h1 className="news-feed-recent-title">RECENT ARTICLES</h1>
      <div className="hori_line">
        <Image className="horizon-line" src={horizon_line} alt="horizon line" />
      </div>

      <div className="news-feed-recent-list">
        {/* Render all accumulated posts */}
        {/* {!recent_posts_loading ? ( */}
        {allPosts.length > 0 ? (
          allPosts.map((data, index) => (
            <Link href={`/posts/${data?.slug}`} key={index} className="news-feed-recent-card">
              <Image
                width={500}
                height={500}
                src={data?.image}
                alt={data?.title}
                className="news-feed-recent-image"
              />
              <div className="news-feed-recent-info">
                <h6 className="news-feed-recent-name">{data?.title}</h6>
                <p className="news-feed-recent-desc">{data?.created_at}</p>
                <span className="news-feed-recent-min">
                  Read Article
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p>No posts available.</p>
        )}
        {/* ) : (
          <Spinner />
        )} */}

        {/* Show Load More button if there are more pages */}
        {pageNo < totalPages && !recent_posts_loading && (
          <div
            onClick={handleLoadMore}
            className="news-feed-load-more-button"
          >
            <div>
              Load More</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsfeedrecent;
