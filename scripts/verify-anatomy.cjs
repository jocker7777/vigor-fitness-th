const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');

(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('http://localhost:5173/#muscle');
  await page.locator('.anatomy-group-card').first().waitFor();
  assert.equal(await page.locator('.anatomy-group-card').count(),17);
  assert.equal(await page.locator('.anatomy-figure').count(),2);
  await page.locator('[data-anatomy-view="front"]').click();
  assert.equal(await page.locator('.anatomy-figure').count(),1);
  await page.locator('[data-anatomy-view="back"]').click();
  assert.equal(await page.locator('.anatomy-figure').count(),1);
  await page.locator('[data-anatomy-gender="female"]').click();
  assert.equal(await page.locator('.anatomy-figure.female').count(),1);
  await page.locator('[data-anatomy-view="both"]').click();
  await page.locator('svg [data-anatomy-muscle="chest"]').first().click({position:{x:20,y:20}});
  assert.match(await page.locator('.anatomy-selection').innerText(),/106 ท่า/);
  await page.locator('.anatomy-group-card[data-anatomy-muscle="chest"]').click();
  assert.match(await page.locator('.anatomy-selection').innerText(),/106 ท่า/);
  await page.locator('[data-anatomy-multi]').click();
  await page.locator('.anatomy-group-card[data-anatomy-muscle="shoulders"]').click();
  assert.match(await page.locator('.anatomy-selection').innerText(),/เลือกแล้ว 2 ส่วน/);
  assert.match(await page.locator('.anatomy-selection').innerText(),/244 ท่า/);
  await page.locator('[data-anatomy-library]').click();
  assert.match(await page.locator('.library-results-head strong').innerText(),/244 ท่า/);
  await page.goto('http://localhost:5173/#muscle');
  await page.locator('[data-anatomy-clear]').click();
  await page.locator('[data-anatomy-multi]').click();
  await page.locator('svg [data-anatomy-muscle="chest"]').focus();
  await page.keyboard.press('Enter');
  assert.match(await page.locator('.anatomy-selection').innerText(),/106 ท่า/);
  await page.setViewportSize({width:390,height:844});
  await page.reload();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Mobile overflow');
  assert.deepEqual(errors,[]);
  console.log('PASS: 17 muscles, front/back views, gender, single and multi selection, library linkage, keyboard and mobile layout.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
