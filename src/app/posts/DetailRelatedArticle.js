'use client'
import Image from 'next/image';
import Link from 'next/link';
import horizon_line from '../../../public/assets/images/Horizonline.svg';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Components/spinner';
import { useEffect, useRef, useState } from 'react';
import { get_category_slug } from '../Services/Apis';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const DetailRelatedArticle = ({single_posts_data}) => {
 const dispatch = useDispatch()
  const scrollRef = useRef(null);
  const [canScrollLeft, setShowLeftArrow] = useState(false);
  const [canScrollRight, setShowRightArrow] = useState(false);
  const {
    get_Post_by_category_data,
    get_Post_by_category_loading,
    get_Post_by_category_error,
  } = useSelector((state) => state.slug_category);
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
      useEffect(() => {
        if(single_posts_data?.category?.slug){
          
          get_category_slug(dispatch,1, single_posts_data?.category?.slug);
        }
      }, [dispatch,  single_posts_data?.category?.slug]);
    return (
        <>
        <div className="detail-recent-posts">
            <h1 className='detail-recent-title' >RELATED ARTICLES</h1>
            <div className="hori_line">
          <Image className="horizon-line" src={horizon_line} alt="horizon line" />
        </div>
         {canScrollLeft && (
               <FaArrowAltCircleLeft className="detail-recent-arrow left" color="white" onClick={()=>handleScrollLeft()} />
             )}

            <div className="detail-recent-box" ref={scrollRef}>
                {!get_Post_by_category_loading ?get_Post_by_category_data?.posts?.data?.map((data, index) => (
                    <Link href={`/posts/${data?.slug}`} key={index} className="detail-recent-info">
                        <div className="detail-recent-post-img-wrapper">
                                   <Image
                                                width={500}
                                                height={500}
                                className="detail-recent-post-img"
                                src={data?.image}
                                alt={data?.title}
                                />
                  <div className="detail-recent-postt_con_views"><span>Views : </span>{data?.views}</div>

                        </div>
                        <h6 className="detail-recent-post-img-info text-truncate">{data?.title}</h6>
                    </Link>
                )):<Spinner/>}
            </div>

            {canScrollRight && (
          <FaArrowAltCircleRight
            className="detail-recent-arrow right"
            color="white"
            onClick={handleScrollRight} // Add click handler
          />
        )}
       
        </div>
    
        </>
        
    );
};

export default DetailRelatedArticle;
