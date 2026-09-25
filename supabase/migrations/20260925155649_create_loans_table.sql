-- T5.1 + T5.2: ตาราง loans + Row Level Security (design.md ข้อ 4, 8)
-- เห็น/เพิ่ม/แก้ไขได้เฉพาะแถวของบัญชีตัวเอง ไม่มี policy delete (ลบ Loan อยู่นอกขอบเขต)

create table public.loans (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  "friendName" text not null,
  "itemName" text not null,
  "borrowedDate" date not null,
  "dueDate" date not null,
  "returnedDate" date,
  created_at timestamptz not null default now()
);

comment on table public.loans is 'Loan ของเจ้าของแต่ละบัญชี เห็นเฉพาะของตัวเองผ่าน RLS ไม่มีการลบ (นอกขอบเขต)';

alter table public.loans enable row level security;

grant select, insert, update on public.loans to authenticated;

create policy "loans_select_own" on public.loans
  for select
  to authenticated
  using (owner_id = (select auth.uid()));

create policy "loans_insert_own" on public.loans
  for insert
  to authenticated
  with check (owner_id = (select auth.uid()));

create policy "loans_update_own" on public.loans
  for update
  to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));
