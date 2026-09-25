const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');

(async () => {
 const browser = await chromium.launch({channel:'chrome',headless:true});
 try {
  const page = await browser.newPage({viewport:{width:1440,height:900}});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('http://localhost:5173/#nutrition');
  await page.evaluate(()=>localStorage.clear());
  await page.reload();
  await page.locator('[data-food-card]').first().waitFor();
  assert.match(await page.locator('[role="status"]').innerText(),/4,773 จาก 4,773/);
  assert.equal(await page.locator('[data-ff-category]').count(),18);
  assert.equal(await page.locator('[data-food-card]').count(),60);
  await page.locator('[data-ff-more]').click();
  assert.equal(await page.locator('[data-food-card]').count(),120);
  await page.locator('[data-ff-category="raw"]').click();
  assert.match(await page.locator('[role="status"]').innerText(),/571 จาก 4,773/);
  assert.equal(await page.locator('[data-food-card]').count(),60);
  assert.ok(await page.locator('#ff-food-sub option').count()>1);
  await page.locator('[data-ff-category=""]').click();
  await page.locator('#ff-food-search').fill('กะเพรา');
  assert.ok(await page.locator('[data-food-card]').count()>0);
  await page.locator('#ff-food-search').fill('');
  await page.locator('[data-food="1"]').click();
  assert.match(await page.locator('.food-stats').innerText(),/80/);
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('vigor-state-v1')));
  assert.equal(saved.meals.at(-1).key,'rice_white');
  await page.setViewportSize({width:390,height:844});
  await page.reload();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Mobile overflow');
  assert.deepEqual(errors,[]);
  console.log('PASS: 4,773 foods, 17 categories, 571 raw foods, search, paging, meal logging, persistence, mobile layout.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
