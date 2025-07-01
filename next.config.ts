import withPWA, { PWAConfig } from "next-pwa";

const nextConfig: PWAConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
};

export default withPWA(nextConfig);
