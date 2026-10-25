"use client";

import React, { useRef, useEffect } from "react";
import { Group, Rect, Text as KonvaText, Circle, Line } from "react-konva";
import Konva from "konva";
import { CanvasElement } from "@/types/editor";
import { CanvasDeviceRenderer } from "./CanvasDeviceRenderer";
import { CanvasImageRenderer } from "./CanvasImageRenderer";
import { useEditorStore } from "@/stores/editor-store";

interface CanvasElementItemProps {
  element: CanvasElement;
  canvasId: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  registerNode: (id: string, node: Konva.Node | null) => void;
}

export const CanvasElementItem: React.FC<CanvasElementItemProps> = ({
  element,
  canvasId,
  isSelected,
  onSelect,
  registerNode,
}) => {
  const groupRef = useRef<Konva.Group>(null);
  const updateElement = useEditorStore((s) => s.updateElement);
  const setActiveCanvas = useEditorStore((s) => s.setActiveCanvas);
  const setActiveNav = useEditorStore((s) => s.setActiveNav);

  useEffect(() => {
    if (groupRef.current) {
      registerNode(element.id, groupRef.current);
    }
    return () => {
      registerNode(element.id, null);
    };
  }, [element.id, registerNode]);

  // Load & redraw when custom font or text styling changes
  useEffect(() => {
    if (element.type === "text" && typeof document !== "undefined" && document.fonts) {
      const family = element.fontFamily || "sans-serif";
      try {
        document.fonts.load(`16px "${family}"`).then(() => {
          groupRef.current?.getLayer()?.batchDraw();
        }).catch(() => {});
      } catch {}
      document.fonts.ready.then(() => {
        groupRef.current?.getLayer()?.batchDraw();
      });
    }
  }, [element]);

  const getKonvaFontStyle = () => {
    if (element.type !== "text") return "normal";
    const isItalic = element.fontStyle === "italic";
    const isBold =
      element.fontWeight === "bold" ||
      element.fontWeight === "700" ||
      element.fontWeight === "800" ||
      element.fontWeight === "900";
    if (isItalic && isBold) return "italic bold";
    if (isItalic) return "italic";
    if (isBold) return "bold";
    return "normal";
  };

  const getKonvaFontFamily = () => {
    if (element.type !== "text" || !element.fontFamily) return "sans-serif";
    const f = element.fontFamily;
    if (f === "Geist Sans" || f === "Geist") {
      return '"Geist", "Inter", sans-serif';
    }
    if (f === "Monospace") {
      return 'monospace, "Courier New", Courier';
    }
    return `"${f}", sans-serif`;
  };

  if (!element.visible) return null;

  const handleSelectElement = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    e.cancelBubble = true;
    setActiveCanvas(canvasId);
    onSelect(element.id);

    const isBadgeOrLaurel =
      element.type === "badge" ||
      (element.type === "image" &&
        (element.id.toLowerCase().includes("badge") ||
          element.id.toLowerCase().includes("wreath") ||
          element.id.toLowerCase().includes("laurel") ||
          element.id.toLowerCase().includes("rating") ||
          element.id.toLowerCase().includes("spotlight") ||
          element.id.toLowerCase().includes("award") ||
          element.name.toLowerCase().includes("badge") ||
          element.name.toLowerCase().includes("laurel") ||
          element.name.toLowerCase().includes("wreath") ||
          element.name.toLowerCase().includes("rating") ||
          element.name.toLowerCase().includes("spotlight") ||
          element.name.toLowerCase().includes("award")));

    if (element.type === "text") {
      setActiveNav("content");
    } else if (element.type === "mockup") {
      setActiveNav("screenshot");
    } else if (isBadgeOrLaurel) {
      setActiveNav("layers");
    } else if (element.type === "image") {
      setActiveNav("screenshot");
    } else {
      setActiveNav("layers");
    }
  };

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    updateElement(canvasId, element.id, {
      x: Math.round(e.target.x()),
      y: Math.round(e.target.y()),
    });
  };

  const handleTransformEnd = () => {
    const node = groupRef.current;
    if (!node) return;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // Reset scale and update real dimensions
    node.scaleX(1);
    node.scaleY(1);

    updateElement(canvasId, element.id, {
      x: Math.round(node.x()),
      y: Math.round(node.y()),
      width: Math.max(20, Math.round(node.width() * scaleX)),
      height: Math.max(20, Math.round(node.height() * scaleY)),
      rotation: Math.round(node.rotation()),
    });
  };

  return (
    <Group
      ref={groupRef}
      id={element.id}
      x={element.x}
      y={element.y}
      width={element.width}
      height={element.height}
      rotation={element.rotation || 0}
      opacity={element.opacity ?? 1}
      draggable={!element.locked}
      onClick={handleSelectElement}
      onTap={handleSelectElement}
      onDragEnd={handleDragEnd}
      onTransformEnd={handleTransformEnd}
    >
      {/* 1. TEXT ELEMENT */}
      {element.type === "text" && (
        <Group>
          <KonvaText
            text={element.text}
            width={element.width}
            fontSize={element.fontSize}
            fontFamily={getKonvaFontFamily()}
            fontStyle={getKonvaFontStyle()}
            fill={element.fill || "#ffffff"}
            align={element.align || "center"}
            lineHeight={element.lineHeight || 1.2}
            letterSpacing={element.letterSpacing || 0}
            shadowColor={element.shadowColor || "rgba(0,0,0,0.4)"}
            shadowBlur={element.shadowBlur || 0}
            shadowOffsetY={element.shadowBlur ? 4 : 0}
            wrap="word"
          />
        </Group>
      )}

      {/* 2. DEVICE MOCKUP */}
      {element.type === "mockup" && (
        <CanvasDeviceRenderer element={element} />
      )}

      {/* 3. BADGE ELEMENT */}
      {element.type === "badge" && (
        <Group>
          <Rect
            x={0}
            y={0}
            width={element.width}
            height={element.height}
            cornerRadius={element.borderRadius || element.height / 2}
            fill={element.bgColor || "rgba(56, 189, 248, 0.15)"}
            stroke={element.borderColor || "#38bdf8"}
            strokeWidth={1.5}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.3}
          />
          <KonvaText
            x={10}
            y={(element.height - (element.fontSize || 16)) / 2 - 2}
            width={element.width - 20}
            text={element.text}
            fontSize={element.fontSize || 16}
            fontFamily="sans-serif"
            fontStyle="bold"
            fill={element.textColor || "#38bdf8"}
            align="center"
          />
        </Group>
      )}

      {/* 4. SHAPE ELEMENT */}
      {element.type === "shape" && (
        <Group>
          {element.shapeType === "circle" ? (
            <Circle
              x={element.width / 2}
              y={element.height / 2}
              radius={Math.min(element.width, element.height) / 2}
              fill={element.fill || "#38bdf8"}
              stroke={element.stroke}
              strokeWidth={element.strokeWidth || 0}
            />
          ) : element.shapeType === "arrow" ? (
            <Line
              points={[
                0,
                element.height / 2,
                element.width - 20,
                element.height / 2,
                element.width - 30,
                0,
                element.width,
                element.height / 2,
                element.width - 30,
                element.height,
                element.width - 20,
                element.height / 2,
              ]}
              fill={element.fill || "#38bdf8"}
              stroke={element.stroke || element.fill || "#38bdf8"}
              strokeWidth={element.strokeWidth || 3}
            />
          ) : (
            <Rect
              x={0}
              y={0}
              width={element.width}
              height={element.height}
              cornerRadius={element.cornerRadius || 12}
              fill={element.fill || "#1e293b"}
              stroke={element.stroke}
              strokeWidth={element.strokeWidth || 0}
            />
          )}
        </Group>
      )}

      {/* 5. IMAGE ELEMENT (Floating cards, illustrations, logos) */}
      {element.type === "image" && (
        <CanvasImageRenderer element={element} />
      )}

      {/* Selection Border Indicator if selected */}
      {isSelected && (
        <Rect
          x={-2}
          y={-2}
          width={element.width + 4}
          height={element.height + 4}
          stroke="#38bdf8"
          strokeWidth={1.5}
          dash={[4, 4]}
          listening={false}
        />
      )}
    </Group>
  );
};
