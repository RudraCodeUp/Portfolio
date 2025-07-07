/**
 * API utilities for making requests to the backend
 */

// Define API_URL with a fallback to ensure it's never undefined
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Fetch all testimonials from the backend
 */
export async function getTestimonials() {
  try {
    // Using string concatenation instead of template literals to avoid any issues
    const response = await fetch(API_URL + '/api/testimonials');
    if (!response.ok) {
      throw new Error('Failed to fetch testimonials');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

/**
 * Add a new testimonial to the backend
 */
export async function addTestimonial(testimonial: {
  name: string;
  message: string;
  designation: string;
}) {
  try {
    // Using string concatenation instead of template literals
    const response = await fetch(API_URL + '/api/testimonials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testimonial),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add testimonial');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding testimonial:', error);
    throw error;
  }
}