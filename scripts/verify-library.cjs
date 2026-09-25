const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('http://localhost:5173/#library');
    await page.locator('.library-type-grid').waitFor();

    assert.equal(await page.locator('.library-type').count(), 6, 'six training types');
    assert.equal(await page.locator('.library-card').count(), 36, 'initial page size');
    assert.match(await page.locator('.library-results-head strong').innerText(), /1,379 ท่า/);
    const expectedTypes = new Map([['เวท / ยิม',1021],['โยคะ',36],['แอโรบิก',150],['คาร์ดิโอ',91],['ยืดเหยียด',81]]);
    for (const [type,count] of expectedTypes) {
      const label = await page.locator(`[data-library-type="${type}"]`).innerText();
      assert.ok(label.includes(count.toLocaleString('en-US')), `${type}: ${count}`);
    }

    await page.locator('[data-library-more]').click();
    assert.equal(await page.locator('.library-card').count(), 72, 'load more');

    await page.locator('[data-library-type="โยคะ"]').click();
    assert.equal(await page.locator('.library-card').count(), 36, 'all yoga exercises are visible');
    await page.locator('[data-library-tier="A"]').click();
    assert.ok(await page.locator('.library-card .tier-A').count() > 0, 'tier filter');

    await page.locator('[data-library-type="ทั้งหมด"]').click();
    await page.locator('[data-library-tier="ทั้งหมด"]').click();
    await page.locator('[data-library-mode="list"]').click();
    assert.ok(await page.locator('.library-list-row').count() > 0, 'list view');
    await page.locator('[data-library-mode="cards"]').click();

    await page.locator('#search').fill('ดัมเบล');
    await page.waitForTimeout(100);
    assert.ok(await page.locator('.library-card').count() > 10, 'search results');
    await page.locator('#search').fill('');
    await page.locator('#library-equipment').selectOption({ label: 'ยางยืด' });
    assert.equal(await page.locator('.library-results-head strong').innerText(), 'พบ 85 ท่า', 'equipment filter');

    await page.locator('.library-card [data-exercise]').first().click();
    await page.locator('.modal h2').waitFor();
    assert.ok((await page.locator('.modal').innerText()).includes('คำแนะนำเบื้องต้น'), 'exercise detail');
    assert.ok((await page.locator('.modal a[href^="https://fastfit.buildbytoey.com/exercise/"]').count()) === 1, 'source link');
    await page.locator('.modal [data-close]').first().click();

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:5173/#library');
    await page.locator('.library-type-grid').waitFor();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'mobile overflow');
    assert.equal(await page.locator('.library-type').count(), 6);
    assert.deepEqual(errors, []);
    console.log('PASS: 1,379 exercises, exact source category counts, search, equipment and tier filters, load more, card/list views, detail modal, and mobile layout.');
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
