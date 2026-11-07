import React, { useEffect, useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import EmojiPicker from 'emoji-picker-react'; // Add this library
import './posts.scss';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { set_comment_posts_clear_error, set_comment_posts_clear_message } from '../Context/Posts';
import { get_single_post, PostComment } from '../Services/Apis';
import { useParams, useRouter } from 'next/navigation';

const Comments = ({ single_posts_data }) => {
  const comments = single_posts_data?.comments
  const dispatch  = useDispatch()
  const router = useRouter()
  const [newComment, setNewComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [error, setError] = useState('');
  const { comment_posts_loading, comment_posts_error, comment_posts_message } = useSelector(state => state.post_comment);
  const { login_data } = useSelector((state) => state.login);
  const params = useParams();

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length > 300) {
      setError('Comment exceeds the maximum length of 300 characters.');
    } else {
      setError('');
      setNewComment(value);
    }
  };

  const handleEmojiClick = (emoji) => {
    setNewComment((prev) => prev + emoji.emoji);
  };



  const handlePostComment = async () => {
    if (!login_data?.token ) {
      toast.error("Please Login First")
      router.push('/auth/login')
    }else{
      if (newComment.length < 10) {
        setError('Comment must be at least 10 characters.');
        return;
      }
  
      if (!error) {
     await PostComment(dispatch,single_posts_data?.id, newComment,   login_data?.token )
     get_single_post(dispatch, params?.id)
        setNewComment('');
        setError('');
      }
    }
  
  };
  console.log(single_posts_data, '==>useEffect ');
  
  useEffect(() => {
    // if (comment_posts_message) {
    //   toast.success(comment_posts_message);
    //   dispatch(set_comment_posts_clear_message());
    // }
    if (comment_posts_error) {
      toast.error(comment_posts_error);
      dispatch(set_comment_posts_clear_error());
    }
  }, [dispatch, comment_posts_error]);

  return (
    <>
      <div className="comment-section">
        <div className="comments-heading">Comments</div>
        <div className="comments-con">
          {comments?.map((comment, index) => (
            <div key={index} className="comment">
              <img src={comment?.user?.avatar} alt={comment?.user?.username? comment?.user?.username:comment?.user?.name} />
              <div className="comment-info">
                <div className="comment-header">
                  <span className="username">{comment?.user?.username? comment?.user?.username:comment?.user?.name}</span>
                  <span className="timestamp">
                    {comment?.created_at
                      ? formatDistanceToNow(parseISO(comment.created_at), { addSuffix: true })
                      : 'Just now'}
                  </span>
                </div>
                <div className="comment-text">{comment?.body}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Write Comment Section */}
        <div className="write-comment">
          <div className="write-comment-input-container">
            <input
              type="text"
              value={newComment}
              className='write-input'
              onChange={handleInputChange}
              placeholder="Write a comment..."
            />
      
            {showEmojiPicker && (
              <div className="write-emoji-picker">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
          <div className="write-comment-actions">
            <button className="write-emoji-button" onClick={() => setShowEmojiPicker((prev) => !prev)}>
              😀
            </button>
     
            <button disabled={comment_posts_loading} className="write-send-button" onClick={handlePostComment}>
              Post
            </button>
          </div>
        </div>
        {error && <div className="write-error-message">{error}</div>}
      </div>
    </>
  );
};

export default Comments;
