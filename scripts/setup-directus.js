// scripts/setup-directus.js
import { createDirectus, rest, authentication } from '@directus/sdk';
import 'dotenv/config';

const directus = createDirectus(process.env.PUBLIC_DIRECTUS_URL)
  .with(rest())
  .with(authentication());

async function setupDirectus() {
  try {
    // Login como admin
    await directus.login(
      process.env.DIRECTUS_ADMIN_EMAIL,
      process.env.DIRECTUS_ADMIN_PASSWORD
    );

    // Configurar webhook para sincronización
    await directus.request(
      createItem('directus_webhooks', {
        name: 'Netlify Sync',
        method: 'POST',
        url: `${process.env.PUBLIC_SITE_URL}/.netlify/functions/directus-webhook`,
        status: 'active',
        data: true,
        actions: ['items.create', 'items.update', 'items.delete'],
        collections: ['products', 'categories', 'hero_sections'],
        headers: {
          'Content-Type': 'application/json',
          'x-directus-signature': '{{signature}}'
        }
      })
    );

    // Configurar permisos públicos para lectura
    await directus.request(
      createItem('directus_permissions', {
        role: null, // Público
        action: 'read',
        collections: ['products', 'categories', 'hero_sections', 'site_settings'],
        fields: '*'
      })
    );

    console.log('✅ Directus configurado correctamente');
  } catch (error) {
    console.error('❌ Error configurando Directus:', error);
  }
}

setupDirectus();