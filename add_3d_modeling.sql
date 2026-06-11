INSERT INTO services (slug, icon, title, image, short_desc, long_desc, features, benefits)
VALUES (
  '3d-modeling',
  'Monitor',
  '3D Modeling & Animation',
  '',
  'High-quality 3D models, product rendering, and immersive animations for diverse industries.',
  'Bring your ideas to life with our premium 3D modeling and animation services. We create realistic product renderings, architectural visualizations, and custom 3D assets that captivate your audience and elevate your brand''s visual identity.',
  '["Product 3D Rendering", "Architectural Visualization", "Character Modeling", "3D Animation & Walkthroughs", "Game Assets & Environments"]'::jsonb,
  '["Photorealistic Quality", "Enhanced Visual Appeal", "Faster Prototyping", "Cost-Effective Marketing", "Engaging User Experience"]'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  short_desc = EXCLUDED.short_desc,
  long_desc = EXCLUDED.long_desc,
  features = EXCLUDED.features,
  benefits = EXCLUDED.benefits;
