// src/lib/paypal/verify-webhook.ts
import crypto from 'crypto';

interface WebhookEvent {
  id: string;
  event_type: string;
  resource: any;
  create_time: string;
}

interface PayPalSignature {
  authAlgo: string;
  certUrl: string;
  transmissionId: string;
  transmissionSig: string;
  transmissionTime: string;
}

export async function verifyPayPalWebhook(
  body: WebhookEvent,
  headers: Headers,
): Promise<boolean> {
  try {
    const paypalSignature: PayPalSignature = {
      authAlgo: headers.get('paypal-auth-algo') || '',
      certUrl: headers.get('paypal-cert-url') || '',
      transmissionId: headers.get('paypal-transmission-id') || '',
      transmissionSig: headers.get('paypal-transmission-sig') || '',
      transmissionTime: headers.get('paypal-transmission-time') || '',
    };

    // const webhookId = process.env.PAYPAL_WEBHOOK_ID;
    // if (!webhookId) {
    //   throw new Error('PAYPAL_WEBHOOK_ID is not configured');
    // }
    const webhookId = "8J629894TT447703G";


    // Prepare the validation string
    const validationString = [
      paypalSignature.transmissionId,
      paypalSignature.transmissionTime,
      webhookId,
      crypto.createHash('sha256').update(JSON.stringify(body)).digest('hex'),
    ].join('|');

    // Fetch PayPal's public certificate
    const certResponse = await fetch(paypalSignature.certUrl);
    const certificate = await certResponse.text();

    // Verify the signature
    const verify = crypto.createVerify(paypalSignature.authAlgo);
    verify.update(validationString);
    
    const signature = Buffer.from(paypalSignature.transmissionSig, 'base64');
    return verify.verify(certificate, signature);
  } catch (error) {
    console.error('Webhook verification failed:', error);
    return false;
  }
}