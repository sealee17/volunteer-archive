import React from 'react'
import { Link } from 'react-router-dom'

export default function StoryCard({ item }){
  return (
    <Link to={`/stories/${item.id}`} className="block border rounded-2xl p-4 bg-white hover:shadow">
      <div className="text-xs text-zinc-500">{item.date} • {item.place}</div>
      <h3 className="font-semibold mt-1">{item.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm">{item.heroQuote || item.story}</p>
      <div className="mt-3 flex gap-2 text-xs text-zinc-600">
        {item.emotion_tags?.slice(0,3).map(t=>(<span key={t}>#{t}</span>))}
      </div>
    </Link>
  )
}
