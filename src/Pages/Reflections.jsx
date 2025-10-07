import React from 'react'
import { supabase } from '../lib/supabase'

export default function Reflections(){
  const [form, setForm] = React.useState({
    title:'', date:'', place:'', category:'seniors',
    emotionTags:[], heroQuote:'', story:'', email:''
  })
  const [msg, setMsg] = React.useState('')

  function set(k, v){ setForm(s => ({ ...s, [k]: v })) }

  async function onSubmit(e){
    e.preventDefault()
    setMsg('제출 중…')
    const payload = {
      title: form.title,
      date: form.date || null,
      place: form.place || null,
      category: form.category,
      emotion_tags: form.emotionTags,   // ← 배열 컬럼
      hero_quote: form.heroQuote || null,
      story: form.story,
      photos: null,
      consent: { type: 'anonymous' },
      status: 'pending',
      email: form.email || null
    }
    const { error } = await supabase.from('submissions').insert(payload)
    setMsg(error ? `오류: ${error.message}` : '제출 완료! (검수 후 공개됩니다)')
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-xl">
      {/* 기존 인풋 그대로, 버튼만 유지 */}
      <button className="px-4 py-2 rounded bg-black text-white">제출</button>
      {msg && <p className="text-sm text-zinc-600">{msg}</p>}
    </form>
  )
}
