import React from 'react'
export default function EmotionChips({ value, onChange }){
  const items = ['warmth','gratitude','regret','insight','awe']
  return <div className="flex gap-2 flex-wrap">
    {items.map(e=>(
      <button key={e}
        onClick={()=>onChange(value===e?undefined:e)}
        className={`px-3 py-1 rounded-full border ${value===e?'bg-black text-white':'bg-white'}`}>#{e}</button>
    ))}
    {value && <button className="underline" onClick={()=>onChange(undefined)}>clear</button>}
  </div>
}