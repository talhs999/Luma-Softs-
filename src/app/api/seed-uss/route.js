import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET() {
  try {
    await query(`
      INSERT INTO portfolio (slug, title, category, featured_image, client, duration, technologies, description, challenge, solution, results, testimonial, live_url, show_on_home)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      "united-strategic-solutions",
      "United Strategic Solutions",
      "Web Development",
      "https://image.thum.io/get/width/1200/crop/800/https://unitedstrategicsolutions.com/",
      "United Strategic Solutions",
      "2 Months",
      JSON.stringify(["Next.js", "Tailwind CSS", "Node.js"]),
      "A comprehensive digital marketing agency website operating across UAE, UK, and US, focusing on building marketing systems and designs for growth.",
      "The client needed a highly professional, fast, and globally scalable platform to showcase their 360-degree digital marketing services to an international audience.",
      "Designed and developed a blazing fast, SEO-optimized web platform using Next.js and Tailwind CSS, ensuring smooth animations and a premium user experience.",
      "Achieved perfect Lighthouse scores, improved global load times, and provided a highly engaging portfolio showcase for their international clients.",
      "Luma Softs delivered an exceptional platform. The 2-month development process was smooth, and the end result perfectly represents our global brand.",
      "https://unitedstrategicsolutions.com/",
      1
    ]);
    return NextResponse.json({ success: true, message: "Successfully added United Strategic Solutions to portfolio DB!" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
