import React from "react";
import "./about.scss";
import Section from "../Components/View/Sections";
import { getBaseUrl } from "@/config";


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

    const postTitle = `${data?.settings?.site_name} - about`;
    const postDescription = `${data?.settings?.site_name} - Welcome to Minecraft stories! Our website is packed with step-by-step tutorials, essential guides, tools, and insights on popular Minecraft YouTubers. What makes us unique is our vibrant community. It is a place where you can share your Minecraft adventures, builds, and beautiful moments. Whether you are a pro player or a beginner, this website-based community will allow you to connect with other Minecraft enthusiasts and help you learn and connect.`;
    const postImage = data?.settings?.logo || ''; // Fallback image
    const postUrl = `${process.env.NEXT_PUBLIC_URL}/about`;

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
  const sectionsData = [
    {
      title: "Welcome to Minecraft stories!",
      description: "Our website is packed with step-by-step tutorials, essential guides, tools, and insights on popular Minecraft YouTubers.What makes us unique is our vibrant community. It is a place where you can share your Minecraft adventures, builds, and beautiful moments. Whether you are a pro player or a beginner, this website-based community will allow you to connect with other Minecraft enthusiasts and help you learn and connect.",
      buttonText: "Contact Us",
      imageSrc: '/assets/images/about/img-5.jpeg', // Replace with actual path
      heading: 'ABOUT US',
      link: '/contact',
      reverse: false
    },
    {
      title: "Our Articles",
      description:   "Do you want to explore the world of Minecraft or build new farms? Our articles have got you covered. From crafting to building farms and mastering commands, you will find everything you need to enhance your Minecraft experience. With simple language and clear visuals, we have created step-by-step tutorials for your easy guidance.",
      buttonText: "Contact Us",
      imageSrc: '/assets/images/about/img-6.jpeg', // Replace with actual path
      // heading: 'OUR ARTICLES',
      link: '/contact',
        reverse: true
        },
    {
      title: "Our Mission",
      description: "Our mission is to bring together a Minecraft community and provide resources to help beginners learn about the world of Minecraft.",
      buttonText: "Click Here",
      imageSrc: '/assets/images/about/img-7.jpeg', // Replace with actual path
      // heading: 'Our Mission',
        link: '/contact',
        reverse: false
    },
  ];
  return (
    <div className="about-container">
      <h1 className="about-title">ABOUT US</h1>
      <h6>Minecraft Stories</h6>

    
      {sectionsData.map((section, index) => (
        <Section
          key={index}
          heading={section.heading}
          title={section.title}
          description={section.description}
          buttonText={section.buttonText}
          imageSrc={section.imageSrc}
          link={section.link}
          reverse={section.reverse}
        />
      ))}

    </div>
  );
};

export default page;
