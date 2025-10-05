import React from 'react'

export default function Reflections(){
  const [form, setForm] = React.useState({ title:'', date:'', place:'', category:'seniors', emotionTags:[], heroQuote:'', story:'' })
  const [msg, setMsg] = React.useState('')
  function set(k, v){ setForm(s=>({ ...s, [k]: v })) }
  async function onSubmit(e){
    e.preventDefault()
    try{
      const res = await fetch('/api/submit', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({
        ...form, photos:[], consent:{ type:'anonymous' }
      }) })
      const j = await res.json()
      setMsg(j.ok ? '제출되었습니다(검수 후 공개됩니다).' : `오류: ${j.error}`)
    }catch(err){ setMsg('네트워크 오류') }
  }
  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-xl">
      <h2 className="text-2xl font-semibold mb-2">당신의 이야기를 남겨주세요</h2>
      <input className="w-full border rounded p-2" placeholder="Title" value={form.title} onChange={e=>set('title', e.target.value)} required/>
      <div className="grid grid-cols-2 gap-3">
        <input className="border rounded p-2" type="date" value={form.date} onChange={e=>set('date', e.target.value)}/>
        <input className="border rounded p-2" placeholder="Place" value={form.place} onChange={e=>set('place', e.target.value)}/>
      </div>
      <select className="border rounded p-2" value={form.category} onChange={e=>set('category', e.target.value)}>
        <option value="seniors">seniors</option>
        <option value="education">education</option>
        <option value="community">community</option>
      </select>
      <textarea className="w-full border rounded p-2 min-h-[140px]" placeholder="Story..." value={form.story} onChange={e=>set('story', e.target.value)} required/>
      <button className="px-4 py-2 rounded bg-black text-white">제출</button>
      {msg && <p className="text-sm text-zinc-600">{msg}</p>}
    </form>
  )
}
