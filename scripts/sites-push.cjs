// Fallback for a missing Sites workflow helper; credentials are stdin-only.
const {spawnSync}=require('node:child_process');
if(!process.stdin.isTTY)throw new Error('Use a terminal with hidden raw input');
process.stdin.setRawMode(true);
process.stdin.setEncoding('utf8');
process.stdin.resume();
process.stdout.write('Ready for credential JSON (hidden input).\n');
let input='';
process.stdin.on('data',chunk=>{
 if(chunk.includes('\u0003'))process.exit(130);
 input+=chunk;
 if(!/[\r\n]/.test(input))return;
 process.stdin.pause();process.stdin.setRawMode(false);
 try{
  const c=JSON.parse(input.trim());input='';
  if(c.auth_mode!=='http_extra_header')throw new Error('Unsupported auth mode');
  const url=new URL(c.remote_url);
  if(url.protocol!=='https:'||url.hostname!=='git.chatgpt-team.site')throw new Error('Unexpected destination');
  const env={...process.env,GIT_TERMINAL_PROMPT:'0',GIT_CONFIG_COUNT:'2',GIT_CONFIG_KEY_0:'http.extraHeader',GIT_CONFIG_VALUE_0:`Authorization: Bearer ${c.token}`,GIT_CONFIG_KEY_1:'credential.helper',GIT_CONFIG_VALUE_1:''};
  const run=(args,remote=false)=>{
   const r=spawnSync('git',args,{encoding:'utf8',env:remote?env:process.env,timeout:60000,windowsHide:true});
   if(r.status!==0)throw new Error((r.stderr||'Git failed').split(c.token).join('[redacted]'));
   return r.stdout.trim();
  };
  if(run(['status','--porcelain']))throw new Error('Commit the source before publishing');
  const sha=run(['rev-parse','HEAD']);
  run(['push',c.remote_url,`${sha}:refs/heads/${c.branch}`],true);
  const remote=run(['ls-remote',c.remote_url,`refs/heads/${c.branch}`],true).split(/\s/)[0];
  if(remote!==sha)throw new Error('Remote verification failed');
  console.log(JSON.stringify({commit_sha:sha}));process.exit(0);
 }catch(e){console.error(e.message);process.exit(1);}
});
