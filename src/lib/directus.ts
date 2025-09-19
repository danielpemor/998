// src/lib/directus.ts
import { createDirectus, rest, authentication } from '@directus/sdk';

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  sale_price?: number;
  stock: number;
  images: any[];
  category: Category;
  sizes: Array<{ size: string; stock: number }>;
  status: string;
};

type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: any;
  status: string;
};

type HeroSection = {
  id: string;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  background_image: any;
  active: boolean;
};

type Schema = {
  products: Product[];
  categories: Category[];
  hero_sections: HeroSection[];
};

const directus = createDirectus<Schema>(
  import.meta.env.PUBLIC_DIRECTUS_URL || 'http://localhost:8055'
)
.with(rest())
.with(authentication('cookie'));

export default directus;

// Funciones helper
export async function getProducts(options = {}) {
  try {
    return await directus.request(
      readItems('products', {
        fields: ['*', 'category.*', 'images.*'],
        filter: { status: { _eq: 'published' } },
        ...options,
      })
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const products = await directus.request(
      readItems('products', {
        fields: ['*', 'category.*', 'images.*'],
        filter: { 
          slug: { _eq: slug },
          status: { _eq: 'published' }
        },
        limit: 1,
      })
    );
    return products[0];
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getCategories() {
  try {
    return await directus.request(
      readItems('categories', {
        filter: { status: { _eq: 'published' } },
        sort: ['order'],
      })
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getActiveHeroSection() {
  try {
    const sections = await directus.request(
      readItems('hero_sections', {
        fields: ['*', 'background_image.*'],
        filter: { active: { _eq: true } },
        sort: ['order'],
        limit: 1,
      })
    );
    return sections[0];
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return null;
  }
}