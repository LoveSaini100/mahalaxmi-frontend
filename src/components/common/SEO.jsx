import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  const defaultTitle = 'Best Property Dealer in Biharigarh & Dehradun | Delhi Dehradun Expressway Property - Shree Mahalaxmi Properties and Construction (SMPC)';
  const defaultDesc = 'Shree Mahalaxmi Properties and Construction (SMPC) is the Best property Dealer in Biharigarh & Best Property Advisor in Dehradun. Discover Best Property in Biharigarh, Best Property in Dehradun & Property In Dehradun Expressway Corridor.';
  const defaultKeywords = 'Shree Mahalaxmi Properties and Construction, SMPC, Best property Dealer in Biharigarh, Best Property Advisor in Biharigarh, Best Property in Biharigarh, Best Property Dealer in Dehradun, Best Property in Dehradun, Best property advisor in Dehradun, Property In Dehradun Expressway Corridor, Delhi Dehradun Expressway Property, Properties Delhi Dehradun Expressway way, Real Estate Biharigarh, Dehradun Saharanpur Highway plots, Pencho Restaurant Biharigarh, Commercial plot Biharigarh';

  const pageTitle = title || defaultTitle;
  const pageDesc = description || defaultDesc;
  const pageKeywords = keywords || defaultKeywords;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDesc} />
      <meta name="keywords" content={pageKeywords} />

      {/* OpenGraph Meta Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
