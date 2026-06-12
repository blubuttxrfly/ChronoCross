import {
  IconBook,
  IconBriefcase,
  IconHome,
  IconPlant,
  IconShoppingBag,
  IconTool,
} from "@tabler/icons-react";

export const MARKETPLACE_CATEGORIES = [
  { id: "all", label: "All", icon: null, gradient: "from-stone-300 to-amber-200" },
  { id: "repair", label: "Repair", icon: IconTool, gradient: "from-amber-400 to-orange-500" },
  { id: "education", label: "Education", icon: IconBook, gradient: "from-sky-400 to-blue-500" },
  { id: "home", label: "Home", icon: IconHome, gradient: "from-emerald-400 to-teal-500" },
  { id: "errands", label: "Errands", icon: IconShoppingBag, gradient: "from-rose-400 to-pink-500" },
  { id: "outdoors", label: "Outdoors", icon: IconPlant, gradient: "from-lime-400 to-emerald-500" },
  { id: "career", label: "Career", icon: IconBriefcase, gradient: "from-violet-400 to-purple-500" },
] as const;

export function categoryGradient(category: string) {
  const key = category.toLowerCase();
  const match = MARKETPLACE_CATEGORIES.find(
    (c) => c.id === key || c.label.toLowerCase() === key,
  );
  return match?.gradient ?? "from-amber-300 to-orange-400";
}

export function formatChronosPrice(hours: number): string {
  return `₡${hours}`;
}
