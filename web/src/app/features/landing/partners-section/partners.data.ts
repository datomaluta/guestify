import { PartnerHotel } from '../../../shared/partner-card/partner-card.component';

/**
 * პარტნიორი სასტუმროების სრული სია — ლენდინგის Partners სექცია (მხოლოდ `featured`)
 * და /partners გვერდი (ყველა) ორივე აქედან იკითხავს, რომ სია ერთ ადგილას იმართებოდეს.
 */
export const PARTNER_HOTELS: PartnerHotel[] = [
  {
    slug: 'sevsamora',
    name: 'Sevsamora',
    logo: 'images/partners/sevsamora.webp',
    featured: true,
  },
  {
    slug: 'radisson-red',
    name: 'Radisson RED',
    logo: 'images/partners/redison-red.webp',
    featured: true,
  },
  {
    slug: 'paragraph',
    name: 'Paragraph',
    logo: 'images/partners/paragraph.webp',
    featured: true,
  },
  {
    slug: 'castello-mare',
    name: 'Castello Mare',
    logo: 'images/partners/castello-mare.webp',
  },
  {
    slug: 'dreamland-oasis',
    name: 'Dreamland Oasis',
    logo: 'images/partners/dreamland-oasis.webp',
  },
  {
    slug: 'georgia-gold',
    name: 'Georgia Gold',
    logo: 'images/partners/georgiagold.webp',
  },
  { slug: 'kass', name: 'KASS', logo: 'images/partners/kasslogo.webp' },
  {
    slug: 'orbi-hotels',
    name: 'Orbi Hotels',
    logo: 'images/partners/orbi-hotels.webp',
  },
];
