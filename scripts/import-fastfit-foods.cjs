const fs = require('node:fs');
const path = require('node:path');

const base = 'https://fastfit.buildbytoey.com';
const output = path.resolve(__dirname, '../public/fastfit-foods.js');
const pageSize = 100;

async function json(url) {
  const response = await fetch(url, { headers: { accept: 'application/json' } });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response.json();
}

(async () => {
  const html = await (await fetch(`${base}/foods`)).text();
  const match = html.match(/window\.FL = (\{.*?\});\s*\(function/s);
  if (!match) throw new Error('Food category metadata was not found');
  const data = JSON.parse(match[1]).data;
  const categories = Object.fromEntries(Object.entries(data.foods.cats).map(([key, value]) =>
    [key, { name: value.name, subs: Object.fromEntries(Object.entries(value.subs || {}).map(([sub, item]) => [sub, item.name])) }]));
  const records = [];
  let total;
  for (let offset = 0; total === undefined || offset < total;) {
    const url = new URL(`${base}/api/foods.php`);
    url.searchParams.set('limit', String(pageSize));
    url.searchParams.set('offset', String(offset));
    url.searchParams.set('total', '1');
    const body = await json(url);
    if (!body.ok || !Array.isArray(body.items) || !Number.isInteger(body.total)) throw new Error(`Invalid response at ${offset}`);
    if (total !== undefined && body.total !== total) throw new Error('Source count changed during import');
    total = body.total;
    if (!body.items.length) throw new Error(`Empty page at ${offset}`);
    records.push(...body.items);
    offset += body.items.length;
  }
  if (records.length !== total || total !== data.total) throw new Error(`Expected ${data.total}, received ${records.length}`);
  if (new Set(records.map(item => item.key)).size !== records.length) throw new Error('Duplicate food keys');
  for (const item of records) {
    if (!item.key || !item.name || !categories[item.cat] || !Number.isFinite(Number(item.kcal))) throw new Error(`Incomplete food: ${item.key}`);
  }
  const compact = records.map(({ key, name, cat, sub, unit, unit_name, g, kcal, p, c, f, alc, sug, opts, alias }) =>
    ({ key, name, cat, sub, unit, unit_name, g, kcal, p, c, f, alc, sug, opts, alias }));
  fs.writeFileSync(output,
    `// Public nutrition catalogue metadata imported ${new Date().toISOString().slice(0, 10)}.\n` +
    `// Source: ${base}/api/foods.php\n` +
    `export const fastfitFoodCategories = ${JSON.stringify(categories)};\n` +
    `export const fastfitFoods = ${JSON.stringify(compact)};\n`);
  console.log(JSON.stringify({ total, categories: Object.keys(categories).length, output }));
})().catch(error => { console.error(error); process.exitCode = 1; });
