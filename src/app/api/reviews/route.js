import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET() {
  try {
    const reviews = await query('SELECT * FROM reviews ORDER BY created_at ASC');
    if (Array.isArray(reviews) && reviews.length > 0) {
      return NextResponse.json(reviews);
    }
    return NextResponse.json(getDefaultReviews());
  } catch (error) {
    console.error('Error fetching reviews (using fallback mock data):', error.message);
    return NextResponse.json(getDefaultReviews());
  }
}

function getDefaultReviews() {
  return [
    { 
      id: 1, 
      name: "Ali Raza", 
      role: "CEO",
      company: "TechNova Pakistan", 
      rating: 5,
      text: "Luma Softs transformed our business with an exceptional custom web platform. The speed, design, and UI responsiveness exceeded our expectations. Highly recommended in Karachi!",
      time: "2 weeks ago"
    },
    { 
      id: 2, 
      name: "Sara Ahmed", 
      role: "Founder",
      company: "Sara Boutique", 
      rating: 5,
      text: "The modern 3D visuals and intuitive design on our e-commerce store directly boosted our conversion rates. Amazing work by the Luma Softs team!",
      time: "3 weeks ago"
    },
    { 
      id: 3, 
      name: "Usman Khan", 
      role: "Director",
      company: "BuildIt Group", 
      rating: 5,
      text: "Professional, punctual, and innovative. They understood our enterprise software requirements and delivered clean, scalable architecture.",
      time: "1 month ago"
    },
    { 
      id: 4, 
      name: "Hina Javed", 
      role: "Operations Manager",
      company: "Foodies Hub", 
      rating: 5,
      text: "The web app and automated chatbot integrated by Luma Softs helped us streamline customer support significantly. Truly top notch service!",
      time: "1 month ago"
    },
    { 
      id: 5, 
      name: "Bilal Tariq", 
      role: "CTO",
      company: "Apex Logistics", 
      rating: 5,
      text: "Outstanding work on our web platform and branding. Clean code, great communication, and fast turnaround.",
      time: "2 months ago"
    }
  ];
}
