const assert = require('node:assert/strict');
(async () => {
 const {anatomyData} = await import('../public/anatomy-data.js');
 const {anatomyGroups, anatomyMatches, renderAnatomy} = await import('../public/anatomy-map.js');
 assert.equal(anatomyGroups.length,30);
 for(const part of anatomyData) assert.equal(anatomyMatches([part.code]).length,part.count,part.code);
 for(const gender of ['male','female']) {
  for(const [view,count] of [['front',19],['back',18],['both',37]]) {
   const html=renderAnatomy(String,{gender,view,multi:false,selected:[]});
   assert.equal((html.match(/data-anatomy-side=/g)||[]).length,count);
   assert.equal((html.match(/class="anatomy-group-card/g)||[]).length,30);
  }
 }
 const union=anatomyMatches(['chest','upper_chest']);
 assert.equal(new Set(union.map(e=>e.id)).size,union.length);
 assert.equal(anatomyMatches(['neck','upper_chest']).length,25);
 assert.equal(anatomyMatches([]).length,0);
 console.log('PASS: 30 muscle counts, male/female geometry, front 19/back 18, unique exercise unions');
})();
