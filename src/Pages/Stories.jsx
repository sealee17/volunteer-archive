import React from 'react'
import EmotionChips from '../Components/EmotionChips'
import StoryCard from '../Components/StoryCard'

const mock = [
  { id:'SEN-001', title:'첫 번째 기록', date:'2025-09-10', place:'Seoul', emotion_tags:['warmth','insight'], story:'...' },
  { id:'SEN-002', title:'두 번째 기록', date:'2025-09-17', place:'Seoul', emotion_tags:['gratitude'], story:'...' }
]

export default function Stories(){
  const [emotion, setEmotion] = React.useState()
  const list = emotion ? mock.filter(m=>m.emotion_tags.includes(emotion)) : mock

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Stories</h2>
        <EmotionChips value={emotion} onChange={setEmotion} />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(item=> <StoryCard key={item.id} item={item} />)}
      </div>
      <p className="text-sm text-zinc-500">지금은 예시 데이터입니다. Supabase 연결 후 자동으로 불러옵니다.</p>
    </div>
  )
}
