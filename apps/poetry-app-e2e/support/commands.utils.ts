// utils functions from https://github.com/expo/expo/blob/main/packages/expo-dev-client/e2e/DevLauncher.e2e.ts
import { element, by, expect } from 'detox';

export function sleep(duration: number) {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), duration));
}

export async function tapButton(button: Detox.IndexableNativeElement) {
  // We have to make 2 tap - it is a bug in React Native.
  await button.multiTap(2);
}

export async function pressElementByString(buttonString: string) {
  const button = element(by.text(buttonString));
  expect(button).toBeVisible();
  await tapButton(button);
}
