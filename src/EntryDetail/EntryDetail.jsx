import React from 'react'
import { useParams } from 'react-router-dom'

export default function EntryDetail(){
  const { id } = useParams()
  // TODO: fetch(`/api/story/${id}`) 로 교체
  return (
    <div>
      <h2 className="text-2xl font-semibold">Story: {id}</h2>
      <p className="mt-2 text-zinc-700">상세 내용은 Supabase 연결 후 자동으로 표시됩니다.</p>
    </div>
  )
}
