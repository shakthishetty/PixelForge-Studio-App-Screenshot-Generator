import { z } from "zod";

export type DeviceType =
  | "phone_modern"
  | "phone_minimal"
  | "tablet"
  | "laptop"
  | "browser"
  | "watch";

export type DeviceTheme =
  | "dark"
  | "silver"
  | "gold"
  | "midnight"
  | "deep_purple";

export interface GradientStop {
  offset: number;
  color: string;
}

export interface BackgroundConfig {
  type: "solid" | "gradient" | "pattern" | "image";
  color: string;
  gradient: {
    type: "linear" | "radial";
    angle: number; // 0 to 360
    stops: GradientStop[];
  };
  pattern: {
    type: "dots" | "grid" | "stripes" | "none";
    color: string;
    opacity: number;
    scale: number;
  };
  imageUrl?: string;
  imageOpacity?: number;
}

export interface BaseElement {
  id: string;
  name: string;
  type: "text" | "mockup" | "image" | "shape" | "badge";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  visible: boolean;
  locked: boolean;
}

export interface TextElement extends BaseElement {
  type: "text";
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  fontStyle: "normal" | "italic";
  fill: string;
  align: "left" | "center" | "right";
  lineHeight: number;
  letterSpacing: number;
  highlightWord?: string;
  highlightColor?: string;
  shadowColor?: string;
  shadowBlur?: number;
}

export interface MockupElement extends BaseElement {
  type: "mockup";
  deviceType: DeviceType;
  deviceTheme: DeviceTheme;
  screenshotUrl: string;
  screenFit: "cover" | "contain" | "fill";
  showNotchOrIsland: boolean;
  cornerRadius: number;
  shadowBlur: number;
  shadowOpacity: number;
  shadowOffsetY: number;
  glareEffect: boolean;
  browserTitle?: string;
  browserUrl?: string;
}

export interface ImageElement extends BaseElement {
  type: "image";
  url: string;
  cornerRadius: number;
  shadowBlur: number;
  shadowColor?: string;
}

export interface ShapeElement extends BaseElement {
  type: "shape";
  shapeType: "rect" | "circle" | "star" | "arrow" | "pill";
  fill: string;
  stroke: string;
  strokeWidth: number;
  cornerRadius: number;
}

export interface BadgeElement extends BaseElement {
  type: "badge";
  text: string;
  iconName?: string;
  textColor: string;
  bgColor: string;
  borderColor?: string;
  fontSize: number;
  borderRadius: number;
}

export type CanvasElement =
  | TextElement
  | MockupElement
  | ImageElement
  | ShapeElement
  | BadgeElement;

export interface CanvasItem {
  id: string;
  name: string;
  width: number;
  height: number;
  background: BackgroundConfig;
  elements: CanvasElement[];
}

export interface ProjectDocument {
  id: string;
  version: number;
  title: string;
  canvases: CanvasItem[];
  activeCanvasId: string;
  targetPlatform: string;
  createdAt: string;
  updatedAt: string;
}

export interface CanvasSizePreset {
  id: string;
  name: string;
  width: number;
  height: number;
  category: "phone" | "tablet" | "desktop" | "feature" | "social";
  platform: "google_play" | "app_store" | "universal" | "social";
  description: string;
}

export type ActiveNavSection =
  | "projects"
  | "layout"
  | "content"
  | "screenshot"
  | "background"
  | "layers"
  | "brands";
