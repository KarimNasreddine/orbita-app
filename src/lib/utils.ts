import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge tailwind classes with clsx
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate a chat href from two user ids
export function chatHrefConstructor(id1: string, id2: string, id3: string) {
  // const sortedIds = [id1, id2].sort();
  return `${id1}--${id2}--${id3}`;
}

// Replace colons with double underscores
export function toPusherKey(key: string) {
  return key.replace(/:/g, "__");
}
