import { getChatGPTUser } from '../../chatgpt-auth';
import { loadUserState, saveUserState } from '../../../db/state';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: 'sign_in_required' }, { status: 401 });
  try {
    return Response.json({ state: await loadUserState(user.userId) }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Could not load user state', error);
    return Response.json({ error: 'unavailable' }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: 'sign_in_required' }, { status: 401 });
  const raw = await request.text();
  if (raw.length > 300_000) return Response.json({ error: 'too_large' }, { status: 413 });
  let input: unknown;
  try { input = JSON.parse(raw); } catch { return Response.json({ error: 'invalid_json' }, { status: 400 }); }
  if (!input || typeof input !== 'object' || Array.isArray(input)) return Response.json({ error: 'invalid_state' }, { status: 400 });
  const data = input as Record<string, unknown>;
  if (!['plans','sessions','meals','equipment'].every(key => Array.isArray(data[key]) && (data[key] as unknown[]).length <= 2000)) return Response.json({ error: 'invalid_state' }, { status: 400 });
  const state = {
    plans: data.plans,
    sessions: data.sessions,
    meals: data.meals,
    equipment: data.equipment,
    goal: typeof data.goal === 'number' && data.goal >= 500 && data.goal <= 6000 ? data.goal : 1900,
    voice: data.voice === true,
    rest: typeof data.rest === 'number' && data.rest >= 0 && data.rest <= 300 ? data.rest : 20,
  };
  try {
    await saveUserState(user.userId, state);
    return Response.json({ ok: true });
  } catch (error) {
    console.error('Could not save user state', error);
    return Response.json({ error: 'unavailable' }, { status: 503 });
  }
}
