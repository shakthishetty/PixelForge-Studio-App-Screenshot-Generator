"use client";

import React from "react";
import { Group, Rect, Circle, Image as KonvaImage, Text as KonvaText, Line } from "react-konva";
import { MockupElement } from "@/types/editor";
import { useKonvaImage } from "./use-konva-image";

interface CanvasDeviceRendererProps {
  element: MockupElement;
}

const THEME_COLORS: Record<string, { body: string; rim: string; bezel: string }> = {
  dark: { body: "#16181f", rim: "#2e3447", bezel: "#090a0f" },
  silver: { body: "#e2e8f0", rim: "#cbd5e1", bezel: "#0f172a" },
  gold: { body: "#d4af37", rim: "#fef08a", bezel: "#1c1917" },
  midnight: { body: "#0f172a", rim: "#1e293b", bezel: "#020617" },
  deep_purple: { body: "#2e1065", rim: "#581c87", bezel: "#090514" },
};

export const CanvasDeviceRenderer: React.FC<CanvasDeviceRendererProps> = ({ element }) => {
  const screenshotImg = useKonvaImage(element.screenshotUrl);
  const theme = THEME_COLORS[element.deviceTheme] || THEME_COLORS.dark;

  const width = element.width;
  const height = element.height;

  // Render based on device type
  if (element.deviceType === "browser") {
    const titleBarHeight = Math.max(38, Math.round(height * 0.07));
    const screenWidth = width - 4;
    const screenHeight = height - titleBarHeight - 4;

    return (
      <Group>
        {/* Window Shadow & Outer casing */}
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          cornerRadius={element.cornerRadius || 16}
          fill="#131722"
          stroke="#262c40"
          strokeWidth={2}
          shadowColor="black"
          shadowBlur={element.shadowBlur || 40}
          shadowOpacity={element.shadowOpacity || 0.6}
          shadowOffsetY={element.shadowOffsetY || 20}
        />

        {/* Title bar */}
        <Rect
          x={2}
          y={2}
          width={width - 4}
          height={titleBarHeight}
          cornerRadius={[element.cornerRadius || 16, element.cornerRadius || 16, 0, 0]}
          fill="#1a1f2e"
        />

        {/* Traffic Lights */}
        <Circle x={22} y={titleBarHeight / 2 + 2} r={6} fill="#ff5f56" stroke="#e0443e" strokeWidth={1} />
        <Circle x={40} y={titleBarHeight / 2 + 2} r={6} fill="#ffbd2e" stroke="#dea125" strokeWidth={1} />
        <Circle x={58} y={titleBarHeight / 2 + 2} r={6} fill="#27c93f" stroke="#1aab29" strokeWidth={1} />

        {/* Browser URL Search Bar */}
        <Rect
          x={110}
          y={titleBarHeight * 0.2 + 2}
          width={width - 220}
          height={titleBarHeight * 0.6}
          cornerRadius={6}
          fill="#0e111a"
          stroke="#262c40"
          strokeWidth={1}
        />
        <KonvaText
          x={125}
          y={titleBarHeight * 0.28 + 2}
          text={`🔒  ${element.browserUrl || "https://app.pixelforge.studio"}`}
          fontSize={Math.max(12, Math.round(titleBarHeight * 0.35))}
          fontFamily="system-ui, sans-serif"
          fill="#94a3b8"
          width={width - 250}
          ellipsis={true}
          wrap="none"
        />

        {/* Clipped Screen Viewport */}
        <Group
          x={2}
          y={titleBarHeight + 2}
          clipFunc={(ctx) => {
            const r = element.cornerRadius ? Math.max(0, element.cornerRadius - 2) : 14;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(screenWidth, 0);
            ctx.lineTo(screenWidth, screenHeight - r);
            ctx.quadraticCurveTo(screenWidth, screenHeight, screenWidth - r, screenHeight);
            ctx.lineTo(r, screenHeight);
            ctx.quadraticCurveTo(0, screenHeight, 0, screenHeight - r);
            ctx.closePath();
          }}
        >
          {screenshotImg ? (
            <KonvaImage
              image={screenshotImg}
              x={0}
              y={0}
              width={screenWidth}
              height={screenHeight}
            />
          ) : (
            <Rect x={0} y={0} width={screenWidth} height={screenHeight} fill="#090a0f" />
          )}
        </Group>
      </Group>
    );
  }

  if (element.deviceType === "laptop") {
    const bezel = Math.max(12, Math.round(width * 0.022));
    const lidHeight = height * 0.88;
    const baseHeight = height * 0.12;
    const screenWidth = width - bezel * 2;
    const screenHeight = lidHeight - bezel * 2;

    return (
      <Group>
        {/* Lid (Top Display) */}
        <Rect
          x={0}
          y={0}
          width={width}
          height={lidHeight}
          cornerRadius={14}
          fill={theme.body}
          stroke={theme.rim}
          strokeWidth={2}
          shadowColor="black"
          shadowBlur={element.shadowBlur || 40}
          shadowOpacity={element.shadowOpacity || 0.6}
          shadowOffsetY={element.shadowOffsetY || 20}
        />

        {/* Camera dot */}
        <Circle x={width / 2} y={bezel / 2} r={3} fill="#000000" />
        <Circle x={width / 2} y={bezel / 2} r={1} fill="#0284c7" />

        {/* Screen */}
        <Group
          x={bezel}
          y={bezel}
          clipFunc={(ctx) => {
            ctx.beginPath();
            ctx.rect(0, 0, screenWidth, screenHeight);
            ctx.closePath();
          }}
        >
          {screenshotImg ? (
            <KonvaImage
              image={screenshotImg}
              x={0}
              y={0}
              width={screenWidth}
              height={screenHeight}
            />
          ) : (
            <Rect x={0} y={0} width={screenWidth} height={screenHeight} fill="#090a0f" />
          )}
        </Group>

        {/* Base Bottom Deck */}
        <Rect
          x={-width * 0.05}
          y={lidHeight - 4}
          width={width * 1.1}
          height={baseHeight}
          cornerRadius={[4, 4, 12, 12]}
          fill={theme.rim}
          stroke={theme.body}
          strokeWidth={1}
        />
        {/* Trackpad notch */}
        <Rect
          x={width * 0.42}
          y={lidHeight - 3}
          width={width * 0.16}
          height={6}
          cornerRadius={3}
          fill={theme.body}
        />
      </Group>
    );
  }

  if (element.deviceType === "tablet") {
    const bezel = Math.max(16, Math.round(width * 0.04));
    const screenWidth = width - bezel * 2;
    const screenHeight = height - bezel * 2;
    const radius = element.cornerRadius || 36;

    return (
      <Group>
        {/* Outer body */}
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          cornerRadius={radius}
          fill={theme.body}
          stroke={theme.rim}
          strokeWidth={3}
          shadowColor="black"
          shadowBlur={element.shadowBlur || 45}
          shadowOpacity={element.shadowOpacity || 0.65}
          shadowOffsetY={element.shadowOffsetY || 25}
        />

        {/* Front camera lens */}
        <Circle x={width / 2} y={bezel / 2} r={3.5} fill="#000000" />
        <Circle x={width / 2} y={bezel / 2} r={1.5} fill="#38bdf8" />

        {/* Clipped Screen */}
        <Group
          x={bezel}
          y={bezel}
          clipFunc={(ctx) => {
            const r = Math.max(8, radius - bezel);
            ctx.beginPath();
            ctx.roundRect(0, 0, screenWidth, screenHeight, r);
            ctx.closePath();
          }}
        >
          {screenshotImg ? (
            <KonvaImage
              image={screenshotImg}
              x={0}
              y={0}
              width={screenWidth}
              height={screenHeight}
            />
          ) : (
            <Rect x={0} y={0} width={screenWidth} height={screenHeight} fill="#090a0f" />
          )}
        </Group>
      </Group>
    );
  }

  if (element.deviceType === "watch") {
    const bezel = Math.max(14, Math.round(width * 0.05));
    const screenWidth = width - bezel * 2;
    const screenHeight = height - bezel * 2;
    const radius = element.cornerRadius || 65;

    return (
      <Group>
        {/* Digital Crown knob */}
        <Rect
          x={width - 4}
          y={height * 0.25}
          width={10}
          height={height * 0.2}
          cornerRadius={4}
          fill={theme.rim}
        />
        {/* Side button */}
        <Rect
          x={width - 2}
          y={height * 0.55}
          width={6}
          height={height * 0.16}
          cornerRadius={3}
          fill={theme.rim}
        />

        {/* Watch Body */}
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          cornerRadius={radius}
          fill={theme.body}
          stroke={theme.rim}
          strokeWidth={4}
          shadowColor="black"
          shadowBlur={element.shadowBlur || 40}
          shadowOpacity={element.shadowOpacity || 0.65}
          shadowOffsetY={element.shadowOffsetY || 20}
        />

        {/* Clipped Screen */}
        <Group
          x={bezel}
          y={bezel}
          clipFunc={(ctx) => {
            const r = Math.max(14, radius - bezel);
            ctx.beginPath();
            ctx.roundRect(0, 0, screenWidth, screenHeight, r);
            ctx.closePath();
          }}
        >
          {screenshotImg ? (
            <KonvaImage
              image={screenshotImg}
              x={0}
              y={0}
              width={screenWidth}
              height={screenHeight}
            />
          ) : (
            <Rect x={0} y={0} width={screenWidth} height={screenHeight} fill="#000000" />
          )}
        </Group>
      </Group>
    );
  }

  // Default: Phone (Modern or Minimal)
  const isModern = element.deviceType === "phone_modern";
  const bezel = isModern ? Math.max(12, Math.round(width * 0.035)) : Math.max(8, Math.round(width * 0.02));
  const screenWidth = width - bezel * 2;
  const screenHeight = height - bezel * 2;
  const radius = element.cornerRadius || 48;
  const innerRadius = Math.max(12, radius - bezel);

  return (
    <Group>
      {/* Side Hardware Buttons */}
      {isModern && (
        <>
          {/* Volume rocker */}
          <Rect x={-4} y={height * 0.2} width={5} height={height * 0.08} cornerRadius={2} fill={theme.rim} />
          <Rect x={-4} y={height * 0.3} width={5} height={height * 0.08} cornerRadius={2} fill={theme.rim} />
          {/* Power button */}
          <Rect x={width - 1} y={height * 0.24} width={5} height={height * 0.12} cornerRadius={2} fill={theme.rim} />
        </>
      )}

      {/* Main Casing Body */}
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        cornerRadius={radius}
        fill={theme.body}
        stroke={theme.rim}
        strokeWidth={3}
        shadowColor="black"
        shadowBlur={element.shadowBlur || 45}
        shadowOpacity={element.shadowOpacity || 0.65}
        shadowOffsetY={element.shadowOffsetY || 25}
      />

      {/* Inner Screen Bezel Rim */}
      <Rect
        x={bezel - 2}
        y={bezel - 2}
        width={screenWidth + 4}
        height={screenHeight + 4}
        cornerRadius={innerRadius + 2}
        fill={theme.bezel}
      />

      {/* Clipped Screen Image */}
      <Group
        x={bezel}
        y={bezel}
        clipFunc={(ctx) => {
          ctx.beginPath();
          ctx.roundRect(0, 0, screenWidth, screenHeight, innerRadius);
          ctx.closePath();
        }}
      >
        {screenshotImg ? (
          <KonvaImage
            image={screenshotImg}
            x={0}
            y={0}
            width={screenWidth}
            height={screenHeight}
          />
        ) : (
          <Rect x={0} y={0} width={screenWidth} height={screenHeight} fill="#090a0f" />
        )}

        {/* Dynamic Island / Pill Camera Notch */}
        {element.showNotchOrIsland && isModern && (
          <Group x={screenWidth / 2} y={16}>
            <Rect
              x={-Math.round(screenWidth * 0.16)}
              y={0}
              width={Math.round(screenWidth * 0.32)}
              height={Math.max(24, Math.round(screenHeight * 0.024))}
              cornerRadius={14}
              fill="#000000"
            />
            {/* Camera lens glow */}
            <Circle
              x={Math.round(screenWidth * 0.07)}
              y={Math.max(12, Math.round(screenHeight * 0.012))}
              r={4}
              fill="#082f49"
            />
            <Circle
              x={Math.round(screenWidth * 0.07)}
              y={Math.max(12, Math.round(screenHeight * 0.012))}
              r={1.5}
              fill="#38bdf8"
            />
          </Group>
        )}

        {/* Subtle glass reflection / sheen */}
        {element.glareEffect && (
          <Line
            points={[0, 0, screenWidth, screenHeight * 0.5, screenWidth, 0]}
            closed={true}
            fillLinearGradientStartPoint={{ x: 0, y: 0 }}
            fillLinearGradientEndPoint={{ x: screenWidth, y: screenHeight * 0.5 }}
            fillLinearGradientColorStops={[0, "rgba(255, 255, 255, 0.08)", 1, "rgba(255, 255, 255, 0.0)"]}
            listening={false}
          />
        )}
      </Group>
    </Group>
  );
};
