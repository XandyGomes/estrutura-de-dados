import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const basePath = process.env.GITHUB_ACTIONS ? "/ed" : "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx", "mdx"],
  basePath,
  assetPrefix: basePath,
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
