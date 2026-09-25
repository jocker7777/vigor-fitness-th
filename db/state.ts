import { env } from 'cloudflare:workers';

export async function loadUserState(userId: string): Promise<unknown | null> {
  const row = await env.DB.prepare('SELECT state_json FROM user_states WHERE user_id = ?').bind(userId).first<{ state_json: string }>();
  return row ? JSON.parse(row.state_json) : null;
}

export async function saveUserState(userId: string, state: unknown): Promise<void> {
  await env.DB.prepare('INSERT INTO user_states (user_id, state_json, updated_at) VALUES (?, ?, ?) ON CONFLICT(user_id) DO UPDATE SET state_json = excluded.state_json, updated_at = excluded.updated_at')
    .bind(userId, JSON.stringify(state), new Date().toISOString()).run();
}
