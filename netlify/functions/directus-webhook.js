// netlify/functions/directus-webhook.js
import { createHmac } from 'crypto';

export async function handler(event, context) {
  // Verificar método
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Verificar firma HMAC
  const signature = event.headers['x-directus-signature'];
  const secret = process.env.DIRECTUS_WEBHOOK_SECRET;
  
  if (!signature || !secret) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  const expectedSignature = createHmac('sha256', secret)
    .update(event.body)
    .digest('hex');

  if (signature !== expectedSignature) {
    return { statusCode: 401, body: 'Invalid signature' };
  }

  try {
    const payload = JSON.parse(event.body);
    
    // Invalidar caché cuando se actualice una categoría
    if (payload.collection === 'categories' && payload.event === 'items.create') {
      // Generar ruta automáticamente
      await fetch(`${process.env.PUBLIC_SITE_URL}/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-revalidate-key': process.env.REVALIDATE_SECRET
        },
        body: JSON.stringify({
          paths: [`/category/${payload.payload.slug}`]
        })
      });
    }

    // Invalidar caché de productos
    if (payload.collection === 'products') {
      const paths = ['/shop'];
      
      if (payload.payload?.slug) {
        paths.push(`/shop/${payload.payload.slug}`);
      }
      
      if (payload.payload?.category) {
        paths.push(`/category/${payload.payload.category.slug}`);
      }

      await fetch(`${process.env.PUBLIC_SITE_URL}/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-revalidate-key': process.env.REVALIDATE_SECRET
        },
        body: JSON.stringify({ paths })
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}