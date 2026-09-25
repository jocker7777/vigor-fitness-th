import { getChatGPTUser, chatGPTSignInPath } from './chatgpt-auth';
import Script from 'next/script';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const user = await getChatGPTUser();
  return (
    <>
      <div id="app" data-auth={user ? '1' : '0'} data-signin={chatGPTSignInPath('/')} data-name={user?.displayName || ''} />
      <Script type="module" src="/app.js" strategy="afterInteractive" />
    </>
  );
}
