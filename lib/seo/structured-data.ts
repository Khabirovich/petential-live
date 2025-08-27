// Simplified essential schemas only

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PETential",
    "description": "Pet breed matching platform helping users find their perfect companion",
    "url": "https://petential.es",
    "logo": "https://petential.es/images/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://petential.es/contact"
    }
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PETential",
    "description": "Find your perfect pet match with our intelligent breed matching quiz",
    "url": "https://petential.es",
    "publisher": {
      "@type": "Organization",
      "name": "PETential"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://petential.es/breeds?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}