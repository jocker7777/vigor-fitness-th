import { fastfitCatalog } from './fastfit-catalog.js';

const muscles = {
  shoulders:'ไหล่',chest:'หน้าอก',traps:'บ่า',upper_back:'หลังส่วนบน',lats:'ปีกหลัง',
  biceps:'ไบเซปส์',triceps:'ไตรเซปส์',forearms:'ท่อนแขน',abs:'หน้าท้อง',
  obliques:'หน้าท้องด้านข้าง',lower_back:'หลังส่วนล่าง',glutes:'ก้น',quads:'ต้นขาด้านหน้า',
  hamstrings:'ต้นขาด้านหลัง',calves:'น่อง',adductors:'ต้นขาด้านใน',
  abductors:'สะโพกด้านข้าง',full_body:'ทั้งตัว'
};
const equipment = {
  bodyweight:'ไม่ใช้อุปกรณ์',dumbbell:'ดัมเบล',barbell:'บาร์เบล',cable:'เคเบิล',
  machine:'เครื่องเวท',kettlebell:'เคตเทิลเบล',ez_bar:'บาร์ EZ',jump_rope:'เชือกกระโดด',
  treadmill:'ลู่วิ่ง',bike:'จักรยานออกกำลังกาย',box:'กล่องกระโดด',ab_wheel:'ลูกกลิ้งหน้าท้อง',
  smith:'เครื่องสมิธ',trap_bar:'แทรปบาร์',dip_station:'บาร์ดิป',landmine:'แลนด์ไมน์',
  band:'ยางยืด',medicine_ball:'เมดิซินบอล',rower:'เครื่องกรรเชียง',battle_rope:'เชือกแบตเทิล',
  bench:'ม้านั่ง',plate:'แผ่นน้ำหนัก',stability_ball:'บอลโยคะ',trx:'สายแขวน TRX',pullup_bar:'บาร์ดึงข้อ'
};
const types = {
  strength:'เวท / ยิม',power:'เวท / ยิม',yoga:'โยคะ',dance:'แอโรบิก',
  cardio:'คาร์ดิโอ',plyometric:'คาร์ดิโอ',stretching:'ยืดเหยียด',mobility:'ยืดเหยียด'
};
const levels = {1:'เริ่มต้น',2:'พื้นฐาน',3:'ปานกลาง',4:'ขั้นสูง',5:'เชี่ยวชาญ'};
const icons = {'เวท / ยิม':'🏋️','โยคะ':'🧘','แอโรบิก':'🎵','คาร์ดิโอ':'⚡','ยืดเหยียด':'🤸'};

const genericAdvice = {
  'เวท / ยิม':'เริ่มด้วยน้ำหนักหรือแรงต้านที่ควบคุมได้ รักษาท่าทางมั่นคง และหยุดหากรู้สึกเจ็บ',
  'โยคะ':'เคลื่อนไหวอย่างช้า ๆ หายใจต่อเนื่อง และอยู่ในช่วงการเคลื่อนไหวที่สบาย',
  'แอโรบิก':'เริ่มที่จังหวะสบาย ลงเท้าเบา และลดความเร็วเมื่อเริ่มเสียท่า',
  'คาร์ดิโอ':'เริ่มด้วยช่วงสั้น ๆ รักษาจังหวะหายใจ และพักเมื่อจำเป็น',
  'ยืดเหยียด':'ยืดจนรู้สึกตึงพอดี หายใจต่อเนื่อง และไม่เด้งหรือฝืนข้อ'
};

export const fastfitExercises = fastfitCatalog.map((record,index) => {
  const type=types[record.cat];
  return {
    id:10000+record.id,sourceId:record.id,sourceSlug:record.slug,
    name:record.name,en:record.en,primaryMuscle:muscles[record.m]||record.m,
    muscle:muscles[record.m]||record.m,equipment:equipment[record.e]||record.e,
    equipmentCodes:[record.e,...(record.a?.x||[])],
    level:levels[record.lv]||'เริ่มต้น',tier:record.tr,type,emoji:icons[type]||'🏋️',
    seconds:Math.max(20,Math.min(180,Number(record.time)||45)),
    instructions:genericAdvice[type],
    sets:record.sets,reps:record.reps,time:record.time,rest:record.rest,met:record.met,
    popularity:fastfitCatalog.length-index
  };
});
