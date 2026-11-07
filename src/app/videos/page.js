import React from 'react'
import Videos from './Videos';
import { getBaseUrl } from '@/config';
export async function generateMetadata() {
  const api_url = getBaseUrl();
  
  try {
    const response = await fetch(`${api_url}/client/getSiteSettings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch post data');
    }

    const data = await response.json();

    const postTitle = `${data?.settings?.site_name} - Youtube Videos`;
    const postDescription = `${data?.settings?.site_name} - Youtube Videos`;
    const postImage = data?.settings?.logo || ''; // Fallback image
    const postUrl = `${process.env.NEXT_PUBLIC_URL}/videos`;

    return {
      title: postTitle,
      description: postDescription,
      openGraph: {
        title: postTitle,
        description: postDescription,
        type: 'article',
        url: postUrl,
        images: [
          {
            url: postImage,
            width: 1200,
            height: 630,
            alt: postTitle,
          },
        ], 
        siteName: data?.settings?.site_name ,
      },
      twitter: {
        card: postImage,
        title: postTitle,
        description: postDescription,
        images: [postImage],
      },

      alternates: {
        canonical: postUrl
      },
      other: {
        'og:image': postImage,
        'og:image:secure_url': postImage,
        'og:image:width': "1200",
        'og:image:height': "630",
        'og:image:type': "image/[Image format like jpg, png, jpeg]" ,
        'og:url': postUrl,
        'og:site_name': data?.settings?.site_name,
        'og:type': "article",
        'og:locale': "en_US",
        'twitter:card': postImage,
        'twitter:title': postTitle,
        'twitter:description': postDescription,
        'twitter:image': postImage,
        
      },
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
  
  }
}
const page = () => {
  return (
    <>
    <Videos />
    </>
  )
}

export default page
