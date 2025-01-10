"use client";
import useDimensions from "@/hooks/useDimentions";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";


interface LeadPreviewProps {
  responseData: string;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

function LeadPreview({
 responseData,
  contentRef,
  className,
}: LeadPreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { width } = useDimensions(containerRef);

    
  return (
    <div
    className={cn(
      "aspect-[210/297] h-fit w-full bg-white text-black",
      className,
    )}
    ref={containerRef}
  >
    <div
      className={cn("space-y-6 p-6", !width && "invisible")}
      style={{
        zoom: (1 / 794) * width,
      }}
      ref={contentRef}
      id="responseContent"
    >
     {responseData} 
    </div>
  </div>
  );
}

export default LeadPreview;
