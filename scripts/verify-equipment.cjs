const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:5173/#equipment/dumbbell');
  await page.locator('[data-gym-own="dumbbell"]').waitFor();
  assert.ok(await page.locator('.gym-exercise').count()>=16);
  await page.locator('[data-gym-own="dumbbell"]').click();
  await page.reload();
  await page.locator('[data-gym-own="dumbbell"][aria-pressed="true"]').waitFor();
  await page.locator('#gym-search').fill('hammer');
  assert.ok(await page.locator('.gym-exercise').count()>=1);
  await page.locator('[data-gym-pick="10039"]').check();
  await page.locator('#gym-search').fill('');
  await page.locator('[data-gym-pick="11011"]').check();
  await page.locator('[data-gym-build="dumbbell"]').click();
  await page.locator('.modal [data-start]').click();
  await page.locator('#toggle-timer').waitFor();
  await page.locator('#toggle-timer').click();
  await page.waitForTimeout(1200);
  assert.notEqual(await page.locator('.countdown').innerText(),'00:40');
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('vigor-state-v1')));
  assert.deepEqual(saved.plans.at(-1).exerciseIds,[10039,11011]);
  await page.goto('http://localhost:5173/#equipment');
  assert.equal(await page.locator('[data-equipment-card]').count(),25);
  const sourceCounts={dumbbell:192,kettlebell:59,barbell:132,ez_bar:24,plate:38,trap_bar:6,landmine:15,band:85,pullup_bar:47,dip_station:15,bench:205,box:27,trx:24,ab_wheel:3,stability_ball:20,medicine_ball:10,jump_rope:9,battle_rope:4,cable:107,machine:69,smith:32,treadmill:6,bike:5,rower:2};
  for(const [slug,count] of Object.entries(sourceCounts)){
   await page.goto('http://localhost:5173/#equipment');
   const card=page.locator(`[data-equipment-card="${slug}"]`);
   assert.match(await card.innerText(),new RegExp(`${count} ท่า`),slug);
   await page.goto(`http://localhost:5173/#equipment/${slug}`);
   assert.equal(await page.locator('.gym-exercise').count(),count,slug);
  }
  for(const slug of ['mat','band','kettlebell','barbell','bench','jump_rope','bodyweight']){
   await page.goto(`http://localhost:5173/#equipment/${slug}`);
   await page.locator('.gym-exercise').first().waitFor();
   assert.ok(await page.locator('.gym-exercise').count()>0,slug);
  }
  await page.goto('http://localhost:5173/#equipment/dumbbell');
  await page.locator('[data-gym-own="dumbbell"]').waitFor();
  await page.screenshot({path:'outputs/home-gym-desktop.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});
  await page.goto('http://localhost:5173/#equipment/dumbbell');
  await page.locator('[data-gym-own="dumbbell"]').waitFor();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Mobile overflow');
  await page.locator('.mobile-nav [data-go="equipment"]').click();
  await page.locator('.gym-card').first().waitFor();
  await page.screenshot({path:'outputs/home-gym-mobile.png',fullPage:true});
  assert.deepEqual(errors,[]);
  console.log('PASS: equipment detail, 24 source categories, ownership persistence, search, selection, saved workout, timer, mobile navigation and layout.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
