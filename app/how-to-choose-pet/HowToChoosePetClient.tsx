"use client"

import Link from "next/link"
import { useState } from "react"
import { useLanguage } from "@/lib/i18n/context"

export default function HowToChoosePetClient() {
  const { t } = useLanguage()
  const [selectedPet, setSelectedPet] = useState<'kitten' | 'puppy'>('kitten')
  const [selectedClass, setSelectedClass] = useState<'pet' | 'breed' | 'show'>('pet')

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-modern-first">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--spacing-3xl)",
              alignItems: "center",
              minHeight: "500px"
            }}
            className="hero-grid"
          >
            <style jsx>{`
              @media (max-width: 768px) {
                .hero-grid {
                  grid-template-columns: 1fr !important;
                  gap: var(--spacing-xl) !important;
                  text-align: center;
                }
              }
            `}</style>
            {/* Left Content */}
            <div>
              {/* Pet Type Selector */}
              <div style={{ marginBottom: "var(--spacing-xl)" }}>
                <p
                  style={{
                    fontSize: "var(--font-size-body)",
                    color: "var(--petential-haiti-60)",
                    marginBottom: "var(--spacing-md)",
                    margin: "0 0 var(--spacing-md) 0"
                  }}
                >
{t('howToChoosePet.choosePet')}
                </p>
                <div style={{ display: "flex", gap: "var(--spacing-sm)" }}>
                  <button
                    onClick={() => {
                      setSelectedPet('kitten');
                      setSelectedClass('pet'); // Reset to default class
                    }}
                    className={selectedPet === 'kitten' ? 'btn-primary' : 'btn-secondary'}
                  >
                    <span style={{ fontSize: "20px", marginRight: "8px" }}>🐱</span>
                    {t('howToChoosePet.kitten')}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPet('puppy');
                      setSelectedClass('pet'); // Reset to default class
                    }}
                    className={selectedPet === 'puppy' ? 'btn-primary' : 'btn-secondary'}
                  >
                    <span style={{ fontSize: "20px", marginRight: "8px" }}>🐶</span>
                    {t('howToChoosePet.puppy')}
                  </button>
                </div>
              </div>

              {/* Main Heading */}
              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--font-size-h1)",
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--petential-dark)",
                  marginBottom: "var(--spacing-lg)",
                  lineHeight: "var(--line-height-tight)"
                }}
              >
{t('howToChoosePet.title')}
              </h1>

              {/* Subheading */}
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--font-size-h3)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--petential-dark)",
                  marginBottom: "var(--spacing-md)"
                }}
              >
{t('howToChoosePet.subtitle')}
              </h2>

              {/* Description */}
              <p
                style={{
                  fontSize: "var(--font-size-body)",
                  color: "var(--petential-haiti-60)",
                  lineHeight: "var(--line-height-normal)",
                  margin: 0
                }}
              >
                {t('howToChoosePet.description')}
              </p>
            </div>

            {/* Right Image */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <img
                src={selectedPet === 'kitten' ? "/images/default_cat.jpg" : "/images/default_dog.jpg"}
                alt={selectedPet === 'kitten' ? t('howToChoosePet.altText.cuteKitten') : t('howToChoosePet.altText.cutePuppy')}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "var(--radius-xl)"
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = selectedPet === 'kitten'
                    ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=400&fit=crop&crop=face'
                    : 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=400&fit=crop&crop=face';
                }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Main Content Sections */}
      <section className="section-modern section-alabaster">
        <div className="container">

          {/* Process Steps Section */}
          <div style={{ marginBottom: "var(--spacing-4xl)" }}>
            {/* Section Title */}
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-h1)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--petential-dark)",
                marginBottom: "var(--spacing-2xl)",
                textAlign: "left"
              }}
            >
              {selectedPet === 'kitten' ? t('howToChoosePet.howToChooseKitten') : t('howToChoosePet.howToChoosePuppy')}
            </h2>

            {/* Three Cards Grid - SMALLER AND ALIGNED */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "var(--spacing-lg)",
                marginBottom: "var(--spacing-2xl)",
                alignItems: "stretch"
              }}
              className="process-cards-grid"
            >
              <style jsx>{`
                @media (max-width: 768px) {
                  .process-cards-grid {
                    grid-template-columns: 1fr !important;
                    gap: var(--spacing-md) !important;
                  }
                }
              `}</style>
              {/* Card 1 */}
              <div className="card-modern" style={{ position: "relative", display: "flex", flexDirection: "column" }}>
                {/* Step Number */}
                <div
                  style={{
                    position: "absolute",
                    top: "-15px",
                    left: "20px",
                    width: "30px",
                    height: "30px",
                    backgroundColor: "white",
                    border: "2px solid var(--petential-primary)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--font-size-body)",
                    fontWeight: "var(--font-weight-bold)",
                    color: "var(--petential-dark)"
                  }}
                >
                  1
                </div>

                <div style={{ padding: "var(--spacing-lg)", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h4)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-md)",
                      textAlign: "center",
                      lineHeight: "var(--line-height-tight)"
                    }}
                  >
                    {t('howToChoosePet.step1Title')}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      textAlign: "center",
                      margin: 0,
                      flex: 1
                    }}
                  >
                    {t('howToChoosePet.step1Text')}
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="card-modern" style={{ position: "relative", display: "flex", flexDirection: "column" }}>
                {/* Step Number */}
                <div
                  style={{
                    position: "absolute",
                    top: "-15px",
                    left: "20px",
                    width: "30px",
                    height: "30px",
                    backgroundColor: "white",
                    border: "2px solid var(--petential-primary)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--font-size-body)",
                    fontWeight: "var(--font-weight-bold)",
                    color: "var(--petential-dark)"
                  }}
                >
                  2
                </div>

                <div style={{ padding: "var(--spacing-lg)", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h4)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-md)",
                      textAlign: "center",
                      lineHeight: "var(--line-height-tight)"
                    }}
                  >
                    {t('howToChoosePet.step2Title')}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      textAlign: "center",
                      margin: 0,
                      flex: 1
                    }}
                  >
                    {t('howToChoosePet.step2Text')}
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="card-modern" style={{ position: "relative", display: "flex", flexDirection: "column" }}>
                {/* Step Number */}
                <div
                  style={{
                    position: "absolute",
                    top: "-15px",
                    left: "20px",
                    width: "30px",
                    height: "30px",
                    backgroundColor: "white",
                    border: "2px solid var(--petential-primary)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--font-size-body)",
                    fontWeight: "var(--font-weight-bold)",
                    color: "var(--petential-dark)"
                  }}
                >
                  3
                </div>

                <div style={{ padding: "var(--spacing-lg)", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h4)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-md)",
                      textAlign: "center",
                      lineHeight: "var(--line-height-tight)"
                    }}
                  >
                    {t('howToChoosePet.step3Title')}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      textAlign: "center",
                      margin: 0,
                      flex: 1
                    }}
                  >
                    {t('howToChoosePet.step3Text')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Cat Pricing Section - Only show for kittens */}
          {selectedPet === 'kitten' && (
            <div style={{ marginBottom: "var(--spacing-4xl)" }}>
              {/* Section Title */}
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--font-size-h1)",
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--petential-dark)",
                  marginBottom: "var(--spacing-2xl)",
                  textAlign: "left"
                }}
              >
                {t('howToChoosePet.whatDeterminesKittenPrices')}
              </h2>

              {/* Class Selection and Description */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "var(--spacing-3xl)",
                  alignItems: "center",
                  marginBottom: "var(--spacing-3xl)"
                }}
                className="pricing-grid"
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h3)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    {t('howToChoosePet.priceDependsOnClass')}
                  </h3>

                  {/* Class Selector Buttons */}
                  <div style={{ display: "flex", gap: "var(--spacing-sm)", marginBottom: "var(--spacing-lg)" }}>
                    <button
                      onClick={() => setSelectedClass('pet')}
                      className={selectedClass === 'pet' ? 'btn-primary' : 'btn-secondary'}
                    >
                      {t('howToChoosePet.pet')}
                    </button>
                    <button
                      onClick={() => setSelectedClass('breed')}
                      className={selectedClass === 'breed' ? 'btn-primary' : 'btn-secondary'}
                    >
                      {t('howToChoosePet.breed')}
                    </button>
                    <button
                      onClick={() => setSelectedClass('show')}
                      className={selectedClass === 'show' ? 'btn-primary' : 'btn-secondary'}
                    >
                      {t('howToChoosePet.show')}
                    </button>
                  </div>

                  {/* Class Description */}
                  <div
                    style={{
                      backgroundColor: "var(--petential-alabaster)",
                      padding: "var(--spacing-lg)",
                      borderRadius: "var(--radius-lg)"
                    }}
                  >
                    {selectedClass === 'pet' && (
                      <>
                        <h4
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "var(--font-size-h4)",
                            fontWeight: "var(--font-weight-semibold)",
                            color: "var(--petential-dark)",
                            marginBottom: "var(--spacing-sm)"
                          }}
                        >
                          {t('howToChoosePet.petClass')}
                        </h4>
                        <p
                          style={{
                            fontSize: "var(--font-size-body)",
                            color: "var(--petential-haiti-60)",
                            lineHeight: "var(--line-height-normal)",
                            margin: 0
                          }}
                        >
                          {t('howToChoosePet.petClassDesc')}
                        </p>
                      </>
                    )}
                    {selectedClass === 'breed' && (
                      <>
                        <h4
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "var(--font-size-h4)",
                            fontWeight: "var(--font-weight-semibold)",
                            color: "var(--petential-dark)",
                            marginBottom: "var(--spacing-sm)"
                          }}
                        >
                          {t('howToChoosePet.breedClass')}
                        </h4>
                        <p
                          style={{
                            fontSize: "var(--font-size-body)",
                            color: "var(--petential-haiti-60)",
                            lineHeight: "var(--line-height-normal)",
                            margin: 0
                          }}
                        >
                          {t('howToChoosePet.breedClassDesc')}
                        </p>
                      </>
                    )}
                    {selectedClass === 'show' && (
                      <>
                        <h4
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "var(--font-size-h4)",
                            fontWeight: "var(--font-weight-semibold)",
                            color: "var(--petential-dark)",
                            marginBottom: "var(--spacing-sm)"
                          }}
                        >
                          {t('howToChoosePet.showClass')}
                        </h4>
                        <p
                          style={{
                            fontSize: "var(--font-size-body)",
                            color: "var(--petential-haiti-60)",
                            lineHeight: "var(--line-height-normal)",
                            margin: 0
                          }}
                        >
                          {t('howToChoosePet.showClassDesc')}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Cat Image - Dynamic based on selected class */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <img
                    src={`/how_images/cat_${selectedClass}.jpg`}
                    alt={`${selectedClass} class kitten`}
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "var(--radius-xl)"
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&crop=face';
                    }}
                  />
                </div>
              </div>

              {/* Pricing Comparison - BIGGER TEXT */}
              <div style={{ marginBottom: "var(--spacing-2xl)" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--font-size-h3)",
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--petential-dark)",
                    marginBottom: "var(--spacing-xl)",
                    textAlign: "center"
                  }}
                >
                  {t('howToChoosePet.pricesWithWithoutDocs')}
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "var(--spacing-lg)"
                  }}
                  className="price-comparison-grid"
                >
                  {/* With Documents */}
                  <div
                    style={{
                      backgroundColor: "var(--petential-alabaster)",
                      padding: "var(--spacing-lg)",
                      borderRadius: "var(--radius-lg)",
                      height: "fit-content"
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "var(--font-size-h4)",
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--petential-dark)",
                        marginBottom: "var(--spacing-md)",
                        lineHeight: "var(--line-height-tight)"
                      }}
                    >
                      {t('howToChoosePet.withDocsTitle')}
                    </h4>
                    <p
                      style={{
                        fontSize: "var(--font-size-body)",
                        color: "var(--petential-haiti-60)",
                        lineHeight: "var(--line-height-normal)",
                        margin: 0
                      }}
                    >
                      {t('howToChoosePet.withDocsDesc')}
                    </p>
                  </div>

                  {/* Without Documents */}
                  <div
                    style={{
                      backgroundColor: "var(--petential-alabaster)",
                      padding: "var(--spacing-lg)",
                      borderRadius: "var(--radius-lg)",
                      height: "fit-content"
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "var(--font-size-h4)",
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--petential-dark)",
                        marginBottom: "var(--spacing-md)",
                        lineHeight: "var(--line-height-tight)"
                      }}
                    >
                      {t('howToChoosePet.withoutDocsTitle')}
                    </h4>
                    <p
                      style={{
                        fontSize: "var(--font-size-body)",
                        color: "var(--petential-haiti-60)",
                        lineHeight: "var(--line-height-normal)",
                        margin: 0
                      }}
                    >
                      {t('howToChoosePet.withoutDocsDesc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Expert Advice Article Section - Only for kittens */}
              <div style={{ marginTop: "var(--spacing-4xl)" }}>
                <div style={{ marginBottom: "var(--spacing-2xl)" }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h1)",
                      fontWeight: "var(--font-weight-bold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-lg)",
                      textAlign: "left"
                    }}
                  >
                    {t('howToChoosePet.expertAdvice')}
                  </h2>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-xl)"
                    }}
                  >
                    {t('howToChoosePet.expertAdviceKitten')}
                  </p>

                  {/* Article Image */}
                  <div style={{ marginBottom: "var(--spacing-xl)" }}>
                    <img
                      src="/how_images/article_cat_1.jpg"
                      alt="Expert advice on choosing kittens"
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        height: "auto",
                        borderRadius: "var(--radius-lg)",
                        margin: "0 auto",
                        display: "block"
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=350&fit=crop&crop=face';
                      }}
                    />
                  </div>

                  {/* Article Navigation */}
                  <div
                    style={{
                      backgroundColor: "var(--petential-alabaster)",
                      padding: "var(--spacing-lg)",
                      borderRadius: "var(--radius-lg)",
                      marginBottom: "var(--spacing-2xl)"
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "var(--font-size-h4)",
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--petential-dark)",
                        marginBottom: "var(--spacing-md)"
                      }}
                    >
                      {t('howToChoosePet.expertAdvice.contents')}
                    </h3>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      <li style={{ marginBottom: "var(--spacing-sm)" }}>
                        <span style={{ color: "var(--petential-haiti-60)" }}>{t('howToChoosePet.expertAdvice.kitten.content1')}</span>
                      </li>
                      <li style={{ marginBottom: "var(--spacing-sm)" }}>
                        <span style={{ color: "var(--petential-haiti-60)" }}>{t('howToChoosePet.expertAdvice.kitten.content2')}</span>
                      </li>
                      <li style={{ marginBottom: "var(--spacing-sm)" }}>
                        <span style={{ color: "var(--petential-haiti-60)" }}>{t('howToChoosePet.expertAdvice.kitten.content3')}</span>
                      </li>
                      <li style={{ marginBottom: "var(--spacing-sm)" }}>
                        <span style={{ color: "var(--petential-haiti-60)" }}>{t('howToChoosePet.expertAdvice.kitten.content4')}</span>
                      </li>
                      <li style={{ marginBottom: "var(--spacing-sm)" }}>
                        <span style={{ color: "var(--petential-haiti-60)" }}>{t('howToChoosePet.expertAdvice.kitten.content5')}</span>
                      </li>
                      <li>
                        <span style={{ color: "var(--petential-haiti-60)" }}>{t('howToChoosePet.expertAdvice.kitten.content6')}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Article Content */}
                <div>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-xl)"
                    }}
                  >
                    {t('howToChoosePet.expertAdvice.analysis')}
                  </p>

                  {/* Article Image 2 */}
                  <div style={{ marginBottom: "var(--spacing-xl)" }}>
                    <img
                      src="/how_images/article_cat_2.jpg"
                      alt="Kitten selection considerations"
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        height: "auto",
                        borderRadius: "var(--radius-lg)",
                        margin: "0 auto",
                        display: "block"
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=350&fit=crop&crop=face';
                      }}
                    />
                  </div>

                  {/* Section 1: What to consider before choosing */}
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h2)",
                      fontWeight: "var(--font-weight-bold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-lg)",
                      marginTop: "var(--spacing-2xl)"
                    }}
                  >
                    {t('howToChoosePet.expertAdvice.whatToConsiderKitten')}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    {t('howToChoosePet.article.dontFocusExclusively')}
                  </p>

                  {/* Choosing breed subsection */}
                  <h4
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h4)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-md)",
                      marginTop: "var(--spacing-xl)"
                    }}
                  >
                    {t('howToChoosePet.article.choosingBreedTitle')}
                  </h4>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.beforeChoosingKittenText')}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.purebredCatText')}
                  </p>
                  <ul
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)",
                      paddingLeft: "var(--spacing-lg)"
                    }}
                  >
                    <li>{t('howToChoosePet.article.characterTemperamentText')}</li>
                    <li>{t('howToChoosePet.article.careFeaturesText')}</li>
                    <li>{t('howToChoosePet.article.activityLevelText')}</li>
                  </ul>

                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.childrenConsiderationText')}
                  </p>

                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    {t('howToChoosePet.article.busynessLevelText')}
                  </p>

                  {/* Article Image 3 */}
                  <div style={{ marginBottom: "var(--spacing-xl)" }}>
                    <img
                      src="/how_images/article_cat_3.jpg"
                      alt="Different cat breeds"
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        height: "auto",
                        borderRadius: "var(--radius-lg)",
                        margin: "0 auto",
                        display: "block"
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&h=350&fit=crop&crop=face';
                      }}
                    />
                  </div>

                  {/* Choosing gender subsection */}
                  <h4
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h4)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-md)",
                      marginTop: "var(--spacing-xl)"
                    }}
                  >
                    {t('howToChoosePet.article.choosingGenderTitle')}
                  </h4>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.genderDifferencesText')}
                  </p>
                  {/* Article Image 4 */}
                  <div style={{ marginBottom: "var(--spacing-lg)" }}>
                    <img
                      src="/how_images/article_cat_4.jpg"
                      alt="Male and female cats"
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        height: "auto",
                        borderRadius: "var(--radius-lg)",
                        margin: "0 auto",
                        display: "block"
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=600&h=350&fit=crop&crop=face';
                      }}
                    />
                  </div>

                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.maleCharacteristicsText')}
                  </p>

                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    {t('howToChoosePet.article.femaleCharacteristicsText')}
                  </p>

                  {/* Choosing class subsection */}
                  <h4
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h4)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-md)",
                      marginTop: "var(--spacing-xl)"
                    }}
                  >
                    {t('howToChoosePet.article.choosingClassTitle')}
                  </h4>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.exteriorKnowledgeText')}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    {t('howToChoosePet.article.classRecommendationText')}
                  </p>

                  {/* Article Image 5 */}
                  <div style={{ marginBottom: "var(--spacing-xl)" }}>
                    <img
                      src="/how_images/article_cat_5.jpg"
                      alt="Show quality kittens"
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        height: "auto",
                        borderRadius: "var(--radius-lg)",
                        margin: "0 auto",
                        display: "block"
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&h=350&fit=crop&crop=face';
                      }}
                    />
                  </div>

                  {/* Choosing age subsection */}
                  <h4
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h4)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-md)",
                      marginTop: "var(--spacing-xl)"
                    }}
                  >
                    {t('howToChoosePet.article.choosingAgeTitle')}
                  </h4>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.showClassAgeText')}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.minimumAgeText')}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    {t('howToChoosePet.article.rejectedPetsText')}
                  </p>

                  {/* Article Image 6 */}
                  <div style={{ marginBottom: "var(--spacing-xl)" }}>
                    <img
                      src="/how_images/article_cat_6.jpg"
                      alt="Kittens of different ages"
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        height: "auto",
                        borderRadius: "var(--radius-lg)",
                        margin: "0 auto",
                        display: "block"
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=600&h=350&fit=crop&crop=face';
                      }}
                    />
                  </div>

                  {/* Choosing coat type subsection */}
                  <h4
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h4)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-md)",
                      marginTop: "var(--spacing-xl)"
                    }}
                  >
                    {t('howToChoosePet.article.choosingCoatTypeTitle')}
                  </h4>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.coatCharacteristicsText')}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.coatTypesText')}
                  </p>
                  <ul
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)",
                      paddingLeft: "var(--spacing-lg)"
                    }}
                  >
                    <li>{t('howToChoosePet.article.coatType1Text')}</li>
                    <li>{t('howToChoosePet.article.coatType2Text')}</li>
                    <li>{t('howToChoosePet.article.coatType3Text')}</li>
                    <li>{t('howToChoosePet.article.coatType4Text')}</li>
                    <li>{t('howToChoosePet.article.coatType5Text')}</li>
                  </ul>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    {t('howToChoosePet.article.hairlessBreedsText')}
                  </p>

                  {/* Section 2: How to properly choose */}
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h2)",
                      fontWeight: "var(--font-weight-bold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-lg)",
                      marginTop: "var(--spacing-2xl)"
                    }}
                  >
                    {t('howToChoosePet.article.howToProperlyChooseTitle')}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    {t('howToChoosePet.article.breederMeetingText')}
                  </p>

                  {/* Article Image 7 */}
                  <div style={{ marginBottom: "var(--spacing-xl)" }}>
                    <img
                      src="/how_images/article_cat_7.jpg"
                      alt="Visiting a cattery"
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        height: "auto",
                        borderRadius: "var(--radius-lg)",
                        margin: "0 auto",
                        display: "block"
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=600&h=350&fit=crop&crop=face';
                      }}
                    />
                  </div>

                  {/* Choosing breeder subsection */}
                  <h4
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h4)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-md)",
                      marginTop: "var(--spacing-xl)"
                    }}
                  >
                    {t('howToChoosePet.article.choosingBreederTitle')}
                  </h4>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.breedingDocumentsText')}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.breederOptionsText')}
                  </p>
                  <ol
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)",
                      paddingLeft: "var(--spacing-lg)"
                    }}
                  >
                    <li style={{ marginBottom: "var(--spacing-sm)" }}><strong>{t('howToChoosePet.article.catteryLabel')}</strong> {t('howToChoosePet.article.catteryText')}</li>
                    <li><strong>{t('howToChoosePet.article.privatePersonLabel')}</strong> {t('howToChoosePet.article.privatePersonText')}</li>
                  </ol>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    {t('howToChoosePet.article.readReviewsText')}
                  </p>

                  {/* Visiting place subsection */}
                  <h4
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h4)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-md)",
                      marginTop: "var(--spacing-xl)"
                    }}
                  >
                    {t('howToChoosePet.article.visitingPlaceTitle')}
                  </h4>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.catteryPrestigeText')}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    {t('howToChoosePet.article.privateBreederText')}
                  </p>


                  {/* Kitten behavior subsection */}
                  <h4
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h4)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-md)",
                      marginTop: "var(--spacing-xl)"
                    }}
                  >
                    {t('howToChoosePet.article.kittenBehaviorTitle')}
                  </h4>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.experiencedBreederText')}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    {t('howToChoosePet.article.personalMeetingText')}
                  </p>

                  {/* Pet examination subsection */}
                  <h4
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h4)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-md)",
                      marginTop: "var(--spacing-xl)"
                    }}
                  >
                    {t('howToChoosePet.article.petExaminationTitle')}
                  </h4>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.expertAdvice.healthCheck')}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.warySignsText')}
                  </p>
                  <ul
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)",
                      paddingLeft: "var(--spacing-lg)"
                    }}
                  >
                    <li>{t('howToChoosePet.article.symptom1Text')}</li>
                    <li>{t('howToChoosePet.article.symptom2Text')}</li>
                    <li>{t('howToChoosePet.article.symptom3Text')}</li>
                    <li>{t('howToChoosePet.article.symptom4Text')}</li>
                    <li>{t('howToChoosePet.article.symptom5Text')}</li>
                    <li>{t('howToChoosePet.article.symptom6Text')}</li>
                    <li>{t('howToChoosePet.article.symptom7Text')}</li>
                    <li>{t('howToChoosePet.article.symptom8Text')}</li>
                    <li>{t('howToChoosePet.article.symptom9Text')}</li>
                  </ul>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    {t('howToChoosePet.article.healthProblemsText')}
                  </p>



                  {/* When kitten is ready to move section */}
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h2)",
                      fontWeight: "var(--font-weight-bold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-lg)",
                      marginTop: "var(--spacing-2xl)"
                    }}
                  >
                    {t('howToChoosePet.article.whenReadyToMoveTitle')}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.separationStressText')}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.chooseImmediatelyText')}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    {t('howToChoosePet.article.artificialFeedingText')}
                  </p>



                  {/* Shelter kitten section */}
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h2)",
                      fontWeight: "var(--font-weight-bold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-lg)",
                      marginTop: "var(--spacing-2xl)"
                    }}
                  >
                    {t('howToChoosePet.article.shelterOrStreetTitle')}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.savingLifeText')}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.shelterFeaturesText')}
                  </p>
                  <ol
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)",
                      paddingLeft: "var(--spacing-lg)"
                    }}
                  >
                    <li style={{ marginBottom: "var(--spacing-sm)" }}><strong>{t('howToChoosePet.article.infectionRiskLabel')}</strong> {t('howToChoosePet.article.infectionRiskText')}</li>
                    <li style={{ marginBottom: "var(--spacing-sm)" }}><strong>{t('howToChoosePet.article.humanDistrustLabel')}</strong> {t('howToChoosePet.article.humanDistrustText')}</li>
                    <li><strong>{t('howToChoosePet.article.litterAdaptationLabel')}</strong> {t('howToChoosePet.article.litterAdaptationText')}</li>
                  </ol>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    {t('howToChoosePet.article.readyDifficultiesText')}
                  </p>


                  {/* Recommendations section */}
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h2)",
                      fontWeight: "var(--font-weight-bold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-lg)",
                      marginTop: "var(--spacing-2xl)"
                    }}
                  >
                    {t('howToChoosePet.article.recommendationsNewOwnersTitle')}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.expertAdvice.importantPoints')}
                  </p>
                  <ol
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)",
                      paddingLeft: "var(--spacing-lg)"
                    }}
                  >
                    <li style={{ marginBottom: "var(--spacing-sm)" }}>{t('howToChoosePet.article.checklistItem1Text')}</li>
                    <li style={{ marginBottom: "var(--spacing-sm)" }}>{t('howToChoosePet.article.checklistItem2Text')}</li>
                    <li style={{ marginBottom: "var(--spacing-sm)" }}>{t('howToChoosePet.article.checklistItem3Text')}</li>
                    <li style={{ marginBottom: "var(--spacing-sm)" }}>{t('howToChoosePet.article.checklistItem4Text')}</li>
                    <li style={{ marginBottom: "var(--spacing-sm)" }}>{t('howToChoosePet.article.checklistItem5Text')}</li>
                    <li style={{ marginBottom: "var(--spacing-sm)" }}>{t('howToChoosePet.article.checklistItem6Text')}</li>
                    <li>{t('howToChoosePet.article.checklistItem7Text')}</li>
                  </ol>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    {t('howToChoosePet.article.familyMemberText')}
                  </p>


                  {/* Checklist section */}
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h2)",
                      fontWeight: "var(--font-weight-bold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-lg)",
                      marginTop: "var(--spacing-2xl)"
                    }}
                  >
                    How to choose and buy a kitten - checklist
                  </h3>
                  <ol
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-xl)",
                      paddingLeft: "var(--spacing-lg)"
                    }}
                  >
                    <li style={{ marginBottom: "var(--spacing-md)" }} dangerouslySetInnerHTML={{ __html: t('howToChoosePet.expertAdvice.checklist.item1') }}></li>
                    <li style={{ marginBottom: "var(--spacing-md)" }} dangerouslySetInnerHTML={{ __html: t('howToChoosePet.expertAdvice.checklist.item2') }}></li>
                    <li style={{ marginBottom: "var(--spacing-md)" }} dangerouslySetInnerHTML={{ __html: t('howToChoosePet.expertAdvice.checklist.item3') }}></li>
                    <li style={{ marginBottom: "var(--spacing-md)" }} dangerouslySetInnerHTML={{ __html: t('howToChoosePet.expertAdvice.checklist.item4') }}></li>
                    <li style={{ marginBottom: "var(--spacing-md)" }} dangerouslySetInnerHTML={{ __html: t('howToChoosePet.expertAdvice.checklist.item5') }}></li>
                    <li>{t('howToChoosePet.article.preparatoryStageText')}</li>
                  </ol>
                </div>
              </div>

              {/* Responsive Styles */}
              <style jsx>{`
                @media (max-width: 768px) {
                  .pricing-grid {
                    grid-template-columns: 1fr !important;
                    gap: var(--spacing-xl) !important;
                  }
                  .price-comparison-grid {
                    grid-template-columns: 1fr !important;
                    gap: var(--spacing-lg) !important;
                  }
                }
              `}</style>
            </div>
          )}
          {/* Dog Pricing Section - Only show for puppies */}
          {selectedPet === 'puppy' && (
            <div style={{ marginBottom: "var(--spacing-4xl)" }}>
              {/* Section Title */}
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--font-size-h1)",
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--petential-dark)",
                  marginBottom: "var(--spacing-2xl)",
                  textAlign: "left"
                }}
              >
                {t('howToChoosePet.whatDeterminesPuppyPrices')}
              </h2>

              {/* Class Selection and Description */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "var(--spacing-3xl)",
                  alignItems: "center",
                  marginBottom: "var(--spacing-3xl)"
                }}
                className="pricing-grid"
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h3)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    {t('howToChoosePet.priceDependsOnClass')}
                  </h3>

                  {/* Class Selector Buttons */}
                  <div style={{ display: "flex", gap: "var(--spacing-sm)", marginBottom: "var(--spacing-lg)" }}>
                    <button
                      onClick={() => setSelectedClass('pet')}
                      className={selectedClass === 'pet' ? 'btn-primary' : 'btn-secondary'}
                    >
                      {t('howToChoosePet.pet')}
                    </button>
                    <button
                      onClick={() => setSelectedClass('breed')}
                      className={selectedClass === 'breed' ? 'btn-primary' : 'btn-secondary'}
                    >
                      {t('howToChoosePet.breed')}
                    </button>
                    <button
                      onClick={() => setSelectedClass('show')}
                      className={selectedClass === 'show' ? 'btn-primary' : 'btn-secondary'}
                    >
                      {t('howToChoosePet.show')}
                    </button>
                  </div>

                  {/* Class Description */}
                  <div
                    style={{
                      backgroundColor: "var(--petential-alabaster)",
                      padding: "var(--spacing-lg)",
                      borderRadius: "var(--radius-lg)"
                    }}
                  >
                    {selectedClass === 'pet' && (
                      <>
                        <h4
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "var(--font-size-h4)",
                            fontWeight: "var(--font-weight-semibold)",
                            color: "var(--petential-dark)",
                            marginBottom: "var(--spacing-sm)"
                          }}
                        >
                          {t('howToChoosePet.petClass')}
                        </h4>
                        <p
                          style={{
                            fontSize: "var(--font-size-body)",
                            color: "var(--petential-haiti-60)",
                            lineHeight: "var(--line-height-normal)",
                            margin: 0
                          }}
                        >
                          {t('howToChoosePet.petClassDesc')}
                        </p>
                      </>
                    )}
                    {selectedClass === 'breed' && (
                      <>
                        <h4
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "var(--font-size-h4)",
                            fontWeight: "var(--font-weight-semibold)",
                            color: "var(--petential-dark)",
                            marginBottom: "var(--spacing-sm)"
                          }}
                        >
                          {t('howToChoosePet.breedClass')}
                        </h4>
                        <p
                          style={{
                            fontSize: "var(--font-size-body)",
                            color: "var(--petential-haiti-60)",
                            lineHeight: "var(--line-height-normal)",
                            margin: 0
                          }}
                        >
                          {t('howToChoosePet.breedClassDesc')}
                        </p>
                      </>
                    )}
                    {selectedClass === 'show' && (
                      <>
                        <h4
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "var(--font-size-h4)",
                            fontWeight: "var(--font-weight-semibold)",
                            color: "var(--petential-dark)",
                            marginBottom: "var(--spacing-sm)"
                          }}
                        >
                          {t('howToChoosePet.showClass')}
                        </h4>
                        <p
                          style={{
                            fontSize: "var(--font-size-body)",
                            color: "var(--petential-haiti-60)",
                            lineHeight: "var(--line-height-normal)",
                            margin: 0
                          }}
                        >
                          {t('howToChoosePet.showClassDesc')}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Dog Image - Dynamic based on selected class */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <img
                    src={`/how_images/dog_${selectedClass}.jpg`}
                    alt={`${selectedClass} class puppy`}
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "var(--radius-xl)"
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop&crop=face';
                    }}
                  />
                </div>
              </div>

              {/* Pricing Comparison - BIGGER TEXT */}
              <div style={{ marginBottom: "var(--spacing-2xl)" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--font-size-h3)",
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--petential-dark)",
                    marginBottom: "var(--spacing-xl)",
                    textAlign: "center"
                  }}
                >
                  {t('howToChoosePet.pricesWithWithoutDocs')}
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "var(--spacing-lg)"
                  }}
                  className="price-comparison-grid"
                >
                  {/* With Documents */}
                  <div
                    style={{
                      backgroundColor: "var(--petential-alabaster)",
                      padding: "var(--spacing-lg)",
                      borderRadius: "var(--radius-lg)",
                      height: "fit-content"
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "var(--font-size-h4)",
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--petential-dark)",
                        marginBottom: "var(--spacing-md)",
                        lineHeight: "var(--line-height-tight)"
                      }}
                    >
                      {t('howToChoosePet.withDocsTitle')}
                    </h4>
                    <p
                      style={{
                        fontSize: "var(--font-size-body)",
                        color: "var(--petential-haiti-60)",
                        lineHeight: "var(--line-height-normal)",
                        margin: 0
                      }}
                    >
                      {t('howToChoosePet.withDocsDesc')}
                    </p>
                  </div>

                  {/* Without Documents */}
                  <div
                    style={{
                      backgroundColor: "var(--petential-alabaster)",
                      padding: "var(--spacing-lg)",
                      borderRadius: "var(--radius-lg)",
                      height: "fit-content"
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "var(--font-size-h4)",
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--petential-dark)",
                        marginBottom: "var(--spacing-md)",
                        lineHeight: "var(--line-height-tight)"
                      }}
                    >
                      {t('howToChoosePet.withoutDocsTitle')}
                    </h4>
                    <p
                      style={{
                        fontSize: "var(--font-size-body)",
                        color: "var(--petential-haiti-60)",
                        lineHeight: "var(--line-height-normal)",
                        margin: 0
                      }}
                    >
                      {t('howToChoosePet.withoutDocsDesc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Expert Advice Article Section - Only for puppies */}
              <div style={{ marginTop: "var(--spacing-4xl)" }}>
                <div style={{ marginBottom: "var(--spacing-2xl)" }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h1)",
                      fontWeight: "var(--font-weight-bold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-lg)",
                      textAlign: "left"
                    }}
                  >
                    {t('howToChoosePet.expertAdvice')}
                  </h2>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-xl)"
                    }}
                  >
                    {t('howToChoosePet.expertAdvicePuppy')}
                  </p>

                  {/* Article Image 1 */}
                  <div style={{ marginBottom: "var(--spacing-xl)" }}>
                    <img
                      src="/how_images/article_dog_1.jpg"
                      alt="Expert advice on choosing puppies"
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        height: "auto",
                        borderRadius: "var(--radius-lg)",
                        margin: "0 auto",
                        display: "block"
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=350&fit=crop&crop=face';
                      }}
                    />
                  </div>

                  {/* Article Navigation */}
                  <div
                    style={{
                      backgroundColor: "var(--petential-alabaster)",
                      padding: "var(--spacing-lg)",
                      borderRadius: "var(--radius-lg)",
                      marginBottom: "var(--spacing-2xl)"
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "var(--font-size-h4)",
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--petential-dark)",
                        marginBottom: "var(--spacing-md)"
                      }}
                    >
                      {t('howToChoosePet.expertAdvice.contents')}
                    </h3>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      <li style={{ marginBottom: "var(--spacing-sm)" }}>
                        <span style={{ color: "var(--petential-haiti-60)" }}>{t('howToChoosePet.expertAdvice.puppy.content1')}</span>
                      </li>
                      <li style={{ marginBottom: "var(--spacing-sm)" }}>
                        <span style={{ color: "var(--petential-haiti-60)" }}>{t('howToChoosePet.expertAdvice.puppy.content2')}</span>
                      </li>
                      <li style={{ marginBottom: "var(--spacing-sm)" }}>
                        <span style={{ color: "var(--petential-haiti-60)" }}>{t('howToChoosePet.expertAdvice.puppy.content3')}</span>
                      </li>
                      <li style={{ marginBottom: "var(--spacing-sm)" }}>
                        <span style={{ color: "var(--petential-haiti-60)" }}>{t('howToChoosePet.expertAdvice.puppy.content4')}</span>
                      </li>
                      <li style={{ marginBottom: "var(--spacing-sm)" }}>
                        <span style={{ color: "var(--petential-haiti-60)" }}>{t('howToChoosePet.expertAdvice.puppy.content5')}</span>
                      </li>
                      <li style={{ marginBottom: "var(--spacing-sm)" }}>
                        <span style={{ color: "var(--petential-haiti-60)" }}>{t('howToChoosePet.expertAdvice.puppy.content6')}</span>
                      </li>
                      <li>
                        <span style={{ color: "var(--petential-haiti-60)" }}>{t('howToChoosePet.expertAdvice.puppy.content7')}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Article Content - Starting with intro */}
                <div>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-xl)"
                    }}
                  >
                    {t('howToChoosePet.expertAdvice.puppy.analysis')}
                  </p>

                  {/* What to consider before choosing */}
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h2)",
                      fontWeight: "var(--font-weight-bold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-lg)",
                      marginTop: "var(--spacing-2xl)"
                    }}
                  >
                    {t('howToChoosePet.expertAdvice.whatToConsiderPuppy')}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.notWhimText')}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.comfortableLifeText')}
                  </p>
                  <ol
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)",
                      paddingLeft: "var(--spacing-lg)"
                    }}
                  >
                    <li style={{ marginBottom: "var(--spacing-sm)" }}>{t('howToChoosePet.article.considerCostsText')}</li>
                    <li style={{ marginBottom: "var(--spacing-sm)" }}>{t('howToChoosePet.article.workHobbiesText')}</li>
                    <li style={{ marginBottom: "var(--spacing-sm)" }}>{t('howToChoosePet.article.physicalMentalText')}</li>
                    <li style={{ marginBottom: "var(--spacing-sm)" }}>{t('howToChoosePet.article.livingConditionsText')}</li>
                    <li>{t('howToChoosePet.article.breedSuitabilityText')}</li>
                  </ol>

                  {/* Article Image 2 */}
                  <div style={{ marginBottom: "var(--spacing-xl)" }}>
                    <img
                      src="/how_images/article_dog_2.jpg"
                      alt="Puppy lifestyle considerations"
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        height: "auto",
                        borderRadius: "var(--radius-lg)",
                        margin: "0 auto",
                        display: "block"
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=350&fit=crop&crop=face';
                      }}
                    />
                  </div>

                  {/* What to consider when choosing */}
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h2)",
                      fontWeight: "var(--font-weight-bold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-lg)",
                      marginTop: "var(--spacing-2xl)"
                    }}
                  >
                    {t('howToChoosePet.article.whatToConsiderChoosingTitle')}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    {t('howToChoosePet.article.keyFactorsText')}
                  </p>

                  {/* Breed subsection */}
                  <h4
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h4)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-md)",
                      marginTop: "var(--spacing-xl)"
                    }}
                  >
                    {t('howToChoosePet.article.breedTitle')}
                  </h4>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.purebredPuppyText')}
                  </p>
                  <ol
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)",
                      paddingLeft: "var(--spacing-lg)"
                    }}
                  >
                    <li style={{ marginBottom: "var(--spacing-sm)" }}><strong>{t('howToChoosePet.article.sizeLabel')}</strong> {t('howToChoosePet.article.sizeText')}</li>
                    <li style={{ marginBottom: "var(--spacing-sm)" }}><strong>{t('howToChoosePet.article.coatTypeLabel')}</strong> {t('howToChoosePet.article.coatTypeText')}</li>
                    <li style={{ marginBottom: "var(--spacing-sm)" }}><strong>{t('howToChoosePet.article.friendlinessLabel')}</strong> {t('howToChoosePet.article.friendlinessText')}</li>
                    <li><strong>{t('howToChoosePet.article.breedGroupLabel')}</strong> {t('howToChoosePet.article.breedGroupText')}</li>
                  </ol>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    Additionally, it is worth considering adaptation to heat and cold. Northern sled breeds are not the best option for southern regions.
                  </p>

                  {/* Article Image 3 */}
                  <div style={{ marginBottom: "var(--spacing-xl)" }}>
                    <img
                      src="/how_images/article_dog_3.jpg"
                      alt="Different dog breeds"
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        height: "auto",
                        borderRadius: "var(--radius-lg)",
                        margin: "0 auto",
                        display: "block"
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=350&fit=crop&crop=face';
                      }}
                    />
                  </div>

                  {/* Gender subsection */}
                  <h4
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h4)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-md)",
                      marginTop: "var(--spacing-xl)"
                    }}
                  >
                    {t('howToChoosePet.article.genderTitle')}
                  </h4>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.genderImportanceText')}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    {t('howToChoosePet.article.neuteringText')}
                  </p>

                  {/* Article Image 4 */}
                  <div style={{ marginBottom: "var(--spacing-xl)" }}>
                    <img
                      src="/how_images/article_dog_4.jpg"
                      alt="Male and female dogs"
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        height: "auto",
                        borderRadius: "var(--radius-lg)",
                        margin: "0 auto",
                        display: "block"
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=350&fit=crop&crop=face';
                      }}
                    />
                  </div>

                  {/* How to properly choose - 5 steps */}
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h2)",
                      fontWeight: "var(--font-weight-bold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-lg)",
                      marginTop: "var(--spacing-2xl)"
                    }}
                  >
                    {t('howToChoosePet.article.fiveStepsTitle')}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    {t('howToChoosePet.article.fiveStepsIntroText')}
                  </p>

                  {/* Choose breeder subsection */}
                  <h4
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h4)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-md)",
                      marginTop: "var(--spacing-xl)"
                    }}
                  >
                    {t('howToChoosePet.article.conscientiousBreederTitle')}
                  </h4>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.dontSaveMoneyText')}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.breederSearchIntroText')}
                  </p>
                  <ol
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)",
                      paddingLeft: "var(--spacing-lg)"
                    }}
                  >
                    <li style={{ marginBottom: "var(--spacing-sm)" }}><strong>{t('howToChoosePet.article.contactClubLabel')}</strong> {t('howToChoosePet.article.contactClubText')}</li>
                    <li style={{ marginBottom: "var(--spacing-sm)" }}><strong>{t('howToChoosePet.article.readReviewsLabel')}</strong> {t('howToChoosePet.article.readReviewsText')}</li>
                    <li style={{ marginBottom: "var(--spacing-sm)" }}><strong>{t('howToChoosePet.article.commercialActivityLabel')}</strong> {t('howToChoosePet.article.commercialActivityText')}</li>
                    <li style={{ marginBottom: "var(--spacing-sm)" }}><strong>{t('howToChoosePet.article.mandatoryDocumentsLabel')}</strong> {t('howToChoosePet.article.mandatoryDocumentsText')}</li>
                    <li><strong>{t('howToChoosePet.article.titlesAndDiplomasLabel')}</strong> {t('howToChoosePet.article.titlesAndDiplomasText')}</li>
                  </ol>

                  {/* Article Image 5 */}
                  <div style={{ marginBottom: "var(--spacing-xl)" }}>
                    <img
                      src="/how_images/article_dog_5.jpg"
                      alt="Professional dog breeder"
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        height: "auto",
                        borderRadius: "var(--radius-lg)",
                        margin: "0 auto",
                        display: "block"
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=600&h=350&fit=crop&crop=face';
                      }}
                    />
                  </div>

                  {/* When to take puppy */}
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h2)",
                      fontWeight: "var(--font-weight-bold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-lg)",
                      marginTop: "var(--spacing-2xl)"
                    }}
                  >
                    {t('howToChoosePet.article.whenTakePuppyTitle')}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.optimalAgeText')}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    {t('howToChoosePet.article.lactationText')}
                  </p>

                  {/* Article Image 6 */}
                  <div style={{ marginBottom: "var(--spacing-xl)" }}>
                    <img
                      src="/how_images/article_dog_6.jpg"
                      alt="Puppy ready for new home"
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        height: "auto",
                        borderRadius: "var(--radius-lg)",
                        margin: "0 auto",
                        display: "block"
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=600&h=350&fit=crop&crop=face';
                      }}
                    />
                  </div>

                  {/* Shelter pets */}
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h2)",
                      fontWeight: "var(--font-weight-bold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-lg)",
                      marginTop: "var(--spacing-2xl)"
                    }}
                  >
                    {t('howToChoosePet.article.shelterPetsTitle')}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.shelterChoiceText')}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)"
                    }}
                  >
                    {t('howToChoosePet.article.shelterLoyaltyText')}
                  </p>

                  {/* Article Image 7 */}
                  <div style={{ marginBottom: "var(--spacing-xl)" }}>
                    <img
                      src="/how_images/article_dog_7.jpg"
                      alt="Shelter dogs"
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        height: "auto",
                        borderRadius: "var(--radius-lg)",
                        margin: "0 auto",
                        display: "block"
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=350&fit=crop&crop=face';
                      }}
                    />
                  </div>

                  {/* Advice for future owners */}
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h2)",
                      fontWeight: "var(--font-weight-bold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-lg)",
                      marginTop: "var(--spacing-2xl)"
                    }}
                  >
                    {t('howToChoosePet.article.adviceFutureOwnersTitle')}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.adviceIntroText')}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-md)"
                    }}
                  >
                    {t('howToChoosePet.article.payAttentionText')}
                  </p>
                  <ol
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-lg)",
                      paddingLeft: "var(--spacing-lg)"
                    }}
                  >
                    <li style={{ marginBottom: "var(--spacing-sm)" }}><strong>{t('howToChoosePet.article.personalCornerLabel')}</strong> {t('howToChoosePet.article.personalCornerText')}</li>
                    <li style={{ marginBottom: "var(--spacing-sm)" }}><strong>{t('howToChoosePet.article.buyNecessaryLabel')}</strong> {t('howToChoosePet.article.buyNecessaryText')}</li>
                    <li style={{ marginBottom: "var(--spacing-sm)" }}><strong>{t('howToChoosePet.article.carrierTripLabel')}</strong> {t('howToChoosePet.article.carrierTripText')}</li>
                    <li style={{ marginBottom: "var(--spacing-sm)" }}><strong>{t('howToChoosePet.article.makeSureBrandLabel')}</strong> {t('howToChoosePet.article.makeSureBrandText')}</li>
                    <li><strong>{t('howToChoosePet.article.findVeterinarianLabel')}</strong> {t('howToChoosePet.article.findVeterinarianText')}</li>
                  </ol>

                  {/* Article Image 8 */}
                  <div style={{ marginBottom: "var(--spacing-xl)" }}>
                    <img
                      src="/how_images/article_dog_8.jpg"
                      alt="Puppy preparation essentials"
                      style={{
                        width: "100%",
                        maxWidth: "600px",
                        height: "auto",
                        borderRadius: "var(--radius-lg)",
                        margin: "0 auto",
                        display: "block"
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=350&fit=crop&crop=face';
                      }}
                    />
                  </div>

                  {/* Final checklist */}
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-h2)",
                      fontWeight: "var(--font-weight-bold)",
                      color: "var(--petential-dark)",
                      marginBottom: "var(--spacing-lg)",
                      marginTop: "var(--spacing-2xl)"
                    }}
                  >
                    {t('howToChoosePet.article.puppyChecklistTitle')}
                  </h3>
                  <ol
                    style={{
                      fontSize: "var(--font-size-body)",
                      color: "var(--petential-haiti-60)",
                      lineHeight: "var(--line-height-normal)",
                      marginBottom: "var(--spacing-xl)",
                      paddingLeft: "var(--spacing-lg)"
                    }}
                  >
                    <li style={{ marginBottom: "var(--spacing-md)" }}><strong>{t('howToChoosePet.article.readyToBuyLabel')}</strong> {t('howToChoosePet.article.readyToBuyText')}</li>
                    <li style={{ marginBottom: "var(--spacing-md)" }}><strong>{t('howToChoosePet.article.evaluateSuitabilityLabel')}</strong> {t('howToChoosePet.article.evaluateSuitabilityText')}</li>
                    <li style={{ marginBottom: "var(--spacing-md)" }}><strong>{t('howToChoosePet.article.findConscientiousLabel')}</strong> {t('howToChoosePet.article.findConscientiousText')}</li>
                    <li style={{ marginBottom: "var(--spacing-md)" }}><strong>{t('howToChoosePet.article.dontRushLabel')}</strong> {t('howToChoosePet.article.dontRushText')}</li>
                    <li style={{ marginBottom: "var(--spacing-md)" }}><strong>{t('howToChoosePet.article.homelessAnimalLabel')}</strong> {t('howToChoosePet.article.homelessAnimalText')}</li>
                    <li><strong>{t('howToChoosePet.article.thoroughPrepLabel')}</strong> {t('howToChoosePet.article.thoroughPrepText')}</li>
                  </ol>
                </div>
              </div>

              {/* Responsive Styles */}
              <style jsx>{`
                @media (max-width: 768px) {
                  .pricing-grid {
                    grid-template-columns: 1fr !important;
                    gap: var(--spacing-xl) !important;
                  }
                  .price-comparison-grid {
                    grid-template-columns: 1fr !important;
                    gap: var(--spacing-lg) !important;
                  }
                }
              `}</style>
            </div>
          )}

          {/* Navigation back to home */}
          <div className="text-center" style={{ marginTop: "var(--spacing-4xl)" }}>
            <Link
              href="/"
              className="btn-secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center"
              }}
            >
              ← Back to Home
            </Link>
          </div>

        </div>
      </section>
    </div>
  )
}