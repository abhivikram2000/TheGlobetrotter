import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { DestinationsData, Destination } from '@/app/types/destinations';

export async function GET() {
  try {
    // Read destinations from JSON file
    const dataDirectory = path.join(process.cwd(), 'src/app/data');
    const fileContents = await fs.readFile(
      path.join(dataDirectory, 'destinations.json'),
      'utf8'
    );
    const data: DestinationsData = JSON.parse(fileContents);
    
    // Get random destination
    const randomIndex = Math.floor(Math.random() * data.destinations.length);
    const destination = data.destinations[randomIndex];
    
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