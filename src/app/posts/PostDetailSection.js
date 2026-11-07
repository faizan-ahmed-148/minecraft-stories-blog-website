
'use client'
import PostCard from './PostCard';
import './posts.scss';
import ProfileHeader from './ProfileHeader';



export default function page({single_posts_data}) {

  return (
    <div className='profile-detail-header-container'>
      <ProfileHeader single_posts_data={single_posts_data}/>
      <PostCard single_posts_data={single_posts_data} />
    </div>
  );
}
