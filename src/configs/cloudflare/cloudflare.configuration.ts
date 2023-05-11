import { registerAs } from '@nestjs/config';

const cloudflareConfiguration = registerAs('cloudflare', () => ({
  token: {
    image: process.env.CLOUDFLARE_API_TOKEN,
  },
  accountID: process.env.CLOUDFLARE_ACCOUNT_ID,
  url: {
    image: process.env.CLOUDFLARE_IMAGE_URL,
    deliveryImage: process.env.CLOUDFLARE_DELIVERY_IMAGE_URL,
  },
}));

export default cloudflareConfiguration;
