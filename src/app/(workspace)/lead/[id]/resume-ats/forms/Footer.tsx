import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { FileUserIcon, PenLineIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { steps } from "@/lib/steps";

interface FooterProps {
 
  showSmResumePreview: boolean;
  setShowSmResumePreview: (show: boolean) => void;
  isSaving: boolean;
}
function Footer({

  showSmResumePreview,
  setShowSmResumePreview,
  isSaving,
}: FooterProps) {


  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
     
        </div>


        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowSmResumePreview(!showSmResumePreview)}
          className="md:hidden"
          title={
            showSmResumePreview ? "Show input form" : "Show resume preview"
          }
        >
          {showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />}
        </Button>



        <div className="flex items-center gap-3">
          <Button variant={"secondary"} asChild>
            <Link href={"/resumes"}>Close</Link>
          </Button>
          <Button variant={"secondary"} asChild disabled={isSaving}>
            <Link href={"/resumes"}>Save & Return </Link>
          </Button>
          <p
            className={cn(
              "text-muted-foreground opacity-0",
              isSaving && "opacity-100",
            )}
          >
            Saving...
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
