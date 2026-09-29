import type { ComponentType } from "react";
import { CustomHtmlSection } from "@/components/sections/CustomHtmlSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductGridSection } from "@/components/sections/ProductGridSection";
import type { SectionProps } from "@/components/sections/types";

export const sectionRegistry: Record<string, ComponentType<SectionProps>> = {
  hero: HeroSection,
  product_grid: ProductGridSection,
  custom_html: CustomHtmlSection,
};

export function getSectionComponent(
  sectionType: string
): ComponentType<SectionProps> | null {
  return sectionRegistry[sectionType] ?? null;
}
