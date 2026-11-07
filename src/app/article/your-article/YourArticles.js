"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./your-article.scss";
import Image from "next/image";
import { fetch_user_Article } from "../../Services/Apis"; // Import your fetch_user_Article
import horizon_line from "../../../../public/assets/images/Horizonline.svg";
import Loading from "../../Components/Helper/Loading";
import { renderPaginationButtons } from "@/app/Components/Helper/Helper";
import { useRouter } from "next/navigation";
import Link from "next/link";

const YourArticles = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const { login_data } = useSelector((state) => state.login); // Assuming you have the user data in redux
  const { article_loading, article_data, article_error } = useSelector(
    (state) => state.article
  );
   const { settings_data } = useSelector((state) => state.minecraft_settings);
  
  const [pageNo, setPageNo] = useState(1);
  const [showFullContent, setShowFullContent] = useState(false);
  useEffect(() => {
    if (login_data?.token) {
      fetch_user_Article(dispatch, login_data.token, pageNo);
    }else{
      router.push('/auth/login')
    }
  }, [dispatch, login_data?.token, pageNo]);

  // useEffect(() => {
  //   if (article_error) {
  //     toast.error(article_error); // Show error message
  //   }
  // }, [article_error]);

  const totalPages = article_data?.posts?.last_page || 1;

  // Generate pagination buttons

  const processDescription = (description) => {
    return description.replace(
      /<img[^>]+src="([^"]+)"[^>]*>/g,
      (match, src) => {
        return `<Image src="${src}" alt="image" layout="responsive"  />`; // Adjust width/height as necessary
      }
    );
  };

  // Slice the content if showFullContent is false
  const getContentToShow = (content) => {
    if (showFullContent) {
      return processDescription(content); // Show full content
    }
    // Show only the first 100 characters with ellipsis
    const truncated = content?.slice(0, 500);
    return processDescription(truncated);
  };


  return (article_loading ? (
    <Loading />
  ) : (
    <>
    <div className="your-article-container">
      <div className="your-article-header">
        <h1>Your Articles</h1>
        <div className="hori_line">
          <Image
            className="horizon-line"
            src={horizon_line}
            alt="horizon line"
          />
        </div>
      </div>

      <div className="your-article-list">
        {article_data?.length > 0
          ? article_data?.map((article, index) => (
              <Link href={`/posts/${article?.slug}`}key={index} className="your-article-card p-3">
                <div className="your-article-image">
                   <Image
                    width={100}
                    height={100}
                    src={article?.image}
                    alt={article?.title}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
                <div className="your-article-details">
                  <h2 className="your-article-title">{article?.title}</h2>
                  <div className="your-article-description">
                    <p style={{   wordBreak: "break-word", // Added property
                          overflowWrap: "break-word", // Added property
                          }}
                      dangerouslySetInnerHTML={{
                        __html: getContentToShow(article?.content),
                      }}
                    />

                    {/* Show "Show More" button if content exceeds 100 characters */}
                    {article?.content?.length > 100 && (
                      <button
                        onClick={() => setShowFullContent(!showFullContent)}
                        style={{
                          background: "black",
                          border: "1px solid black",
                          borderRadius: "20px",
                          color: "white",
                          cursor: "pointer",
                          textDecoration: "none",
                          fontSize: 12,
                        }}
                      >
                        {showFullContent ? "Show Less" : "Show More..."}
                      </button>
                    )}
                  </div>
                  <div className="your-article-meta">
                    <span>{article?.created_at}</span>
                  </div>
                  <span
                    className={`your-article-status  ${
                      article?.status_name ===  "Published" ? "published" : "draft"
                    }`}
                  >
                    <span>{article?.status_name}</span>
                  </span>
                </div>
                {/* <div className="your-article-actions">
                <button className="your-article-btn your-article-edit">
                  <Image src={edit_btn} alt="Edit Button" />
                </button>
                <button className="your-article-btn your-article-delete">
                  <Image src={delete_btn} alt="Delete Button" />
                </button>
              </div> */}
              </Link>
            ))
          : null}
      </div>

      {/* Pagination */}

      <div className="your-article-pagination">{renderPaginationButtons(totalPages, pageNo, setPageNo, article_loading)}</div>
    </div>
    </>
  )
)
};

export default YourArticles;
