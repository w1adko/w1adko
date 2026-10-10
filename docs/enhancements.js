(() => {
  'use strict';
  const log=document.querySelector('#console-log'),input=document.querySelector('#command'),form=document.querySelector('#console-form');
  if(!log||!input||!form)return;
  let matrixFrame=0,canvas=null,last=0,columns=[];
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const all=['help','recruiter','experience','skills','highlights','resume','contact','interview','whoami','projects','github','stack','cats','coffee','fortune','roll','ascii','saymyname','sudo','vault','ls','date','history','clear','matrix','stop','achievements','open resume','open github'];
  function line(s,cls=''){const p=document.createElement('p');p.className=cls;p.textContent=s;log.appendChild(p);log.scrollTop=log.scrollHeight;}
  function stopMatrix(message=false){if(matrixFrame){cancelAnimationFrame(matrixFrame);matrixFrame=0;}if(canvas){canvas.remove();canvas=null;}if(message)line('Matrix exited. Welcome back to reality.','entered');}
  function startMatrix(){
    stopMatrix();if(motion.matches){line('Matrix animation disabled by reduced-motion preference.');return;}
    line('Entering the Matrix… type stop, press Esc or click Stop effects.');
    canvas=document.createElement('canvas');canvas.className='matrix-canvas';canvas.setAttribute('aria-hidden','true');log.appendChild(canvas);
    const ctx=canvas.getContext('2d');if(!ctx){stopMatrix();return;}
    const w=log.clientWidth,h=log.clientHeight,dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    columns=Array.from({length:Math.floor(w/17)},()=>Math.random()*-h/17);
    const draw=(t)=>{if(!canvas)return;matrixFrame=requestAnimationFrame(draw);if(t-last<60)return;last=t;ctx.fillStyle='rgba(3,10,9,.16)';ctx.fillRect(0,0,w,h);ctx.fillStyle='#66f8a3';ctx.font='14px monospace';for(let i=0;i<columns.length;i++){const glyph=String.fromCharCode(0x30A0+Math.floor(Math.random()*96));ctx.fillText(glyph,i*17,columns[i]*17);columns[i]++;if(columns[i]*17>h&&Math.random()>.96)columns[i]=0;}};
    matrixFrame=requestAnimationFrame(draw);
  }
  function recruiterCard(){
    const card=document.createElement('article');card.className='recruiter-result';
    const heading=document.createElement('h3');heading.textContent='Vladyslav Tkachuk';card.appendChild(heading);
    const small=document.createElement('small');small.textContent='Back-End Developer · Ukraine';card.appendChild(small);
    const p=document.createElement('p');p.textContent='PHP / Laravel · Node.js / NestJS · APIs · databases · integrations';card.appendChild(p);
    const stats=document.createElement('div');stats.className='r-stats';stats.innerHTML='<div><b>Since 2018</b><br><small>Experience in CV</small></div><div><b>5</b><br><small>Companies listed</small></div>';card.appendChild(stats);
    const detail=document.createElement('p');detail.textContent='Mobile APIs, analytics, real-time CRM, marketplaces, payments and background jobs.';card.appendChild(detail);
    const link=document.createElement('a');link.href='./resume.html';link.textContent='View full resume ↗';card.appendChild(link);log.appendChild(card);log.scrollTop=log.scrollHeight;
  }
  // Capture only new commands and enhanced recruiter mode; preserve the existing terminal commands.
  form.addEventListener('submit',e=>{const cmd=input.value.trim().toLowerCase().replace(/\s+/g,' ');if(['matrix','stop','achievements','recruiter','resume','open resume'].includes(cmd)){e.preventDefault();e.stopImmediatePropagation();input.value='';if(cmd==='matrix'){startMatrix();return;}stopMatrix();line('$ '+cmd,'entered');if(cmd==='recruiter')recruiterCard();else if(cmd==='resume'||cmd==='open resume'){line('Opening resume page…');window.open('./resume.html','_blank','noopener,noreferrer');}else if(cmd==='achievements')line('CAT WHISPERER — unlock via vault\nNEO — run matrix\nRECRUITER READY — run recruiter');else line('Effect stopped.');}},true);
  for(const button of document.querySelectorAll('[data-command]'))button.addEventListener('click',()=>{input.value=button.dataset.command;form.requestSubmit();input.focus();});
  document.getElementById('stop-matrix')?.addEventListener('click',()=>{stopMatrix(true);input.focus();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')stopMatrix();});
  input.addEventListener('keydown',e=>{if(e.key==='Tab'){const text=input.value.trim().toLowerCase();if(!text)return;const match=all.filter(c=>c.startsWith(text));if(match.length===1){e.preventDefault();input.value=match[0];}}});
  motion.addEventListener?.('change',()=>{if(motion.matches)stopMatrix();});
  window.addEventListener('pagehide',()=>stopMatrix());
})();