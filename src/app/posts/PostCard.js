'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './posts.scss';
import '../Components/MainContainer.scss';
import { FaHeart, FaCommentAlt, FaShare } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getBaseUrl } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { get_single_post } from '../Services/Apis';
import { useParams, useRouter } from 'next/navigation';
import Comments from './Comments';
import ShareDropdown from './Share';
import RecentPost from '../Components/View/RecentPost';
import DetailRelatedArticle from './DetailRelatedArticle';
import { Spinner } from 'reactstrap';

export default function PostCard({ single_posts_data }) {
  const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter()
  const { login_data } = useSelector((state) => state.login);
  const [loading , setloading] = useState(false)
  const [liked_response, set_liked_response] = useState(null)
console.log(single_posts_data, 'single_posts_data');

  const content = {
    title: single_posts_data?.title,
    description: single_posts_data?.content,
    image: single_posts_data?.image,
  };
  const baseUrl = getBaseUrl();

  // Toggle like/unlike functionality
  const handleLikeToggle = async () => {
    if (!login_data?.token) {
      toast.error('Please login first to like posts.');
      router.push('/auth/login')
      return;
    }
    setloading(true)
    try {
      const endpoint = liked_response?.status
        ? `${baseUrl}/client/post/${single_posts_data?.id}/unlike`
        : `${baseUrl}/client/post/${single_posts_data?.id}/like`;

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${login_data?.token}`,
        },
      });

      if (response?.data) {
        setloading(false)
       await LikePosts()

        await  get_single_post(dispatch, params?.id)
      }
    } catch (error) {
      setloading(false)
    }
  };

  const LikePosts = async()=>{
    const response =await axios.get(`${baseUrl}/client/isLikedBy/${ single_posts_data?.id}`,{
      headers:{
        Authorization: `Bearer ${login_data?.token}`,
      }
    })
    if (response?.data) {
      set_liked_response(response?.data)
    }
   }
    // Handle errors and display toast notifications
    useEffect(()=>{
      if (login_data?.token && single_posts_data?.id) {
        
        LikePosts()
      }
    },[single_posts_data?.id])
  return (
    <>
    <motion.div
      className="post-detail-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img className="post-detail-card-img" src={content?.image} alt={content?.title} />
      <div
        className="post-detail-card-des ql-editor"
        dangerouslySetInnerHTML={{
          __html: content?.description
        }}
      />

    </motion.div>
    
    <div className="action-buttons">
        {/* Like Button */}
        <div className="action-item" onClick={handleLikeToggle}>
        {!loading ? <FaHeart className="icon" color={liked_response?.status ? 'red' : 'white'} />: <Spinner size='sm' color='light'/>}
         <span>{liked_response?.status ? 'Unlike' : 'Like'}</span>
          <span className="count">{single_posts_data?.likes_count}</span>
        </div>

        {/* Comment Button */}
        <div className="action-item">
          <FaCommentAlt className="icon" color="white" />
          <span>Comment</span>
          <span className="count">{single_posts_data?.comments?.length || 0}</span>
        </div>
        <ShareDropdown />

        {/* Share Button */}
      </div>
      <Comments  single_posts_data={single_posts_data}/>
      <DetailRelatedArticle single_posts_data={single_posts_data}/>
    
      </>
  );
}
