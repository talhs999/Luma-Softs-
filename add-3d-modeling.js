require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function add3DModeling() {
  const service = {
    slug: "3d-modeling",
    icon: "Monitor", // Will just use a generic icon until user changes it
    title: "3D Modeling & Animation",
    image: "", // Empty so it uses the icon or user uploads one later
    short_desc: "High-quality 3D models, product rendering, and immersive animations for diverse industries.",
    long_desc: "Bring your ideas to life with our premium 3D modeling and animation services. We create realistic product renderings, architectural visualizations, and custom 3D assets that captivate your audience and elevate your brand's visual identity.",
    features: [
      "Product 3D Rendering",
      "Architectural Visualization",
      "Character Modeling",
      "3D Animation & Walkthroughs",
      "Game Assets & Environments"
    ],
    benefits: [
      "Photorealistic Quality",
      "Enhanced Visual Appeal",
      "Faster Prototyping",
      "Cost-Effective Marketing",
      "Engaging User Experience"
    ]
  };

  // Check if it already exists
  const { data: existing } = await supabase.from('services').select('*').eq('slug', '3d-modeling').single();
  
  if (existing) {
    console.log("3D Modeling service already exists. Updating...");
    await supabase.from('services').update(service).eq('id', existing.id);
    console.log("Updated!");
  } else {
    console.log("Adding 3D Modeling service...");
    const { data, error } = await supabase.from('services').insert([service]);
    if (error) {
      console.error("Error inserting:", error);
    } else {
      console.log("Successfully added 3D Modeling service!");
    }
  }
}

add3DModeling();
