import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../MainContainer.scss";
import Image from "next/image";
import horizon_line from "../../../../public/assets/images/Horizonline.svg";
import { formatDistanceToNow, parseISO } from "date-fns";

const ActivityBox = ({
  activities_loading,
  activities_data,
  setPageNoActivities,
  pageNoActivities,
  activitiesTotalPages,
}) => {
  return (
    <div className="activity-box">
      <h1 className="activity-title">ACTIVITY</h1>
      <div className="hori_line">
        <Image className="horizon-line" src={horizon_line} alt="horizon line" />
      </div>
      <div className="activity-list">
        {activities_data &&
          activities_data.map((activity, index) => {
            return (
              <Link
                href={`/posts/${activity?.slug}`}
                className="activity-card"
                key={index}
              >
                <Image
                  width={500}
                  height={500}
                  src={activity?.avatar || "/default-thumbnail.jpg"}
                  alt={activity?.username ? activity?.username : activity?.name}
                  className="activity-image"
                />
                <div className="activity-info">
                  <h6 className="activity-name">
                    {activity?.username ? activity?.username : activity?.name}
                  </h6>
                  <p className="activity-desc">{activity?.description}</p>
                  <span className="activity-min">
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

        {!activities_loading && pageNoActivities < activitiesTotalPages && (
          <div
            className="load-more-button"
            onClick={() => setPageNoActivities(pageNoActivities + 1)}
          >
            <div>Load More</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityBox;
