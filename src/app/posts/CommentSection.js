import React from 'react';
import './posts.scss';
import Newsfeedtwitch from './DetailPostTwitch';
import Newsfeedrecent from './Newsfeedrecent';
import './detailPost.scss'
import PromotionContainer from './PromotionContainer';
import Newsfeedactivity from './NewFeedActivity';
export default function CommentSection() {


  return (
    <>
    <div className='detail-con2-section-wrapper'>
    <PromotionContainer /> 
    <Newsfeedrecent />
    <Newsfeedtwitch />
    <Newsfeedactivity />
    </div>
    </>
   
  );
}
