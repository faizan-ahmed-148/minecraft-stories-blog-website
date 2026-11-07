import React, { useEffect, useState } from "react";
import Link from "next/link";
import horizon_line from "../../../public/assets/images/Horizonline.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { get_activities } from "../Services/Apis";
import { formatDistanceToNow, parseISO } from "date-fns";

const Newsfeedactivity = () => {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);
  const { activities_data, activities_error, activities_loading } = useSelector(
    (state) => state.get_activities
  );
  const [allPosts, setAllPosts] = useState([]);
  const dataPost = activities_data?.activities?.data || [];
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
  useEffect(() => {
    const fetchActivities = async () => {
      await get_activities(dispatch, pageNo);
    };
    fetchActivities();
  }, [pageNo]);

  return (
    <div className="news-feed-activity-box">
      <h1 className="news-feed-activity-title">ACTIVITY</h1>
      <div className="hori_line">
        <Image className="horizon-line" src={horizon_line} alt="horizon line" />
      </div>

      <div className="news-feed-activity-list">
        {allPosts &&
          allPosts.map((activity, index) => {
            return (
              <Link
                href={`/posts/${activity?.slug}`}
                className="news-feed-activity-card"
                key={index}
              >
                <img
                  src={activity?.avatar || "/default-thumbnail.jpg"}
                  alt={activity?.username ? activity?.username : activity?.name}
                  className="news-feed-activity-image"
                />
                <div className="news-feed-activity-info">
                  <h6 className="news-feed-activity-name">
                    {activity?.username ? activity?.username : activity?.name}
                  </h6>
                  <p className="news-feed-activity-desc">
                    {activity?.description}
                  </p>
                  <span className="news-feed-activity-min">
                    {activity?.created_at
                      ? formatDistanceToNow(parseISO(activity?.created_at), {
                          addSuffix: true,
                        })
                      : "Just now"}
                  </span>
                </div>
              </Link>
            );
          })}

        {!activities_loading &&
          pageNo < activities_data?.activities?.last_page && (
            <div
              onClick={() => setPageNo(pageNo + 1)}
              className="news-feed-load-more-button"
            >
              <div> Load More</div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Newsfeedactivity;
