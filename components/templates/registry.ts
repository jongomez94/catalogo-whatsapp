import type { ComponentType } from "react";
import { CosmeticsTemplate } from "@/components/templates/cosmetics";
import { FoodTemplate } from "@/components/templates/food";
import { IncenseTemplate } from "@/components/templates/incense";
import type { TemplateProps } from "@/components/templates/types";

export const templates = {
  cosmetics: CosmeticsTemplate,
  incense: IncenseTemplate,
  food: FoodTemplate,
} as const;

export type TemplateKey = keyof typeof templates;

export function getTemplate(key: string): ComponentType<TemplateProps> {
  if (key in templates) {
    return templates[key as TemplateKey];
  }
  return CosmeticsTemplate;
}
