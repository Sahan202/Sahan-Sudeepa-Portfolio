import { test, expect } from '@playwright/test';

test('mobile journey sections and project cards fit in both themes', async ({
  page,
}) => {
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');
    for (const theme of ['dark', 'light']) {
      await page.evaluate((theme) => {
        document.documentElement.dataset.theme = theme;
      }, theme);
      for (const id of [
        'skills',
        'projects',
        'process',
        'education',
        'contact',
      ]) {
        await page.locator(`#${id}`).evaluate((element) =>
          window.scrollTo({
            top: element.getBoundingClientRect().top + scrollY,
            behavior: 'instant',
          })
        );
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth
          )
        ).toBe(true);
      }
    }
    await expect(page.locator('.project-stack-slot').first()).toHaveCSS(
      'position',
      'relative'
    );
  }
});

test('the four framed walkthroughs play and expose fullscreen and native detail controls', async ({
  page,
}) => {
  for (const [slug, title] of [
    ['interview-ai', 'InterviewAI'],
    ['ai-resume-analyzer', 'AI Resume Analyzer'],
    ['magic-hand-studio', 'Magic Hand Studio'],
    ['lucky-travel', 'Lucky Travel'],
  ]) {
    await page.goto(`/projects/${slug}`);
    const video = page.locator('.video-screen video');
    await video.scrollIntoViewIfNeeded();
    await expect(video).toHaveJSProperty('controls', true);
    await expect(video).toHaveJSProperty('muted', true);
    await expect(video.locator('source')).toHaveAttribute(
      'src',
      `/videos/${slug}.webm`
    );
    await expect(video).toHaveJSProperty('paused', false);
    await expect(video).toHaveCSS('opacity', '1');
    await expect(page.locator('.video-window-title')).toHaveText(title);
    await page
      .getByRole('button', { name: `Watch ${title} fullscreen` })
      .click();
    await expect
      .poll(() => page.evaluate(() => Boolean(document.fullscreenElement)))
      .toBe(true);
    await page.getByRole('button', { name: 'Exit fullscreen' }).click();
    await expect
      .poll(() => page.evaluate(() => Boolean(document.fullscreenElement)))
      .toBe(false);
  }
});
