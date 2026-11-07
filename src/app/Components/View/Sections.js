import React from "react";
import "../../about/about.scss";
import Link from "next/link";
import Image from "next/image";

const Section = ({ heading, title, description, buttonText, imageSrc, link, reverse }) => {
  return (
    <div  className={`section ${reverse ? 'reverse' : ''}`}>
      <div className="section-image">
        <Image src={imageSrc} width={500} height={500} alt={title} className="image" />
      </div>
      <div className="section-content">
        <h4 className="section-heading">{heading}</h4>
        <h1 className="section-title">{title}</h1>
        <p className="section-description">{description}</p>
        <Link href={link} className="contact-btn">{buttonText}</Link>
      </div>
    </div>
  );
};

export default Section;
