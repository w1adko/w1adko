(() => {
  'use strict';
  const dialog=document.getElementById('project-modal');
  const title=document.getElementById('project-modal-title');
  const content=document.getElementById('project-modal-content');
  if(!dialog||!title||!content||typeof dialog.showModal!=='function')return;
  for(const button of document.querySelectorAll('.project-modal-trigger')){
    button.addEventListener('click',()=>{
      const card=button.closest('article');
      const source=card?.querySelector('.project-detail-template');
      const heading=card?.querySelector('h3');
      if(!source||!heading)return;
      title.textContent=heading.textContent;
      content.replaceChildren(source.content.cloneNode(true));
      dialog.showModal();
    });
  }
  dialog.querySelector('.project-modal-close')?.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
})();
