"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import "../MainContainer.scss";
import Link from "next/link";
import HotTrendSpinner from "../HotTrendSpinner";
import horizon_line from "../../../../public/assets/images/Horizonline.svg";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const HotTrendingPosts = ({ dataPost, trending_posts_loading }) => {
  console.log(dataPost, "==>dataPost");
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

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
      scrollContainer.addEventListener('scroll', debouncedUpdateArrows);
      updateArrows(); // Initial check on mount
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', debouncedUpdateArrows);
      }
    };
  }, [debouncedUpdateArrows]);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300, // Adjust scroll distance
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300, // Adjust scroll distance
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <h1 className="hot-trending-title">Hot Trending Posts</h1>
      <div className="hori_line">
        <Image className="horizon-line" src={horizon_line} alt="horizon line" />
      </div>
      {!trending_posts_loading ? (
        <>
          {showLeftArrow && (
            <FaArrowAltCircleLeft className="arrow left" color="white" 
            onClick={handleScrollLeft} // Add click handler
             />
          )}
          <div className="hot-trending-box" ref={scrollRef}>
            {dataPost?.posts?.data?.map((data, index) => (
              <Link
                href={`/posts/${data?.slug}`}
                key={index}
                className="hot-trending-info"
              >
                <div className="hot-post-img-wrapper">
                  <Image
                    width={500}
                    height={500}
                    className="hot-post-img"
                    src={data?.image}
                    alt={data?.title}
                  />
                  <div className="hot-views"><span>Views: </span>{data?.views}</div>
                </div>
                <h6 className="hot-post-img-info">
                  {data?.title}
                </h6>
              </Link>
            ))}
          </div>
          {showRightArrow && (
            <FaArrowAltCircleRight
              className="arrow right"
              color="white"
              onClick={handleScrollRight} // Add click handler
            />
          )}
        </>
      ) : (
        <HotTrendSpinner />
      )}
      <div className="view-more-container">
        <Link href="/list/trending-posts" className="view-more-button">
          View More
        </Link>
      </div>
    </>
  );
};

export default HotTrendingPosts;
