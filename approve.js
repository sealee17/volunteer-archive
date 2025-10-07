import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok:false, error:'Method Not Allowed' });

  const token = req.headers['x-admin-token'];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ ok:false, error:'Unauthorized' });
  }

  const { id } = req.query; // /api/moderate/approve?id=...
  if (!id) return res.status(400).json({ ok:false, error:'missing id' });

  const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

  // 1) 대기열에서 가져오기
  const { data: sub, error: e1 } = await sb.from('submissions').select('*').eq('id', id).single();
  if (e1 || !sub) return res.status(404).json({ ok:false, error:'not found' });

  // 2) 공개 테이블로 복사 (published=true)
  const payload = {
    title: sub.title, date: sub.date, place: sub.place, category: sub.category,
    emotion_tags: sub.emotion_tags, hero_quote: sub.hero_quote, story: sub.story,
    cover_url: (sub.photos && sub.photos[0]) ?? null,
    photos: sub.photos, published: true
  };
  const { error: e2 } = await sb.from('stories').insert(payload);
  if (e2) return res.status(500).json({ ok:false, error:e2.message });

  // 3) 대기열에서 삭제
  const { error: e3 } = await sb.from('submissions').delete().eq('id', id);
  if (e3) return res.status(500).json({ ok:false, error:e3.message });

  res.status(200).json({ ok:true });
}
