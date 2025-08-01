import { generateJsonLd } from '@/lib/seo/metadata';

interface JsonLdScriptProps {
  data: any;
}

export function JsonLdScript({ data }: JsonLdScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: generateJsonLd(data) }}
    />
  );
}