import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata"
import HowToChoosePetClient from './HowToChoosePetClient';

const seoConfig = {
  title: 'How to Choose and Buy a Pet - Complete Guide | PETential',
  description: 'Complete guide on how to choose and buy the perfect pet. Learn about pet selection, preparation, buying process, and essential tips for new pet owners.',
  keywords: ['how to choose a pet', 'buying a pet guide', 'pet selection tips', 'new pet owner guide', 'pet adoption advice', 'choosing the right pet'],
  canonical: '/how-to-choose-pet',
  openGraph: {
    title: 'How to Choose and Buy a Pet - Complete Guide | PETential',
    description: 'Complete guide on how to choose and buy the perfect pet for your lifestyle and family.',
    type: 'article',
  }
};

export const metadata: Metadata = generateSEOMetadata(seoConfig);

export default function HowToChoosePetPage() {
  return <HowToChoosePetClient />;
}