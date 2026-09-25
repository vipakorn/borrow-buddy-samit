# Handoff: Borrow Buddy (สรุปส่งต่องาน)

อัปเดตล่าสุด: 2026-09-25 (เสร็จครบทุกเฟส) อ่านไฟล์นี้ก่อน แล้วอ่าน [CONTEXT.md](./CONTEXT.md), [design.md](./design.md), [Tasks.md](./Tasks.md) เพื่อทำงานต่อ

## โปรเจ็กต์คืออะไร
เว็บหน้าเดียวสำหรับเจ้าของคนเดียว บันทึกว่าเพื่อนยืมของอะไร เมื่อไร ต้องคืนเมื่อไร และกดคืนแล้วได้ เทคโนโลยี: React 19 + Vite 8 (JavaScript), Vitest 5, เก็บข้อมูลใน localStorage

## กติกาที่ต้องทำตาม
- ตอบเป็นภาษาไทยสุภาพ กระชับ ประหยัด token
- ใช้ JavaScript เท่านั้น (ไม่ใช้ TypeScript)
- ทำตามคำสั่งผู้ใช้เท่านั้น
- **ห้ามลบไฟล์โดยไม่ถามก่อน** (รวมถึงไฟล์ `.gitkeep`)
- ห้ามแสดงข้อมูลส่วนตัว
- **งาน git ทั้งหมดในโปรเจ็กต์นี้ให้มอบ agent `git-manager` ทำ** ไม่รัน git เองผ่าน Bash (แม้แต่ `git status`) และไม่ push
- ผู้ใช้สั่งให้ **commit ทุกครั้งที่ทำ task เสร็จ** ข้อความ commit ภาษาอังกฤษ รูปแบบ `feat: T3.x ...` ปิดท้ายด้วย `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`
- ก่อนตั้งค่า/ใช้ไลบรารี (Vite, React, Vitest) ให้ตรวจเอกสารล่าสุดผ่าน Context7 (React: `/websites/react_dev`)
- รอให้ commit ของ task หนึ่งเสร็จก่อนเริ่มแก้ไฟล์ของ task ถัดไป เพื่อไม่ให้งานปนกัน

## สถานะงาน

| Task | สถานะ | Commit |
|---|---|---|
| T1.1 – T1.3 ตั้งโปรเจ็กต์ | เสร็จ | `f440dbc`, `c25eca7`, `f068441` |
| T2.1 `dateFormat.js` | เสร็จ | `ae9e1f5` |
| T2.2 `getLoanStatus` | เสร็จ | `d33bef9` |
| T2.3 `getDaysOverdue` | เสร็จ | `ef3ae10` |
| T2.4 `validateLoan` | เสร็จ | `2866281` |
| T2.5 `groupLoans` | เสร็จ | `43e48e0` |
| T2.6 `filterLoansByFriend` | เสร็จ | `49a8c48` |
| T2.7 `markReturned` / `unmarkReturned` | เสร็จ | `4d58674` |
| T2.8 `storage.js` | เสร็จ | `36f05e8` |
| T3.1 `App.jsx` state + โหลด/บันทึก | เสร็จ | `e868549` |
| T3.2 `LoanForm.jsx` | เสร็จ | `32066f2` |
| T3.3 `SearchBox.jsx` | เสร็จ | `4c8fb6e` |
| T3.4 `LoanList.jsx` / `LoanItem.jsx` | เสร็จ | `79f12ea` |
| T3.5 ปุ่มคืนแล้ว/ยกเลิกการคืน/แก้ไข | เสร็จ | `8a29978` |
| T3.6 `ThemeToggle.jsx` (โหมดมืด) | เสร็จ | `8641fa5` |
| T3.7 สไตล์ (มือถือ + สถานะ) | เสร็จ | `51bef52` |
| T4.1 `npm test` ผ่านทั้งหมด (68 ข้อ) | เสร็จ | `f7ee8af` |
| T4.2 ทดลองเพิ่ม/แก้ไข/กดคืน/ยกเลิกคืน/รีเฟรช | เสร็จ | `b0e2673` |
| T4.3 ทดลองกรณีขอบ | เสร็จ | `8c2908e` |
| T4.4 มือถือและโหมดมืด | เสร็จ | `408e31e` |
| T4.5 ไม่มีฟีเจอร์นอกขอบเขต + ศัพท์ตรง CONTEXT.md | เสร็จ | `566becf` |
| T5.1 ตาราง `loans` ใน Supabase | เสร็จ (migration `20260925155649_create_loans_table`) | รอ commit |
| T5.2 เปิด RLS + policy select/insert/update | เสร็จ (migration เดียวกับ T5.1) | รอ commit |
| T5.3 ปิด self sign-up + สร้างบัญชีเจ้าของ | **ค้าง — ต้องทำเองผ่าน Supabase Dashboard** | - |
| T5.4 ติดตั้ง `supabase-js` + `supabaseClient.js` | เสร็จ | รอ commit |
| T5.5 `auth.js` | เสร็จ | รอ commit |
| T5.6 `loansApi.js` | เสร็จ | รอ commit |
| T5.7 `LoginForm.jsx` | เสร็จ | รอ commit |
| T5.8 ปรับ `App.jsx` ให้เช็ค session + ใช้ `loansApi.js` | เสร็จ | รอ commit |
| T5.9 ลบ `storage.js` เดิม | **ค้าง — รอผู้ใช้ยืนยันก่อนลบไฟล์** (เลิกเรียกใช้ใน `App.jsx` แล้ว แต่ไฟล์ยังอยู่) | - |
| T5.10 อัปเดตศัพท์ในหน้าเว็บ | เสร็จ | รอ commit |

**เฟส 1 – 4 เสร็จครบแล้ว** เฟส 5 (v2: Supabase + เข้าสู่ระบบ) เขียนโค้ดเสร็จแล้วยกเว้น T5.3/T5.9 ที่ค้างตามเหตุผลข้างต้น `npm test` ผ่านทั้งหมด 68 ข้อ (4 ไฟล์ เดิม ไม่มีเทสต์อัตโนมัติใหม่สำหรับ `loansApi.js`/`auth.js` เพราะเรียก Supabase จริง ดู design.md ข้อ 9) `npm run lint` ผ่าน (มี warning `react(set-state-in-effect)` ที่ `App.jsx:39` จากการเช็ค session ตอนเปิดหน้า เป็นรูปแบบมาตรฐานของ Supabase Auth ไม่ใช่บั๊ก) `npm run build` ผ่าน
commit แรกของ repository คือ `ee81221` (เอกสาร + `.gitignore`) สาขา `main` ยังไม่ push repository อยู่ที่ `borrow-buddy-samit/.git` (ไม่ใช่โฟลเดอร์แม่)

## สิ่งที่ต้องทำต่อ
**ก่อนใช้งานจริงได้ ต้องทำ 2 อย่างนี้ก่อน (ผู้ใช้ต้องทำเอง ไม่มีเครื่องมือให้ agent ทำแทน):**
1. ที่ Supabase Dashboard → Authentication → Sign In / Providers (Email) → ปิด "Allow new users to sign up"
2. Authentication → Users → Add user → ใส่อีเมล + รหัสผ่านของเจ้าของ (ติ๊ก Auto Confirm User)

สิ่งที่รอการตัดสินใจของผู้ใช้:
- ยืนยันให้ลบ `src/lib/storage.js` และ `src/lib/storage.test.js` เดิมหรือไม่ (T5.9 — เลิกใช้แล้วแต่ยังไม่ลบไฟล์)
- commit งานเฟส 5 (ยังไม่ได้ commit ระหว่างพัฒนา ต่างจากเฟส 1-4 ที่ commit ทีละ task)
- push ขึ้น remote (ยังไม่มีการสั่ง ห้าม push เอง)
- ลบไฟล์เทมเพลตที่ไม่ใช้แล้ว (`src/assets/*`, `public/icons.svg`) ต้องถามก่อน
- ฟีเจอร์นอกขอบเขต (ลบ Loan, แจ้งเตือน, เลื่อนกำหนด, รูปภาพ, สำรองข้อมูล, self sign-up, ลืมรหัสผ่านทางเว็บ) ตาม design ข้อ 10 ให้ทบทวน `CONTEXT.md` ก่อน

**การทดสอบที่ยังไม่ได้ทำ**: ยังไม่ได้ทดสอบ login/RLS จริงในเบราว์เซอร์ เพราะยังไม่มีบัญชีเจ้าของ (T5.3 ค้าง) และ session นี้ไม่มีเครื่องมือเบราว์เซอร์ให้ใช้ (ผู้ใช้เลือกข้ามการติดตั้ง Claude in Chrome) ตรวจแล้วเฉพาะ: `npm test`/`npm run lint`/`npm run build` ผ่าน และ dev server (`npm run dev`) ขึ้นโดยไม่มี error ตอน transform โมดูลใหม่เพิ่ม

ข้อจำกัดของการตรวจรับ: ตรวจมือถือด้วย iframe จำลองความกว้าง (360 – 390px) ไม่ใช่เครื่องจริง ส่วน component ไม่มีเทสต์อัตโนมัติ (Vitest ครอบคลุมเฉพาะ `src/lib`) ตรวจด้วยมือในเบราว์เซอร์

หมายเหตุ: มี git-manager ตัวหนึ่งเคยรายงานผิดว่า `borrow-buddy` ไม่ใช่ git repository ทั้งที่ `.git` มีอยู่ ให้รัน git ด้วย `git -C "<พาธ borrow-buddy>"` และห้าม `git init`

วิธีทดสอบในเบราว์เซอร์: dev server `npm run dev` ที่ http://localhost:5173/ ใส่ข้อมูลทดสอบผ่าน localStorage คีย์ `borrow-buddy:loans` แล้ว **ล้างข้อมูลทดสอบทุกครั้งหลังตรวจ** (ทั้งคีย์ `borrow-buddy:loans` และ `borrow-buddy:theme`)

## โครงโค้ดปัจจุบัน (v2)
`src/lib`:
- `loanRules.js` (มีเทสต์, ตรรกะล้วน): `STATUS`, `STATUS_LABEL`, `getLoanStatus`, `getDaysOverdue`, `validateLoan`, `groupLoans`, `filterLoansByFriend`, `markReturned`, `unmarkReturned` — `today` เป็นสตริง ISO `YYYY-MM-DD` ที่ส่งเข้าฟังก์ชันเสมอ
- `dateFormat.js` (มีเทสต์): `formatThaiDate(iso)`, `toIsoDate(date)` (วันที่ท้องถิ่น)
- `theme.js` (มีเทสต์): `getInitialTheme`, `saveTheme`, `toggleTheme`, `THEME` (คีย์ `borrow-buddy:theme` ยังใช้ localStorage เหมือนเดิม ไม่เกี่ยวกับ Supabase)
- `supabaseClient.js` (ไม่มีเทสต์): export `supabase` client เดียว อ่าน `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` จาก `.env` โยน error ถ้าไม่ตั้งค่า
- `auth.js` (ไม่มีเทสต์ เรียก Supabase จริง): `signIn(email, password)` → `{ session, error }` (error เป็นข้อความไทยหรือ null), `signOut()`, `getSession()`, `onAuthStateChange(callback)` → คืนฟังก์ชันเลิกฟัง
- `loansApi.js` (ไม่มีเทสต์ เรียก Supabase จริง, แทน `storage.js` เดิม): `fetchLoans()`, `insertLoan(loan)`, `updateLoan(loan)` ทุกฟังก์ชันคืน `{ loan(s), warning }` (`warning` เป็นข้อความไทยหรือ null) ไม่มี `deleteLoan` (นอกขอบเขต และตาราง `loans` ไม่มี RLS policy สำหรับ delete เลย)
- `storage.js`/`storage.test.js` (เดิม, **เลิกใช้แล้วแต่ยังไม่ลบไฟล์** รอผู้ใช้ยืนยัน T5.9)

`src/components` (ไม่มีเทสต์ ตรวจด้วยมือในเบราว์เซอร์): `LoginForm` (ใหม่, ฟอร์มอีเมล+รหัสผ่าน), `LoanForm`, `LoanList`, `LoanItem`, `SearchBox`, `ThemeToggle`

`src/App.jsx`: state เพิ่ม `session` (`undefined` = กำลังเช็ค, `null` = ยังไม่ล็อกอิน, object = ล็อกอินแล้ว) เช็คด้วย `getSession()` + ฟัง `onAuthStateChange` ใน `useEffect` เมื่อ `session` เปลี่ยนเป็นล็อกอินจะ `fetchLoans()` ใหม่ทุกครั้ง (useEffect ที่สอง) ไม่แสดงหน้าหลักจนกว่าจะมี session แล้ว `handleSave`/`replaceLoan` เป็น async เรียก `insertLoan`/`updateLoan` แล้วอัปเดต state ด้วยแถวที่ Supabase ส่งกลับ (ไม่ optimistic update) ธีมตั้งด้วย `useLayoutEffect` บน `data-theme` ของ `<html>` เหมือนเดิม

**ฐานข้อมูล**: ตาราง `public.loans` (migration `supabase/migrations/20260925155649_create_loans_table.sql`) เปิด RLS, policy select/insert/update เฉพาะ `owner_id = auth.uid()`, ไม่มี policy delete คอลัมน์ `friendName`/`itemName`/`borrowedDate`/`dueDate`/`returnedDate` เป็น camelCase ที่ต้อง quote ใน SQL (ตรงกับชื่อฟิลด์ฝั่ง JS พอดี ไม่ต้อง map ชื่อ)

## ข้อตัดสินใจและสิ่งที่ควรรู้
- `npm test` = `vitest run --passWithNoTests` (จบเองไม่ค้าง watch) มี `npm run test:watch` แยกไว้ให้
- วันที่เก็บเป็นสตริง ISO `YYYY-MM-DD` เทียบด้วยสตริงตรง ๆ ได้ (คอลัมน์ Postgres เป็น `date` แต่ PostgREST ส่งกลับเป็นสตริง `YYYY-MM-DD` เข้ากับ `loanRules.js`/`dateFormat.js` เดิมได้พอดี)
- `.env` (ไม่ commit, อยู่ใน `.gitignore`) มี `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` ของโปรเจกต์ Supabase จริงไว้ให้รัน dev ได้ทันที ส่วน `.env.example` เป็น placeholder สำหรับ commit
- `id`/`owner_id` ของ Loan สร้างที่ฐานข้อมูล (`gen_random_uuid()`/`auth.uid()`) ฝั่ง client ไม่ต้องสร้าง id เอง (ต่างจาก v1 ที่มี `createId()` ใน `App.jsx` — เอาออกแล้ว)
- ฟังก์ชัน storage เดิมรับ `storage` เป็นพารามิเตอร์ เพื่อทดสอบด้วย storage จำลองโดยไม่ต้องใช้ jsdom (Vitest ใช้สภาพแวดล้อม node) — ยังใช้แนวคิดนี้กับ `theme.js`
- `index.css` (ตัวแปรสี + ธีม `data-theme`) และ `App.css` (สไตล์ component, มี `.header-actions` เพิ่มใหม่สำหรับกลุ่มปุ่มธีม+ออกจากระบบ) ถูกเขียนทับจากเทมเพลตแล้ว
- ไฟล์เทมเพลตที่ไม่ถูกใช้แล้ว แต่ยังอยู่: `src/assets/*` (`hero.png`, `react.svg`, `vite.svg`) และ `public/icons.svg` การลบต้องถามผู้ใช้ก่อน
- `package-lock.json` ถูก commit ไว้ ไม่ได้อยู่ใน `.gitignore`
- `src/components/.gitkeep` และ `src/lib/.gitkeep` เก็บไว้ ห้ามลบโดยไม่ถาม (ตอนนี้โฟลเดอร์ไม่ว่างแล้วแต่ยังไม่ได้ถามเรื่องลบ `.gitkeep`)
- `oxlint` มากับเทมเพลต (`npm run lint`) มี warning เดียวที่ `App.jsx:39` (`react(set-state-in-effect)`) เป็นรูปแบบมาตรฐานสำหรับเช็ค session ตอนเปิดหน้า ไม่ใช่บั๊ก
- ยังไม่มี `supabase/config.toml`/Supabase CLI ในโปรเจกต์ ใช้ MCP tool (`apply_migration`) apply migration ตรงไปที่ project จริงเลย ไฟล์ `.sql` ใน `supabase/migrations/` เก็บไว้เพื่อ version control เท่านั้น ยังไม่ได้ตั้ง local dev stack
