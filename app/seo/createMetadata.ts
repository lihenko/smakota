import type { Metadata } from "next";

export function createMetadata(
  title: string,
  description: string,
  ogImage: string,
  baseUrl: string = "https://smakota.club" 
): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [ogImage],
    },
    metadataBase: new URL(baseUrl),
  };
}