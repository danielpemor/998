// src/lib/directus-homepage.ts
import directus from './directus';
import { readItems } from '@directus/sdk';

export async function getHomepageData() {
  try {
    // Obtener hero activo
    const heroSections = await directus.request(
      readItems('hero_sections', {
        filter: { active: { _eq: true } },
        sort: ['order'],
        limit: 1,
      })
    );

    // Obtener features editoriales
    const editorialFeatures = await directus.request(
      readItems('editorial_features', {
        filter: { active: { _eq: true } },
        sort: ['order'],
        limit: 3,
      })
    );

    // Obtener items del lookbook
    const lookbookItems = await directus.request(
      readItems('lookbook_items', {
        filter: { 
          featured_home: { _eq: true },
          status: { _eq: 'published' }
        },
        sort: ['order'],
        limit: 4,
      })
    );

    // Obtener configuración de secciones
    const homepageSections = await directus.request(
      readItems('homepage_sections', {
        filter: { active: { _eq: true } },
        sort: ['order'],
      })
    );

    return {
      hero: heroSections[0] || null,
      features: editorialFeatures,
      lookbook: lookbookItems,
      sections: homepageSections
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return {
      hero: null,
      features: [],
      lookbook: [],
      sections: []
    };
  }
}