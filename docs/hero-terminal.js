(() => {
  'use strict';
  const target=document.getElementById('hero-terminal-output');
  if(!target||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const steps=[
    ['whoami','hooligan','mint'],
    ['cat skills.txt','PHP · Laravel · Node.js · NestJS',''],
    ['cat cats.txt','Ванілька · Пончик · Зефірка','mint'],
    ['sudo make coffee','Permission denied. Cats are in charge.','warn']
  ];
  let timer=null,index=0,character=0,command=null,active=true;
  const schedule=(fn,delay)=>{clearTimeout(timer);if(active)timer=setTimeout(fn,delay);};
  const row=(kind)=>{const div=document.createElement('div');div.className='line '+kind;target.appendChild(div);return div;};
  const showPrompt=()=>{const line=row('entry');const symbol=document.createElement('span');symbol.className='prompt';symbol.textContent='$ ';line.appendChild(symbol);const text=document.createElement('span');line.appendChild(text);const caret=document.createElement('span');caret.className='typing-cursor';caret.setAttribute('aria-hidden','true');line.appendChild(caret);return {text,caret};};
  const next=()=>{
    if(index>=steps.length){const last=showPrompt();last.caret.remove();schedule(begin,2800);return;}
    const step=steps[index];const pair=showPrompt();character=0;command=pair;
    const type=()=>{if(!active)return;character++;pair.text.textContent=step[0].slice(0,character);if(character<step[0].length){schedule(type,65);}else{pair.caret.remove();schedule(()=>{const result=row('output');result.classList.add('result');if(step[2])result.classList.add(step[2]);result.textContent=step[1];index++;schedule(next,1250);},340);}};
    schedule(type,500);
  };
  const begin=()=>{target.replaceChildren();index=0;next();};
  const stop=()=>{active=false;clearTimeout(timer);};
  document.addEventListener('visibilitychange',()=>{if(document.hidden){stop();}else{active=true;begin();}});
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  motion.addEventListener?.('change',()=>{stop();if(!motion.matches){active=true;begin();}else{target.replaceChildren();for(const [cmd,result,kind] of steps){const line=row('entry');line.textContent='$ '+cmd;const output=row('output');output.classList.add('result');if(kind)output.classList.add(kind);output.textContent=result;}}});
  window.addEventListener('pagehide',stop);
  begin();
})();
