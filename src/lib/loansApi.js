import { supabase } from './supabaseClient.js'

export const LOAD_WARNING = 'โหลดข้อมูลจาก Supabase ไม่สำเร็จ กรุณาลองใหม่'
export const SAVE_WARNING = 'บันทึกข้อมูลไม่สำเร็จ ข้อมูลล่าสุดอาจไม่ถูกเก็บไว้'

// ฟิลด์ที่ผู้ใช้แก้ไขได้ (ไม่รวม id/owner_id/created_at ที่ Supabase จัดการเอง)
const toRow = (loan) => ({
  friendName: loan.friendName,
  itemName: loan.itemName,
  borrowedDate: loan.borrowedDate,
  dueDate: loan.dueDate,
  returnedDate: loan.returnedDate ?? null,
})

// โหลด Loan ของบัญชีที่เข้าสู่ระบบอยู่ (RLS กรองให้เห็นเฉพาะของตัวเองแล้ว)
export async function fetchLoans() {
  const { data, error } = await supabase.from('loans').select('*')
  if (error) return { loans: [], warning: LOAD_WARNING }
  return { loans: data, warning: null }
}

// เพิ่ม Loan ใหม่ owner_id ตั้งค่าอัตโนมัติในฐานข้อมูล (auth.uid())
export async function insertLoan(loan) {
  const { data, error } = await supabase.from('loans').insert(toRow(loan)).select().single()
  if (error) return { loan: null, warning: SAVE_WARNING }
  return { loan: data, warning: null }
}

// แก้ไข Loan เดิม (ใช้ทั้งแก้ไขฟอร์ม, กดคืนแล้ว, ยกเลิกการคืน)
export async function updateLoan(loan) {
  const { data, error } = await supabase
    .from('loans')
    .update(toRow(loan))
    .eq('id', loan.id)
    .select()
    .single()
  if (error) return { loan: null, warning: SAVE_WARNING }
  return { loan: data, warning: null }
}
