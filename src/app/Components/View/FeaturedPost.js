'use client';
import '../MainContainer.scss';
import Link from 'next/link';
import Spinner from '../spinner';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from 'react-redux';
import Image from 'next/image';

const FeaturedPost = ({ featured_post_data, featured_post_loading }) => {
    const { settings_data } = useSelector((state) => state.minecraft_settings);
    
    const posts = featured_post_data?.posts?.data || [];
    const featuredPostCount = settings_data?.options?.featured_post_per_page
        ? Number(settings_data?.options?.featured_post_per_page)
        : 3;

    // Ensure we don't repeat the single post multiple times
    const visiblePosts = posts.length < featuredPostCount ? posts : posts.slice(0, featuredPostCount);

    const sliderSettings = {
        dots: true,
        infinite: visiblePosts.length > 1, // Prevent infinite loop if only one post
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: visiblePosts.length > 1, // No autoplay if only one post
        autoplaySpeed: 3000,
        appendDots: dots => (
            <div style={{ position: 'relative', bottom: '20px' }}>
                <ul style={{ margin: '0', padding: '0', display: 'flex', justifyContent: 'center' }}>
                    {dots}
                </ul>
            </div>
        ),
        customPaging: () => (
            <button
                style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                }}
            ></button>
        ),
    };

    return (
        <div className="FeaturedPost-container">
            {!featured_post_loading ? (
                visiblePosts.length > 0 ? (
                    <Slider {...sliderSettings}>
                        {visiblePosts.map((featured, index) => (
                            <Link
                                key={index}
                                href={`/posts/${featured?.slug}`}
                                className="FeaturedPost-card"
                            >
                                <div className="FeaturedPost-img-wrapper">
                                    <Image
                                        width={500}
                                        height={500}
                                        className="FeaturedPost-img"
                                        src={featured?.image}
                                        alt= {featured?.title}
                                    />
                                    <div className="FeaturedPost_con_views">
                                        <span>Views: </span>{featured?.views}
                                    </div>
                                </div>
                                <div className="FeaturedPost-info">
                                    <div className="FeaturedPost-user-avatar">
                                        <img
                                            className="FeaturedPost-user-img"
                                            src={featured?.user?.avatar}
                                            alt="User Avatar"
                                        />
                                    </div>
                                    <div className="FeaturedPost-meta">
                                        <h6 className="FeaturedPost-description">
                                            {featured?.title}
                                        </h6>
                                        <span className="FeaturedPost-username">
                                            By {featured?.user?.username ? featured?.user?.username : featured?.user?.name}
                                        </span>
                                        <span className="FeaturedPost-date">
                                            {featured?.created_at}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Slider>
                ) : (
                    <p>No featured posts available</p>
                )
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default FeaturedPost;
