import { UPLOADTHING_APP_ID } from "@/consts";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createImageUrl(fileId: string) {
  return `https://${UPLOADTHING_APP_ID}.ufs.sh/f/${fileId}`;
}
