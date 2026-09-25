const fs = require('node:fs');
const path = require('node:path');

const endpoint = 'https://fastfit.buildbytoey.com/api/exercises.php';
const pageSize = 60;
const output = path.resolve(__dirname, '../public/fastfit-catalog.js');

async function loadPage(page) {
  const url = new URL(endpoint);
  url.searchParams.set('page', String(page));
  url.searchParams.set('per', String(pageSize));
  const response = await fetch(url, { headers: { accept: 'application/json' } });
  if (!response.ok) throw new Error(`Page ${page}: HTTP ${response.status}`);
  const body = await response.json();
  if (!body.ok || !Array.isArray(body.items) || !Number.isInteger(body.total)) {
    throw new Error(`Page ${page}: invalid response`);
  }
  return body;
}

(async () => {
  const first = await loadPage(1);
  const pages = Math.ceil(first.total / pageSize);
  const responses = [first];
  for (let page = 2; page <= pages; page++) responses.push(await loadPage(page));
  const records = responses.flatMap((response, index) => {
    if (response.total !== first.total || response.page !== index + 1) {
      throw new Error(`Page ${index + 1}: count or page changed during import`);
    }
    return response.items;
  });
  if (records.length !== first.total) throw new Error(`Expected ${first.total}, received ${records.length}`);
  const ids = new Set(records.map((record) => record.id));
  if (ids.size !== records.length) throw new Error('Duplicate source IDs');
  const required = ['id','slug','name','en','m','e','lv','cat','tr'];
  for (const record of records) {
    if (required.some((key) => record[key] === undefined || record[key] === null || record[key] === '')) {
      throw new Error(`Incomplete record ${record.id}`);
    }
  }
  // Import factual catalogue fields. The source's original prose and 3D assets stay on its site.
  const compact = records.map(({ id, slug, name, en, m, e, a, lv, cat, tr, sets, reps, time, rest, met }) => ({
    id, slug, name, en, m, e, a, lv, cat, tr, sets, reps, time, rest, met
  }));
  fs.writeFileSync(output,
    '// Public exercise metadata from FastFit, imported ' + new Date().toISOString().slice(0, 10) + '.\n' +
    '// Source: https://fastfit.buildbytoey.com/api/exercises.php\n' +
    'export const fastfitCatalog = ' + JSON.stringify(compact) + ';\n');
  console.log(JSON.stringify({ total: compact.length, pages, output,
    categories: Object.fromEntries([...new Set(compact.map((record) => record.cat))].map((category) => [category, compact.filter((record) => record.cat === category).length])) }));
})().catch((error) => { console.error(error.message); process.exitCode = 1; });
