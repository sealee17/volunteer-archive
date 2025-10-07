// src/Pages/Admin.jsx
import React from 'react';

export default function Admin(){
  const [token, setToken] = React.useState(localStorage.getItem('ADMIN_TOKEN') || '');
  const [items, setItems] = React.useState([]);
  const [msg, setMsg] = React.useState('');

  async function load(){
    setMsg('불러오는 중…');
    try{
      const res = await fetch('/api/moderate/list', {
        headers: { 'x-admin-token': token }
      });
      const j = await res.json();
      if (!j.ok) setMsg(`에러: ${j.error}`);
      else { setItems(j.data); setMsg(''); }
    }catch(e){
      setMsg('네트워크 오류');
    }
  }

  async function act(type, id){
    const url = type === 'approve'
      ? `/api/moderate/approve?id=${id}`
      : `/api/moderate/reject?id=${id}`;
    try{
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'x-admin-token': token }
      });
      const j = await res.json();
      if (!j.ok) return alert(j.error);
      await load();
    }catch(e){
      alert('네트워크 오류');
    }
  }

  function saveToken(){
    localStorage.setItem('ADMIN_TOKEN', token);
    load();
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Admin · Submissions</h2>

      <div className="flex gap-2">
        <input
          className="border rounded p-2 w-80"
          placeholder="Admin token"
          value={token}
          onChange={e=>setToken(e.target.value)}
        />
        <button className="px-3 py-2 rounded bg-black text-white" onClick={saveToken}>
          Load
        </button>
      </div>

      {msg && <p className="text-sm text-zinc-600">{msg}</p>}

      <div className="space-y-2">
        {items.map(it=>(
          <div key={it.id} className="border rounded-xl p-3 bg-white">
            <div className="text-sm text-zinc-500">
              {it.date} • {it.place} • {it.category}
            </div>
            <div className="font-semibold">{it.title}</div>
            <p className="text-sm mt-1 line-clamp-3">{it.story}</p>
            <div className="flex gap-2 mt-2">
              <button
                className="px-3 py-1 rounded bg-emerald-600 text-white"
                onClick={()=>act('approve', it.id)}
              >
                승인
              </button>
              <button
                className="px-3 py-1 rounded bg-rose-600 text-white"
                onClick={()=>act('reject', it.id)}
              >
                거절
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && !msg && <p>대기 중 항목이 없습니다.</p>}
      </div>
    </div>
  );
}
