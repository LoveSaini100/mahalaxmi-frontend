import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  const defaultTitle = 'Real Estate in Biharigarh Saharanpur | Mahalaxmi';
  const defaultDesc = 'Find verified plots, villas, and commercial land near Pencho Restaurant on Dehradun-Saharanpur Highway, Biharigarh. Contact Mahalaxmi Property today.';
  const defaultKeywords = 'Real Estate Biharigarh, Property in Saharanpur, Dehradun Saharanpur Highway plots, Pencho Restaurant Biharigarh, Land in 247662, Chhutmalpur property, Mohand plots, Gagalheri land, Commercial plot Biharigarh, Villa Saharanpur, Mahalaxmi Property';

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
