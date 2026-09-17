import { test, expect } from '@playwright/test';

test('full-screen scenes scrub backgrounds and artwork in both directions', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const colors = new Set<string>();
  for (const name of ['about', 'projects', 'skills', 'contact']) {
    const scene = page.locator(`[data-overture="${name}"]`);
    await expect(scene).toHaveAttribute('data-ready', 'true');
    const top = await scene.evaluate(
      (el) => el.getBoundingClientRect().top + scrollY
    );
    const move = async (y: number) => {
      await page.evaluate(
        (y) => window.scrollTo({ top: y, behavior: 'instant' }),
        y
      );
      await page.waitForTimeout(250);
    };
    await move(top);
    const stage = scene.locator('.overture-stage');
    await expect(stage).toHaveCSS('position', 'sticky');
    const first = await scene
      .locator('.overture-art')
      .evaluate((el) => getComputedStyle(el).transform);
    await move(top + 450);
    const second = await scene
      .locator('.overture-art')
      .evaluate((el) => getComputedStyle(el).transform);
    expect(second).not.toBe(first);
    colors.add(
      await stage.evaluate((el) => getComputedStyle(el).backgroundColor)
    );
    await move(top);
    const restored = await scene
      .locator('.overture-art')
      .evaluate((el) => getComputedStyle(el).transform);
    const values = (matrix: string) =>
      matrix.slice(7, -1).split(',').map(Number);
    values(restored).forEach((value, i) =>
      expect(Math.abs(value - values(first)[i])).toBeLessThan(i >= 4 ? 3 : 0.03)
    );
    await scene.locator('.overture-copy a').click();
    await expect(page.locator(`#${name}`)).toBeInViewport();
  }
  expect(colors.size).toBe(4);
});

test('mobile and reduced motion preserve readable chapters', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth
    )
  ).toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const stage of await page.locator('.overture-stage').all()) {
    await expect(stage).toHaveCSS('position', 'relative');
    await expect(stage).toHaveCSS('clip-path', 'none');
    await expect(stage.locator('.overture-copy')).toHaveCSS('opacity', '1');
  }
});
