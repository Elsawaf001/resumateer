import { SubscriptionLevel } from "./subscription";

export function canCreateResume(
  subscriptionLevel: SubscriptionLevel,
  currentResumeCount: number,
) {
  const maxResumeMap: Record<SubscriptionLevel, number> = {
    "free": 6,
    "pro-monthly" : Infinity,
    "pro-yearly": Infinity,
  };

  const maxResumes = maxResumeMap[subscriptionLevel];

  return currentResumeCount < maxResumes;
}

export function canUseAITools(subscriptionLevel: SubscriptionLevel) {
  return subscriptionLevel === "free";
}

export function canUseCustomizations(subscriptionLevel: SubscriptionLevel) {
  return subscriptionLevel === "free";
}

export function canCreateLead(
  subscriptionLevel: SubscriptionLevel,
  currentResumeCount: number,
) {
  const maxLeadMap: Record<SubscriptionLevel, number> = {
    "free": 3,
    "pro-monthly" : Infinity,
    "pro-yearly": Infinity,
  };

  const maxResumes = maxLeadMap[subscriptionLevel];

  return currentResumeCount < maxResumes;
}

export function canDelete(subscriptionLevel: SubscriptionLevel) {
  return subscriptionLevel !== "free";
}