import { registerAs } from '@nestjs/config';

export default registerAs('shopify', () => ({
  baseURL: process.env.RE_API_SHOPIFY_BASE_URL,
  adminBaseURL: process.env.RE_API_SHOPIFY_ADMIN_BASE_URL,
  adminAPIKey: process.env.RE_API_SHOPIFY_ADMIN_API_KEY,
  apiKey: process.env.RE_API_SHOPIFY_API_KEY,
  secretKey: process.env.RE_API_SHOPIFY_SECRET_KEY,
}));
