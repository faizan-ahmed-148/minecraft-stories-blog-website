import MainContainerPost from '../MainContainerPost';
import '../posts.scss';
import '../detailPost.scss'
import { getBaseUrl } from '@/config';
import 'react-quill-new/dist/quill.snow.css';
import "quill/dist/quill.snow.css";
import axios from 'axios';
import NotFound from '@/app/not-found';
import { notFound } from 'next/navigation';


export async function generateMetadata(props) {
  const params = await props.params;
  const { id } = params;
  const api_url = getBaseUrl();

  try {
    const response = await fetch(`${api_url}/client/post/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    });
    console.log(response, 'responseresponse');

    if (!response.ok) {
      if (response.status === 404) {
        return {
          title: "Post Not Found - Minecraft",
          description: "The requested post does not exist.",
          robots: "noindex, nofollow", // Prevents indexing of 404 pages
        };
      }
      throw new Error("Failed to fetch post data");
    }
    const data = await response.json();
    const postData = data?.post;

    const postTitle = postData?.meta_title || 'Minecraft Posts';
    const postDescription = postData?.meta_description || 'Minecraft post details';
    const postImage = postData?.image || ''; // Fallback image
    const postUrl = `${process.env.NEXT_PUBLIC_URL}/posts/${id}`;
    return {
      title: postTitle,
      description: postDescription,
      keywords: postData?.meta_keywords || 'Minecraft',

      // ✅ Open Graph (For Facebook, LinkedIn, WhatsApp, Telegram, Discord)
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
        siteName: "Minecraft Stories",
      },

      // ✅ Twitter Meta Tags
      twitter: {
        card: postImage,
        title: postTitle,
        description: postDescription,
        images: [postImage],
        // site: twitterHandle, // Twitter handle
      },

      alternates: {
        canonical: postUrl
      },
      // ✅ Additional Social Media Metadata
      alternates: {
        canonical: postUrl
      },
      other: {
        'og:image': postImage,
        'og:image:secure_url': postImage,
        'og:image:width': "1200",
        'og:image:height': "630",
        'og:image:type': "image/[Image format like jpg, png, jpeg]",
        'og:url': postUrl,
        'og:site_name': "Minecraft Articles",
        'og:type': "article",
        'og:locale': "en_US",
        'twitter:card': postImage,
        'twitter:title': postTitle,
        'twitter:description': postDescription,
        'twitter:image': postImage,
        'article:published_time': postData?.created_at || '',
        'article:modified_time': postData?.updated_at || '',
        'article:author': postData?.user.username ? postData?.user.username : postData?.user.name || '',
      },
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {
      title: 'Minecraft Social Feed',
      description: 'Minecraft post details',
      robots: "noindex, nofollow",
      openGraph: {
        title: 'Minecraft Social Feed',
        description: 'Minecraft post details',
        type: 'website',
        url: `${api_url}/posts/${id}`,
        images: [{ url: '/default-image.png', width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Minecraft Social Feed',
        description: 'Minecraft post details',
        images: ['/default-image.png'],
      },
      other: {
        'og:site_name': "Minecraft Social Feed",
        'og:type': "website",
        'og:locale': "en_US",
        'og:url': `${api_url}/posts/${id}`,
      },
    };
  }
}
export default async function PostPage({ params }) {
  const { id } = params;
  console.log(id, process.env.NEXT_PUBLIC_URL, "params");
  const api_url = getBaseUrl();
  try {
    const response = await axios.get(`${api_url}/client/post/${id}`);
    console.log(response?.data, "get_single_post");

    if (response?.data) {
      return (
        <main className="main-posts-container">
          <MainContainerPost data={response.data} />
        </main>
      );
    }
  } catch (error) {
    console.error("Error in get_single_post:", error);

    if (error.response?.status === 404) {
      notFound(); // Redirect to 404 page
    }

    return <div>Error loading post. Please try again later.</div>;
  }
}