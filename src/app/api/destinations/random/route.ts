import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { DestinationsData, Destination } from '@/app/types/destinations';

export async function GET(request: Request) {
  try {
    // Get the current destination to exclude from the URL
    const url = new URL(request.url);
    const excludeCity = url.searchParams.get('excludeCity');
    const excludeCountry = url.searchParams.get('excludeCountry');
    
    // Read destinations from JSON file
    const dataDirectory = path.join(process.cwd(), 'src/app/data');
    const fileContents = await fs.readFile(
      path.join(dataDirectory, 'destinations.json'),
      'utf8'
    );
    const data: DestinationsData = JSON.parse(fileContents);
    
    // Filter out the current destination if provided
    let availableDestinations = data.destinations;
    if (excludeCity && excludeCountry) {
      availableDestinations = data.destinations.filter(
        dest => !(dest.city === excludeCity && dest.country === excludeCountry)
      );
    }
    
    // Get random destination from filtered list
    const randomIndex = Math.floor(Math.random() * availableDestinations.length);
    const destination = availableDestinations[randomIndex];
    
    // Generate random options including the correct answer
    const options = generateOptions(data.destinations, destination);
    
    return NextResponse.json({
      ...destination,
      options
    });
  } catch (error) {
    console.error('Error loading destinations:', error);
    return NextResponse.json(
      { error: 'Failed to load destinations' },
      { status: 500 }
    );
  }
}

function generateOptions(destinations: Destination[], correctDestination: Destination): string[] {
  // Always include the correct answer
  const correctAnswer = `${correctDestination.city}, ${correctDestination.country}`;
  const options = [correctAnswer];
  
  // Get 3 random wrong answers
  while (options.length < 4) {
    const randomDest = destinations[Math.floor(Math.random() * destinations.length)];
    const option = `${randomDest.city}, ${randomDest.country}`;
    
    // Don't add duplicates
    if (!options.includes(option) && option !== correctAnswer) {
      options.push(option);
    }
  }
  
  // Shuffle the options
  return options.sort(() => Math.random() - 0.5);
} 