import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
export const slugify = (title) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") + `-${new Date().getTime()}`;

export function readingTime(text = "") {
  const words = text.split(" ");
  const minutes = Math.ceil(words.length / 200);
  return minutes + " minute" + (minutes > 1 ? "s" : "");
}
