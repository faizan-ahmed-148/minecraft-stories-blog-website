import Head from 'next/head'

const ComponentTitle = ({settings_data,description, title, currentUrl}) => {
  return (
    <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content="Minecraft, Guides, Tutorials, Tips, Tricks" />
    <meta property="og:title" content={`${title}`} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={settings_data?.settings.logo} />
    <meta property="og:url" content={currentUrl} />
    <meta property="og:type" content="website" />
    <meta property="og:image:secure_url" content={settings_data?.settings.logo} />
    <meta property="og:image:type" content="image/[Image format like jpg, png, jpeg]" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={`${title} | Minecraft Guides`} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={settings_data?.settings.logo} />
    <meta name="twitter:url" content={currentUrl} />
    <link rel="canonical" href={currentUrl} />
  </Head>
  )
}

export default ComponentTitle
