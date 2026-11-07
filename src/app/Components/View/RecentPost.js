"use client";
import React, { useRef, useEffect, useState } from "react";
import "../MainContainer.scss";
import Image from "next/image";
import Link from "next/link";
import Spinner from "../spinner";
import horizon_line from "../../../../public/assets/images/Horizonline.svg";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const RecentPost = ({ dataPost, recent_posts_loading }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setShowLeftArrow] = useState(false);
  const [canScrollRight, setShowRightArrow] = useState(false);

  // Debounced update function for arrow visibility
  const updateArrows = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // Debounce implementation
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedUpdateArrows = debounce(updateArrows, 100);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", debouncedUpdateArrows);
      updateArrows(); // Initial check on mount
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", debouncedUpdateArrows);
      }
    };
  }, [debouncedUpdateArrows]);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300, // Adjust scroll distance
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300, // Adjust scroll distance
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="recent-posts">
        <h1 className="recent-title">RECENT POSTS</h1>
        <div className="hori_line">
          <Image
            className="horizon-line"
            src={horizon_line}
            alt="horizon line"
          />
        </div>
        {canScrollLeft && (
          <FaArrowAltCircleLeft
            className="recent-arrow left"
            color="white"
            onClick={handleScrollLeft} // Add click handler
          />
        )}

        <div className="recent-box" ref={scrollRef}>
          {!recent_posts_loading ? (
            dataPost?.posts?.data?.map((data, index) => (
              <Link
                href={`/posts/${data?.slug}`}
                key={index}
                className="recent-info"
              >
                <div className="recent-post-img-wrapper">
                  <Image
                    width={500}
                    height={500}
                    className="recent-post-img"
                    src={data?.image}
                    alt={data?.title}
                  />
                  <div className="recent-post-views">
                    <span>Views: </span>
                    {data?.views}
                  </div>
                </div>
                <h6 className="recent-post-img-info ">{data?.title}</h6>
              </Link>
            ))
          ) : (
            <Spinner />
          )}
        </div>

        {canScrollRight && (
          <FaArrowAltCircleRight
            className="recent-arrow right"
            color="white"
            onClick={handleScrollRight} // Add click handler
          />
        )}
        <div className="view-more-rec">
          <Link href="/list/recent-posts" className="view-more-button">
            View More
          </Link>
        </div>
      </div>
    </>
  );
};

export default RecentPost;
