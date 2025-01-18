"use client";

import usePremiumModal from "@/components/premuim/usePremuimModal";
import { Button } from "@/components/ui/button";

export default function GetSubscriptionButton() {
  const premiumModal = usePremiumModal();

  return (
    <Button onClick={() => premiumModal.setOpen(true)} variant="premium">
      Get Premium subscription
    </Button>
  );
}