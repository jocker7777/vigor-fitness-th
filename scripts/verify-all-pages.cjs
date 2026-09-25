const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');

const base = 'http://localhost:5173/';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const errors = [];
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    page.on('pageerror', (error) => errors.push(error.message));

    // Start from a clean guest profile so empty-state and starter-data checks are deterministic.
    await page.goto(`${base}#home`);
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    const checks = [
      ['home', '.ready-panel', '.program'],
      ['muscle', '.muscle-card', '.muscle-card'],
      ['library', '.library-type-grid', '.library-card'],
      ['equipment', '.gym-card', '.gym-card'],
      ['sets', '.set-steps', '.program'],
      ['programs', '.program-overview', '.program'],
      ['smart', '.smart-panel', '.smart-group'],
      ['builder', '.builder-progress', '#plan-name'],
      ['workout', '.player-intro', '.program'],
      ['schedule', '.schedule-stats', '.week-grid'],
      ['nutrition', '.food-library', '.food-row'],
      ['member', '.member-gate', '.btn'],
      ['settings', '.settings-guide', '.settings-row'],
    ];

    for (const [route, required, countSelector] of checks) {
      await page.goto(`${base}#${route}`);
      await page.locator(required).first().waitFor();
      assert.ok(await page.locator(countSelector).count() > 0, `${route}: ${countSelector}`);
    }

    await page.goto(`${base}#library`);
    assert.match(await page.locator('.library-results-head strong').innerText(), /1,379 ท่า/, 'library has complete exercise catalogue');
    await page.goto(`${base}#nutrition`);
    assert.ok(await page.locator('.food-row').count() >= 60, 'nutrition has expanded food library');
    await page.goto(`${base}#equipment/dumbbell`);
    assert.ok(await page.locator('.gym-exercise').count() > 0, 'equipment detail has exercises');

    await page.goto(`${base}#builder`);
    await page.locator('[data-builder-template]').first().click();
    assert.ok(await page.locator('#selected-exercises .list-item').count() > 0, 'builder template selects exercises');
    assert.match(await page.locator('#selected-count').innerText(), /ท่า/);

    await page.goto(`${base}#programs`);
    await page.locator('[data-start]').first().waitFor();
    const programIds = await page.locator('[data-start]').evaluateAll((buttons) => buttons.map((button) => button.dataset.start));
    for (const id of programIds) {
      await page.goto(`${base}#programs`);
      await page.locator(`[data-start="${id}"]`).click();
      await page.locator('#toggle-timer').waitFor();
    }

    await page.setViewportSize({ width: 390, height: 844 });
    for (const route of ['home', 'sets', 'programs', 'schedule', 'nutrition', 'equipment/dumbbell']) {
      await page.goto(`${base}#${route}`);
      await page.locator('main').waitFor();
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${route}: mobile overflow`);
    }

    assert.deepEqual(errors, []);
    console.log('PASS: all primary pages have populated content, food/exercise counts are present, equipment detail works, and mobile layouts have no horizontal overflow.');
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
