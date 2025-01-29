"use client"
// src/components/PayPalSubscribeButton.tsx
import { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface SubscribeButtonProps {
    onSuccess?: () => void;
    onError?: (error: any) => void;
    isTrialEligible?: boolean;
  }

  
  
export default function PayPalSubscribeButton({
    onSuccess,
    onError,
    isTrialEligible = true
  }: SubscribeButtonProps) {
    const router = useRouter();
    const [{ isInitial, isPending, isResolved, isRejected }] = usePayPalScriptReducer();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const startTrial = async () => {
      try {
        setIsLoading(true);
        setError(null);
  
        const response = await fetch('/api/subscriptions/create-trial', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.error || 'Failed to start trial');
        }
  
        router.push('/resumes');
        onSuccess?.();
      } catch (err: any) {
        setError(err.message);
        onError?.(err);
      } finally {
        setIsLoading(false);
      }
    };
  
    const createSubscription = async (data: any, actions: any) => {
      try {
        return await actions.subscription.create({
          plan_id: "P-8RS30768290132313M6NCL6Y",
          application_context: {
            shipping_preference: 'NO_SHIPPING',
            user_action: 'SUBSCRIBE_NOW',
            brand_name: 'Resumateer',
            return_url: `${window.location.origin}/success`,
            cancel_url: `${window.location.origin}/cancel`
          }
        });
      } catch (err) {
        setError('Failed to create subscription');
        throw err;
      }
    };
  
    const onApprove = async (data: any, actions: any) => {
      try {
        setIsLoading(true);
        setError(null);
  
        const response = await fetch('/api/subscriptions/convert-to-paid', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paypalSubscriptionId: data.subscriptionID,
            orderID: data.orderID
          })
        });
  
        const result = await response.json();
  
        if (!response.ok) {
          throw new Error(result.error || 'Failed to activate subscription');
        }
  
        router.push('/resumes');
        onSuccess?.();
      } catch (err: any) {
        setError(err.message);
        onError?.(err);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (isInitial || isPending) {
      return <div className="w-full h-12 bg-gray-100 animate-pulse rounded-md" />;
    }
  
    if (isRejected) {
      return (
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load PayPal. Please refresh the page or try again later.
          </AlertDescription>
        </Alert>
      );
    }
  
    return (
      <div className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
  
        {isTrialEligible ? (
          <div className="space-y-4">
            <Button
              onClick={startTrial}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Starting trial...' : 'Start 14-Day Free Trial'}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or pay now</span>
              </div>
            </div>
          </div>
        ) : null}
  
        <div className={isLoading ? 'opacity-50 pointer-events-none' : ''}>
          <PayPalButtons
            style={{ layout: 'vertical', label: 'subscribe' , color :'black' , shape : 'pill'}}
            createSubscription={createSubscription}
            onApprove={onApprove}
            onError={(err) => {
              setError('PayPal encountered an error');
              onError?.(err);
            }}
          />
        </div>
      </div>
    );
  }


