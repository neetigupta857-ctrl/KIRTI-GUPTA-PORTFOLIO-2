import React from 'react';

export interface CircularGalleryProps {
  items?: Array<{ image: string; text: string }>;
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  fontUrl?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  onItemClick?: (index: number) => void;
  onHoverItem?: (index: number | null, pos: { xPercent: number; yPercent: number } | null) => void;
}

export default function CircularGallery(props: CircularGalleryProps): React.JSX.Element;
