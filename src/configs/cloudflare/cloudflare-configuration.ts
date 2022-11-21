const cloudflareConfiguration = () => ({
  token: {
    images: process.env.CLOUDFLARE_API_TOKEN,
  },
  accountID: process.env.CLOUDFLARE_ACCOUNT_ID,
  url: {
    images: process.env.CLOUDFLARE_IMAGE_URL,
    deliveryImages: process.env.CLOUDFLARE_DELIVERY_IMAGE_URL,
  },
});

export default cloudflareConfiguration;
