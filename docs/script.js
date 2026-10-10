(() => {
  const form=document.querySelector('#console-form'), input=document.querySelector('#command'), log=document.querySelector('#console-log');
  const history=[]; let historyPos=0, unlocked=false;
  const messages={
    help:'RECRUITER  recruiter · experience · skills · highlights · resume · contact · interview\nEXPLORE    whoami · projects · github · stack\nFUN        cats · coffee · fortune · roll · ascii · saymyname · sudo · vault\nSYSTEM     ls · date · history · clear · help',
    recruiter:'✦ RECRUITER MODE\nVladyslav Tkachuk — Back-End Developer, Ukraine\nExperience recorded since 2018 across marketplaces, CRM, tracking analytics & mobile APIs.\nMain stack: PHP/Laravel, Node.js/NestJS, MySQL, PostgreSQL, Redis, Docker.\nTry: highlights | experience | resume | contact | interview',
    whoami:'Vladyslav Tkachuk — Back-End Developer\nThink. Architect. Build.',
    stack:'PHP · Laravel · Symfony · Node.js · NestJS · Express\nMySQL · PostgreSQL · MongoDB · Redis · Manticore\nREST · Socket.IO · BullMQ · RabbitMQ · Docker · Git\nExploring Go and MariaDB.',
    skills:'BACKEND: PHP / Laravel / Symfony / Node.js / NestJS\nDATA: MySQL / PostgreSQL / MongoDB / Redis\nARCHITECTURE: APIs / background jobs / integrations / realtime / query optimization',
    experience:'2024–2025  Logic Fusion — mobile APIs, payments, Firebase, OpenAI\n2024–2025  Traffhunt — tracking analytics, CRM, PWA, push\n2023–2024  VIDI — credit calculator, Webpack\n2022–2023  Kronas — integrations, internal automation\n2018–2022  Technoskarb — marketplaces, payments\nNote: some CV employment dates overlap. View resume for details.',
    highlights:'01  Payment integrations — Stripe, PayPal, Braintree, PrivatBank, Monobank, UAPAY\n02  Analytics — traffic tracking, aggregation, SQL tuning\n03  Messaging — CRM, Socket.IO, operator workflows\n04  Queues & delivery — BullMQ, push scheduling, event logs\n05  Product engineering — APIs for mobile apps, PWA builder and marketplaces',
    projects:'Mobile APIs · Tracking analytics · Realtime CRM · Notification platform · Ponchyk Games\nEmployer repositories are not public.',
    resume:'Resume: https://github.com/w1adko/w1adko/blob/master/CV.md\nTip: type "open resume" to view it.',
    contact:'Public GitHub: https://github.com/w1adko\nFor professional inquiries, contact me through my GitHub profile. Other channels are being reviewed.',
    interview:'INTERVIEW STARTER QUESTIONS\n• What tradeoffs matter when designing queue-backed push delivery?\n• How do you optimize analytics queries on large datasets?\n• How would you isolate tenants in a campaign management API?\nTopics drawn from projects described in my CV — not automated interview results.',
    hire:'I enjoy backend systems, APIs, integrations and pragmatic architecture. Type recruiter for a 30-second overview.',
    github:'github.com/w1adko — type "open github"',
    cats:' /\\_/\\     /\\_/\\     /\\_/\\\n( o.o )   ( -.- )   ( ^.^ )\n > ^ <     > ^ <     > ^ <\n3 cats. 0 regrets.\nHint: a cat guards the vault...',
    coffee:'  ( (\n   ) )\n ........\n |      |]\n \\      /\n  `----`\nRefactoring fuel +100.',
    ascii:'██╗   ██╗████████╗\n██║   ██║╚══██╔══╝\n██║   ██║   ██║\n╚██╗ ██╔╝   ██║\n ╚████╔╝    ██║\n  ╚═══╝     ╚═╝',
    saymyname:"You're Heisenberg.\n...Or a developer exploring this terminal. 😎",
    sudo:'You are not in the sudoers file. This incident will be reported to the cats.',
    vault:'🔒 Cat vault! Password hint: the three words on my homepage, separated by spaces.\nType: unlock <password>',
    ls:'README.md  CV.md  projects/  cats/  .vault',
    date:()=>new Date().toLocaleString('en-GB',{dateStyle:'medium',timeStyle:'medium'})
  };
  const fortunes=['It works on my machine. — An ancient developer proverb','Ship small. Learn fast. Refactor thoughtfully.','A clean architecture begins with one good decision.','Somewhere a cat is sitting on a keyboard.'];
  function add(s,cls=''){const p=document.createElement('p');p.className=cls;p.textContent=String(s);log.appendChild(p);log.scrollTop=log.scrollHeight;}
  function run(raw){
    const command=raw.trim();if(!command)return;
    history.push(command);historyPos=history.length;
    const lower=command.toLowerCase().replace(/\s+/g,' ');
    if(lower==='clear'){log.replaceChildren();return;}
    add('$ '+command,'entered');
    if(lower==='history'){add(history.map((v,i)=>String(i+1).padStart(2,'0')+'  '+v).join('\n'));return;}
    if(lower==='roll'){add('🎲 '+String(Math.floor(Math.random()*6)+1));return;}
    if(lower==='fortune'){add(fortunes[Math.floor(Math.random()*fortunes.length)]);return;}
    if(lower==='open resume'||lower==='open github'){const url=lower==='open resume'?'https://github.com/w1adko/w1adko/blob/master/CV.md':'https://github.com/w1adko';add('Opening '+url);window.open(url,'_blank','noopener,noreferrer');return;}
    if(lower.startsWith('unlock ')){const password=lower.slice(7).replace(/[.!]/g,'').trim();if(password==='think architect build'){unlocked=true;add('🔓 VAULT UNLOCKED\nAchievement: CAT WHISPERER\n\n /\\_/\\\n( =^.^= )\n(")_(")\n\nThe true secret? The cats own the company.');}else add('Access denied. The cats are watching.');return;}
    if(lower==='secret'){add(unlocked?'Achievement unlocked: CAT WHISPERER 🐈':'Locked. Try vault.');return;}
    const result=Object.prototype.hasOwnProperty.call(messages,lower)?messages[lower]:null;
    add(result===null?'Command not found. Type help.':typeof result==='function'?result():result);
  }
  form.addEventListener('submit',e=>{e.preventDefault();run(input.value);input.value='';});
  input.addEventListener('keydown',e=>{if(e.key==='ArrowUp'||e.key==='ArrowDown'){e.preventDefault();historyPos=Math.max(0,Math.min(history.length,historyPos+(e.key==='ArrowUp'?-1:1)));input.value=history[historyPos]||'';input.setSelectionRange(input.value.length,input.value.length);}});
  const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();
})();