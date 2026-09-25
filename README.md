# VIGOR Site

เว็บออกกำลังกายภาษาไทยสำหรับเผยแพร่ผ่าน ChatGPT Sites

## การทำงาน

- ผู้เข้าชมทั่วไปดูคลังท่า โปรแกรม และทดลองใช้งานได้ ข้อมูลที่บันทึกระหว่างใช้งานทั่วไปอยู่ในเบราว์เซอร์ของตน
- ผู้ใช้ที่เข้าสู่ระบบด้วย ChatGPT บันทึกโปรแกรม ประวัติการฝึก อุปกรณ์ อาหาร และค่าตั้งค่าลง D1 แยกตามรหัสผู้ใช้ที่ Sites ส่งให้ฝั่งเซิร์ฟเวอร์
- API `/api/state` ตรวจตัวตนทุกครั้งก่อนอ่านหรือเขียนข้อมูล และไม่รับรหัสผู้ใช้จากเบราว์เซอร์

## พัฒนาในเครื่อง

```sh
npm ci
npm run db:generate
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_salty_magik.sql
npm run dev
```

หาก migration ถูกใช้กับฐานข้อมูลในเครื่องแล้ว ไม่ต้องรันซ้ำ เว็บไซต์พัฒนาในเครื่องอยู่ที่ `http://localhost:5173/`

การเผยแพร่ผ่าน Sites ใช้ `.openai/hosting.json` และ `drizzle/` ส่วนข้อมูลตัวอย่างท่า โปรแกรม และอาหารอยู่ใน `public/app.js` ข้อมูลเหล่านี้เป็นตัวอย่างของ VIGOR ไม่ใช่คลังข้อมูลทั้งหมดของ FastFit
