import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
}

function SEO({ title, description, canonical }: SEOProps) {
  const baseTitle = "Full Stack Developer Nepal | Nikesh Adhikari";
  const safeTitle = title.trim();

  return (
    <Helmet prioritizeSeoTags>
      <title>{safeTitle ? `${safeTitle} | ${baseTitle}` : baseTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
}

export default SEO;
