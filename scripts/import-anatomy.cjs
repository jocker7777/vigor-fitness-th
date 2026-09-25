const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
(async()=>{
 const html=await(await fetch('https://fastfit.buildbytoey.com/anatomy')).text();
 const match=html.match(/window\.FL = (\{.*?\});\s*\(function/s);
 if(!match)throw new Error('Missing anatomy metadata');
 const source=JSON.parse(match[1]).data.anatomy;
 const anatomy=Object.entries(source).map(([code,{name,group,latin,count}])=>({code,name,group,latin,count}));
 if(anatomy.length!==30)throw new Error('Source anatomy count changed');
 const artwork={};
 for(const [index,gender] of ['male','female'].entries()){
  const input=process.argv[index+2];
  if(!input)throw new Error('Pass male and female SVG paths exported from the source page');
  const svg=fs.readFileSync(input,'utf8');
  const tags=[...svg.matchAll(/<\/?([a-zA-Z][\w:-]*)\b/g)].map(m=>m[1]);
  if(tags.some(tag=>!['svg','g','path','ellipse'].includes(tag))||/\bon\w+\s*=|\bhref\s*=|<\?|<!/i.test(svg))throw new Error('Unexpected active SVG content');
  const keys=[...svg.matchAll(/data-m="([^"]+)"/g)].map(m=>m[1]);
  if(new Set(keys).size!==30||keys.some(key=>!source[key]))throw new Error('SVG muscle keys differ from source metadata');
  const frontStart=svg.indexOf('<g id="view-front"');
  const backStart=svg.indexOf('<g id="view-back"');
  if(frontStart<0||backStart<0)throw new Error('Missing front/back figure');
  artwork[gender]={front:svg.slice(frontStart,backStart).trim(),back:svg.slice(backStart,svg.lastIndexOf('</svg>')).trim()};
 }
 fs.writeFileSync(path.join(root,'public/anatomy-data.js'),'// Factual muscle metadata from https://fastfit.buildbytoey.com/anatomy\nexport const anatomyData='+JSON.stringify(anatomy)+';\n');
 fs.writeFileSync(path.join(root,'public/anatomy-artwork.js'),'// Front/back vector artwork from FastFit body-male.svg and body-female.svg.\n// Source: https://fastfit.buildbytoey.com/anatomy — visual styling and interaction adapted for VIGOR.\nexport const anatomyArtwork='+JSON.stringify(artwork)+';\n');
 console.log(JSON.stringify({parts:anatomy.length,genders:Object.keys(artwork)}));
})().catch(error=>{console.error(error);process.exitCode=1;});
