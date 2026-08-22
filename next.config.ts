import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* В Next 16 это allowlist, а не просто дефолт: `quality` вне списка
       молча округляется до ближайшего разрешённого значения. 75 хватает
       почти всюду, но баннер /basic-laws — макро с волосяными волокнами
       в резкости, и на нём 75 их заметно замыливает. */
    qualities: [75, 90],
  },
};

export default nextConfig;
