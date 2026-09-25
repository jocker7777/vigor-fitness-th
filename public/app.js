import { equipmentCatalog, equipmentExercises, renderEquipment } from './equipment-catalog.js';
import { libraryExercises, libraryTypeMeta, libraryMuscleOrder } from './exercise-library.js';
import { fastfitExercises } from './fastfit-adapter.js';
import { foods, renderFoodLibrary } from './food-library.js';
const gymView={slug:'',search:'',muscle:'ทั้งหมด',level:'ทั้งหมด',picked:[]};
const exercises=[
 ['Squat','สควอต','ขาและสะโพก','ไม่ใช้อุปกรณ์','เริ่มต้น','S','🏋️',45,'ยืนกว้างเท่าหัวไหล่ ย่อตัวโดยดันสะโพกไปหลัง รักษาหลังตรง แล้วดันพื้นกลับขึ้น'],
 ['Push-Up','วิดพื้น','อกและแขน','ไม่ใช้อุปกรณ์','เริ่มต้น','S','💪',40,'วางมือกว้างกว่าหัวไหล่เล็กน้อย เกร็งลำตัว ลดอกลงใกล้พื้น แล้วดันกลับ'],
 ['Plank','แพลงก์','แกนกลาง','ไม่ใช้อุปกรณ์','เริ่มต้น','S','🧘',40,'วางศอกใต้หัวไหล่ เกร็งหน้าท้องและสะโพก คงลำตัวเป็นเส้นตรง'],
 ['Lunge','ลันจ์','ขาและสะโพก','ไม่ใช้อุปกรณ์','เริ่มต้น','A','🚶',45,'ก้าวเท้าไปหน้า ย่อเข่าทั้งสองข้างอย่างมั่นคง แล้วกลับมายืน'],
 ['Jumping Jack','กระโดดตบ','คาร์ดิโอ','ไม่ใช้อุปกรณ์','เริ่มต้น','A','⚡',40,'กระโดดแยกขาพร้อมยกแขนเหนือศีรษะ แล้วกลับสู่ท่าเริ่ม'],
 ['Glute Bridge','สะพานสะโพก','ขาและสะโพก','ไม่ใช้อุปกรณ์','เริ่มต้น','A','🌉',45,'นอนหงาย ชันเข่า เกร็งสะโพกยกขึ้นจนลำตัวตรง แล้วลดลงช้า ๆ'],
 ['Mountain Climber','ปีนเขา','คาร์ดิโอ','ไม่ใช้อุปกรณ์','ปานกลาง','A','⛰️',40,'เริ่มท่าวิดพื้น สลับดึงเข่าเข้าหาหน้าอกโดยคงสะโพกให้นิ่ง'],
 ['Crunch','ครันช์','แกนกลาง','ไม่ใช้อุปกรณ์','เริ่มต้น','B','🔥',40,'นอนหงายงอเข่า ยกหัวไหล่โดยใช้หน้าท้อง ไม่ดึงคอ'],
 ['Dumbbell Row','ดัมเบลโรว์','หลัง','ดัมเบล','ปานกลาง','S','🏋️',45,'พับสะโพก หลังตรง ดึงดัมเบลเข้าหาลำตัวโดยบีบสะบัก'],
 ['Shoulder Press','ดันไหล่','ไหล่และแขน','ดัมเบล','ปานกลาง','A','🙌',45,'ถือดัมเบลระดับไหล่ ดันขึ้นเหนือศีรษะแล้วลดลงอย่างควบคุม'],
 ['Goblet Squat','กอบเลตสควอต','ขาและสะโพก','ดัมเบล','ปานกลาง','S','🏋️',45,'ถือดัมเบลหน้าอก ย่อตัวโดยรักษาหน้าอกตั้ง แล้วดันกลับขึ้น'],
 ['Bicep Curl','งอแขนดัมเบล','แขน','ดัมเบล','เริ่มต้น','B','💪',40,'แนบข้อศอกข้างลำตัว งอแขนยกดัมเบล แล้วลดลงช้า ๆ'],
 ['Downward Dog','ท่าสุนัขก้มหน้า','ยืดเหยียด','เสื่อโยคะ','เริ่มต้น','A','🧘',45,'วางมือและเท้าบนพื้น ยกสะโพกเป็นรูปตัว V ยืดหลังและขา'],
 ['Cat Cow','แมวและวัว','ยืดเหยียด','เสื่อโยคะ','เริ่มต้น','A','🐈',40,'ตั้งคลาน สลับแอ่นหลังและโก่งหลังตามจังหวะหายใจ'],
 ['High Knees','ยกเข่าสูง','คาร์ดิโอ','ไม่ใช้อุปกรณ์','ปานกลาง','A','🏃',40,'วิ่งอยู่กับที่โดยยกเข่าขึ้นสูง แกว่งแขนตามธรรมชาติ'],
 ['Dead Bug','เดดบัก','แกนกลาง','ไม่ใช้อุปกรณ์','เริ่มต้น','A','🐞',45,'นอนหงาย ยกแขนและขา สลับเหยียดแขนกับขาตรงข้ามโดยหลังแนบพื้น']
].map((x,i)=>({id:i+1,en:x[0],name:x[1],muscle:x[2],equipment:x[3],level:x[4],tier:x[5],emoji:x[6],seconds:x[7],instructions:x[8]}));
exercises.push(...equipmentExercises,...libraryExercises);
const libraryMuscleAliases={'ขาและสะโพก':'ต้นขาด้านหน้า','อกและแขน':'หน้าอก','แกนกลาง':'หน้าท้อง','คาร์ดิโอ':'ทั้งตัว','หลัง':'หลังส่วนบน','ไหล่และแขน':'ไหล่','แขน':'ไบเซปส์','ยืดเหยียด':'ทั้งตัว'};
exercises.forEach((exercise,index)=>{
 exercise.primaryMuscle=exercise.primaryMuscle||libraryMuscleAliases[exercise.muscle]||exercise.muscle;
 exercise.type=exercise.type||(exercise.muscle==='ยืดเหยียด'?'ยืดเหยียด':exercise.muscle==='คาร์ดิโอ'?'คาร์ดิโอ':exercise.equipment==='เสื่อโยคะ'?'โยคะ':'เวท / ยิม');
 exercise.popularity=exercise.popularity||exercises.length-index;
});
const builtins=[
 {id:'starter',name:'เริ่มต้นอย่างมั่นใจ',goal:'ฟิตทั่วไป',level:'เริ่มต้น',minutes:18,description:'เริ่มฝึกทั้งตัวด้วยท่าพื้นฐานที่ทำได้ที่บ้าน',exerciseIds:[1,2,4,3,6]},
 {id:'burn',name:'เผาผลาญใน 20 นาที',goal:'ลดไขมัน',level:'ปานกลาง',minutes:20,description:'ขยับต่อเนื่อง เพิ่มการเต้นของหัวใจและความอึด',exerciseIds:[5,15,7,1,8]},
 {id:'strength',name:'เสริมกล้ามเนื้อทั่วตัว',goal:'เพิ่มกล้ามเนื้อ',level:'ปานกลาง',minutes:28,description:'สลับกล้ามเนื้อส่วนบนและล่างด้วยดัมเบล',exerciseIds:[11,9,10,4,12]},
 {id:'recovery',name:'ยืดเหยียดและฟื้นฟู',goal:'ฟื้นฟู',level:'เริ่มต้น',minutes:12,description:'คลายความตึงหลังวันทำงานหรือวันฝึกหนัก',exerciseIds:[14,13,6,16]},
 {id:'core',name:'แกนกลางแข็งแรง',goal:'ความแข็งแรง',level:'เริ่มต้น',minutes:15,description:'ฝึกหน้าท้องและแกนกลางเพื่อการเคลื่อนไหวที่มั่นคง',exerciseIds:[3,8,16,7]}
];
const menu=[['home','⌂','หน้าพร้อมฝึก'],['muscle','◒','แผนที่กล้ามเนื้อ'],['library','▦','คลังท่า'],['equipment','◈','ยิมที่บ้าน'],['sets','▤','ชุดของฉัน'],['programs','▤','โปรแกรมพร้อมฝึก'],['smart','✦','Smart Builder'],['builder','⊕','สร้างชุดเอง'],['workout','▶','ฝึกซ้อม'],['schedule','▣','ตารางฝึก'],['nutrition','◉','โภชนาการ'],['member','◎','สมาชิก'],['settings','⚙','ตั้งค่า']];
const key='vigor-state-v1';
const initial={plans:[],sessions:[],meals:[],equipment:[],goal:1900,voice:false,rest:20,profile:{displayName:'',fitnessGoal:'ฟิตทั่วไป',level:'เริ่มต้น',weeklyTarget:3},favorites:[],schedule:{},ready:{goal:'ทั้งหมด',equipment:'ทั้งหมด',minutes:0}};
const host=document.querySelector('#app');
const signedIn=host?.dataset.auth==='1';
const signInUrl=host?.dataset.signin||'/signin-with-chatgpt?return_to=%2F';
let state={...initial};
if(!signedIn){try{state={...initial,...JSON.parse(localStorage.getItem(key)||'{}')}}catch{state={...initial}}}
let page=(location.hash||'#home').slice(1),query='',filter='ทั้งหมด',programFilter='ทั้งหมด',modal=null,workout=null,timer=null,toastTimer=null;
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let saveQueue=Promise.resolve();
const save=()=>{
  if(!signedIn){localStorage.setItem(key,JSON.stringify(state));return}
  const snapshot=JSON.stringify(state);
  saveQueue=saveQueue.catch(()=>{}).then(async()=>{
    const response=await fetch('/api/state',{method:'PUT',headers:{'Content-Type':'application/json'},body:snapshot});
    if(!response.ok)throw new Error(`Save failed: ${response.status}`);
  }).catch(()=>notify('บันทึกบนคลาวด์ไม่สำเร็จ กรุณาลองอีกครั้ง'));
};
const today=()=>new Date().toLocaleDateString('en-CA');
const niceDate=()=>new Intl.DateTimeFormat('th-TH',{day:'numeric',month:'long',year:'numeric'}).format(new Date());
const allPlans=()=>[...builtins,...state.plans];
function notify(msg){clearTimeout(toastTimer);document.querySelector('.toast')?.remove();let el=document.createElement('div');el.className='toast';el.textContent=msg;document.body.append(el);toastTimer=setTimeout(()=>el.remove(),3000)}
function go(p){page=p;location.hash=p;query='';filter='ทั้งหมด';render();window.scrollTo(0,0)}
function layout(content){
  const active=page.startsWith('equipment/')?'equipment':menu.some(x=>x[0]===page)?page:'home';
  const account=signedIn?`<button class="btn small secondary" data-go="member" title="เปิดบัญชีสมาชิก">☁ บัญชีสมาชิก</button>`:`<a class="btn small secondary" href="${esc(signInUrl)}" target="_top">เข้าสู่ระบบเพื่อบันทึก</a>`;
  return `<div class="app"><aside class="sidebar"><div class="brand"><span class="brand-mark">V</span>VIGOR<span>.</span></div><div class="nav-label">เมนูหลัก</div><nav class="nav">${menu.map(([id,icon,label])=>`<button data-go="${id}" class="${active===id?'active':''}"><span class="icon">${icon}</span>${label}</button>`).join('')}</nav><div class="side-bottom"><strong>เริ่มจากวันนี้</strong><small>การฝึกเล็ก ๆ ที่ทำต่อเนื่อง สร้างผลลัพธ์ที่ยิ่งใหญ่</small><button data-go="programs">เลือกโปรแกรม →</button></div></aside><main class="main"><header class="topbar"><div class="crumb">VIGOR / ${menu.find(x=>x[0]===active)?.[2]||'หน้าหลัก'}</div><div class="top-actions">${account}<span class="today">${niceDate()}</span><div class="avatar">${signedIn?esc((host.dataset.name||'V').slice(0,1).toUpperCase()):'V'}</div></div></header>${content}</main></div><nav class="mobile-nav">${menu.filter(x=>['home','library','programs','builder','schedule'].includes(x[0])).map(([id,icon,label])=>`<button data-go="${id}" class="${active===id?'active':''}"><span>${icon}</span>${label}</button>`).join('')}</nav>${modalHTML()}`
}
function header(kicker,title,sub=''){return `<div class="page-header"><div class="eyebrow">${kicker}</div><h1 class="page-title">${title}</h1>${sub?`<p class="intro">${sub}</p>`:''}</div>`}
function programCard(p){return `<article class="card program"><span class="tag">${esc(p.goal)}</span><h3>${esc(p.name)}</h3><p>${esc(p.description||'โปรแกรมที่คุณสร้างเอง')}</p><div class="program-foot"><span class="meta">◷ ${p.minutes||Math.ceil(p.exerciseIds.length*4)} นาที · ${p.exerciseIds.length} ท่า</span><div class="program-actions"><button class="btn small secondary" data-detail-plan="${esc(p.id)}">ดู</button><button class="btn small" data-start="${esc(p.id)}">เริ่ม</button></div></div></article>`}
function exerciseCard(e){return `<article class="card exercise" data-exercise="${e.id}"><div class="exercise-visual"><span>${e.emoji}</span></div><h3>${esc(e.name)}</h3><p>${esc(e.en)}</p><div class="exercise-meta"><span class="meta">${esc(e.muscle)}</span><span class="tier">${e.tier}</span></div></article>`}
function home(){let done=state.sessions.length,week=state.sessions.filter(s=>Date.now()-new Date(s.date).getTime()<7*864e5).length,minutes=state.sessions.reduce((n,s)=>n+s.minutes,0);return `<section class="hero"><div class="hero-content"><span class="eyebrow" style="color:#cef294">YOUR STRONGER SELF STARTS HERE</span><h1>วันนี้คุณพร้อม<br>ขยับไปอีกขั้นแล้วหรือยัง?</h1><p>เลือกเป้าหมาย ค้นพบท่าที่ใช่ และเริ่มฝึกในแบบของคุณ ทุกความก้าวหน้าเริ่มจากการลงมือทำ</p><div class="hero-buttons"><button class="btn" data-go="programs">▶ เริ่มออกกำลังกาย</button><button class="btn secondary" data-go="library">สำรวจคลังท่า ↗</button></div></div><div class="hero-art"><div class="head"></div><div class="torso"></div><div class="limb arm1"></div><div class="limb arm2"></div><div class="limb leg1"></div><div class="limb leg2"></div></div></section><section class="section"><div class="section-head"><div><h2>ภาพรวมของคุณ</h2><p>ทุกก้าวเล็ก ๆ มีความหมาย</p></div></div><div class="grid stats"><div class="stat"><div class="stat-icon">⚡</div><div class="value">${done}</div><div class="label">ครั้งที่ฝึกทั้งหมด</div></div><div class="stat"><div class="stat-icon">◷</div><div class="value">${minutes}</div><div class="label">นาทีที่เคลื่อนไหว</div></div><div class="stat"><div class="stat-icon">✦</div><div class="value">${week}</div><div class="label">ครั้งใน 7 วันที่ผ่านมา</div></div><div class="stat"><div class="stat-icon">▦</div><div class="value">${state.plans.length}</div><div class="label">โปรแกรมส่วนตัว</div></div></div></section><section class="section"><div class="section-head"><div><h2>โปรแกรมแนะนำ</h2><p>เริ่มต้นด้วยแผนที่จัดไว้ให้คุณ</p></div><button class="text-link" data-go="programs">ดูทั้งหมด →</button></div><div class="grid program-grid">${builtins.slice(0,3).map(programCard).join('')}</div></section><section class="section"><div class="section-head"><div><h2>ท่ายอดนิยม</h2><p>เรียนรู้ท่าพื้นฐานที่ใช้ได้ทุกวัน</p></div><button class="text-link" data-go="library">ดูคลังท่า →</button></div><div class="grid exercise-grid">${exercises.slice(0,4).map(exerciseCard).join('')}</div></section>`}
function library(){let categories=['ทั้งหมด',...new Set(exercises.map(e=>e.muscle))],items=exercises.filter(e=>(filter==='ทั้งหมด'||e.muscle===filter)&&(`${e.name} ${e.en} ${e.muscle} ${e.equipment}`.toLowerCase().includes(query.toLowerCase())));return `${header('EXPLORE MOVEMENT','คลังท่าออกกำลังกาย','ค้นหาท่าฝึกตามกล้ามเนื้อและอุปกรณ์ที่คุณมี')}<div class="toolbar"><input class="input search" id="search" placeholder="⌕  ค้นหาท่า กล้ามเนื้อ หรืออุปกรณ์..." value="${esc(query)}"><select id="equipment-filter"><option value="ทั้งหมด">ทุกอุปกรณ์</option>${[...new Set(exercises.map(e=>e.equipment))].map(e=>`<option ${window.equipmentFilter===e?'selected':''}>${e}</option>`).join('')}</select></div><div class="chips">${categories.map(c=>`<button class="chip ${filter===c?'active':''}" data-filter="${esc(c)}">${esc(c)}</button>`).join('')}</div><section class="section"><div class="section-head"><h2>แสดง ${items.length} ท่า</h2></div><div class="grid exercise-grid">${items.length?items.map(exerciseCard).join(''):'<div class="empty">ไม่พบท่าที่ตรงกับการค้นหา</div>'}</div></section>`}
function programs(){let goals=['ทั้งหมด',...new Set(allPlans().map(p=>p.goal))],plans=allPlans().filter(p=>programFilter==='ทั้งหมด'||p.goal===programFilter);return `${header('FIND YOUR ROUTINE','โปรแกรมออกกำลังกาย','เลือกแผนที่เข้ากับเป้าหมาย หรือสร้างโปรแกรมของคุณเอง')}<div class="toolbar"><div class="chips">${goals.map(g=>`<button class="chip ${programFilter===g?'active':''}" data-program-filter="${esc(g)}">${esc(g)}</button>`).join('')}</div><button class="btn" data-go="builder">＋ สร้างโปรแกรม</button></div><div class="grid program-grid">${plans.map(programCard).join('')}</div>`}
function builder(){return `${header('BUILD YOUR WAY','สร้างโปรแกรมของคุณ','เลือกท่า กำหนดเป้าหมาย แล้วบันทึกเป็นแผนส่วนตัว')}<div class="two-col"><div class="panel"><h3>รายละเอียดโปรแกรม</h3><div class="field"><label>ชื่อโปรแกรม</label><input class="input" id="plan-name" placeholder="เช่น ฝึกตอนเช้า 15 นาที"></div><div class="form-row"><div class="field"><label>เป้าหมาย</label><select id="plan-goal"><option>ฟิตทั่วไป</option><option>ลดไขมัน</option><option>เพิ่มกล้ามเนื้อ</option><option>ความแข็งแรง</option><option>ฟื้นฟู</option></select></div><div class="field"><label>ระดับ</label><select id="plan-level"><option>เริ่มต้น</option><option>ปานกลาง</option><option>ขั้นสูง</option></select></div></div><div class="field"><label>เลือกท่าออกกำลังกาย</label><div class="toolbar" style="margin:0"><select id="add-exercise" style="flex:1">${exercises.map(e=>`<option value="${e.id}">${e.name} · ${e.muscle}</option>`).join('')}</select><button class="btn" id="add-exercise-btn">＋ เพิ่มท่า</button></div></div><p class="hint">แต่ละท่าใช้ 40–45 วินาที พักระหว่างท่าตามเวลาที่ตั้งค่า</p></div><div class="panel"><h3>รายการท่า <span id="selected-count" class="muted">0 ท่า</span></h3><div id="selected-exercises" class="list"><div class="empty">เลือกท่าจากด้านซ้ายเพื่อเริ่มจัดโปรแกรม</div></div><div style="margin-top:16px;display:flex;justify-content:flex-end"><button class="btn" id="save-plan">บันทึกโปรแกรม →</button></div></div></div>`}
function equipment(){let eq=[['ไม่ใช้อุปกรณ์','🤸'],['ดัมเบล','🏋️'],['เสื่อโยคะ','🧘'],['ยางยืด','〰️'],['เคตเทิลเบล','🔔'],['บาร์เบล','🏋️'],['ม้านั่ง','▰'],['เชือกกระโดด','➰']];return `${header('YOUR SPACE','อุปกรณ์ของฉัน','เลือกอุปกรณ์ที่คุณมีเพื่อค้นหาท่าที่เหมาะกับพื้นที่ฝึก')}<div class="grid equipment-grid">${eq.map(([name,icon])=>`<div class="card equip ${state.equipment.includes(name)?'selected':''}" data-equip="${name}"><div class="ico">${icon}</div><strong>${name}</strong><small class="muted">${state.equipment.includes(name)?'✓ เลือกแล้ว':'แตะเพื่อเลือก'}</small></div>`).join('')}</div><section class="section"><div class="section-head"><h2>ท่าที่ใช้อุปกรณ์ของคุณ</h2></div><div class="grid exercise-grid">${exercises.filter(e=>e.equipment==='ไม่ใช้อุปกรณ์'||state.equipment.includes(e.equipment)).map(exerciseCard).join('')}</div></section>`}
function schedule(){let now=new Date(),start=new Date(now.getFullYear(),now.getMonth(),1),days=new Date(now.getFullYear(),now.getMonth()+1,0).getDate(),offset=(start.getDay()+6)%7,labels=['จ','อ','พ','พฤ','ศ','ส','อา'];let cells=Array.from({length:offset},()=>'<div></div>');for(let i=1;i<=days;i++){let date=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`,logs=state.sessions.filter(s=>s.date===date);cells.push(`<div class="day ${i===now.getDate()?'today':''}"><strong>${i}</strong>${logs.map(s=>`<span class="dot">✓ ${esc(s.name)}</span>`).join('')}${!logs.length?'<small>—</small>':''}</div>`)}return `${header('KEEP SHOWING UP','ตารางการฝึก','ติดตามวันที่คุณลงมือทำ และเห็นความก้าวหน้าได้ชัดขึ้น')}<div class="panel"><div class="section-head"><h2>${new Intl.DateTimeFormat('th-TH',{month:'long',year:'numeric'}).format(now)}</h2><span class="muted">${state.sessions.length} ครั้งทั้งหมด</span></div><div class="calendar">${labels.map(l=>`<div class="muted" style="text-align:center;font-size:12px">${l}</div>`).join('')}${cells.join('')}</div></div><section class="section"><div class="section-head"><h2>ประวัติการฝึก</h2></div><div class="list">${state.sessions.length?state.sessions.slice().reverse().map(s=>`<div class="list-item"><span>✓</span><div class="grow"><strong>${esc(s.name)}</strong><small>${esc(s.date)} · ${s.minutes} นาที</small></div></div>`).join(''):'<div class="empty">เมื่อฝึกเสร็จ ประวัติจะปรากฏที่นี่</div>'}</div></section>`}
function nutrition(){let meals=state.meals.filter(m=>m.date===today()),total=meals.reduce((n,m)=>n+m.cal,0),protein=meals.reduce((n,m)=>n+m.protein,0);return `${header('FUEL YOUR BODY','โภชนาการ','บันทึกอาหารและติดตามพลังงานของวันนี้')}<div class="grid stats" style="grid-template-columns:repeat(3,1fr)"><div class="stat"><div class="stat-icon">◉</div><div class="value">${total}</div><div class="label">พลังงานที่กิน · kcal</div></div><div class="stat"><div class="stat-icon">⚡</div><div class="value">${state.goal}</div><div class="label">เป้าหมายรายวัน · kcal</div></div><div class="stat"><div class="stat-icon">✦</div><div class="value">${protein}g</div><div class="label">โปรตีนวันนี้</div></div></div><div class="panel" style="margin-top:17px"><div class="section-head"><h2>ความคืบหน้าพลังงาน</h2><span class="meta">${Math.round(total/state.goal*100)}%</span></div><div class="bar"><span style="width:${Math.min(100,total/state.goal*100)}%"></span></div></div><section class="section"><div class="section-head"><div><h2>คลังอาหาร</h2><p>แตะเพิ่มเพื่อบันทึกอาหาร 1 หน่วยบริโภค</p></div></div><div class="grid food-grid">${foods.map(f=>`<div class="card food-row"><span class="food-icon">${f.emoji}</span><div class="grow"><strong>${f.name}</strong><small>${f.cal} kcal · โปรตีน ${f.protein}g · คาร์บ ${f.carbs}g</small></div><button data-food="${f.id}">＋</button></div>`).join('')}</div></section><section class="section"><div class="section-head"><h2>อาหารที่บันทึกวันนี้</h2></div><div class="list">${meals.length?meals.map(m=>`<div class="list-item"><span>${m.emoji}</span><div class="grow"><strong>${esc(m.name)}</strong><small>${m.cal} kcal · โปรตีน ${m.protein}g</small></div><button data-remove-meal="${m.logId}">ลบ</button></div>`).join(''):'<div class="empty">ยังไม่มีอาหารที่บันทึกวันนี้</div>'}</div></section>`}
function settings(){return `${header('MAKE IT YOURS','ตั้งค่า','ปรับประสบการณ์การฝึกให้เข้ากับคุณ')}<div class="panel" style="max-width:700px"><div class="settings-row"><div><strong>โค้ชเสียง</strong><small>อ่านชื่อท่าและแจ้งการเปลี่ยนท่า (ขึ้นกับเสียงของอุปกรณ์)</small></div><input type="checkbox" id="voice" ${state.voice?'checked':''}></div><div class="settings-row"><div><strong>เวลาพักระหว่างท่า</strong><small>เริ่มนับหลังจบท่าแต่ละท่า</small></div><select id="rest"><option value="10" ${state.rest==10?'selected':''}>10 วินาที</option><option value="20" ${state.rest==20?'selected':''}>20 วินาที</option><option value="30" ${state.rest==30?'selected':''}>30 วินาที</option><option value="45" ${state.rest==45?'selected':''}>45 วินาที</option></select></div><div class="settings-row"><div><strong>เป้าหมายพลังงานรายวัน</strong><small>ใช้เพื่อแสดงความคืบหน้าในหน้าโภชนาการ</small></div><input class="input" type="number" id="cal-goal" min="500" max="6000" value="${state.goal}" style="width:110px"></div><div class="settings-row"><div><strong>ส่งออกข้อมูล</strong><small>ดาวน์โหลดโปรแกรม ประวัติการฝึก และอาหารในรูปแบบ JSON</small></div><button class="btn small secondary" id="export">ดาวน์โหลด</button></div></div><p class="hint" style="margin-top:15px">ข้อมูลนี้บันทึกไว้ในเบราว์เซอร์เครื่องนี้ หากล้างข้อมูลเว็บไซต์ ข้อมูลที่บันทึกจะหายไป</p>`}
function member(){
  if(!signedIn)return `${header('MEMBERSHIP','สมาชิก VIGOR','เข้าสู่ระบบเพื่อเก็บแผนการฝึก ประวัติ และเป้าหมายของคุณไว้กับบัญชีเดียว')}<div class="panel member-gate"><div class="member-badge">V</div><h2>เริ่มต้นบัญชี VIGOR ของคุณ</h2><p>บัญชีสมาชิกช่วยบันทึกโปรแกรมส่วนตัว บันทึกการออกกำลังกาย และโภชนาการ เพื่อกลับมาใช้ต่อบนอุปกรณ์อื่นได้</p><a class="btn" href="${esc(signInUrl)}" target="_top">เข้าสู่ระบบด้วย ChatGPT</a><p class="hint">ยังไม่เข้าสู่ระบบก็ทดลองใช้งานได้ ข้อมูลจะอยู่ในเบราว์เซอร์เครื่องนี้</p></div>`;
  const profile=state.profile||initial.profile;
  const done=state.sessions.length;
  const week=state.sessions.filter(s=>Date.now()-new Date(s.date).getTime()<7*864e5).length;
  return `${header('MY MEMBERSHIP','บัญชีสมาชิก','จัดการเป้าหมายการฝึกและดูความคืบหน้าของคุณ')}<div class="two-col member-layout"><section class="panel"><div class="member-identity"><div class="member-badge">${esc((profile.displayName||host.dataset.name||'V').slice(0,1).toUpperCase())}</div><div><div class="eyebrow">VIGOR MEMBER</div><h2>${esc(profile.displayName||host.dataset.name||'สมาชิก VIGOR')}</h2><p class="hint">☁ บัญชีนี้บันทึกข้อมูลบนคลาวด์แล้ว</p></div></div><div class="field"><label>ชื่อที่ต้องการให้แสดง</label><input class="input" id="member-name" maxlength="50" value="${esc(profile.displayName||'')}" placeholder="เช่น มายด์"></div><div class="form-row"><div class="field"><label>เป้าหมายหลัก</label><select id="member-goal">${['ฟิตทั่วไป','ลดไขมัน','เพิ่มกล้ามเนื้อ','ความแข็งแรง','ฟื้นฟู'].map(x=>`<option ${profile.fitnessGoal===x?'selected':''}>${x}</option>`).join('')}</select></div><div class="field"><label>ระดับการฝึก</label><select id="member-level">${['เริ่มต้น','ปานกลาง','ขั้นสูง'].map(x=>`<option ${profile.level===x?'selected':''}>${x}</option>`).join('')}</select></div></div><div class="field"><label>เป้าหมายการฝึกต่อสัปดาห์</label><select id="member-weekly">${[2,3,4,5,6,7].map(x=>`<option value="${x}" ${Number(profile.weeklyTarget)===x?'selected':''}>${x} วันต่อสัปดาห์</option>`).join('')}</select></div><button class="btn" id="save-member">บันทึกข้อมูลสมาชิก</button></section><section><div class="grid stats member-stats"><div class="stat"><div class="stat-icon">⚡</div><div class="value">${done}</div><div class="label">การฝึกทั้งหมด</div></div><div class="stat"><div class="stat-icon">✦</div><div class="value">${week}/${profile.weeklyTarget||3}</div><div class="label">ความคืบหน้าสัปดาห์นี้</div></div></div><div class="panel" style="margin-top:17px"><h3>สิทธิ์สมาชิก</h3><div class="list"><div class="list-item"><span>☁</span><div class="grow"><strong>บันทึกข้ามอุปกรณ์</strong><small>แผนและประวัติของคุณผูกกับบัญชี</small></div><span class="tier">พร้อมใช้</span></div><div class="list-item"><span>▤</span><div class="grow"><strong>โปรแกรมส่วนตัว</strong><small>${state.plans.length} โปรแกรมที่บันทึกไว้</small></div></div><div class="list-item"><span>◷</span><div class="grow"><strong>ประวัติการฝึก</strong><small>ติดตามผลจาก ${done} การฝึก</small></div></div></div><a class="text-link signout" href="/signout-with-chatgpt?return_to=%2F" target="_top">ออกจากระบบ</a></div></section></div>`
}
function workoutPage(){if(!workout)return `${header('WORKOUT PLAYER','พร้อมเริ่มฝึก','เลือกโปรแกรมเพื่อเริ่มตัวเล่นฝึก')}<button class="btn" data-go="programs">ดูโปรแกรม</button>`;let p=workout.plan,e=exercises.find(x=>x.id===p.exerciseIds[workout.index]),pct=(workout.index+(workout.phase==='rest'?1:0))/p.exerciseIds.length*100;return `${header('WORKOUT IN PROGRESS','กำลังฝึก · '+esc(p.name),'ท่าที่ '+(workout.index+1)+' จาก '+p.exerciseIds.length)}<div class="two-col"><div class="workout-stage"><div class="workout-emoji">${workout.phase==='rest'?'🌿':e.emoji}</div><div class="eyebrow">${workout.phase==='rest'?'REST & RESET':'KEEP MOVING'}</div><h2>${workout.phase==='rest'?'พักก่อนท่าถัดไป':esc(e.name)}</h2><div class="countdown">${String(Math.floor(workout.remaining/60)).padStart(2,'0')}:${String(workout.remaining%60).padStart(2,'0')}</div><p>${workout.phase==='rest'?'หายใจลึก ๆ เตรียมพร้อมสำหรับท่าถัดไป':esc(e.instructions)}</p><div class="progress"><span style="width:${pct}%"></span></div><div style="display:flex;gap:9px;justify-content:center;flex-wrap:wrap"><button class="btn" id="toggle-timer">${workout.running?'❚❚ หยุดชั่วคราว':'▶ เริ่ม / ทำต่อ'}</button><button class="btn secondary" id="skip">ข้าม →</button><button class="btn danger" id="finish">จบการฝึก</button></div></div><div class="panel"><h3>ลำดับท่า</h3><div class="list">${p.exerciseIds.map((id,i)=>{let x=exercises.find(z=>z.id===id);return `<div class="list-item" style="${i===workout.index?'border-color:#c6f36b':''}"><span>${x.emoji}</span><div class="grow"><strong>${x.name}</strong><small>${x.seconds} วินาที · ${x.muscle}</small></div><span class="meta">${i<workout.index?'✓':i+1}</span></div>`}).join('')}</div></div></div>`}
function modalHTML(){if(!modal)return '';if(modal.type==='exercise'){let e=exercises.find(x=>x.id===modal.id);return `<div class="modal-backdrop" data-close><div class="modal"><button class="close" data-close>×</button><div class="exercise-visual" style="height:170px"><span style="font-size:75px">${e.emoji}</span></div><div class="eyebrow" style="margin-top:16px">${e.muscle} · ${e.equipment}</div><h2>${e.name}</h2><p>${e.en} · ระดับ${e.level} · Tier ${e.tier}</p><h3>วิธีทำ</h3><p>${e.instructions}</p><p class="hint">เคลื่อนไหวอย่างควบคุม หยุดเมื่อรู้สึกเจ็บหรือเวียนศีรษะ</p><button class="btn" data-close>เข้าใจแล้ว</button></div></div>`}let p=allPlans().find(x=>String(x.id)===String(modal.id));if(!p)return '';return `<div class="modal-backdrop" data-close><div class="modal"><button class="close" data-close>×</button><span class="tag">${p.goal}</span><h2 style="margin-top:10px">${esc(p.name)}</h2><p>${esc(p.description||'โปรแกรมที่คุณสร้างเอง')}</p><p>${p.minutes||Math.ceil(p.exerciseIds.length*4)} นาที · ${p.exerciseIds.length} ท่า · ${p.level}</p><div class="list">${p.exerciseIds.map((id,i)=>{let e=exercises.find(x=>x.id===id);return `<div class="list-item"><span>${e.emoji}</span><div class="grow"><strong>${i+1}. ${e.name}</strong><small>${e.seconds} วินาที · ${e.muscle}</small></div></div>`}).join('')}</div><div style="display:flex;justify-content:space-between;margin-top:18px">${String(p.id).startsWith('custom')?`<button class="btn danger small" data-delete-plan="${p.id}">ลบโปรแกรม</button>`:'<span></span>'}<button class="btn" data-start="${p.id}">เริ่มฝึก →</button></div></div></div>`}
function render(){let content=({home,library,programs,builder,equipment,schedule,nutrition,member,settings,workout:workoutPage}[page]||home)();$('#app').innerHTML=layout(content);if(page==='library'&&window.equipmentFilter){document.querySelectorAll('.exercise').forEach(el=>{let e=exercises.find(x=>x.id===Number(el.dataset.exercise));if(window.equipmentFilter!=='ทั้งหมด'&&e.equipment!==window.equipmentFilter)el.style.display='none'})}}
let selected=[];
function updateSelected(){let box=$('#selected-exercises');if(!box)return;box.innerHTML=selected.length?selected.map((id,i)=>{let e=exercises.find(x=>x.id===id);return `<div class="list-item"><span>${e.emoji}</span><div class="grow"><strong>${i+1}. ${e.name}</strong><small>${e.muscle} · ${e.seconds} วินาที</small></div><button data-up="${i}" ${i===0?'disabled':''}>↑</button><button data-down="${i}" ${i===selected.length-1?'disabled':''}>↓</button><button data-remove="${i}">×</button></div>`}).join(''):'<div class="empty">เลือกท่าจากด้านซ้ายเพื่อเริ่มจัดโปรแกรม</div>';$('#selected-count').textContent=`${selected.length} ท่า`}
function speak(msg){if(!state.voice||!('speechSynthesis'in window))return;window.speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(msg);u.lang='th-TH';u.rate=.95;window.speechSynthesis.speak(u)}
function startWorkout(id){let plan=allPlans().find(x=>String(x.id)===String(id));if(!plan)return;clearInterval(timer);workout={plan,index:0,phase:'exercise',remaining:exercises.find(x=>x.id===plan.exerciseIds[0]).seconds,running:false,started:Date.now()};modal=null;go('workout');speak(`เริ่ม ${plan.name} ท่าแรก ${exercises.find(x=>x.id===plan.exerciseIds[0]).name}`)}
function nextStep(){if(!workout)return;let w=workout;if(w.phase==='exercise'&&w.index<w.plan.exerciseIds.length-1){w.phase='rest';w.remaining=state.rest;speak('พักสักครู่')}else if(w.phase==='rest'){w.phase='exercise';w.index++;let e=exercises.find(x=>x.id===w.plan.exerciseIds[w.index]);w.remaining=e.seconds;speak(`ท่าต่อไป ${e.name}`)}else{finishWorkout();return}render()}
function finishWorkout(){if(!workout)return;clearInterval(timer);let minutes=Math.max(1,Math.round((Date.now()-workout.started)/60000));state.sessions.push({id:Date.now(),date:today(),name:workout.plan.name,minutes});save();workout=null;go('schedule');notify('บันทึกการฝึกเรียบร้อยแล้ว 🎉')}
function toggleTimer(){if(!workout)return;workout.running=!workout.running;clearInterval(timer);if(workout.running)timer=setInterval(()=>{if(!workout||!workout.running)return;workout.remaining--;if(workout.remaining<=0)nextStep();else{let el=$('.countdown');if(el)el.textContent=`${String(Math.floor(workout.remaining/60)).padStart(2,'0')}:${String(workout.remaining%60).padStart(2,'0')}`}},1000);render()}
document.addEventListener('click',e=>{let t=e.target.closest('[data-go],[data-filter],[data-program-filter],[data-exercise],[data-detail-plan],[data-start],[data-close],[data-up],[data-down],[data-remove],[data-food],[data-remove-meal],[data-equip],[data-delete-plan],#add-exercise-btn,#save-plan,#save-member,#toggle-timer,#skip,#finish,#export');if(!t)return;if(t.dataset.go)go(t.dataset.go);else if(t.dataset.filter){filter=t.dataset.filter;render()}else if(t.dataset.programFilter){programFilter=t.dataset.programFilter;render()}else if(t.dataset.exercise){modal={type:'exercise',id:Number(t.dataset.exercise)};render()}else if(t.dataset.detailPlan){modal={type:'plan',id:t.dataset.detailPlan};render()}else if(t.dataset.start)startWorkout(t.dataset.start);else if(t.dataset.close!==undefined){if(t.classList.contains('modal-backdrop')&&e.target!==t)return;modal=null;render()}else if(t.id==='add-exercise-btn'){selected.push(Number($('#add-exercise').value));updateSelected()}else if(t.dataset.remove!==undefined){selected.splice(Number(t.dataset.remove),1);updateSelected()}else if(t.dataset.up!==undefined){let i=Number(t.dataset.up);[selected[i-1],selected[i]]=[selected[i],selected[i-1]];updateSelected()}else if(t.dataset.down!==undefined){let i=Number(t.dataset.down);[selected[i+1],selected[i]]=[selected[i],selected[i+1]];updateSelected()}else if(t.id==='save-plan'){let name=$('#plan-name').value.trim();if(!name)return notify('กรุณาตั้งชื่อโปรแกรม');if(!selected.length)return notify('กรุณาเลือกอย่างน้อย 1 ท่า');state.plans.push({id:'custom-'+Date.now(),name,goal:$('#plan-goal').value,level:$('#plan-level').value,minutes:Math.ceil(selected.reduce((n,id)=>n+exercises.find(e=>e.id===id).seconds+state.rest,0)/60),exerciseIds:[...selected]});save();selected=[];go('programs');notify('บันทึกโปรแกรมเรียบร้อยแล้ว')}else if(t.id==='save-member'){state.profile={displayName:$('#member-name').value.trim().slice(0,50),fitnessGoal:$('#member-goal').value,level:$('#member-level').value,weeklyTarget:Number($('#member-weekly').value)};save();render();notify('บันทึกข้อมูลสมาชิกเรียบร้อยแล้ว')}else if(t.id==='toggle-timer')toggleTimer();else if(t.id==='skip')nextStep();else if(t.id==='finish')finishWorkout();else if(t.dataset.food){let f=foods.find(x=>x.id===Number(t.dataset.food));state.meals.push({...f,logId:Date.now()+Math.random(),date:today()});save();render();notify(`เพิ่ม ${f.name} แล้ว`)}else if(t.dataset.removeMeal){state.meals=state.meals.filter(m=>String(m.logId)!==t.dataset.removeMeal);save();render()}else if(t.dataset.equip){let v=t.dataset.equip;state.equipment=state.equipment.includes(v)?state.equipment.filter(x=>x!==v):[...state.equipment,v];save();render()}else if(t.dataset.deletePlan){state.plans=state.plans.filter(p=>p.id!==t.dataset.deletePlan);save();modal=null;render();notify('ลบโปรแกรมแล้ว')}else if(t.id==='export'){let blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='vigor-data.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}});
document.addEventListener('input',e=>{if(e.target.id==='search'){query=e.target.value;let pos=e.target.selectionStart;render();let input=$('#search');input.focus();input.setSelectionRange(pos,pos)}else if(e.target.id==='cal-goal'){let n=Number(e.target.value);if(n>=500&&n<=6000){state.goal=n;save()}}});
document.addEventListener('change',e=>{if(e.target.id==='equipment-filter'){window.equipmentFilter=e.target.value;render()}else if(e.target.id==='voice'){state.voice=e.target.checked;save()}else if(e.target.id==='rest'){state.rest=Number(e.target.value);save()}});
window.addEventListener('hashchange',()=>{let next=(location.hash||'#home').slice(1);if(next!==page){page=next;render()}});
function registerWebMcp(){
  const context=document.modelContext;
  if(!context?.registerTool)return;
  try{
    void Promise.resolve(context.registerTool({
      name:'add_food_to_today',
      title:'บันทึกอาหารวันนี้',
      description:'เพิ่มอาหารหนึ่งรายการจากคลังอาหาร VIGOR ลงในบันทึกของวันนี้',
      inputSchema:{type:'object',properties:{foodId:{type:'integer',minimum:1,maximum:10}},required:['foodId'],additionalProperties:false},
      annotations:{readOnlyHint:false,untrustedContentHint:false},
      execute(input){
        const id=Number(input?.foodId);
        const food=foods.find(item=>item.id===id);
        if(!Number.isInteger(id)||!food)throw new Error('ไม่พบอาหารที่เลือก');
        state.meals.push({...food,logId:Date.now()+Math.random(),date:today()});
        save();render();
        return {name:food.name,calories:food.cal,date:today()};
      }
    })).catch(()=>{});
  }catch{}
}
if(signedIn){
  host.innerHTML='<div class="loading-screen">กำลังโหลดข้อมูลของคุณ…</div>';
  fetch('/api/state',{cache:'no-store'}).then(async response=>{
    if(!response.ok)throw new Error(`Load failed: ${response.status}`);
    const data=await response.json();
    state={...initial,...(data.state||{})};
    render();registerWebMcp();
  }).catch(()=>{host.innerHTML=`<div class="loading-screen">โหลดข้อมูลไม่สำเร็จ <button class="btn" onclick="location.reload()">ลองอีกครั้ง</button></div>`});
}else{render();registerWebMcp()}

// FastFit-inspired discovery, planning, and tracking surfaces.
const additionalPrograms=[
 {id:'quick7',name:'7 นาที กระชับทั่วตัว',goal:'ลดไขมัน',level:'เริ่มต้น',minutes:10,description:'วงจรน้ำหนักตัวสั้น ๆ สำหรับวันที่เวลาไม่มาก',exerciseIds:[5,1,7,8,3]},
 {id:'upper',name:'ส่วนบนที่บ้าน',goal:'เพิ่มกล้ามเนื้อ',level:'ปานกลาง',minutes:30,description:'อก หลัง ไหล่ และแขน ด้วยดัมเบลหรือทดแทนด้วยน้ำหนักตัว',exerciseIds:[2,9,10,12,3]},
 {id:'lower',name:'ขาและสะโพก',goal:'เพิ่มกล้ามเนื้อ',level:'ปานกลาง',minutes:30,description:'สควอต ลันจ์ และสะพานสะโพกเพื่อขาและก้นที่แข็งแรง',exerciseIds:[1,4,11,6,15]},
 {id:'mobility',name:'ปลุกตัว 10 นาที',goal:'ฟื้นฟู',level:'เริ่มต้น',minutes:10,description:'คลายหลัง สะโพก และไหล่ก่อนเริ่มวัน',exerciseIds:[14,13,3,6]},
 {id:'coreplus',name:'แกนกลางและคาร์ดิโอ',goal:'ความแข็งแรง',level:'ปานกลาง',minutes:22,description:'เพิ่มความอึดและความมั่นคงของแกนกลาง',exerciseIds:[3,8,7,15,5]},
 {id:'flow',name:'โยคะผ่อนคลาย',goal:'ฟื้นฟู',level:'เริ่มต้น',minutes:18,description:'การเคลื่อนไหวช้า ๆ เพื่อยืดและฟื้นฟูร่างกาย',exerciseIds:[13,14,3,16,6]}
];
builtins.push(...additionalPrograms);
const baseExerciseCard=exerciseCard;
exerciseCard=(e)=>baseExerciseCard(e).replace('</article>',`<button class="favorite-btn" data-favorite="${e.id}" aria-label="บันทึก ${esc(e.name)}">${state.favorites?.includes(e.id)?'★ บันทึกแล้ว':'☆ บันทึก'}</button></article>`);

function readyPlans(){
  const ready=state.ready||initial.ready;
  return allPlans().filter(p=>{
    const goalMatch=ready.goal==='ทั้งหมด'||p.goal===ready.goal;
    const timeMatch=!ready.minutes||p.minutes<=ready.minutes;
    const hasEquipment=p.exerciseIds.every(id=>{const ex=exercises.find(x=>x.id===id);return ready.equipment==='ทั้งหมด'||ready.equipment==='ไม่ใช้อุปกรณ์'?ex.equipment==='ไม่ใช้อุปกรณ์':ex.equipment==='ไม่ใช้อุปกรณ์'||state.equipment.includes(ex.equipment)});
    return goalMatch&&timeMatch&&hasEquipment;
  });
}
home=function(){
  const ready=state.ready||initial.ready, plans=readyPlans().slice(0,6);
  const pick=(kind,items,value)=>`<div class="ready-group"><strong>${kind}</strong><div class="chips">${items.map(item=>`<button class="chip ${value===item?'active':''}" data-ready-${kind==='เป้าหมาย'?'goal':kind==='อุปกรณ์'?'equipment':'time'}="${esc(String(item))}">${kind==='เวลา'?(item?`≤ ${item} นาที`:'ทุกช่วงเวลา'):item}</button>`).join('')}</div></div>`;
  return `${header('READY TO TRAIN','วันนี้อยากฝึกอะไร?','เลือกเป้าหมาย อุปกรณ์ และเวลาที่มี แล้วเริ่มโปรแกรมที่เหมาะกับคุณได้ทันที')}<section class="panel ready-panel">${pick('เป้าหมาย',['ทั้งหมด','ลดไขมัน','เพิ่มกล้ามเนื้อ','ความแข็งแรง','ฟื้นฟู'],ready.goal)}${pick('อุปกรณ์',['ทั้งหมด','ไม่ใช้อุปกรณ์','อุปกรณ์ของฉัน'],ready.equipment)}${pick('เวลา',[0,20,40,60],Number(ready.minutes)||0)}</section><section class="section"><div class="section-head"><div><h2>โปรแกรมพร้อมเริ่ม</h2><p>${plans.length?'กดดูรายละเอียดหรือเริ่มฝึกได้ทันที':'ยังไม่มีโปรแกรมที่ตรงกับตัวเลือก ลองปรับตัวกรองหรือให้ Smart Builder ช่วย'}</p></div><button class="btn small secondary" data-go="smart">ให้ Smart Builder จัดให้</button></div><div class="grid program-grid">${plans.length?plans.map(programCard).join(''):'<div class="empty">ไม่พบโปรแกรมที่ตรงกับตัวเลือก</div>'}</div></section><section class="section quick-links"><button class="panel link-panel" data-go="muscle"><span>◒</span><div><strong>เลือกจากกล้ามเนื้อ</strong><small>แตะส่วนที่อยากฝึกเพื่อดูท่า</small></div></button><button class="panel link-panel" data-go="equipment"><span>◈</span><div><strong>ยิมที่บ้าน</strong><small>ตั้งค่าอุปกรณ์ของคุณ</small></div></button><button class="panel link-panel" data-go="sets"><span>▤</span><div><strong>ชุดของฉัน</strong><small>บันทึกและเริ่มโปรแกรมส่วนตัว</small></div></button></section>`;
};
function muscle(){
  const groups=[['อกและแขน','💪','วิดพื้นและท่าดัน'],['หลัง','↩','ดึงและโรว์'],['ไหล่และแขน','◎','ไหล่และแขน'],['แกนกลาง','◉','หน้าท้องและลำตัว'],['ขาและสะโพก','◒','ขา ก้น และการทรงตัว'],['คาร์ดิโอ','⚡','เพิ่มชีพจร'],['ยืดเหยียด','↔','คลายความตึง']];
  return `${header('MUSCLE MAP','เลือกกล้ามเนื้อที่อยากฝึก','แตะกลุ่มกล้ามเนื้อเพื่อเปิดคลังท่าที่เกี่ยวข้อง')}<div class="muscle-map panel"><div class="body-silhouette" aria-hidden="true"><span class="body-head"></span><span class="body-chest"></span><span class="body-core"></span><span class="body-leg left"></span><span class="body-leg right"></span></div><div class="muscle-grid">${groups.map(([name,icon,copy])=>`<button class="muscle-card" data-muscle="${esc(name)}"><span>${icon}</span><strong>${name}</strong><small>${copy}</small></button>`).join('')}</div></div><p class="hint">แผนที่นี้เป็นตัวเลือกกล้ามเนื้อสำหรับค้นหาท่า ไม่ใช่คำแนะนำทางการแพทย์</p>`;
}
function sets(){
  const plans=[...state.plans];
  return `${header('MY SETS','ชุดออกกำลังกายของฉัน','สร้าง บันทึก และนำชุดของคุณกลับมาใช้ได้ทุกครั้ง')}<div class="toolbar"><p class="intro" style="margin:0">${plans.length?`คุณมี ${plans.length} ชุดที่บันทึกไว้`:'ยังไม่มีชุดส่วนตัว เริ่มจาก Smart Builder หรือสร้างเอง'}</p><div><button class="btn secondary" data-go="smart">จัดให้ฉัน</button> <button class="btn" data-go="builder">＋ สร้างชุดเอง</button></div></div><div class="grid program-grid">${plans.length?plans.map(programCard).join(''):'<div class="empty">ยังไม่มีชุดส่วนตัว</div>'}</div><section class="section"><div class="section-head"><div><h2>รายการโปรด</h2><p>ท่าที่คุณบันทึกไว้สำหรับสร้างชุดครั้งต่อไป</p></div></div><div class="grid exercise-grid">${(state.favorites||[]).map(id=>exercises.find(e=>e.id===id)).filter(Boolean).map(exerciseCard).join('')||'<div class="empty">ยังไม่มีท่าที่บันทึกไว้</div>'}</div></section>`;
}
let smartChoice={goal:'ลดไขมัน',focus:'ทั้งตัว',equipment:'ไม่ใช้อุปกรณ์',minutes:20,level:'เริ่มต้น'};
function smart(){
  const choice=(title,key,items)=>`<div class="smart-group"><strong>${title}</strong><div class="chips">${items.map(v=>`<button class="chip ${String(smartChoice[key])===String(v)?'active':''}" data-smart="${key}" data-value="${esc(String(v))}">${key==='minutes'?`${v} นาที`:v}</button>`).join('')}</div></div>`;
  return `${header('SMART BUILDER','ให้ VIGOR จัดโปรแกรมให้','เลือกเป้าหมาย กล้ามเนื้อ อุปกรณ์ เวลา และระดับ แล้วรับชุดฝึกพร้อมเริ่ม')}<section class="panel smart-panel">${choice('เป้าหมาย','goal',['ลดไขมัน','เพิ่มกล้ามเนื้อ','ความแข็งแรง','ฟื้นฟู'])}${choice('โฟกัส','focus',['ทั้งตัว','ส่วนบน','ส่วนล่าง','แกนกลาง'])}${choice('อุปกรณ์','equipment',['ไม่ใช้อุปกรณ์','อุปกรณ์ของฉัน','ทั้งหมด'])}${choice('เวลาที่มี','minutes',[15,30,45,60])}${choice('ระดับ','level',['เริ่มต้น','ปานกลาง','ขั้นสูง'])}<button class="btn" id="build-smart">✦ สร้างโปรแกรมของฉัน</button></section><section class="panel"><h3>หลักการจัดชุด</h3><div class="list"><div class="list-item"><span>1</span><div><strong>วอร์มอัป</strong><small>เริ่มด้วยการเคลื่อนไหวเบา ๆ</small></div></div><div class="list-item"><span>2</span><div><strong>ช่วงหลัก</strong><small>เลือกท่าตามเป้าหมายและอุปกรณ์</small></div></div><div class="list-item"><span>3</span><div><strong>คูลดาวน์</strong><small>จบด้วยการยืดเหยียดและหายใจ</small></div></div></div></section>`;
}
const baseSchedule=schedule;
schedule=function(){
  const now=new Date(), days=Array.from({length:7},(_,i)=>{const d=new Date(now);d.setDate(now.getDate()+i);return d});
  const selected=state.schedule||{};
  return `${header('WEEKLY PLAN','ตารางฝึกของฉัน','เลือกชุดหนึ่ง แล้ววางลงในวันที่ต้องการฝึก')}<div class="panel"><div class="field"><label>เลือกชุดที่จะวางในตาราง</label><select id="schedule-plan"><option value="">-- เลือกชุด --</option>${allPlans().map(p=>`<option value="${esc(p.id)}">${esc(p.name)} · ${p.minutes} นาที</option>`).join('')}</select></div><div class="week-grid">${days.map(d=>{const date=d.toLocaleDateString('en-CA'),plan=allPlans().find(p=>String(p.id)===String(selected[date]));return `<button class="week-day ${plan?'planned':''}" data-schedule-day="${date}"><small>${new Intl.DateTimeFormat('th-TH',{weekday:'short'}).format(d)}</small><strong>${d.getDate()}</strong><span>${plan?esc(plan.name):'วางแผนฝึก'}</span></button>`}).join('')}</div><p class="hint">เลือกชุดก่อน จากนั้นแตะวันที่เพื่อบันทึก หรือตั้งวันเดิมอีกครั้งเพื่อล้าง</p></div>${baseSchedule()}`;
};
const baseRender=render;
render=function(){
  const pages={home,library,programs,builder,equipment,schedule,nutrition,member,settings,workout:workoutPage,muscle,sets,smart};
  const isEquipment=page==='equipment'||page.startsWith('equipment/');
  const slug=page.startsWith('equipment/')?page.slice(10):'';
  if(isEquipment&&gymView.slug!==slug)Object.assign(gymView,{slug,search:'',muscle:'ทั้งหมด',level:'ทั้งหมด',picked:[]});
  const content=isEquipment?renderEquipment({esc,exercises,owned:state.equipment,...gymView},slug):(pages[page]||home)();
  $('#app').innerHTML=layout(content);
  document.querySelector('.mobile-nav')?.insertAdjacentHTML('beforeend',`<button data-go="equipment" class="${isEquipment?'active':''}"><span>◈</span>โฮมยิม</button>`);
  if(page==='library'&&window.equipmentFilter){document.querySelectorAll('.exercise').forEach(el=>{let e=exercises.find(x=>x.id===Number(el.dataset.exercise));if(window.equipmentFilter!=='ทั้งหมด'&&e.equipment!==window.equipmentFilter)el.style.display='none'})}
};
document.addEventListener('click',event=>{
  const target=event.target.closest('[data-ready-goal],[data-ready-equipment],[data-ready-time],[data-muscle],[data-favorite],[data-smart],[data-schedule-day],#build-smart');
  if(!target)return;
  if(target.dataset.readyGoal!==undefined){state.ready={...(state.ready||initial.ready),goal:target.dataset.readyGoal};save();render();}
  else if(target.dataset.readyEquipment!==undefined){const value=target.dataset.readyEquipment;state.ready={...(state.ready||initial.ready),equipment:value==='อุปกรณ์ของฉัน'?'อุปกรณ์ของฉัน':value};save();render();}
  else if(target.dataset.readyTime!==undefined){state.ready={...(state.ready||initial.ready),minutes:Number(target.dataset.readyTime)};save();render();}
  else if(target.dataset.muscle){filter=target.dataset.muscle;go('library');}
  else if(target.dataset.favorite){const id=Number(target.dataset.favorite),favorites=state.favorites||[];state.favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];save();render();notify(favorites.includes(id)?'ลบออกจากรายการโปรดแล้ว':'บันทึกท่าไว้แล้ว');}
  else if(target.dataset.smart){smartChoice={...smartChoice,[target.dataset.smart]:target.dataset.smart==='minutes'?Number(target.dataset.value):target.dataset.value};render();}
  else if(target.id==='build-smart'){
    const focus={ 'ทั้งตัว':()=>true,'ส่วนบน':e=>['อกและแขน','หลัง','ไหล่และแขน','แขน'].includes(e.muscle),'ส่วนล่าง':e=>e.muscle==='ขาและสะโพก','แกนกลาง':e=>e.muscle==='แกนกลาง'}[smartChoice.focus]||(()=>true);
    const allowed=exercises.filter(e=>focus(e)&&(smartChoice.equipment==='ทั้งหมด'||smartChoice.equipment==='ไม่ใช้อุปกรณ์'?e.equipment==='ไม่ใช้อุปกรณ์':e.equipment==='ไม่ใช้อุปกรณ์'||state.equipment.includes(e.equipment)));
    const count=Math.max(4,Math.min(allowed.length,Math.round(Number(smartChoice.minutes)/5)));
    const ids=allowed.slice(0,count).map(e=>e.id); if(!ids.length)return notify('ตั้งค่าอุปกรณ์ก่อน หรือเลือกไม่ใช้อุปกรณ์');
    const plan={id:'smart-'+Date.now(),name:`Smart ${smartChoice.goal} · ${smartChoice.focus}`,goal:smartChoice.goal,level:smartChoice.level,minutes:Number(smartChoice.minutes),description:'สร้างโดย Smart Builder พร้อมช่วงวอร์มอัปและคูลดาวน์',exerciseIds:ids};
    state.plans.push(plan);save();modal={type:'plan',id:plan.id};page='sets';location.hash='sets';render();notify('สร้างและบันทึกชุดของคุณแล้ว');
  }else if(target.dataset.scheduleDay){const select=$('#schedule-plan'),id=select?.value,date=target.dataset.scheduleDay;if(!id)return notify('เลือกชุดก่อน');state.schedule={...(state.schedule||{})};state.schedule[date]=String(state.schedule[date])===String(id)?undefined:id;save();render();notify(state.schedule[date]?'วางแผนฝึกแล้ว':'ลบจากตารางแล้ว');}
});
render();

// Complete the remaining product surfaces with useful starter content.
const completeTemplates=[
 {id:'yoga-beginner',name:'โยคะสำหรับมือใหม่',goal:'ฟื้นฟู',level:'เริ่มต้น',minutes:20,description:'ยืดหลัง สะโพก และไหล่ด้วยลำดับที่ค่อยเป็นค่อยไป',exerciseIds:[13,14,126,127,16]},
 {id:'aerobic-low',name:'แอโรบิคแรงกระแทกต่ำ',goal:'ลดไขมัน',level:'เริ่มต้น',minutes:25,description:'ขยับต่อเนื่องโดยไม่ต้องกระโดด เหมาะกับวันที่อยากเคลื่อนไหวเบา ๆ',exerciseIds:[5,15,7,8,6]},
 {id:'dumbbell20',name:'ดัมเบลฟูลบอดี้ 20 นาที',goal:'เพิ่มกล้ามเนื้อ',level:'เริ่มต้น',minutes:20,description:'สควอต ดัน ดึง และพับสะโพกด้วยดัมเบลหนึ่งคู่',exerciseIds:[11,102,9,104,103]},
 {id:'desk-relief',name:'คลายหลังคนทำงานโต๊ะ',goal:'ฟื้นฟู',level:'เริ่มต้น',minutes:14,description:'เปิดอก คลายหลังส่วนบนและสะโพกหลังนั่งนาน',exerciseIds:[14,13,126,127,6]},
 {id:'strength-5',name:'Strength 5 × 5 ฉบับบ้าน',goal:'ความแข็งแรง',level:'ปานกลาง',minutes:35,description:'ฝึกท่าหลักด้วยจังหวะช้าและพักเต็มเพื่อสร้างพื้นฐานแรง',exerciseIds:[1,2,104,9,3]}
];
builtins.push(...completeTemplates);
let completeProgramSort='แนะนำ';
const previousPrograms=programs;
programs=function(){
 const all=allPlans(),goals=['ทั้งหมด',...new Set(all.map(p=>p.goal))],levels=['ทั้งหมด',...new Set(all.map(p=>p.level))];
 let plans=all.filter(p=>programFilter==='ทั้งหมด'||p.goal===programFilter);
 if(completeProgramSort==='สั้น → ยาว')plans=plans.slice().sort((a,b)=>(a.minutes||0)-(b.minutes||0));
 if(completeProgramSort==='ยาว → สั้น')plans=plans.slice().sort((a,b)=>(b.minutes||0)-(a.minutes||0));
 if(completeProgramSort==='ง่าย → ยาก')plans=plans.slice().sort((a,b)=>['เริ่มต้น','ปานกลาง','ขั้นสูง'].indexOf(a.level)-['เริ่มต้น','ปานกลาง','ขั้นสูง'].indexOf(b.level));
 return `${header('READY-MADE WORKOUTS','โปรแกรมพร้อมฝึก','เลือกเป้าหมาย เวลา และระดับ แล้วกดเริ่มได้ทันที')}<div class="program-overview"><div class="panel"><strong>${all.length}</strong><span>โปรแกรมพร้อมฝึก</span></div><div class="panel"><strong>${goals.length-1}</strong><span>เป้าหมาย</span></div><div class="panel"><strong>${levels.length-1}</strong><span>ระดับ</span></div></div><div class="toolbar program-filters"><div class="chips">${goals.map(g=>`<button class="chip ${programFilter===g?'active':''}" data-program-filter="${esc(g)}">${esc(g)}</button>`).join('')}</div><select id="program-sort" data-program-sort><option>แนะนำ</option><option>สั้น → ยาว</option><option>ยาว → สั้น</option><option>ง่าย → ยาก</option></select><button class="btn" data-go="builder">＋ สร้างชุดเอง</button></div><div class="section-head"><h2>แสดง ${plans.length} โปรแกรม</h2><span class="muted">กด “ดู” เพื่อเช็กลำดับท่า หรือ “เริ่ม” เพื่อเปิดตัวเล่น</span></div><div class="grid program-grid">${plans.map(programCard).join('')}</div>`;
};
const previousSets=sets;
sets=function(){
 const mine=state.plans||[],recommended=allPlans().filter(p=>!mine.some(x=>String(x.id)===String(p.id))).slice(0,8);
 return `${header('MY SETS','ชุดฝึกของฉัน','จัดระเบียบชุดฝึก ปักหมุดท่าโปรด และเริ่มฝึกพร้อมตัวจับเวลา')}<div class="set-actions"><button class="btn" data-go="builder">＋ สร้างชุดฝึก</button><button class="btn secondary" data-go="smart">✦ สร้างอัตโนมัติ</button><button class="btn ghost" data-go="programs">เลือกจากโปรแกรม</button></div><section class="panel set-steps"><div><b>1</b><strong>ตั้งชื่อและเป้าหมาย</strong><small>เลือกให้เหมาะกับวันที่จะฝึก</small></div><div><b>2</b><strong>เลือกท่า</strong><small>จากคลังท่าหรืออุปกรณ์</small></div><div><b>3</b><strong>จัดลำดับ</strong><small>ตั้งเวลาพักและเล่นตามลำดับ</small></div><div><b>4</b><strong>บันทึกและเริ่ม</strong><small>เพิ่มลงตารางได้ทันที</small></div></section><section class="section"><div class="section-head"><div><h2>ของฉัน <span class="muted">${mine.length}</span></h2><p>${mine.length?'ชุดที่คุณสร้างและบันทึกไว้':'เริ่มได้จากโปรแกรมแนะนำ แล้วปรับเป็นชุดของคุณเอง'}</p></div></div><div class="grid program-grid">${mine.length?mine.map(programCard).join(''):'<div class="empty set-empty"><strong>ยังไม่มีชุดฝึกส่วนตัว</strong><p>เลือกโปรแกรมแนะนำด้านล่าง หรือสร้างชุดฝึกของคุณเอง</p><button class="btn" data-go="programs">ดูโปรแกรมแนะนำ</button></div>'}</div></section><section class="section"><div class="section-head"><div><h2>โปรแกรมแนะนำ <span class="muted">${recommended.length}</span></h2><p>ชุดเริ่มต้นที่มีข้อมูลพร้อมให้ดูและเริ่ม</p></div><button class="text-link" data-go="programs">ดูทั้งหมด →</button></div><div class="grid program-grid">${recommended.map(programCard).join('')}</div></section><section class="section"><div class="section-head"><h2>ท่าโปรด</h2><span class="muted">${(state.favorites||[]).length} ท่า</span></div><div class="grid exercise-grid">${(state.favorites||[]).map(id=>exercises.find(x=>x.id===id)).filter(Boolean).map(exerciseCard).join('')||'<div class="empty">กด ☆ บันทึกบนการ์ดท่าที่คุณชอบ</div>'}</div></section>`;
};
const previousBuilder=builder;
builder=function(){
 return `${header('BUILD YOUR OWN','สร้างชุดฝึก','ทำตาม 4 ขั้นตอน แล้วบันทึกชุดที่เข้ากับคุณ')}<section class="panel builder-progress"><div class="current"><b>1</b><span>รายละเอียด</span></div><div><b>2</b><span>เลือกท่า</span></div><div><b>3</b><span>จัดลำดับ</span></div><div><b>4</b><span>บันทึก</span></div></section><div class="template-strip"><strong>เริ่มเร็วด้วยชุดตัวอย่าง</strong><div class="chips">${completeTemplates.slice(0,4).map(p=>`<button class="chip" data-builder-template="${p.id}">${esc(p.name)}</button>`).join('')}</div></div>${previousBuilder()}`;
};
const previousWorkoutPage=workoutPage;
workoutPage=function(){
 if(workout)return previousWorkoutPage();
 return `${header('WORKOUT PLAYER','พร้อมเริ่มฝึก','เลือกโปรแกรม แล้วทำตามตัวจับเวลาและคำแนะนำทีละท่า')}<section class="panel player-intro"><div class="player-intro-icon">▶</div><div><h2>ตัวเล่น VIGOR</h2><p>มีช่วงฝึก พัก และความคืบหน้าชัดเจนในหน้าเดียว เปิดโค้ชเสียงได้จากตั้งค่า</p><div class="chips"><span class="chip active">จับเวลาทุกท่า</span><span class="chip">พักระหว่างท่า</span><span class="chip">บันทึกประวัติอัตโนมัติ</span></div></div></section><section class="section"><div class="section-head"><div><h2>เลือกโปรแกรมที่จะเริ่ม</h2><p>แนะนำสำหรับคุณวันนี้</p></div><button class="text-link" data-go="programs">ดูโปรแกรมทั้งหมด →</button></div><div class="grid program-grid">${allPlans().slice(0,4).map(programCard).join('')}</div></section><section class="panel player-help"><h3>วิธีใช้ตัวเล่น</h3><div class="list"><div class="list-item"><span>1</span><div class="grow"><strong>เริ่ม / ทำต่อ</strong><small>ตัวจับเวลาจะนับถอยหลังและแจ้งท่าถัดไป</small></div></div><div class="list-item"><span>2</span><div class="grow"><strong>ข้าม</strong><small>ข้ามท่าหรือช่วงพักได้ตามสภาพร่างกาย</small></div></div><div class="list-item"><span>3</span><div class="grow"><strong>จบการฝึก</strong><small>บันทึกครั้งฝึกและเวลาลงในตารางโดยอัตโนมัติ</small></div></div></div></section>`;
};
const previousSchedule=schedule;
schedule=function(){
 const target=(state.profile||initial.profile).weeklyTarget||3;
 const doneThisWeek=state.sessions.filter(s=>Date.now()-new Date(s.date).getTime()<7*864e5).length;
 const minutesThisWeek=state.sessions.filter(s=>Date.now()-new Date(s.date).getTime()<7*864e5).reduce((n,s)=>n+s.minutes,0);
 return `${header('WEEKLY PLAN','ตารางฝึกของฉัน','วางแผนล่วงหน้า ติดตามสตรีค และเห็นวันที่คุณลงมือทำ')}<div class="schedule-stats"><div class="stat"><div class="stat-icon">◷</div><div class="value">${doneThisWeek}/${target}</div><div class="label">เป้าหมายสัปดาห์นี้</div></div><div class="stat"><div class="stat-icon">⚡</div><div class="value">${minutesThisWeek}</div><div class="label">นาทีในสัปดาห์นี้</div></div><div class="stat"><div class="stat-icon">✓</div><div class="value">${state.sessions.length}</div><div class="label">ฝึกทั้งหมด</div></div></div>${previousSchedule()}<section class="section"><div class="section-head"><div><h2>ชุดฝึกที่แนะนำสำหรับสัปดาห์นี้</h2><p>เริ่มจากวันไหนก็ได้ แล้ววางลงในตารางด้านบน</p></div></div><div class="grid program-grid schedule-recommendations">${allPlans().slice(0,4).map(programCard).join('')}</div></section>`;
};
const previousLibrary=library;
library=function(){
 const result=previousLibrary();
 const counts=[['ทั้งหมด',exercises.length],['เริ่มต้น',exercises.filter(x=>x.level==='เริ่มต้น').length],['ปานกลาง',exercises.filter(x=>x.level==='ปานกลาง').length],['ดัมเบล',exercises.filter(x=>x.equipment==='ดัมเบล').length],['ไม่ใช้อุปกรณ์',exercises.filter(x=>x.equipment==='ไม่ใช้อุปกรณ์').length]];
 return `${header('EXERCISE LIBRARY','คลังท่าออกกำลังกาย','ค้นหาท่า กรองตามกล้ามเนื้อ อุปกรณ์ และระดับ แล้วกดดูวิธีฝึก')}<div class="library-summary">${counts.map(([label,count])=>`<div class="panel"><strong>${count}</strong><span>${label} ${label==='ทั้งหมด'?'ท่า':'ท่า'}</span></div>`).join('')}</div>${result.replace(/^.*?<div class="toolbar"/, '<div class="toolbar"')}`;
};
const previousSettings=settings;
settings=function(){return `${previousSettings()}<section class="section settings-guide"><div class="section-head"><div><h2>คู่มือเริ่มต้น</h2><p>ตั้งค่าเหล่านี้ก่อนเริ่ม เพื่อให้ตัวเล่นเข้ากับคุณ</p></div></div><div class="grid program-grid"><div class="panel"><span class="stat-icon">◷</span><h3>เลือกเวลาพัก</h3><p class="muted">พัก 10–45 วินาทีตามความหนักของท่า แล้วค่อยเพิ่มเมื่อเริ่มชิน</p></div><div class="panel"><span class="stat-icon">🔊</span><h3>เปิดโค้ชเสียง</h3><p class="muted">ให้ VIGOR อ่านชื่อท่าและแจ้งการเปลี่ยนช่วงฝึกผ่านเสียงของอุปกรณ์</p></div><div class="panel"><span class="stat-icon">☁</span><h3>เข้าสู่ระบบสมาชิก</h3><p class="muted">เก็บโปรแกรม ประวัติ และเป้าหมายข้ามอุปกรณ์ด้วยบัญชี ChatGPT</p><button class="btn small secondary" data-go="member">เปิดหน้าสมาชิก</button></div></div></section>`};

document.addEventListener('click',event=>{
 const target=event.target.closest('[data-builder-template]');
 if(!target)return;
 if(target.dataset.builderTemplate){
  const plan=allPlans().find(p=>String(p.id)===String(target.dataset.builderTemplate));
   if(plan){selected=[...plan.exerciseIds];render();updateSelected();notify(`เลือก ${plan.name} แล้ว ปรับลำดับท่าได้เลย`);}
  }
 });
document.addEventListener('change',event=>{if(event.target.id==='program-sort'){completeProgramSort=event.target.value;render();}});
render();

// Complete FastFit food catalogue: search, 17 categories, subcategories and paging.
const foodView={category:'',sub:'',query:'',sort:'popular',limit:60};
nutrition=function(){
 const meals=state.meals.filter(meal=>meal.date===today());
 return renderFoodLibrary({esc,header,meals,goal:state.goal},foodView);
};
document.addEventListener('click',event=>{
 const category=event.target.closest('[data-ff-category]');
 if(category){foodView.category=category.dataset.ffCategory;foodView.sub='';foodView.limit=60;render();return;}
 if(event.target.closest('[data-ff-more]')){foodView.limit+=60;render();}
});
document.addEventListener('input',event=>{
 if(event.target.id!=='ff-food-search')return;
 foodView.query=event.target.value;foodView.limit=60;render();
 const input=$('#ff-food-search');input?.focus();input?.setSelectionRange(foodView.query.length,foodView.query.length);
});
document.addEventListener('change',event=>{
 if(event.target.id==='ff-food-sub'){foodView.sub=event.target.value;foodView.limit=60;render();}
 if(event.target.id==='ff-food-sort'){foodView.sort=event.target.value;foodView.limit=60;render();}
});
document.addEventListener('click',event=>{
  const target=event.target.closest('[data-gym-own],[data-gym-muscle],[data-gym-scroll],[data-gym-build]');
  if(!target)return;
  if(target.hasAttribute('data-gym-scroll')){event.preventDefault();$('#gym-exercises')?.scrollIntoView({behavior:'smooth'});return;}
  if(target.dataset.gymOwn){
    const item=equipmentCatalog.find(x=>x.slug===target.dataset.gymOwn);if(!item)return;
    const owns=state.equipment.includes(item.name);
    state.equipment=owns?state.equipment.filter(x=>x!==item.name):[...state.equipment,item.name];
    save();render();notify(owns?'นำออกจากอุปกรณ์ของฉันแล้ว':'เพิ่มในอุปกรณ์ของฉันแล้ว');
  }else if(target.dataset.gymMuscle){gymView.muscle=target.dataset.gymMuscle;render();$('#gym-exercises')?.scrollIntoView({behavior:'smooth'});}
  else if(target.dataset.gymBuild){
    const item=equipmentCatalog.find(x=>x.slug===target.dataset.gymBuild);if(!item)return;
    const ids=gymView.picked.filter(id=>exercises.some(x=>x.id===id&&(item.code==='mat'?x.equipment===item.name:x.equipmentCodes?.includes(item.code))));
    if(!ids.length)return;
    const seconds=ids.reduce((n,id)=>n+exercises.find(x=>x.id===id).seconds,0)+Math.max(0,ids.length-1)*Number(state.rest);
    const plan={id:'custom-'+crypto.randomUUID(),name:`ชุดฝึก${item.name}`,goal:'ฟิตทั่วไป',level:'เริ่มต้น',minutes:Math.ceil(seconds/60),description:`${ids.length} ท่า · ฝึก 1 รอบ · พัก ${state.rest} วินาทีระหว่างท่า`,exerciseIds:ids};
    state.plans.push(plan);save();gymView.picked=[];modal={type:'plan',id:plan.id};go('sets');notify('บันทึกชุดฝึกแล้ว กดเริ่มเพื่อฝึกตามลำดับ');
  }
});
document.addEventListener('input',event=>{
  if(event.target.id!=='gym-search')return;
  gymView.search=event.target.value;render();const input=$('#gym-search');input?.focus();
});
document.addEventListener('change',event=>{
  if(event.target.matches('[data-gym-pick]')){
    const id=Number(event.target.dataset.gymPick);
    gymView.picked=event.target.checked?[...new Set([...gymView.picked,id])]:gymView.picked.filter(x=>x!==id);
    render();$(`[data-gym-pick="${id}"]`)?.focus();
  }else if(event.target.id==='gym-level'){gymView.level=event.target.value;render();}
});
render();

// Full exercise library: training styles, detailed muscles, tiers, sorting and views.
exercises.push(...fastfitExercises);
let libraryView={type:'ทั้งหมด',muscle:'ทั้งหมด',tier:'ทั้งหมด',equipment:'ทั้งหมด',level:'ทั้งหมด',sort:'ยอดนิยม',mode:'cards',owned:false,limit:36};
const tierRank={S:5,A:4,B:3,C:2,D:1};
const levelRank={'เริ่มต้น':1,'พื้นฐาน':2,'ปานกลาง':3,'ขั้นสูง':4,'เชี่ยวชาญ':5};
const levelDots=level=>Array.from({length:5},(_,index)=>`<i class="${index<(levelRank[level]||1)?'on':''}"></i>`).join('');
const resetLibraryLimit=()=>{libraryView.limit=36};
function libraryCard(exercise){
 const favorite=(state.favorites||[]).includes(exercise.id);
 return `<article class="library-card"><button class="library-card-visual" data-exercise="${exercise.id}" aria-label="ดูวิธีฝึก ${esc(exercise.name)}"><span class="library-level"><span class="difficulty-dots">${levelDots(exercise.level)}</span>${esc(exercise.level)}</span><span class="library-emoji" aria-hidden="true">${exercise.emoji}</span><span class="library-tier tier-${exercise.tier}">TIER ${exercise.tier}</span></button><button class="library-add ${favorite?'saved':''}" data-favorite="${exercise.id}" aria-label="${favorite?'นำออกจากรายการโปรด':'บันทึกท่า'}">${favorite?'✓':'＋'}</button><div class="library-card-body"><h3>${esc(exercise.name)}</h3><p>${esc(exercise.en)}</p><div class="library-card-meta"><span>${esc(exercise.primaryMuscle)}</span><span>•</span><span>${esc(exercise.equipment)}</span></div></div></article>`;
}
function libraryListRow(exercise){
 const favorite=(state.favorites||[]).includes(exercise.id);
 return `<article class="library-list-row"><button class="library-list-icon" data-exercise="${exercise.id}" aria-label="ดูวิธีฝึก ${esc(exercise.name)}">${exercise.emoji}</button><div class="grow"><h3>${esc(exercise.name)}</h3><p>${esc(exercise.en)} · ${esc(exercise.type)}</p></div><span class="library-list-muscle">${esc(exercise.primaryMuscle)}</span><span class="library-list-equipment">${esc(exercise.equipment)}</span><span class="library-tier tier-${exercise.tier}">TIER ${exercise.tier}</span><span class="difficulty-dots">${levelDots(exercise.level)}</span><button class="library-add ${favorite?'saved':''}" data-favorite="${exercise.id}" aria-label="${favorite?'นำออกจากรายการโปรด':'บันทึกท่า'}">${favorite?'✓':'＋'}</button></article>`;
}
library=function(){
 const search=query.trim().toLocaleLowerCase('th');
 const catalogue=fastfitExercises;
 const equipmentOptions=['ทั้งหมด',...new Set(catalogue.map(exercise=>exercise.equipment))];
 let results=catalogue.filter(exercise=>
  (libraryView.type==='ทั้งหมด'||exercise.type===libraryView.type)&&
  (libraryView.muscle==='ทั้งหมด'||exercise.primaryMuscle===libraryView.muscle)&&
  (libraryView.tier==='ทั้งหมด'||exercise.tier===libraryView.tier)&&
  (libraryView.equipment==='ทั้งหมด'||exercise.equipment===libraryView.equipment)&&
  (libraryView.level==='ทั้งหมด'||exercise.level===libraryView.level)&&
  (!libraryView.owned||exercise.equipment==='ไม่ใช้อุปกรณ์'||state.equipment.includes(exercise.equipment))&&
  (!search||`${exercise.name} ${exercise.en} ${exercise.primaryMuscle} ${exercise.equipment} ${exercise.type}`.toLocaleLowerCase('th').includes(search))
 );
 if(libraryView.sort==='Tier สูงสุด')results.sort((a,b)=>tierRank[b.tier]-tierRank[a.tier]||b.popularity-a.popularity);
 else if(libraryView.sort==='ง่ายก่อน')results.sort((a,b)=>(levelRank[a.level]||1)-(levelRank[b.level]||1)||tierRank[b.tier]-tierRank[a.tier]);
 else if(libraryView.sort==='ชื่อ ก–ฮ')results.sort((a,b)=>a.name.localeCompare(b.name,'th'));
 else if(libraryView.sort==='เพิ่มล่าสุด')results.sort((a,b)=>b.id-a.id);
 else results.sort((a,b)=>b.popularity-a.popularity);
 const shown=results.slice(0,libraryView.limit);
 const types=libraryTypeMeta.map(([type,icon])=>({type,icon,count:type==='ทั้งหมด'?catalogue.length:catalogue.filter(exercise=>exercise.type===type).length}));
 const muscles=libraryMuscleOrder.map(muscle=>({muscle,count:muscle==='ทั้งหมด'?catalogue.length:catalogue.filter(exercise=>exercise.primaryMuscle===muscle).length})).filter(item=>item.count>0);
 return `${header('EXERCISE LIBRARY','คลังท่า','รวมท่าเวท โยคะ แอโรบิก คาร์ดิโอ และยืดเหยียด พร้อมวิธีฝึกและตัวกรองละเอียด')}<section class="library-type-grid">${types.map(item=>`<button class="library-type ${libraryView.type===item.type?'active':''}" data-library-type="${esc(item.type)}"><span>${item.icon}</span><div><strong>${esc(item.type)}</strong><small>${item.count.toLocaleString('th-TH')} ท่า</small></div></button>`).join('')}</section><section class="library-controls"><div class="library-search-row"><label class="library-search"><span>⌕</span><input id="search" type="search" placeholder="ค้นหาท่า กล้ามเนื้อ หรืออุปกรณ์..." value="${esc(query)}"></label><label class="library-equipment"><span>อุปกรณ์</span><select id="library-equipment">${equipmentOptions.map(value=>`<option ${libraryView.equipment===value?'selected':''}>${esc(value)}</option>`).join('')}</select></label><button class="owned-toggle ${libraryView.owned?'active':''}" data-library-owned aria-pressed="${libraryView.owned}"><span>${libraryView.owned?'✓':'○'}</span> อุปกรณ์ของฉัน</button></div><div class="library-muscles" aria-label="กรองตามกล้ามเนื้อ">${muscles.map(item=>`<button class="chip ${libraryView.muscle===item.muscle?'active':''}" data-library-muscle="${esc(item.muscle)}">${esc(item.muscle)} <span>${item.count}</span></button>`).join('')}</div><div class="library-filter-row"><div class="library-tier-filter"><strong>Tier</strong>${['ทั้งหมด','S','A','B','C','D'].map(value=>`<button class="tier-filter ${libraryView.tier===value?'active':''} ${value!=='ทั้งหมด'?`tier-${value}`:''}" data-library-tier="${value}">${value==='ทั้งหมด'?'ทุกระดับ':value}</button>`).join('')}</div><label>ความยาก<select id="library-level">${['ทั้งหมด','เริ่มต้น','พื้นฐาน','ปานกลาง','ขั้นสูง','เชี่ยวชาญ'].map(value=>`<option ${libraryView.level===value?'selected':''}>${value}</option>`).join('')}</select></label><details class="tier-help"><summary>Tier คืออะไร?</summary><div><b>S</b> ตัวเลือกเด่น · <b>A</b> ดีมาก · <b>B</b> ดี · <b>C</b> ทางเลือก · <b>D</b> เสริม<br><small>Tier เปรียบเทียบความคุ้มค่าของท่าในกลุ่มเดียวกัน ไม่ใช่ระดับความยาก</small></div></details></div></section><section class="library-results"><div class="library-results-head"><div><strong>พบ ${results.length.toLocaleString('th-TH')} ท่า</strong><span>${libraryView.type==='ทั้งหมด'?'ทุกประเภท':esc(libraryView.type)}${libraryView.muscle!=='ทั้งหมด'?` · ${esc(libraryView.muscle)}`:''}</span></div><div class="library-view-tools"><select id="library-sort">${['ยอดนิยม','Tier สูงสุด','ง่ายก่อน','ชื่อ ก–ฮ','เพิ่มล่าสุด'].map(value=>`<option ${libraryView.sort===value?'selected':''}>${value}</option>`).join('')}</select><div class="view-switch"><button data-library-mode="cards" class="${libraryView.mode==='cards'?'active':''}" aria-label="มุมมองการ์ด">▦ การ์ด</button><button data-library-mode="list" class="${libraryView.mode==='list'?'active':''}" aria-label="มุมมองรายการ">☷ รายการ</button></div></div></div>${shown.length?libraryView.mode==='cards'?`<div class="library-exercise-grid">${shown.map(libraryCard).join('')}</div>`:`<div class="library-list">${shown.map(libraryListRow).join('')}</div>`:`<div class="empty library-empty"><strong>ไม่พบท่าที่ตรงกับตัวกรอง</strong><p>ลองลบคำค้น หรือเปลี่ยนกล้ามเนื้อ อุปกรณ์ และ Tier</p><button class="btn" data-library-clear>ล้างตัวกรอง</button></div>`}${results.length>shown.length?`<div class="library-load"><button class="btn secondary" data-library-more>โหลดเพิ่มอีก ${Math.min(36,results.length-shown.length)} ท่า</button><small>แสดง ${shown.length} จาก ${results.length} ท่า</small></div>`:''}</section>`;
};
document.addEventListener('click',event=>{
 const target=event.target.closest('[data-library-type],[data-library-muscle],[data-library-tier],[data-library-mode],[data-library-owned],[data-library-more],[data-library-clear]');
 if(!target)return;
 if(target.dataset.libraryType!==undefined){libraryView.type=target.dataset.libraryType;resetLibraryLimit();}
 else if(target.dataset.libraryMuscle!==undefined){libraryView.muscle=target.dataset.libraryMuscle;resetLibraryLimit();}
 else if(target.dataset.libraryTier!==undefined){libraryView.tier=target.dataset.libraryTier;resetLibraryLimit();}
 else if(target.dataset.libraryMode!==undefined){libraryView.mode=target.dataset.libraryMode;}
 else if(target.hasAttribute('data-library-owned')){libraryView.owned=!libraryView.owned;resetLibraryLimit();}
 else if(target.hasAttribute('data-library-more')){libraryView.limit+=36;}
 else if(target.hasAttribute('data-library-clear')){libraryView={type:'ทั้งหมด',muscle:'ทั้งหมด',tier:'ทั้งหมด',equipment:'ทั้งหมด',level:'ทั้งหมด',sort:'ยอดนิยม',mode:libraryView.mode,owned:false,limit:36};query='';}
 render();
});
document.addEventListener('change',event=>{
 if(event.target.id==='library-equipment'){libraryView.equipment=event.target.value;resetLibraryLimit();render();}
 else if(event.target.id==='library-level'){libraryView.level=event.target.value;resetLibraryLimit();render();}
 else if(event.target.id==='library-sort'){libraryView.sort=event.target.value;render();}
});
const originalModalHTML=modalHTML;
modalHTML=function(){
 if(modal?.type!=='exercise')return originalModalHTML();
 const exercise=exercises.find(item=>item.id===modal.id);
 if(!exercise?.sourceId)return originalModalHTML();
 const target=exercise.reps?`${exercise.reps} ครั้ง`:exercise.time?`${exercise.time} วินาที`:`${exercise.seconds} วินาที`;
 return `<div class="modal-backdrop" data-close><div class="modal" role="dialog" aria-modal="true" aria-label="${esc(exercise.name)}"><button class="close" data-close aria-label="ปิด">×</button><div class="exercise-visual" style="height:150px"><span style="font-size:68px">${exercise.emoji}</span></div><div class="eyebrow" style="margin-top:16px">${esc(exercise.type)} · ${esc(exercise.primaryMuscle)}</div><h2>${esc(exercise.name)}</h2><p>${esc(exercise.en)} · ${esc(exercise.equipment)} · ${esc(exercise.level)} · Tier ${esc(exercise.tier)}</p><div class="library-detail-stats"><div><strong>${exercise.sets||1}</strong><span>เซ็ต</span></div><div><strong>${esc(target)}</strong><span>ต่อเซ็ต</span></div><div><strong>${exercise.rest||0} วิ</strong><span>พัก</span></div></div><h3>คำแนะนำเบื้องต้น</h3><p>${esc(exercise.instructions)}</p><p class="hint">ชื่อและข้อมูลจัดหมวดจาก FastFit · คำแนะนำนี้เป็นแนวทางทั่วไป</p><div class="library-detail-actions"><a class="btn secondary" href="https://fastfit.buildbytoey.com/exercise/${encodeURIComponent(exercise.sourceSlug)}" target="_blank" rel="noopener noreferrer">ดูวิธีฝึกต้นทาง ↗</a><button class="btn" data-close>ปิด</button></div></div></div>`;
};
render();
