import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">작은 선의의 감정을 기록합니다</h1>
      <p className="text-zinc-700">봉사활동의 '시간'이 아니라 그날의 '마음'을 아카이브합니다.</p>
      <div className="flex gap-3">
        <Link className="px-4 py-2 rounded-lg bg-black text-white" to="/stories">스토리 보기</Link>
        <Link className="px-4 py-2 rounded-lg border" to="/reflections">이야기 남기기</Link>
      </div>
    </section>
  )
}
