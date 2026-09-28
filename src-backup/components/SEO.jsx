import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://nakshath-equestrian.vercel.app';

const defaultSeo = {
  title: 'Horse Riding Academy in Bengaluru | Nakshath Equestrian Club',
  description: 'Learn horse riding in Sarjapura, Bengaluru with professional coaching, trained horses, structured programmes and indoor equestrian facilities.',
};

const pages = {
  '/': defaultSeo,
  '/about': {
    title: 'About Nakshath Equestrian Club | Bengaluru',
    description: 'Meet the competitive riders and coaches behind Nakshath Equestrian Club and discover our approach to safe, structured equestrian training.',
  },
  '/facilities': {
    title: 'Equestrian Facilities in Bengaluru | Nakshath',
    description: 'Explore our indoor and outdoor arenas, dressage arena, lunging pen, stables, café and rider facilities in Sarjapura, Bengaluru.',
  },
  '/horses': {
    title: 'Our Horses | Nakshath Equestrian Club',
    description: 'Meet the trained horses at Nakshath Equestrian Club and learn how every horse is matched to each rider’s experience, confidence and goals.',
  },
  '/courses': {
    title: 'Horse Riding Classes in Bengaluru | Nakshath',
    description: 'Horse riding classes for children, beginners, intermediate and competitive riders in Sarjapura, Bengaluru. Explore structured riding programmes.',
  },
  '/trainers': {
    title: 'Equestrian Trainers in Bengaluru | Nakshath',
    description: 'Learn with experienced equestrian trainers in small, supervised batches, from first rides through competitive show-jumping preparation.',
  },
  '/contact': {
    title: 'Contact Nakshath Equestrian Club | Sarjapura',
    description: 'Contact or visit Nakshath Equestrian Club in S. Medahalli, Sarjapura, Bengaluru. Ask about riding classes, trial rides and facilities.',
  },
  '/book-your-trial-ride': {
    title: 'Book Your Trial Ride | Nakshath Equestrian Club',
    description: 'Book a trial horse ride at Nakshath Equestrian Club in Sarjapura, Bengaluru. Choose a free 10-minute introduction or a 45-minute trial session.',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | Nakshath Equestrian Club',
    description: 'Terms and safety conditions for riding, training and services at Nakshath Equestrian Club.',
  },
  '/refund-and-cancellation': {
    title: 'Refund & Cancellation Policy | Nakshath Equestrian Club',
    description: 'Read the booking, refund and cancellation policy for Nakshath Equestrian Club.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Nakshath Equestrian Club',
    description: 'Learn how Nakshath Equestrian Club collects, uses and protects personal information.',
  },
  '/enquiry': {
    title: 'Enquire | Nakshath Equestrian Club',
    description: 'Send an enquiry to Nakshath Equestrian Club.',
    robots: 'noindex,follow',
  },
};

const setMeta = (selector, attribute, value) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const [name, content] = attribute;
    element.setAttribute(name, content);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
};

const SEO = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = pages[pathname] || defaultSeo;
    const canonicalUrl = `${SITE_URL}${pathname === '/' ? '/' : pathname}`;

    document.title = seo.title;
    setMeta('meta[name="description"]', ['name', 'description'], seo.description);
    setMeta('meta[name="robots"]', ['name', 'robots'], seo.robots || 'index,follow,max-image-preview:large');
    setMeta('meta[property="og:title"]', ['property', 'og:title'], seo.title);
    setMeta('meta[property="og:description"]', ['property', 'og:description'], seo.description);
    setMeta('meta[property="og:url"]', ['property', 'og:url'], canonicalUrl);
    setMeta('meta[name="twitter:title"]', ['name', 'twitter:title'], seo.title);
    setMeta('meta[name="twitter:description"]', ['name', 'twitter:description'], seo.description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
  }, [pathname]);

  return null;
};

export default SEO;
