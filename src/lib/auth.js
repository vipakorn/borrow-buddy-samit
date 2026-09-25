import { supabase } from './supabaseClient.js'

export const SIGN_IN_ERROR = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'

// สมัครสมาชิกเองปิดไว้ (นอกขอบเขต) บัญชีเจ้าของสร้างด้วยมือผ่าน Supabase เท่านั้น
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { session: null, error: SIGN_IN_ERROR }
  return { session: data.session, error: null }
}

export async function signOut() {
  await supabase.auth.signOut()
}

export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

// callback(session) เรียกทุกครั้งที่สถานะเข้าสู่ระบบเปลี่ยน คืนฟังก์ชันไว้เลิกฟัง
export function onAuthStateChange(callback) {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => callback(session))
  return () => subscription.unsubscribe()
}
