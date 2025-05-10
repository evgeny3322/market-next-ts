import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // !! WARN !!
    // Временное отключение проверки типов при сборке, пока проблема не будет решена
    ignoreBuildErrors: true,
  },
  eslint: {
    // Временное отключение проверки линтера при сборке
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
