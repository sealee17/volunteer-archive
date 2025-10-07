import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok:false, error:'Method Not Allowed' });

  const token = req.headers['x-admin-token'];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ ok:false, error:'Unauthorized' });
  }

  const { id } = req.query; // /api/moderate/reject?id=...
  if (!id) return res.status(400).json({ ok:false, error:'missing id' });

  const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);
  const { error } = await sb.from('submissions').delete().eq('id', id);
  if (error) return res.status(500).json({ ok:false, error: error.message });

  res.status(200).json({ ok:true });
}
