import React from 'react';
import './terms.scss';
import horizon_line from '../../../public/assets/images/Horizonline.svg';
import Image from 'next/image';
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

    const postTitle = `${data?.settings?.site_name} - Terms & Conditions`;
    const postDescription = `${data?.settings?.site_name} - Terms & Condition`;
    const postImage = data?.settings?.logo || ''; // Fallback image
    const postUrl = `${process.env.NEXT_PUBLIC_URL}/terms&conditions`;

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

const Terms = () => {
  return (
    <div className="terms-container">
      <header className="terms-header">
        <h1 className="terms-title">TERMS AND CONDITIONS</h1>
        <h2 className="terms-subtitle">MINECRAFT STORIES</h2>
      </header>

      <main className="terms-content">
        <section className="terms-section">
          <p>Welcome to <strong>MinecraftStories.gg</strong> ("we," "our," "us"). These Terms and Conditions ("Terms") govern your use of our website and services. By accessing or using MinecraftStories.gg, you agree to comply with these Terms.</p>
          <p>If you have any questions, contact us at <strong><a style={{color: "blue"}} href="mailto:hello@minecraftstories.gg">hello@minecraftstories.gg</a></strong>.</p>
          <p><strong>Disclaimer:</strong> We are not affiliated with Mojang Studios or Microsoft. Minecraft is the property of Mojang Studios and Microsoft. Our website operates independently under the Creative Commons License Attribution (CCLA).</p>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="terms-section">
          <h3>Business Identification</h3>
          <ul>
            <li><strong>Website Name:</strong> MinecraftStories.gg</li>
            <li><strong>Service Type:</strong> An informational website providing Minecraft-related content, including crafting guides, tutorials, and articles.</li>
            <li><strong>Email Contact:</strong> <a style={{color: "blue"}} href="mailto:hello@minecraftstories.gg">hello@minecraftstories.gg</a></li>
          </ul>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="terms-section">
          <h3>Description of Services</h3>
          <ul>
            <li>MinecraftStories.gg is an informational platform offering articles, tutorials, and user-generated content related to Minecraft.</li>
            <li>Users can:
              <ul>
                <li>Read Minecraft-related articles and tutorials</li>
                <li>Like, comment on, and share content on social media (Facebook, Instagram, etc.)</li>
                <li>Register an account and submit their own articles (subject to moderator approval)</li>
              </ul>
            </li>
            <li>The website includes a notification system (popup asking users to allow or block notifications).</li>
          </ul>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="terms-section">
          <h3>User Accounts and Registration</h3>
          <ul>
            <li>Users must register an account to access certain features.</li>
            <li>Registration options:
              <ul>
                <li>Google Sign-In</li>
                <li>Email-based registration (Username, Name, Email, Password)</li>
              </ul>
            </li>
            <li>Users are responsible for maintaining account security.</li>
            <li>We reserve the right to suspend or terminate accounts violating these Terms.</li>
          </ul>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="terms-section">
          <h3>Rights of Use and Content Ownership</h3>
          <ul>
            <li>Users retain ownership of their submitted articles but grant us a license to display them on our website.</li>
            <li>Most artwork and images used are created by our team.</li>
            <li>All content is licensed under Creative Commons License Attribution (CCLA), meaning users can share content with proper credit.</li>
          </ul>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="terms-section">
          <h3>User Responsibilities and Acceptable Use</h3>
          <p>Users must NOT:</p>
          <ul>
            <li>Post inappropriate, harmful, or offensive content.</li>
            <li>Share false information or impersonate others.</li>
            <li>Violate copyright laws by posting unauthorized content.</li>
            <li>Engage in hacking, disruptive activities, or misuse the website.</li>
          </ul>
          <p>Failure to comply may result in account suspension or banning.</p>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="terms-section">
          <h3>Risk Allocation, Liability, and Disclaimers</h3>
          <ul>
            <li>No Guarantee of Accuracy: We strive to provide accurate information but do not guarantee that all content is error-free or up-to-date.</li>
            <li>Third-Party Content: Our website may contain external links, but we are not responsible for third-party sites or their content.</li>
            <li>Service Availability: We do not guarantee uninterrupted access to the website.</li>
            <li>Use at Your Own Risk: Users access our website at their own risk.</li>
          </ul>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="terms-section">
          <h3>Privacy and Data Protection</h3>
          <ul>
            <li>We collect and use personal data as outlined in our Privacy Policy.</li>
            <li>Key points:
              <ul>
                <li>Secure storage of user data.</li>
                <li>No targeted advertising based on personal data.</li>
                <li>Users can request account deletion via <a style={{color: "blue"}} href="mailto:hello@minecraftstories.gg">hello@minecraftstories.gg</a>.</li>
              </ul>
            </li>
          </ul>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="terms-section">
          <h3>Refunds, Payments, and Purchases</h3>
          <p>MinecraftStories.gg is a free-to-use website.</p>
          <p>No payment, subscription, or product purchases are required to access the service.</p>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="terms-section">
          <h3>Account Termination and Suspension</h3>
          <ul>
            <li>We may terminate or suspend accounts if:
              <ul>
                <li>A user violates these Terms.</li>
                <li>A parent/guardian requests account removal (if applicable).</li>
                <li>Misuse, fraud, or suspicious activity is detected.</li>
                <li>Users can request account deletion via <a style={{color: "blue"}} href="mailto:hello@minecraftstories.gg">hello@minecraftstories.gg</a>.</li>
              </ul>
            </li>
          </ul>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="terms-section">
          <h3>Notification System and Cookie Usage</h3>
          <p>Users can choose to allow or block notifications via a popup.
          Cookies are used to enhance user experience and improve website performance.</p>
          <p>Users can manage cookie preferences in their browser settings.</p>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="terms-section">
          <h3>Updates to These Terms</h3>
          <p>We may update these Terms periodically. Users will be notified of major changes, and the latest version will always be available on the website.</p>
          <div className='hori_line'>
            <Image className='horizon-line' src={horizon_line} alt="horizon line" />
          </div>
        </section>

        <section className="terms-section">
          <h3>Contact Information</h3>
          <p>For any questions or concerns, please contact us at: <strong><a style={{color: "blue"}} href="mailto:hello@minecraftstories.gg">hello@minecraftstories.gg</a></strong></p>
        </section>
      </main>
    </div>
  );
};

export default Terms;
