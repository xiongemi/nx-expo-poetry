import { device } from 'detox';

// import { expoDevClient } from './support/expo.utils';

beforeAll(async () => {
  await device.launchApp();
  // await expoDevClient();
});
