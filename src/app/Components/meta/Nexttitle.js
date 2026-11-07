"use client";
import Head from "next/head";
import React from "react";

const Nexttitle = ({ data }) => {

  return (
    <>
      <Head>
        <title id="title">{data?.options?.meta_title || ""}</title>

        <meta
          name="description"
          content={data?.options?.meta_description || ""}
        />
        <meta property="og:site_name" content={data?.settings?.site_name} />
        <link
          id="restaurant-favicon"
          rel="icon"
          href={data?.settings?.logo}
          type="image/x-icon"
        />
        <link
          id="restaurant-favicon-apple"
          rel="apple-touch-icon"
          href={data?.settings?.logo}
          type="image/x-icon"
        />
        <link
          rel="shortcut icon"
          href={data?.settings?.logo}
          type="image/x-icon"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={data?.options?.meta_title || ""} />
        <meta
          property="og:description"
          content={data?.options?.meta_description || ""}
        />
        <meta property="og:url" content={"https://minecraftstories.gg/"} />
        <meta property="og:image" content={data?.settings?.logo} />
        <meta property="og:image:type" content="image/[Image format like jpg, png, jpeg]" />
        <meta property="og:image:secure_url" content={data?.settings?.logo} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content={data?.settings?.logo} />
        <meta name="twitter:title" content={data?.options?.meta_title } />
        <meta name="twitter:description" content={data?.options?.meta_description} />
        <meta name="twitter:image" content={data?.settings?.logo} />
        <link rel="canonical" href={"https://minecraftstories.gg/"} />
      </Head>
    </>
  );
};

export default Nexttitle;
