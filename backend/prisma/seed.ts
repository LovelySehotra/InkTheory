import { PrismaClient } from '../src/generated/client/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clean database
  await prisma.booking.deleteMany();
  await prisma.gallery.deleteMany();
  await prisma.artist.deleteMany();
  await prisma.contact.deleteMany();

  console.log('Database cleaned.');

  // Create Artists
  const marcus = await prisma.artist.create({
    data: {
      name: 'Marcus Thorne',
      bio: 'Marcus Thorne is a master of contrast and anatomical accuracy, bringing over 12 years of professional experience to Ink Theory. Specializing in hyper-realistic portraits and complex dark sleeves, Marcus works closely with clients to capture deep emotions and memories onto their skin with photographic precision.',
      specialty: ['Realism', 'Blackwork'],
      instagram: 'marcusthorne_ink',
      experience: '12 Years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    },
  });

  const elena = await prisma.artist.create({
    data: {
      name: 'Elena Rostova',
      bio: 'Elena began her artistic career in illustrative design and painting before transitioning to tattooing 6 years ago. Known for her flawless fine lines, whimsical pop-culture, and pastel colored anime scenes, she can turn any illustration or anime character into a permanent, vibrant piece of high-end art.',
      specialty: ['Anime', 'Minimal'],
      instagram: 'elena_ink_art',
      experience: '6 Years',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
    },
  });

  const kai = await prisma.artist.create({
    data: {
      name: 'Kai Tanaka',
      bio: 'Kai combines mathematical precision with ancient traditional motifs. With 9 years of experience traversing tattooing styles in Tokyo and Berlin, Kai specializes in sacred geometry, heavy solid black inkpacking, and traditional American and Japanese blockwork that flows gracefully along the body\'s natural lines.',
      specialty: ['Traditional', 'Geometric', 'Blackwork'],
      instagram: 'kai_tanaka_tattoo',
      experience: '9 Years',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    },
  });

  console.log('Artists created.');

  // Create Gallery Items
  const galleryItems = [
    // Realism
    {
      title: 'Hyperrealistic Lion Portrait',
      category: 'Realism',
      image: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&q=80&w=600',
      artistId: marcus.id,
    },
    {
      title: 'Dark Forest & Hourglass Sleeve',
      category: 'Realism',
      image: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=600',
      artistId: marcus.id,
    },
    // Anime
    {
      title: 'Neon Cyberpunk Samurai',
      category: 'Anime',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=600',
      artistId: elena.id,
    },
    {
      title: 'Spirited Away Haku Dragon',
      category: 'Anime',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600',
      artistId: elena.id,
    },
    // Minimal
    {
      title: 'Constellation & Lunar Cycles',
      category: 'Minimal',
      image: 'https://images.unsplash.com/photo-1590246814883-57c511e76533?auto=format&fit=crop&q=80&w=600',
      artistId: elena.id,
    },
    {
      title: 'Single Line Wildflower Bouquet',
      category: 'Minimal',
      image: 'https://images.unsplash.com/photo-1562967914-4c40bdd3c834?auto=format&fit=crop&q=80&w=600',
      artistId: elena.id,
    },
    // Traditional
    {
      title: 'Classic American Dagger & Rose',
      category: 'Traditional',
      image: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=600',
      artistId: kai.id,
    },
    {
      title: 'Traditional Roaring Panther',
      category: 'Traditional',
      image: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&q=80&w=600',
      artistId: kai.id,
    },
    // Blackwork
    {
      title: 'Ornamental Dark Mandala Sleeve',
      category: 'Blackwork',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600',
      artistId: kai.id,
    },
    {
      title: 'Nordic Runes & Raven Blackwork',
      category: 'Blackwork',
      image: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&q=80&w=600',
      artistId: marcus.id,
    },
    // Geometric
    {
      title: 'Sacred Geometry Metatron Cube',
      category: 'Geometric',
      image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600',
      artistId: kai.id,
    },
    {
      title: 'Abstract 3D Illusion Dotwork',
      category: 'Geometric',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600',
      artistId: kai.id,
    },
  ];

  for (const item of galleryItems) {
    await prisma.gallery.create({
      data: item,
    });
  }

  console.log('Gallery seeded.');
  console.log('Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
