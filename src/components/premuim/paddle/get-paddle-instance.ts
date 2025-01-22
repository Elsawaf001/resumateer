import { Environment, LogLevel, Paddle, PaddleOptions } from '@paddle/paddle-node-sdk';

export function getPaddleInstance() {
  const paddleOptions: PaddleOptions = {
    environment: Environment.sandbox,
    logLevel: LogLevel.error,
  };


  return new Paddle("test_84afa5e752630ed64864d7ab416", paddleOptions);
}
