import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const breed = searchParams.get('breed')
  const type = searchParams.get('type')

  if (!breed || !type) {
    return NextResponse.json({ error: 'Missing breed or type parameter' }, { status: 400 })
  }

  try {
    let imageUrl = '/images/placeholder-pet.svg'

    if (type === 'dog') {
      // Try to fetch from Dog API
      const dogApiUrl = `https://dog.ceo/api/breed/${breed.toLowerCase().replace(/\s+/g, '')}/images/random`
      
      try {
        const response = await fetch(dogApiUrl)
        if (response.ok) {
          const data = await response.json()
          if (data.status === 'success' && data.message) {
            imageUrl = data.message
          }
        }
      } catch (error) {
        console.log('Dog API failed, trying alternative approach')
        
        // Alternative: try with breed name variations
        const breedVariations = [
          breed.toLowerCase().replace(/\s+/g, ''),
          breed.toLowerCase().split(' ')[0], // First word only
          breed.toLowerCase().replace(/\s+/g, '-')
        ]
        
        for (const variation of breedVariations) {
          try {
            const altResponse = await fetch(`https://dog.ceo/api/breed/${variation}/images/random`)
            if (altResponse.ok) {
              const altData = await altResponse.json()
              if (altData.status === 'success' && altData.message) {
                imageUrl = altData.message
                break
              }
            }
          } catch (e) {
            continue
          }
        }
      }
    } else if (type === 'cat') {
      // Try to fetch from Cat API
      try {
        const catApiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breed.toLowerCase()}&limit=1`
        const response = await fetch(catApiUrl, {
          headers: {
            'x-api-key': process.env.CAT_API_KEY || ''
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          if (data && data.length > 0 && data[0].url) {
            imageUrl = data[0].url
          }
        }
      } catch (error) {
        console.log('Cat API failed, using placeholder')
      }
    }

    return NextResponse.json({ image: imageUrl })
  } catch (error) {
    console.error('Error fetching breed image:', error)
    return NextResponse.json({ image: '/images/placeholder-pet.svg' })
  }
}