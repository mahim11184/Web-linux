(() => {
  const clock=document.getElementById("clock"),date=document.getElementById("date");
  const startButton=document.getElementById("startButton"),taskStart=document.getElementById("taskStart");
  const startMenu=document.getElementById("startMenu"),toast=document.getElementById("toast");
  let toastTimer;
  function updateClock(){const now=new Date();clock.textContent=now.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});date.textContent=now.toLocaleDateString([],{month:"short",day:"numeric",year:"numeric"});}
  function toggleMenu(force){const open=typeof force==="boolean"?force:startMenu.hidden;startMenu.hidden=!open;startButton.setAttribute("aria-expanded",String(open));}
  function showToast(message){toast.textContent=message;toast.classList.add("visible");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("visible"),2600);}
  startButton.addEventListener("click",()=>toggleMenu());taskStart.addEventListener("click",()=>toggleMenu());
  document.querySelectorAll("[data-app]").forEach(button=>button.addEventListener("click",()=>{
    const messages={browser:"Firefox ESR is running this desktop in kiosk mode.",files:"The local workspace is available at /home/web.",settings:"System settings are planned for a future build.",about:"Web Linux is a Buildroot-based Linux system with a Gecko web desktop."};
    toggleMenu(false);showToast(messages[button.dataset.app]||"Shortcut unavailable.");
  }));
  document.addEventListener("click",event=>{if(!startMenu.contains(event.target)&&event.target!==startButton&&event.target!==taskStart)toggleMenu(false);});
  document.addEventListener("keydown",event=>{if(event.key==="Escape")toggleMenu(false);});
  updateClock();setInterval(updateClock,15000);
})();
