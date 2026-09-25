import { fastfitFoods, fastfitFoodCategories } from './fastfit-foods.js';

const icons = {rice:'🍚',noodle:'🍜',side:'🍲',isan:'🥗',grill:'🍢',morning:'🥐',sweet:'🍰',snack:'🍿',fruit:'🍎',drink:'🥤',alcohol:'🍷',fast:'🍔',buffet:'🍲',conv:'🏪',clean:'🥙',raw:'🥬',recipe:'📖'};
export const foods = fastfitFoods.map((item, index) => ({
  id:index + 1,key:item.key,name:item.name,category:item.cat,sub:item.sub,
  unit:item.unit,unitName:item.unit_name,grams:item.g,
  cal:Number(item.kcal)||0,protein:Number(item.p)||0,carbs:Number(item.c)||0,fat:Number(item.f)||0,
  sugar:item.sug,alcohol:item.alc,alias:item.alias||'',emoji:icons[item.cat]||'🍽️'
}));
export const foodCategories = fastfitFoodCategories;

export function renderFoodLibrary({esc,header,meals,goal},view){
 const total=meals.reduce((n,m)=>n+Number(m.cal||0),0);
 const protein=meals.reduce((n,m)=>n+Number(m.protein||0),0);
 const carbs=meals.reduce((n,m)=>n+Number(m.carbs||0),0);
 const fat=meals.reduce((n,m)=>n+Number(m.fat||0),0);
 const query=view.query.trim().toLocaleLowerCase('th');
 const results=foods.filter(f=>(!view.category||f.category===view.category)&&(!view.sub||f.sub===view.sub)&&(!query||`${f.name} ${f.alias}`.toLocaleLowerCase('th').includes(query)));
 if(view.sort==='name')results.sort((a,b)=>a.name.localeCompare(b.name,'th'));
 if(view.sort==='cal-asc')results.sort((a,b)=>a.cal-b.cal);
 if(view.sort==='cal-desc')results.sort((a,b)=>b.cal-a.cal);
 const shown=results.slice(0,view.limit);
 const subcategories=view.category?foodCategories[view.category]?.subs||{}:{};
 const fmt=n=>Number.isInteger(n)?String(n):Number(n).toFixed(1);
 const cards=shown.map(food=>`<div class="card food-row" data-food-card="${esc(food.key)}"><span class="food-icon">${food.emoji}</span><div class="grow"><strong>${esc(food.name)}</strong><small>${esc(foodCategories[food.category]?.subs?.[food.sub]||foodCategories[food.category]?.name||'อาหาร')} · 1 ${esc(food.unitName||'หน่วย')}${food.grams?` · ${fmt(food.grams)} กรัม`:''}</small><small>${fmt(food.cal)} kcal · โปรตีน ${fmt(food.protein)}g · คาร์บ ${fmt(food.carbs)}g · ไขมัน ${fmt(food.fat)}g</small></div><button data-food="${food.id}" aria-label="เพิ่ม ${esc(food.name)}">＋</button></div>`).join('');
 return `${header('FOOD LIBRARY','คลังอาหาร',`อาหาร ${foods.length.toLocaleString('en-US')} รายการ · แตะเพิ่มเพื่อบันทึก 1 หน่วยบริโภค`)}<div class="grid stats food-stats"><div class="stat"><div class="stat-icon">◉</div><div class="value">${fmt(total)}</div><div class="label">พลังงาน · kcal</div></div><div class="stat"><div class="stat-icon">⚡</div><div class="value">${goal}</div><div class="label">เป้าหมายต่อวัน</div></div><div class="stat"><div class="stat-icon">✦</div><div class="value">${fmt(protein)}g</div><div class="label">โปรตีน</div></div><div class="stat"><div class="stat-icon">◒</div><div class="value">${fmt(carbs)}g</div><div class="label">คาร์บ · ไขมัน ${fmt(fat)}g</div></div></div><div class="panel" style="margin-top:17px"><div class="section-head"><h2>ความคืบหน้าพลังงาน</h2><span class="meta">${Math.round(total/Math.max(1,goal)*100)}%</span></div><div class="bar"><span style="width:${Math.min(100,total/Math.max(1,goal)*100)}%"></span></div></div><section class="section"><div class="toolbar food-toolbar"><input class="input search" id="ff-food-search" type="search" placeholder="ค้นหาชื่ออาหารหรือชื่อเรียกอื่น" value="${esc(view.query)}"><span class="meta" role="status">พบ ${results.length.toLocaleString('en-US')} จาก ${foods.length.toLocaleString('en-US')} รายการ</span></div><div class="chips food-categories"><button class="chip ${!view.category?'active':''}" data-ff-category="">ทั้งหมด</button>${Object.entries(foodCategories).map(([code,item])=>`<button class="chip ${view.category===code?'active':''}" data-ff-category="${code}">${esc(item.name)}</button>`).join('')}</div><div class="toolbar food-toolbar"><label>หมวดย่อย <select id="ff-food-sub"><option value="">ทั้งหมด</option>${Object.entries(subcategories).map(([code,name])=>`<option value="${code}" ${view.sub===code?'selected':''}>${esc(name)}</option>`).join('')}</select></label><label>เรียงตาม <select id="ff-food-sort"><option value="popular" ${view.sort==='popular'?'selected':''}>ลำดับต้นทาง</option><option value="name" ${view.sort==='name'?'selected':''}>ชื่ออาหาร</option><option value="cal-asc" ${view.sort==='cal-asc'?'selected':''}>แคลอรีน้อยก่อน</option><option value="cal-desc" ${view.sort==='cal-desc'?'selected':''}>แคลอรีมากก่อน</option></select></label></div><div class="grid food-grid food-library">${cards||'<div class="empty">ไม่พบอาหารที่ตรงกับการค้นหา</div>'}</div>${shown.length<results.length?`<button class="btn secondary food-more" data-ff-more>แสดงเพิ่ม (${shown.length} / ${results.length})</button>`:''}</section><section class="section"><div class="section-head"><h2>อาหารที่บันทึกวันนี้</h2><span class="meta">${meals.length} รายการ</span></div><div class="list">${meals.length?meals.map(m=>`<div class="list-item"><span>${m.emoji||'🍽️'}</span><div class="grow"><strong>${esc(m.name)}</strong><small>${fmt(m.cal)} kcal · โปรตีน ${fmt(m.protein)}g · คาร์บ ${fmt(m.carbs)}g</small></div><button data-remove-meal="${m.logId}">ลบ</button></div>`).join(''):'<div class="empty">ยังไม่มีอาหารที่บันทึกวันนี้</div>'}</div></section>`;
}
