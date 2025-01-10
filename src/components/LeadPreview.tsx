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


    // Utility function to process content
const processContent = (content:string) => {
  const lines = content.split("\n");
  return lines.map((line, index) => {
    // Handle headers starting with **header**
    if (line.startsWith("**")) {
      const headerText = line.replace("**", "").trim();
      return (
        <h2 key={index} className="text-xl font-bold my-4">
          {headerText}
        </h2>
      );
    }
     
  
    
     // Process words and remove standalone or wrapping "**"
     const words = line.split(" ").map((word, i) => {
      if (word === "**") {
        // Remove standalone "**"
        return null;
      }
      if (word.startsWith("**") && word.endsWith("**") && word.length > 2) {
        // Remove "**" from wrapped words
        const cleanedWord = word.replace(/\*\*/g, "");
        return (
          <span key={i} className="text-red-700 font-extrabold my-2 text-xl">
            {cleanedWord}{" "}
          </span>
        );
      }
    
      return <span key={i}>{word} </span>;
    });

    return (
      <p key={index} className="my-2">
        {words}
      </p>
    );
  });
};
    
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
     {processContent(responseData)} 
    </div>
  </div>
  );
}

export default LeadPreview;
