"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { Stage, Layer, Rect, Transformer, Circle, Line, Group } from "react-konva";
import Konva from "konva";
import { CanvasItem } from "@/types/editor";
import { CanvasElementItem } from "@/features/canvas/CanvasElementItem";
import { useEditorStore } from "@/stores/editor-store";

export interface DesignCanvasHandle {
  exportImage: (options?: { format?: "image/png" | "image/jpeg"; quality?: number; pixelRatio?: number }) => string;
  getStage: () => Konva.Stage | null;
}

interface DesignCanvasProps {
  canvas: CanvasItem;
  isActive: boolean;
  scale?: number;
}

export const DesignCanvas = forwardRef<DesignCanvasHandle, DesignCanvasProps>(
  ({ canvas, isActive, scale = 1 }, ref) => {
    const stageRef = useRef<Konva.Stage>(null);
    const transformerRef = useRef<Konva.Transformer>(null);
    const nodesRef = useRef<Map<string, Konva.Node>>(new Map());

    const selectedElementId = useEditorStore((s) => s.selectedElementId);
    const setSelectedElementId = useEditorStore((s) => s.setSelectedElementId);
    const setActiveCanvas = useEditorStore((s) => s.setActiveCanvas);
    const isPreview = useEditorStore((s) => s.isPreview);

    const registerNode = (id: string, node: Konva.Node | null) => {
      if (node) {
        nodesRef.current.set(id, node);
      } else {
        nodesRef.current.delete(id);
      }
    };

    // Attach transformer to selected node
    useEffect(() => {
      if (isPreview || !isActive || !transformerRef.current) return;
      const tr = transformerRef.current;

      if (selectedElementId) {
        const selectedNode = nodesRef.current.get(selectedElementId);
        if (selectedNode) {
          tr.nodes([selectedNode]);
          tr.getLayer()?.batchDraw();
          return;
        }
      }
      tr.nodes([]);
      tr.getLayer()?.batchDraw();
    }, [selectedElementId, isActive, isPreview, canvas.elements]);

    // Expose export API
    useImperativeHandle(ref, () => ({
      exportImage: (options) => {
        const stage = stageRef.current;
        if (!stage) return "";
        const tr = transformerRef.current;
        const currentNodes = tr?.nodes() || [];
        tr?.nodes([]);

        // Temporarily reset stage scale to 1 for full-resolution capture
        stage.scale({ x: 1, y: 1 });
        stage.width(canvas.width);
        stage.height(canvas.height);
        stage.batchDraw();

        const dataUrl = stage.toDataURL({
          mimeType: options?.format || "image/png",
          quality: options?.quality ?? 1.0,
          pixelRatio: options?.pixelRatio ?? 1.0,
        });

        // Restore viewport scale and transformer
        stage.scale({ x: scale, y: scale });
        stage.width(Math.round(canvas.width * scale));
        stage.height(Math.round(canvas.height * scale));
        if (currentNodes.length > 0) {
          tr?.nodes(currentNodes);
        }
        stage.batchDraw();

        return dataUrl;
      },
      getStage: () => stageRef.current,
    }));

    const handleStageMouseDown = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      setActiveCanvas(canvas.id);
      if (e.target === stageRef.current || e.target.name() === "canvas-bg") {
        setSelectedElementId(null);
      }
    };

    // Compute accurate gradient points
    const bg = canvas.background;
    let fillLinearProps: Record<string, any> = {};

    if (bg.type === "gradient" && bg.gradient?.stops?.length) {
      const angle = (bg.gradient.angle ?? 180) % 360;
      let startX = canvas.width / 2;
      let startY = 0;
      let endX = canvas.width / 2;
      let endY = canvas.height;

      if (angle === 90) {
        startX = 0;
        startY = canvas.height / 2;
        endX = canvas.width;
        endY = canvas.height / 2;
      } else if (angle !== 180) {
        const rad = ((angle - 90) * Math.PI) / 180;
        const halfW = canvas.width / 2;
        const halfH = canvas.height / 2;
        startX = halfW - Math.cos(rad) * halfW;
        startY = halfH - Math.sin(rad) * halfH;
        endX = halfW + Math.cos(rad) * halfW;
        endY = halfH + Math.sin(rad) * halfH;
      }

      const colorStops: (number | string)[] = [];
      bg.gradient.stops.forEach((s) => {
        colorStops.push(s.offset, s.color);
      });

      fillLinearProps = {
        fillLinearGradientStartPoint: { x: startX, y: startY },
        fillLinearGradientEndPoint: { x: endX, y: endY },
        fillLinearGradientColorStops: colorStops,
      };
    }

    const displayW = Math.round(canvas.width * scale);
    const displayH = Math.round(canvas.height * scale);

    return (
      <div
        className="relative select-none rounded-2xl overflow-hidden"
        style={{
          width: displayW,
          height: displayH,
        }}
      >
        <Stage
          ref={stageRef}
          width={displayW}
          height={displayH}
          scaleX={scale}
          scaleY={scale}
          onMouseDown={handleStageMouseDown}
          onTouchStart={handleStageMouseDown}
        >
          {/* Background Layer */}
          <Layer>
            <Rect
              name="canvas-bg"
              x={0}
              y={0}
              width={canvas.width}
              height={canvas.height}
              fill={bg.type === "solid" ? bg.color || "#ffffff" : undefined}
              {...fillLinearProps}
            />

            {/* Subtle Dots pattern if active */}
            {bg.pattern && bg.pattern.type === "dots" && (bg.pattern.opacity || 0) > 0 && (
              <Group opacity={bg.pattern.opacity}>
                {Array.from({ length: 20 }).map((_, col) =>
                  Array.from({ length: 35 }).map((__, row) => (
                    <Circle
                      key={`dot-${col}-${row}`}
                      x={col * 54 + 27}
                      y={row * 54 + 27}
                      radius={2}
                      fill={bg.pattern.color || "#ffffff"}
                      listening={false}
                    />
                  ))
                )}
              </Group>
            )}
          </Layer>

          {/* Interactive Elements Layer */}
          <Layer>
            {canvas.elements.map((element) => (
              <CanvasElementItem
                key={element.id}
                element={element}
                canvasId={canvas.id}
                isSelected={!isPreview && isActive && selectedElementId === element.id}
                onSelect={(id) => setSelectedElementId(id)}
                registerNode={registerNode}
              />
            ))}

            {/* Transformer Handle */}
            {!isPreview && isActive && (
              <Transformer
                ref={transformerRef}
                borderStroke="#38bdf8"
                borderStrokeWidth={2}
                anchorFill="#ffffff"
                anchorStroke="#0284c7"
                anchorStrokeWidth={2}
                anchorSize={9}
                anchorCornerRadius={2}
                rotateAnchorOffset={24}
                boundBoxFunc={(oldBox, newBox) => {
                  if (newBox.width < 20 || newBox.height < 20) {
                    return oldBox;
                  }
                  return newBox;
                }}
              />
            )}
          </Layer>
        </Stage>
      </div>
    );
  }
);

DesignCanvas.displayName = "DesignCanvas";
