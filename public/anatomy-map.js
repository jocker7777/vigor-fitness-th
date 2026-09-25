import { fastfitCatalog } from './fastfit-catalog.js';
import { fastfitExercises } from './fastfit-adapter.js';
import { anatomyData } from './anatomy-data.js';
import { anatomyArtwork } from './anatomy-artwork.js';

const definitions=[
 ['shoulders','ไหล่','ร่างกายส่วนบน'],['chest','หน้าอก','ร่างกายส่วนบน'],['traps','บ่า','ร่างกายส่วนบน'],['upper_back','หลังส่วนบน','ร่างกายส่วนบน'],['lats','ปีกหลัง','ร่างกายส่วนบน'],
 ['biceps','ต้นแขนด้านหน้า','แขน'],['triceps','ต้นแขนด้านหลัง','แขน'],['forearms','แขนท่อนล่าง','แขน'],
 ['abs','หน้าท้อง','แกนกลางลำตัว'],['obliques','ท้องด้านข้าง','แกนกลางลำตัว'],['lower_back','หลังส่วนล่าง','แกนกลางลำตัว'],
 ['glutes','ก้น','ร่างกายส่วนล่าง'],['quads','ต้นขาด้านหน้า','ร่างกายส่วนล่าง'],['hamstrings','ต้นขาด้านหลัง','ร่างกายส่วนล่าง'],['calves','น่อง','ร่างกายส่วนล่าง'],['adductors','ต้นขาด้านใน','ร่างกายส่วนล่าง'],['abductors','สะโพกด้านข้าง','ร่างกายส่วนล่าง']
];
const descriptions={
 neck:'กล้ามเนื้อบริเวณคอช่วยก้ม เอียง และหมุนศีรษะ',traps:'ส่วนบนของทราปีเซียสอยู่ระหว่างคอกับหัวไหล่ ช่วยยกและหมุนสะบัก',mid_traps:'ส่วนกลางและล่างของทราปีเซียสช่วยดึงสะบักเข้าหากันและควบคุมสะบักขณะยกแขน',
 front_deltoid:'ส่วนหน้าของหัวไหล่ช่วยยกแขนไปด้านหน้าและทำงานร่วมในท่าดัน',side_deltoid:'ส่วนข้างของหัวไหล่ช่วยกางแขนออกจากลำตัว',rear_deltoid:'ส่วนหลังของหัวไหล่ช่วยพาแขนไปด้านหลังและกางแขนในแนวราบ',rotator_cuff:'กล้ามเนื้อมัดเล็กรอบข้อไหล่ช่วยหมุนต้นแขนและประคองหัวกระดูกแขน',
 upper_chest:'เส้นใยส่วนบนของกล้ามเนื้ออกเริ่มใกล้ไหปลาร้า และทำงานในท่าดันแขนเฉียงขึ้น',chest:'เส้นใยอกบริเวณกลางและล่างช่วยพาต้นแขนเข้าหาลำตัวและออกแรงดัน',serratus:'กล้ามเนื้อข้างซี่โครงช่วยพาสะบักไปด้านหน้าและแนบกับทรวงอก',
 biceps:'กล้ามเนื้อด้านหน้าต้นแขนช่วยงอข้อศอกและหงายฝ่ามือ',brachialis:'กล้ามเนื้อใต้ไบเซ็ปส์ช่วยงอข้อศอก',triceps:'กล้ามเนื้อด้านหลังต้นแขนช่วยเหยียดข้อศอก',forearm_flexors:'กลุ่มกล้ามเนื้อด้านในท่อนแขนช่วยงอข้อมือและกำมือ',forearm_extensors:'กลุ่มกล้ามเนื้อด้านนอกท่อนแขนช่วยเหยียดข้อมือและนิ้วมือ',
 abs:'กล้ามเนื้อแนวกลางหน้าท้องช่วยงอลำตัวและควบคุมเชิงกราน',obliques:'กล้ามเนื้อด้านข้างหน้าท้องช่วยหมุน เอียง และประคองลำตัว',lats:'กล้ามเนื้อแผ่นกว้างด้านหลังช่วยดึงต้นแขนลงและเข้าหาลำตัว',teres:'กล้ามเนื้อใกล้ขอบล่างสะบักทำงานร่วมกับปีกหลังในการพาแขนเข้าหาลำตัว',rhomboids:'กล้ามเนื้อระหว่างสะบักกับกระดูกสันหลังช่วยดึงสะบักเข้าหากัน',lower_back:'กล้ามเนื้อข้างกระดูกสันหลังช่วงล่างช่วยเหยียดและประคองลำตัว',
 glutes:'กล้ามเนื้อก้นมัดใหญ่ช่วยเหยียดสะโพกขณะลุกยืนและขึ้นบันได',glute_medius:'กล้ามเนื้อด้านข้างก้นช่วยกางสะโพกและคุมระดับเชิงกราน',tfl:'กล้ามเนื้อบริเวณด้านหน้าข้างสะโพกช่วยงอและกางสะโพก',hip_flexors:'กลุ่มกล้ามเนื้อด้านหน้าสะโพกช่วยยกต้นขาเข้าหาลำตัว',adductors:'กล้ามเนื้อต้นขาด้านในช่วยหุบขาเข้าหาแนวกึ่งกลาง',quads:'กลุ่มกล้ามเนื้อด้านหน้าต้นขาช่วยเหยียดเข่า',hamstrings:'กลุ่มกล้ามเนื้อด้านหลังต้นขาช่วยงอเข่าและเหยียดสะโพก',calves:'กล้ามเนื้อหลังหน้าแข้งช่วยกดปลายเท้าและยกส้นเท้า',tibialis:'กล้ามเนื้อหน้าแข้งช่วยกระดกปลายเท้าขึ้น'
};
const records=new Map(fastfitCatalog.map(record=>[record.id,record]));
export const anatomyPrimaryGroups=definitions.map(([code,name,section])=>({code,name,section,count:fastfitCatalog.filter(record=>record.m===code).length}));
export const anatomyGroups=anatomyData.map(part=>({...part,description:descriptions[part.code],count:fastfitCatalog.filter(record=>record.f?.includes(part.code)).length}));
export const anatomyView={view:'both',gender:'male',multi:false,selected:[]};
export function anatomyMatches(selected){return fastfitExercises.filter(exercise=>selected.some(code=>records.get(exercise.sourceId)?.f?.includes(code)));}

function figure(side,view,esc){
 const prefix=`anatomy-${view.gender}-${side}`;
 const art=anatomyArtwork[view.gender][side].replace(/id="view-(front|back)"/g,`id="${prefix}-body"`).replace(/<g class="m" data-m="([^"]+)">/g,(_,code)=>{
  const part=anatomyGroups.find(item=>item.code===code);
  return `<g class="anatomy-hotspot ${view.selected.includes(code)?'selected':''}" data-anatomy-muscle="${code}" data-anatomy-side="${side}" tabindex="0" role="button" aria-label="${esc(part.name)} ${part.count} ท่า" aria-pressed="${view.selected.includes(code)}"><title>${esc(part.name)}</title>`;
 });
 return `<div class="anatomy-figure ${view.gender}" data-figure-side="${side}"><svg viewBox="${side==='front'?'0':'420'} 0 400 880" role="group" aria-label="แผนที่กล้ามเนื้อด้าน${side==='front'?'หน้า':'หลัง'}" style="--anatomy-fill:url(#${prefix}-muscle)"><defs><radialGradient id="${prefix}-muscle" cx="35%" cy="28%" r="80%"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#e5e9eb"/><stop offset="1" stop-color="#a6afb7"/></radialGradient></defs>${art}</svg><span class="anatomy-figure-caption">ด้าน${side==='front'?'หน้า · 19 จุด':'หลัง · 18 จุด'}</span></div>`;
}

export function renderAnatomy(esc,view=anatomyView){
 const selected=anatomyGroups.filter(part=>view.selected.includes(part.code));
 const matches=anatomyMatches(view.selected);
 const toggle=(kind,value,label)=>`<button class="anatomy-toggle ${view[kind]===value?'active':''}" data-anatomy-${kind}="${value}" aria-pressed="${view[kind]===value}">${label}</button>`;
 const detail=selected.length?`<div class="anatomy-selection-head"><strong>เลือกแล้ว ${selected.length} จุด</strong><button data-anatomy-clear>ล้างทั้งหมด</button></div><div class="anatomy-selected-tags">${selected.map(part=>`<button data-anatomy-muscle="${part.code}" aria-label="นำ ${esc(part.name)} ออกจากที่เลือก">${esc(part.name)} ×</button>`).join('')}</div>${selected.map(part=>`<article class="anatomy-part-description"><h2>${esc(part.name)}</h2><small>${esc(part.latin)}</small><p>${esc(part.description)}</p><span class="anatomy-part-count">${part.count} ท่าที่ใช้กล้ามเนื้อนี้</span></article>`).join('')}<div class="anatomy-result-count" role="status">ท่าที่เกี่ยวข้อง ${matches.length} ท่า${selected.length>1?' (ไม่ซ้ำ)':''}</div><div class="anatomy-exercise-list">${matches.slice(0,8).map(exercise=>`<button data-exercise="${exercise.id}">${esc(exercise.name)}<small>${esc(exercise.en)}</small></button>`).join('')}</div><button class="btn" data-anatomy-library>ดูทั้งหมด ${matches.length} ท่า →</button>`:`<div class="anatomy-empty-icon">☝</div><h2>เลือกจุดกล้ามเนื้อที่อยากฝึก</h2><p>ชี้เมาส์เพื่อดูชื่อ แล้วแตะบนภาพเพื่อเลือก แผนที่นี้แยก 30 จุดย่อยใน 17 กลุ่มกล้ามเนื้อ</p>`;
 const sections=['ร่างกายส่วนบน','แขน','แกนกลางลำตัว','ร่างกายส่วนล่าง'];
 return `<div class="page-header"><div class="eyebrow">MUSCLE MAP</div><h1 class="page-title">แผนที่กล้ามเนื้อ</h1><p class="gym-description">สำรวจ 30 จุดกล้ามเนื้อย่อย · ชี้เพื่อดูชื่อ แตะเพื่อดูรายละเอียดและท่าฝึก</p></div><div class="anatomy-layout"><section class="panel anatomy-map-panel" aria-label="เลือกตำแหน่งกล้ามเนื้อ"><div class="anatomy-controls"><div class="anatomy-segment">${toggle('view','both','หน้า–หลัง')}${toggle('view','front','ด้านหน้า')}${toggle('view','back','ด้านหลัง')}</div><div class="anatomy-segment">${toggle('gender','male','ผู้ชาย')}${toggle('gender','female','ผู้หญิง')}</div><button class="anatomy-multi ${view.multi?'active':''}" data-anatomy-multi aria-pressed="${view.multi}">เลือกหลายส่วน <span>${view.multi?'●':'○'}</span></button></div><div class="anatomy-figures ${view.view==='both'?'both':''}">${view.view!=='back'?figure('front',view,esc):''}${view.view!=='front'?figure('back',view,esc):''}</div><div class="anatomy-legend"><span><i class="selected"></i>ที่เลือก</span><span><i class="hovered"></i>ชี้เมาส์</span><span><i></i>กล้ามเนื้อ</span></div><p class="hint">บางจุดปรากฏทั้งด้านหน้าและหลัง · ใช้ Tab และ Enter เพื่อเลือกได้</p><a class="anatomy-source" href="https://fastfit.buildbytoey.com/anatomy" target="_blank" rel="noopener noreferrer">ภาพและข้อมูลจุดกล้ามเนื้อ: FastFit ↗</a></section><div class="anatomy-side"><section class="panel anatomy-selection">${detail}</section><section class="panel anatomy-groups"><h2>เลือกตามกล้ามเนื้อย่อย</h2>${sections.map(section=>`<section class="anatomy-section"><h3>${section}</h3>${anatomyPrimaryGroups.filter(group=>group.section===section).map(group=>`<div class="anatomy-group"><h4>${esc(group.name)}</h4><div class="anatomy-group-grid">${anatomyGroups.filter(part=>part.group===group.code).map(part=>`<button class="anatomy-group-card ${view.selected.includes(part.code)?'active':''}" data-anatomy-muscle="${part.code}" aria-pressed="${view.selected.includes(part.code)}"><strong>${esc(part.name)}</strong><small>${part.count} ท่า</small></button>`).join('')}</div></div>`).join('')}</section>`).join('')}</section></div></div><div id="anatomy-tooltip" role="tooltip" hidden></div>`;
}

export function showAnatomyHover(code,x,y){
 const tooltip=document.getElementById('anatomy-tooltip');
 const part=anatomyGroups.find(item=>item.code===code);
 document.querySelectorAll('.anatomy-hotspot').forEach(element=>element.classList.toggle('hovered',element.dataset.anatomyMuscle===code));
 if(!tooltip)return;
 if(!part){tooltip.hidden=true;return;}
 tooltip.textContent=part.name;tooltip.hidden=false;
 tooltip.style.left=`${Math.max(8,Math.min(x+12,innerWidth-tooltip.offsetWidth-8))}px`;
 tooltip.style.top=`${Math.max(8,Math.min(y-44,innerHeight-tooltip.offsetHeight-8))}px`;
}
