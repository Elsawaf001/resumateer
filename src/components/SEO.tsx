import Head from "next/head";

export default function SEO({ title, description, keywords, url, image }: { 
    title: string; 
    description: string; 
    keywords?: string; 
    url?: string; 
    image?: string; 
}) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            {url && <meta property="og:url" content={url} />}
            {image && <meta property="og:image" content={image} />}
            {/* Add more metadata as needed */}
        </Head>
    );
}
