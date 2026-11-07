"use client";
import React, { useRef, useEffect, useState } from "react";
import "../MainContainer.scss";
import horizon_line from "../../../../public/assets/images/Horizonline.svg";

import Image from "next/image";
import Link from "next/link";
import Spinner from "../spinner";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
const EditorPost = ({ dataPost, editor_posts_loading }) => {
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
      <div className="editor-posts">
        <h1 className="editor-title">EDITOR'S PICK POSTS</h1>
        <div className="hori_line">
          <Image
            className="horizon-line"
            src={horizon_line}
            alt="horizon line"
          // Add click handler
          />
        </div>
        {canScrollLeft && (
          <FaArrowAltCircleLeft className="editor-arrow left" color="white" onClick={handleScrollLeft} />
        )}

        <div className="editor-box" ref={scrollRef}>
          {!editor_posts_loading ? (
            dataPost?.posts?.data?.map((data, index) => (
              <Link
                href={`/posts/${data?.slug}`}
                key={index}
                className="editor-info"
              >
                <div className="editor-post-img-wrapper">
                  <Image
                    width={500}
                    height={500}
                    className="editor-post-img"
                    src={data?.image}
                    alt={data?.title}
                  />
                  <div className="editor-post-views">
                    <span>Views: </span>
                    {data?.views}
                  </div>
                </div>
                <h6 className="editor-post-img-info">{data?.title}</h6>
              </Link>
            ))
          ) : (
            <Spinner />
          )}
        </div>

        {canScrollRight && (
          <FaArrowAltCircleRight
            className="editor-arrow right"
            color="white"
            onClick={handleScrollRight} // Add click handler
          />
        )}
        <div className="view-more-edit">
          <Link href="/list/editor-pick-posts" className="view-more-button">
            View More
          </Link>
        </div>
      </div>
    </>
  );
};

export default EditorPost;
