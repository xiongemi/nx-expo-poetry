// utils functions from https://github.com/expo/expo/blob/main/packages/expo-dev-client/e2e/DevLauncher.e2e.ts
import { device, element, by, expect } from 'detox';

import { sleep, tapButton } from './commands.utils';

const LocalAppTimeout = 160 * 1000;
const LauncherMainScreenTimeout = 100 * 1000;

export async function waitForAppMainScreen() {
  await waitFor(element(by.id('LocalAppMainScreen')))
    .toBeVisible()
    .withTimeout(LocalAppTimeout);
}

async function waitForLauncherMainScreen() {
  await waitFor(element(by.id('DevLauncherMainScreen')))
    .toBeVisible()
    .withTimeout(LauncherMainScreenTimeout);
}

async function ensureThatLauncherMainScreenIsVisible() {
  if (device.getPlatform() === 'ios') {
    await expect(element(by.id('DevLauncherMainScreen'))).toBeVisible();
    return;
  }

  await waitForLauncherMainScreen();
}

export async function expoDevClient() {
  await device.disableSynchronization();
  await ensureThatLauncherMainScreenIsVisible();

  const urlToggle = element(by.id('DevLauncherURLToggle'));

  await expect(urlToggle).toBeVisible();
  await urlToggle.tap();
  sleep(100);

  const urlInput = element(by.id('DevLauncherURLInput'));
  const loadButton = element(by.id('DevLauncherLoadAppButton'));
  await expect(urlInput).toBeVisible();
  await expect(loadButton).toBeVisible();

  await urlInput.typeText(`http://localhost:8081`);
  await tapButton(loadButton);

  await device.enableSynchronization();
}
