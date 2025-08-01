'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from "@/lib/i18n/context"

// Import breed data
import dogBreeds from '../../data/breeds.json'
import catBreeds from '../../data/cats_breeds.json'
import { getBreedImageWithFallback } from '../../lib/breed-images'

interface DogBreed {
  "№": number
  "Dog Breeds": string
  "Dog Size": number
  "Owner Experience": number
  "Guarding Level": number
  "Kid-Friendly": number
  "Dog Friendly": number
  "Tolerates Being Alone": number
  "Drooling Level": number
  "Grooming Level": number
  "Training Level": number
  "Tendency To Bark Or Howl": number
  "Walk Activity": number
  "Exercise Needs": number
  "Hyperalergic (1 - no, 2 - yes)": number
}

interface CatBreed {
  "№": number
  "Cat Breeds": string
  "Activity": number
  "Sociable": number
  "Talkative": number
  "Size": number
  "Grooming": number
  "Allergy": number
  "Home conditions": number
  "Good with children": number
}

export default function BreedsPageClient() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'dogs' | 'cats'>('dogs')
  const [searchTerm, setSearchTerm] = useState('')
  const [displayCount, setDisplayCount] = useState(12)

  // Filter breeds based on search term
  const filteredDogBreeds = dogBreeds.filter((breed: DogBreed) =>
    breed["Dog Breeds"].toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredCatBreeds = catBreeds.filter((breed: CatBreed) =>
    breed["Cat Breeds"].toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Reset display count when switching tabs or searching
  useEffect(() => {
    setDisplayCount(12)
  }, [activeTab, searchTerm])

  const getSizeLabel = (size: number) => {
    const labels = ['', t('breeds.size.small'), t('breeds.size.mediumSmall'), t('breeds.size.medium'), t('breeds.size.mediumLarge'), t('breeds.size.large')]
    return labels[size] || t('breeds.unknown')
  }

  const getActivityLabel = (activity: number) => {
    const labels = ['', t('breeds.activity.low'), t('breeds.activity.moderate'), t('breeds.activity.active'), t('breeds.activity.high'), t('breeds.activity.veryHigh')]
    return labels[activity] || t('breeds.unknown')
  }

  return (
    <div className="breeds-page">
      {/* Hero Section */}
      <section className="breeds-hero">
        <div className="container">
          <div className="breeds-hero-content">
            <h1 className="breeds-hero-title">{t('breeds.title')}</h1>
            <p className="breeds-hero-description">
              {t('breeds.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="breeds-controls">
        <div className="container">
          {/* Pet Type Toggle */}
          <div className="pet-type-toggle">
            <button
              className={`toggle-btn ${activeTab === 'dogs' ? 'active' : ''}`}
              onClick={() => setActiveTab('dogs')}
            >
              🐕 {t('breeds.dogs')} ({dogBreeds.length})
            </button>
            <button
              className={`toggle-btn ${activeTab === 'cats' ? 'active' : ''}`}
              onClick={() => setActiveTab('cats')}
            >
              🐱 {t('breeds.cats')} ({catBreeds.length})
            </button>
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder={t('breeds.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <div className="search-results-count">
                {activeTab === 'dogs' ? filteredDogBreeds.length : filteredCatBreeds.length} {t('breeds.breedsFound')}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Breeds Grid */}
      <section className="breeds-grid-section">
        <div className="container">
          <div className="breeds-grid">
            {activeTab === 'dogs' ? (
              filteredDogBreeds.slice(0, displayCount).map((breed: DogBreed) => (
                <Link
                  key={breed["№"]}
                  href={`/breed/dog/${encodeURIComponent(breed["Dog Breeds"])}`}
                  className="breed-card"
                >
                  <div className="breed-image-container">
                    <Image
                      src={getBreedImageWithFallback(breed["Dog Breeds"], 'dog')}
                      alt={breed["Dog Breeds"]}
                      width={300}
                      height={200}
                      className="breed-image"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder-pet.svg';
                      }}
                    />
                  </div>
                  <div className="breed-info">
                    <h3 className="breed-name">{breed["Dog Breeds"]}</h3>
                    <div className="breed-stats">
                      <div className="stat">
                        <span className="stat-label">{t('breeds.labels.size')}:</span>
                        <span className="stat-value">{getSizeLabel(breed["Dog Size"])}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">{t('breeds.labels.exercise')}:</span>
                        <span className="stat-value">{getActivityLabel(breed["Exercise Needs"])}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">{t('breeds.labels.kidFriendly')}:</span>
                        <span className="stat-value">{getActivityLabel(breed["Kid-Friendly"])}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              filteredCatBreeds.slice(0, displayCount).map((breed: CatBreed) => (
                <Link
                  key={breed["№"]}
                  href={`/breed/cat/${encodeURIComponent(breed["Cat Breeds"])}`}
                  className="breed-card"
                >
                  <div className="breed-image-container">
                    <Image
                      src={getBreedImageWithFallback(breed["Cat Breeds"], 'cat')}
                      alt={breed["Cat Breeds"]}
                      width={300}
                      height={200}
                      className="breed-image"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder-pet.svg';
                      }}
                    />
                  </div>
                  <div className="breed-info">
                    <h3 className="breed-name">{breed["Cat Breeds"]}</h3>
                    <div className="breed-stats">
                      <div className="stat">
                        <span className="stat-label">{t('breeds.labels.size')}:</span>
                        <span className="stat-value">{getSizeLabel(breed["Size"])}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">{t('breeds.labels.activity')}:</span>
                        <span className="stat-value">{getActivityLabel(breed["Activity"])}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">{t('breeds.labels.children')}:</span>
                        <span className="stat-value">{getActivityLabel(breed["Good with children"])}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Load More Button */}
          {((activeTab === 'dogs' && filteredDogBreeds.length > displayCount) || 
            (activeTab === 'cats' && filteredCatBreeds.length > displayCount)) && (
            <div className="load-more-container">
              <button
                onClick={() => setDisplayCount(prev => prev + 12)}
                className="btn-secondary load-more-btn"
              >
                {t('breeds.loadMore')}
              </button>
            </div>
          )}

          {/* No Results Message */}
          {((activeTab === 'dogs' && filteredDogBreeds.length === 0) || 
            (activeTab === 'cats' && filteredCatBreeds.length === 0)) && (
            <div className="no-results">
              <p>{t('breeds.noResults')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}