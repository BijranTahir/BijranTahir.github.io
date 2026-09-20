const state={projects:[],library:[],research:[],timeline:[]};
async function load(){
  for(const k of ["projects","library","research","timeline"]){
    try{state[k]=await fetch(`${k}.json`).then(r=>r.json())}catch(e){state[k]=[]}
  }
  renderResearch(); renderProjects("all"); renderLibrary(); renderTimeline();
}
const esc=s=>String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
function renderResearch(){document.querySelector("#research-grid").innerHTML=state.research.map((x,i)=>`<article class="card"><span class="num">0${i+1}</span><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p></article>`).join("")}
function renderProjects(filter){const xs=state.projects.filter(x=>filter==="all"||x.type===filter);document.querySelector("#project-grid").innerHTML=xs.map(x=>`<article class="card"><span class="num">${esc(x.category||"WORK")}</span><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p><small>${esc(x.year||"")}</small></article>`).join("")}
function renderLibrary(){
 const q=(document.querySelector("#search").value||"").toLowerCase();
 const xs=state.library.filter(x=>(`${x.title} ${x.description} ${x.type}`).toLowerCase().includes(q));
 document.querySelector("#count").textContent=`${xs.length} item${xs.length===1?"":"s"}`;
 document.querySelector("#library-grid").innerHTML=xs.map(x=>`<a class="library-item" href="${esc(x.file)}"><b>${esc(x.title)}</b><span>${esc(x.description||"")}</span><i class="tag">${esc(x.type||"file")}</i></a>`).join("")||`<p>No matching files yet.</p>`;
}
function renderTimeline(){document.querySelector("#timeline").innerHTML=state.timeline.map(x=>`<article class="event"><time>${esc(x.year)}</time><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p></article>`).join("")}
document.querySelector("#search").addEventListener("input",renderLibrary);
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProjects(b.dataset.filter)}));
document.querySelector("#theme").addEventListener("click",()=>{document.body.classList.toggle("light");localStorage.theme=document.body.classList.contains("light")?"light":"dark"});
if(localStorage.theme==="light")document.body.classList.add("light");
document.querySelector(".menu").addEventListener("click",()=>document.querySelector(".nav nav").classList.toggle("open"));
load();
