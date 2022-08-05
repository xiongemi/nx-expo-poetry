import { device, element, by } from 'detox';

describe('PoetryApp', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display heading', async () => {
    await waitFor(element(by.text('Poem of the Day')))
      .toBeVisible()
      .withTimeout(5000);
  });
});
