import React from "react";
import "./privacy.scss";
import horizon_line from '../../../public/assets/images/Horizonline.svg'
import Image from 'next/image';
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

    const postTitle = `${data?.settings?.site_name} - Privacy Policy`;
    const postDescription = `${data?.settings?.site_name} - Privacy Policy`;
    const postImage = data?.settings?.logo || ''; // Fallback image
    const postUrl = `${process.env.NEXT_PUBLIC_URL}/privacyPolicy`;

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
const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <header className="privacy-header">
        <h1 className="privacy-title">PRIVACY POLICY</h1>
        <h2 className="privacy-subtitle">MINECRAFT STORIES</h2>
      </header>

      <main className="privacy-content">
        <section className="privacy-section">
          <p>
            Welcome to <strong>MinecraftStories.gg</strong> ("we," "our," "us"). Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect the data of our users.
          </p>
          <p>
            By accessing or using MinecraftStories.gg, you agree to the practices described in this Privacy Policy. If you have any questions, feel free to contact us at <strong><a style={{color: "blue"}} href="mailto:hello@minecraftstories.gg">hello@minecraftstories.gg</a></strong>.
          </p>
          <p>
            <strong>Disclaimer:</strong> We are not affiliated with Mojang Studios or Microsoft. Minecraft is the property of Mojang Studios and Microsoft. Our content is independently created and provided under the Creative Commons License Attribution (CCLA).
          </p>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="privacy-section">
          <h3>Information We Collect</h3>
          <p>We collect different types of information to improve user experience and website functionality.</p>
          <h4>Personal Information (Provided by Users)</h4>
          <ul>
            <li>Name (for account identification)</li>
            <li>Username (chosen by the user)</li>
            <li>Email Address (for login, notifications, and support)</li>
            <li>Google Authentication Data (if signing in via Google)</li>
          </ul>

          <h4>Automatically Collected Data</h4>
          <ul>
            <li>IP address and browser type</li>
            <li>Device type and operating system</li>
            <li>Usage data (e.g., pages visited, time spent, actions taken)</li>
            <li>Cookies and tracking technologies (see Section 7)</li>
          </ul>

          <h4>User-Generated Content</h4>
          <ul>
            <li>Publish articles related to Minecraft (approved by moderators)</li>
            <li>Like, comment on, and share tutorials on social media (Facebook, Instagram, etc.)</li>
          </ul>

          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="privacy-section">
          <h3>How We Use Your Information</h3>
          <p>We use collected information to:</p>
          <ul>
            <li>Provide and maintain user accounts</li>
            <li>Authenticate users via Google Sign-In</li>
            <li>Allow users to publish, like, comment, and share content</li>
            <li>Send important updates and notifications</li>
            <li>Enhance website security and prevent fraudulent activities</li>
            <li>Improve website performance and user experience</li>
          </ul>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="privacy-section">
          <h3>Data Sharing and Disclosure</h3>
          <p>We do not sell or rent personal data. However, we may share data:</p>
          <ul>
            <li><strong>With Service Providers:</strong> For authentication, hosting, and analytics</li>
            <li><strong>For Legal Compliance:</strong> If required by law</li>
            <li><strong>In Case of Business Transfer:</strong> If ownership changes, user data may be transferred</li>
          </ul>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="privacy-section">
          <h3>Content Moderation & Licensing</h3>
          <ul>
            <li>All website content is licensed under Creative Commons License Attribution (CCLA).</li>
            <li>Most artwork and images used are created by our team.</li>
            <li>User-submitted content must comply with our moderation policies before approval.</li>
          </ul>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="privacy-section">
          <h3>Notifications & User Preferences</h3>
          <p>Our website includes a notification system that asks users via a popup to allow or block notifications. Users can adjust their notification preferences at any time.</p>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="privacy-section">
          <h3>Cookies and Tracking Technologies</h3>
          <p>We use cookies to:</p>
          <ul>
            <li>Remember login sessions</li>
            <li>Improve website functionality</li>
            <li>Analyze website performance and traffic</li>
          </ul>
          <p>Users can manage cookie preferences through browser settings.</p>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="privacy-section">
          <h3>Third-Party Links & External Content</h3>
          <p>Our website may contain links to third-party platforms (e.g., Facebook, Instagram). We are not responsible for third-party privacy policies or content.</p>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="privacy-section">
          <h3>Account Management & User Rights</h3>
          <ul>
            <li>Update their profile information</li>
            <li>Request account deletion by contacting <strong><a href="mailto:hello@minecraftstories.gg" style={{color: "blue"}}>hello@minecraftstories.gg</a></strong></li>
            <li>Manage cookies and privacy settings</li>
          </ul>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="privacy-section">
          <h3>Limitation of Liability</h3>
          <ul>
            <li>We do not guarantee uninterrupted website access.</li>
            <li>We are not responsible for user-generated content.</li>
            <li>We do not endorse third-party services linked on our website.</li>
          </ul>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="privacy-section">
          <h3>Changes to This Privacy Policy</h3>
          <p>We may update this Privacy Policy periodically. Users will be notified of significant changes, and the latest version will always be available on our website.</p>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="privacy-section">
          <h3>Contact Us</h3>
          <p>For any questions or privacy-related concerns, contact us at <strong><a style={{color: "blue"}} href="mailto:hello@minecraftstories.gg">hello@minecraftstories.gg</a></strong>.</p>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
