"use client";

import React from "react";
import { Group, Rect, Image as KonvaImage } from "react-konva";
import { ImageElement } from "@/types/editor";
import { useKonvaImage } from "./use-konva-image";

interface CanvasImageRendererProps {
  element: ImageElement;
}

export const CanvasImageRenderer: React.FC<CanvasImageRendererProps> = ({ element }) => {
  const img = useKonvaImage(element.url);

  return (
    <Group>
      {/* Optional drop shadow / card container */}
      {element.shadowBlur > 0 && (
        <Rect
          x={0}
          y={0}
          width={element.width}
          height={element.height}
          cornerRadius={element.cornerRadius || 0}
          fill="transparent"
          shadowColor={element.shadowColor || "rgba(0,0,0,0.3)"}
          shadowBlur={element.shadowBlur}
          shadowOffsetY={element.shadowBlur / 2}
        />
      )}

      {/* Clipped image */}
      <Group
        clipFunc={(ctx) => {
          if (element.cornerRadius && element.cornerRadius > 0) {
            ctx.beginPath();
            ctx.roundRect(0, 0, element.width, element.height, element.cornerRadius);
            ctx.closePath();
          } else {
            ctx.beginPath();
            ctx.rect(0, 0, element.width, element.height);
            ctx.closePath();
          }
        }}
      >
        {img ? (
          <KonvaImage
            image={img}
            x={0}
            y={0}
            width={element.width}
            height={element.height}
          />
        ) : (
          <Rect
            x={0}
            y={0}
            width={element.width}
            height={element.height}
            fill="#1e2235"
          />
        )}
      </Group>
    </Group>
  );
};
