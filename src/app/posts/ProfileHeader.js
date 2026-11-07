import './posts.scss';

const ProfileHeader = ({single_posts_data}) => {
  console.log(single_posts_data, '==>single_posts_data');
  
  return (
    <div className="profile-detail-header">
    <img 
      src={single_posts_data?.user?.avatar}
      alt={single_posts_data?.user?.username ? single_posts_data?.user?.username : single_posts_data?.user?.name}
    />
    <div className="profile-detail-info">
      <div className='profile-detail-header-heading'>{single_posts_data?.user?.username ? single_posts_data?.user?.username : single_posts_data?.user?.name}</div>
      <div className="timestamp">{single_posts_data?.created_at}</div>
      <div className="profile-detail-header-line" />
      <div className='profile-detail-header-heading'>{single_posts_data?.title}</div>
    </div>
  </div>
  )
}

export default ProfileHeader
