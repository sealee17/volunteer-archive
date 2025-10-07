import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ ok:false, error:'Method Not Allowed' });

  // 간단 인증
  const token = req.headers['x-admin-token'];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ ok:false, error:'Unauthorized' });
  }

  const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

  const { data, error } = await sb
    .from('submissions')
    .select('id,title,date,place,category,emotion_tags,hero_quote,story,created_at,status,email')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ ok:false, error: error.message });
  res.status(200).json({ ok:true, data });
}
