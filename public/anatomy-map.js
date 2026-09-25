import { fastfitCatalog } from './fastfit-catalog.js';
import { fastfitExercises } from './fastfit-adapter.js';

const definitions = [
 ['shoulders','ไหล่','ร่างกายส่วนบน','ช่วยยกและหมุนแขน เพื่อให้เคลื่อนไหวหัวไหล่ได้หลายทิศทาง'],
 ['chest','หน้าอก','ร่างกายส่วนบน','ช่วยดันแขนเข้าหากึ่งกลางลำตัวและออกแรงในท่าผลัก'],
 ['traps','บ่า','ร่างกายส่วนบน','ช่วยยกและควบคุมตำแหน่งสะบัก'],
 ['upper_back','หลังส่วนบน','ร่างกายส่วนบน','ช่วยดึงสะบักเข้าหากันและพยุงช่วงอก'],
 ['lats','ปีกหลัง','ร่างกายส่วนบน','ช่วยดึงแขนลงและเข้าหาลำตัว'],
 ['biceps','ต้นแขนด้านหน้า','แขน','ช่วยงอศอกและหมุนฝ่ามือขึ้น'],
 ['triceps','ต้นแขนด้านหลัง','แขน','ช่วยเหยียดข้อศอกในท่าดัน'],
 ['forearms','แขนท่อนล่าง','แขน','ช่วยกำมือและควบคุมข้อมือ'],
 ['abs','หน้าท้อง','แกนกลางลำตัว','ช่วยงอลำตัวและรักษาความมั่นคงของแกนกลาง'],
 ['obliques','ท้องด้านข้าง','แกนกลางลำตัว','ช่วยหมุนและเอียงลำตัว'],
 ['lower_back','หลังส่วนล่าง','แกนกลางลำตัว','ช่วยเหยียดและพยุงแนวกระดูกสันหลัง'],
 ['glutes','ก้น','ร่างกายส่วนล่าง','ช่วยเหยียดสะโพกและพยุงเชิงกราน'],
 ['quads','ต้นขาด้านหน้า','ร่างกายส่วนล่าง','ช่วยเหยียดเข่าในท่ายืนและย่อ'],
 ['hamstrings','ต้นขาด้านหลัง','ร่างกายส่วนล่าง','ช่วยงอเข่าและเหยียดสะโพก'],
 ['calves','น่อง','ร่างกายส่วนล่าง','ช่วยยกส้นเท้าและออกแรงขณะเดินหรือวิ่ง'],
 ['adductors','ต้นขาด้านใน','ร่างกายส่วนล่าง','ช่วยหุบขาและควบคุมสะโพก'],
 ['abductors','สะโพกด้านข้าง','ร่างกายส่วนล่าง','ช่วยกางขาและรักษาระดับเชิงกราน']
];
const counts=Object.fromEntries(definitions.map(([code])=>[code,fastfitCatalog.filter(item=>item.m===code).length]));
const recordById=new Map(fastfitCatalog.map(record=>[record.id,record]));
export const anatomyGroups=definitions.map(([code,name,section,description])=>({code,name,section,description,count:counts[code],libraryName:fastfitExercises.find(exercise=>recordById.get(exercise.sourceId)?.m===code)?.primaryMuscle||name}));
export const anatomyView={view:'both',gender:'male',multi:false,selected:[]};

const front = [
 ['shoulders','M49 96 Q37 94 30 104 L22 131 Q26 146 38 143 L51 112 Z M171 96 Q183 94 190 104 L198 131 Q194 146 182 143 L169 112 Z'],
 ['chest','M53 102 Q75 93 107 105 L107 148 Q83 154 55 140 Z M113 105 Q145 93 167 102 L165 140 Q137 154 113 148 Z'],
 ['biceps','M24 143 Q30 148 41 145 L38 194 Q29 202 20 193 Z M179 145 Q190 148 196 143 L200 193 Q191 202 182 194 Z'],
 ['forearms','M20 199 Q29 204 38 198 L34 258 Q23 265 15 250 Z M182 198 Q191 204 200 199 L205 250 Q197 265 186 258 Z'],
 ['abs','M83 157 L106 157 L106 238 Q92 241 79 233 Z M114 157 L137 157 L141 233 Q128 241 114 238 Z'],
 ['obliques','M54 150 L77 157 L74 229 L61 215 Z M143 157 L166 150 L159 215 L146 229 Z'],
 ['quads','M67 269 Q85 263 104 271 L101 363 Q87 372 75 360 Z M116 271 Q135 263 153 269 L145 360 Q133 372 119 363 Z'],
 ['adductors','M104 277 L109 284 L106 351 L99 358 Z M111 284 L116 277 L121 358 L114 351 Z'],
 ['calves','M78 376 Q90 373 101 378 L98 448 Q86 455 82 441 Z M119 378 Q130 373 142 376 L138 441 Q134 455 122 448 Z']
];
const back = [
 ['traps','M75 82 Q93 99 107 93 L107 123 L76 116 Z M113 93 Q127 99 145 82 L144 116 L113 123 Z'],
 ['shoulders','M49 96 Q37 94 30 104 L22 131 Q26 146 38 143 L51 112 Z M171 96 Q183 94 190 104 L198 131 Q194 146 182 143 L169 112 Z'],
 ['upper_back','M55 112 Q79 113 106 129 L106 171 L76 159 L55 139 Z M114 129 Q141 113 165 112 L165 139 L144 159 L114 171 Z'],
 ['lats','M57 146 L75 165 L105 179 L105 229 L65 210 Z M163 146 L145 165 L115 179 L115 229 L155 210 Z'],
 ['triceps','M24 143 Q30 148 41 145 L38 194 Q29 202 20 193 Z M179 145 Q190 148 196 143 L200 193 Q191 202 182 194 Z'],
 ['forearms','M20 199 Q29 204 38 198 L34 258 Q23 265 15 250 Z M182 198 Q191 204 200 199 L205 250 Q197 265 186 258 Z'],
 ['lower_back','M86 180 L106 187 L106 243 L77 232 Z M114 187 L134 180 L143 232 L114 243 Z'],
 ['glutes','M67 243 Q87 237 107 246 L107 288 Q84 297 65 273 Z M113 246 Q133 237 153 243 L155 273 Q136 297 113 288 Z'],
 ['abductors','M62 268 L74 283 L78 347 L67 337 Z M158 268 L146 283 L142 347 L153 337 Z'],
 ['hamstrings','M78 291 Q90 295 103 291 L101 366 Q87 372 77 361 Z M117 291 Q130 295 142 291 L143 361 Q133 372 119 366 Z'],
 ['calves','M78 376 Q90 373 101 378 L98 448 Q86 455 82 441 Z M119 378 Q130 373 142 376 L138 441 Q134 455 122 448 Z']
];

function figure(side,view){
 const paths=side==='front'?front:back;
 return `<div class="anatomy-figure ${view.gender==='female'?'female':''}"><svg viewBox="0 0 220 500" role="img" aria-label="แผนที่กล้ามเนื้อด้าน${side==='front'?'หน้า':'หลัง'}"><ellipse class="anatomy-shadow" cx="110" cy="484" rx="65" ry="7"/><g class="anatomy-base"><ellipse cx="110" cy="42" rx="24" ry="31"/><path d="M91 69 L129 69 L140 87 Q167 91 181 104 L198 142 L202 191 L211 247 Q213 263 199 269 Q187 269 185 255 L178 199 L173 151 L157 140 L156 223 L160 259 L150 372 L143 449 L139 478 L119 478 L116 451 L114 376 L110 303 L106 376 L104 451 L101 478 L81 478 L77 449 L70 372 L60 259 L64 223 L63 140 L47 151 L42 199 L35 255 Q33 269 21 269 Q7 263 9 247 L18 191 L22 142 L39 104 Q53 91 80 87 Z"/></g>${paths.map(([code,d])=>`<path class="anatomy-hotspot ${view.selected.includes(code)?'selected':''}" d="${d}" data-anatomy-muscle="${code}" role="button" tabindex="0" aria-label="${anatomyGroups.find(group=>group.code===code).name} ${counts[code]} ท่า" aria-pressed="${view.selected.includes(code)}"><title>${anatomyGroups.find(group=>group.code===code).name}</title></path>`).join('')}<path class="anatomy-midline" d="M110 105 L110 239"/></svg><span class="anatomy-figure-caption">ด้าน${side==='front'?'หน้า':'หลัง'}</span></div>`;
}

export function renderAnatomy(esc,view=anatomyView){
 const selected=anatomyGroups.filter(group=>view.selected.includes(group.code));
 const matches=fastfitExercises.filter(exercise=>view.selected.includes(recordById.get(exercise.sourceId)?.m));
 const sections=['ร่างกายส่วนบน','แขน','แกนกลางลำตัว','ร่างกายส่วนล่าง'];
 const toggle=(kind,value,label)=>`<button class="anatomy-toggle ${view[kind]===value?'active':''}" data-anatomy-${kind}="${value}" aria-pressed="${view[kind]===value}">${label}</button>`;
 return `<div class="page-header"><div class="eyebrow">MUSCLE MAP</div><h1 class="page-title">แผนที่กล้ามเนื้อ</h1><p class="gym-description">แตะกล้ามเนื้อบนภาพหรือเลือกรายชื่อด้านขวา เพื่อดูท่าฝึกที่ตรงกับตำแหน่งนั้น</p></div><div class="anatomy-layout"><section class="panel anatomy-map-panel" aria-label="เลือกตำแหน่งกล้ามเนื้อ"><div class="anatomy-controls"><div class="anatomy-segment">${toggle('view','both','หน้า–หลัง')}${toggle('view','front','ด้านหน้า')}${toggle('view','back','ด้านหลัง')}</div><div class="anatomy-segment">${toggle('gender','male','ผู้ชาย')}${toggle('gender','female','ผู้หญิง')}</div><button class="anatomy-multi ${view.multi?'active':''}" data-anatomy-multi aria-pressed="${view.multi}">เลือกหลายส่วน <span>${view.multi?'●':'○'}</span></button></div><div class="anatomy-figures ${view.view==='both'?'both':''}">${view.view!=='back'?figure('front',view):''}${view.view!=='front'?figure('back',view):''}</div><p class="hint">แตะพื้นที่สีบนภาพเพื่อเลือก · ใช้ Tab และ Enter ได้</p></section><div class="anatomy-side"><section class="panel anatomy-selection">${selected.length?`<div class="anatomy-selection-head"><strong>เลือกแล้ว ${selected.length} ส่วน</strong><button data-anatomy-clear>ล้าง</button></div><div class="anatomy-selected-tags">${selected.map(group=>`<button data-anatomy-muscle="${group.code}">${esc(group.name)} ×</button>`).join('')}</div><p>${selected.map(group=>esc(group.description)).join(' · ')}</p><strong>ท่าที่เกี่ยวข้อง ${matches.length} ท่า</strong><div class="anatomy-exercise-list">${matches.slice(0,8).map(exercise=>`<button data-exercise="${exercise.id}">${esc(exercise.name)}<small>${esc(exercise.en)}</small></button>`).join('')}</div><button class="btn" data-anatomy-library>ดูในคลังท่า →</button>`:`<div class="anatomy-empty-icon">☝</div><h2>เลือกกล้ามเนื้อที่อยากฝึก</h2><p>แตะบนแผนที่ หรือเลือกจากกลุ่มกล้ามเนื้อด้านล่าง</p>`}</section><section class="panel anatomy-groups"><h2>กลุ่มกล้ามเนื้อ</h2>${sections.map(section=>`<div class="anatomy-group"><h3>${section}</h3><div class="anatomy-group-grid">${anatomyGroups.filter(group=>group.section===section).map(group=>`<button class="anatomy-group-card ${view.selected.includes(group.code)?'active':''}" data-anatomy-muscle="${group.code}" aria-pressed="${view.selected.includes(group.code)}"><strong>${esc(group.name)}</strong><small>${group.count} ท่า</small></button>`).join('')}</div></div>`).join('')}</section></div></div>`;
}
