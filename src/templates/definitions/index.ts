import { TemplateDefinition, APP_STORE_TEMPLATES } from "./app-store";
import { ANDROID_PLAYSTORE_TEMPLATES } from "./android-playstore";
import { AI_SAAS_TEMPLATES } from "./ai-saas";
import { FITNESS_TEMPLATES } from "./fitness";
import { FINANCE_TEMPLATES } from "./finance";
import { MINIMAL_LUXURY_TEMPLATES } from "./minimal-luxury";
import { LIFESTYLE_TEMPLATES } from "./lifestyle";
import { MARKETING_TEMPLATES } from "./marketing";

export type { TemplateDefinition };

export const STARTER_TEMPLATES: TemplateDefinition[] = [
  ...ANDROID_PLAYSTORE_TEMPLATES, // 1-10: Android Google Play Store
  ...APP_STORE_TEMPLATES,          // 11-16: Premium App Store
  ...AI_SAAS_TEMPLATES,            // 17-21: AI & SaaS Products
  ...FITNESS_TEMPLATES,            // 22-25: Fitness & Wellness
  ...FINANCE_TEMPLATES,            // 26-29: Finance & Business
  ...MINIMAL_LUXURY_TEMPLATES,     // 30-33: Minimal & Luxury
  ...LIFESTYLE_TEMPLATES,          // 34-36: Creative & Lifestyle
  ...MARKETING_TEMPLATES,          // 37-40: Marketing & Feature Graphics
];

