/* ---------------- topic classifier ---------------- */
const TOPICS_ITIL=[
 ['Guiding principles',/guiding principle|focus on value|start where you are|progress iteratively|collaborate and promote|think and work holistically|keep it simple|optimize and automate|optimise and automate/i],
 ['Four dimensions',/four dimensions|which dimension|dimension of service management|organizations and people|partners and suppliers|value streams and processes/i],
 ['Service value system',/service value system|\bsvs\b|governance|opportunity and demand|continual improvement model|continual improvement/i],
 ['Service value chain',/value chain|deliver and support|design and transition|obtain\/build/i],
 ['Change enablement',/change enablement|change control|normal change|standard change|emergency change|change schedule|change authority|\bchange\b.*\b(authoriz|assess|schedul)/i],
 ['Service desk & requests',/service desk|service request|request management|single point of contact/i],
 ['Service level & relationships',/service level|\bsla\b|relationship management|supplier management|watermelon|agreed.*targets/i],
 ['Monitoring, deployment & release',/monitoring|event management|deployment|release management|configuration management|asset management|configuration item/i],
 ['Incident & problem',/incident|problem|known error|workaround/i],
 ['Key concepts',/utility|warranty|outcome|output|co-creation|service offering|stakeholder|sponsor|consumer|\brisk\b|\bcost\b|what is a service|definition of a service|service relationship/i],
];
function topicOf(q,topics){
for(const [name,re] of topics) if(re.test(q.question)) return name;
const hay=q.question+' '+q.options.join(' ');
for(const [name,re] of topics) if(re.test(hay)) return name;
return 'General';
}
function ensureTopics(subject){
subject.questions.forEach(q=>{ if(!q.topic) q.topic=q.topic_hint||topicOf(q,subject.topics); });
}

/* ---------------- subjects ---------------- */
const SUBJECTS={
itil:{
  id:'itil', brand:'ITIL 4 Foundation', brandSpan:'Exam Simulator',
  title:'ITIL 4 Foundation — Exam Simulator',
  questions:QUESTIONS_ITIL,
  es:(typeof ES_TRANSLATIONS_ITIL!=='undefined')?ES_TRANSLATIONS_ITIL:{},
  topics:TOPICS_ITIL,
  passPct:65, secPerQ:90,
  lenOptions:[[40,'40 questions (official exam length)'],[20,'20 questions'],[60,'60 questions'],[0,'Everything in the bank']],
  defaultLen:'40',
  bankTag:'deduplicated · answers adjudicated',
  footer:'Consolidated from public GitHub question banks (Ditectrev, mtvbrianking) — duplicates merged, conflicting answers adjudicated against ITIL 4 doctrine. Study aid only; not affiliated with or endorsed by AXELOS or PeopleCert. ITIL® is a registered trade mark of AXELOS Limited.'
},
datadog:{
  id:'datadog', brand:'Datadog Fundamentals', brandSpan:'Exam Simulator',
  title:'Datadog Fundamentals — Exam Simulator',
  questions:(typeof QUESTIONS_DATADOG!=='undefined')?QUESTIONS_DATADOG:[],
  es:(typeof ES_TRANSLATIONS_DATADOG!=='undefined')?ES_TRANSLATIONS_DATADOG:{},
  topics:[],
  passPct:60, secPerQ:90,
  lenOptions:[[90,'90 questions (official exam length)'],[40,'40 questions'],[20,'20 questions'],[0,'Everything in the bank']],
  defaultLen:'90',
  bankTag:'community exam-prep bank',
  footer:'Community practice questions covering the Datadog Fundamentals certification syllabus. Study aid only; not affiliated with or endorsed by Datadog, Inc. ES tooltips for this bank are translated on demand rather than pre-translated.'
},
vcta:{
  id:'vcta', brand:'VMware VCTA', brandSpan:'Exam Simulator',
  title:'VMware VCTA — Exam Simulator',
  questions:(typeof QUESTIONS_VCTA!=='undefined')?QUESTIONS_VCTA:[],
  es:(typeof ES_TRANSLATIONS_VCTA!=='undefined')?ES_TRANSLATIONS_VCTA:{},
  topics:[],
  passPct:70, secPerQ:90,
  lenOptions:[[40,'40 questions'],[20,'20 questions'],[60,'60 questions'],[0,'Everything in the bank']],
  defaultLen:'40',
  bankTag:'VCF Compute, Network & Storage Fundamentals',
  footer:'Original practice questions written from the VMware Cloud Foundation 9.0 Compute, Network, and Storage Fundamentals lecture manuals. Question count, time limit, and pass mark are estimates, not the official exam values. Study aid only; not affiliated with or endorsed by Broadcom or VMware. ES tooltips are translated on demand.'
},
vcp:{
  id:'vcp', brand:'VMware VCP-VCF', brandSpan:'Exam Simulator',
  title:'VMware VCP-VCF — Exam Simulator',
  questions:(typeof QUESTIONS_VCP!=='undefined')?QUESTIONS_VCP:[],
  es:(typeof ES_TRANSLATIONS_VCP!=='undefined')?ES_TRANSLATIONS_VCP:{},
  topics:[],
  passPct:70, secPerQ:90,
  lenOptions:[[60,'60 questions'],[40,'40 questions'],[20,'20 questions'],[0,'Everything in the bank']],
  defaultLen:'60',
  bankTag:'VCF Build/Manage/Secure + Automate/Operate',
  footer:'Original practice questions written from the VMware Cloud Foundation 9.0 Build, Manage, and Secure and Automate and Operate lecture manuals. Question count, time limit, and pass mark are estimates, not the official exam values. Study aid only; not affiliated with or endorsed by Broadcom or VMware. ES tooltips are translated on demand.'
}
};
const SUBJECT_KEY='quiz-subject';
let SUBJECT=null, QMAP=null, browseInitedFor=null;
function populateLenOptions(){
const sel=$('len'); sel.innerHTML='';
SUBJECT.lenOptions.forEach(([val,label])=>{
  const o=document.createElement('option'); o.value=val; o.textContent=label; sel.appendChild(o);
});
sel.value=SUBJECT.defaultLen;
}
function setSubject(id){
const s=SUBJECTS[id];
if(!s) return;
SUBJECT=s;
ensureTopics(s);
QMAP=new Map(s.questions.map(q=>[q.id,q]));
try{ localStorage.setItem(SUBJECT_KEY,id); }catch(e){}
document.title=s.title;
$('brand-name').textContent=s.brand;
$('brand-span').textContent=s.brandSpan;
$('banktag').textContent=s.questions.length+' questions · '+s.bankTag;
$('subject-select').value=id;
$('site-footer').textContent=s.footer;
const mins=Math.round(Number(s.defaultLen)*s.secPerQ/60);
$('mode-exam-opt').textContent='Exam simulation — '+s.defaultLen+' questions, '+mins+' minutes, '+s.passPct+'% to pass';
populateLenOptions();
browseInitedFor=null;
}
function switchSubject(id){
if(!SUBJECT||id===SUBJECT.id) return;
if(session && !session.done){
  if(!confirm('Switching subject will discard your current exam progress. Continue?')){
    $('subject-select').value=SUBJECT.id; return;
  }
  clearSession(); session=null;
  if(tick){clearInterval(tick);tick=null;}
}
setSubject(id);
go('setup');
}

/* ---------------- translation (runtime, no key) ---------------- */
const GLOSSARY=[
 [/\bmesa de servicio\b/gi,'service desk'],[/\bmesa de ayuda\b/gi,'service desk'],
 [/\bcadena de valor del servicio\b/gi,'service value chain'],
 [/\bsistema de valor del servicio\b/gi,'service value system'],
 [/\bprincipio(s)? rector(es)?\b/gi,'principio$1 guía'],
 [/\bmejora continua\b/gi,'mejora continua'],
 [/\berror conocido\b/gi,'error conocido'],
 [/\bsolución alternativa\b/gi,'workaround'],
 [/\bhabilitación de cambios\b/gi,'change enablement'],
 [/\bgestión de incidentes\b/gi,'gestión de incidentes'],
 [/\belemento de configuración\b/gi,'configuration item'],
];
function polish(t){GLOSSARY.forEach(([re,to])=>t=t.replace(re,to));return t;}
function esEntry(id){
return (SUBJECT && SUBJECT.es[id]) || null;
}
function trBadge(enText,localText){
const wrap=document.createElement('span'); wrap.className='trword';
const badge=document.createElement('button'); badge.type='button'; badge.className='trbadge';
badge.textContent='ES'; badge.setAttribute('aria-label','Ver traducción');
const bubble=document.createElement('span'); bubble.className='bubble';
const tag=document.createElement('span'); tag.className='tag'; tag.textContent='Traducción automática';
const body=document.createElement('span'); body.textContent=localText||'…';
bubble.append(tag,body);
wrap.append(badge,bubble);
let ready=!!localText, loading=false;
async function ensure(){
  if(ready||loading) return;
  loading=true; body.textContent='Traduciendo…';
  const t=await translate(enText);
  body.textContent=t||'No se pudo traducir ahora — reintentá en unos segundos.';
  ready=true; loading=false;
}
badge.addEventListener('mouseenter',ensure);
badge.addEventListener('focus',ensure);
badge.addEventListener('click',e=>{ e.stopPropagation(); wrap.classList.toggle('show'); ensure(); });
return wrap;
}
const trCache=new Map();
async function translate(text){
if(trCache.has(text)) return trCache.get(text);
const chunks=text.match(/[\s\S]{1,480}(?=\s|$)|[\s\S]{1,480}/g)||[text];
try{
  const out=[];
  for(const c of chunks){
    const r=await fetch('https://api.mymemory.translated.net/get?q='+
      encodeURIComponent(c)+'&langpair=en|es');
    if(!r.ok) throw new Error('http '+r.status);
    const j=await r.json();
    const t=j?.responseData?.translatedText;
    if(!t) throw new Error('empty');
    out.push(t);
  }
  const res=polish(out.join(' '));
  trCache.set(text,res);
  return res;
}catch(e){ return null; }
}
/* ---------------- state ---------------- */
let session=null, tick=null;
const $=id=>document.getElementById(id);

function go(view){
['setup','exam','result','browse'].forEach(v=>$('v-'+v).classList.toggle('hidden',v!==view));
$('nav-exam').setAttribute('aria-current',view==='setup'||view==='exam'||view==='result');
$('nav-browse').setAttribute('aria-current',view==='browse');
if(view!=='exam'&&tick){clearInterval(tick);tick=null;}
if(view==='browse'&&browseInitedFor!==SUBJECT.id) initBrowse();
window.scrollTo(0,0);
}
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]];}return a;};

/* ---------------- resume-on-reload (localStorage) ---------------- */
const SESSION_KEY='quiz-session';
function saveSession(){
try{
  if(!session||session.done){ clearSession(); return; }
  const items=session.items.map(it=>{
    const orig=QMAP.get(it.id);
    return [it.id, it.options.map(o=>orig.options.indexOf(o))];
  });
  const picks=session.picks.map((p,i)=>p==null?-1:session.items[i].options.indexOf(p));
  const state={subj:SUBJECT.id,m:session.mode,l:session.left,p:session.pos,i:items,k:picks};
  localStorage.setItem(SESSION_KEY,JSON.stringify(state));
}catch(e){}
}
function clearSession(){
try{ localStorage.removeItem(SESSION_KEY); }catch(e){}
}
function restoreSession(){
try{
  const raw=localStorage.getItem(SESSION_KEY);
  if(!raw) return false;
  const state=JSON.parse(raw);
  if(!state||!Array.isArray(state.i)||!state.i.length||!Array.isArray(state.k)) return false;
  if(state.subj && SUBJECTS[state.subj] && state.subj!==SUBJECT.id) setSubject(state.subj);
  const items=state.i.map(([id,perm])=>{
    const orig=QMAP.get(id);
    if(!orig) throw new Error('unknown id '+id);
    return {...orig,options:perm.map(idx=>orig.options[idx])};
  });
  const picks=state.k.map((idx,i)=>idx<0?null:items[i].options[idx]);
  session={mode:state.m,items,picks,pos:state.p||0,left:state.l,done:false};
  return true;
}catch(e){ return false; }
}
function quitExam(){
clearSession(); session=null;
if(tick){clearInterval(tick);tick=null;}
go('setup');
}

function startExam(){
const mode=$('mode').value, n=parseInt($('len').value,10);
const pool=shuffle(SUBJECT.questions);
const picked=(n===0?pool:pool.slice(0,Math.min(n,pool.length)));
session={mode,items:picked.map(q=>({...q,options:shuffle(q.options)})),
  picks:new Array(picked.length).fill(null),pos:0,
  left:mode==='exam'?Math.round(picked.length*SUBJECT.secPerQ):null,done:false};
enterExam();
}
function enterExam(){
$('m-total').textContent=session.items.length;
buildRail(); renderQ(); go('exam'); saveSession();
if(session.left!=null){ updClock(); $('clock').classList.remove('hidden'); tick=setInterval(()=>{
  session.left--; updClock();
  if(session.left%10===0) saveSession();
  if(session.left<=0) finishExam(true);
},1000);} else $('clock').classList.add('hidden');
}
function updClock(){
const m=Math.floor(session.left/60), s=session.left%60;
$('m-time').textContent=m+':'+String(s).padStart(2,'0');
$('clock').classList.toggle('low',session.left<300);
}
function buildRail(){
const r=$('rail'); r.innerHTML='';
session.items.forEach((_,i)=>{
  const b=document.createElement('button');
  b.className='tick'; b.textContent=i+1; b.type='button';
  b.setAttribute('aria-label','Go to question '+(i+1));
  b.onclick=()=>{session.pos=i;renderQ();};
  r.appendChild(b);
});
}
function paintRail(){
[...$('rail').children].forEach((b,i)=>{
  b.className='tick';
  const picked=session.picks[i];
  if(session.done){
    if(picked==null) b.classList.add('bad');
    else b.classList.add(session.items[i].answers.includes(picked)?'ok':'bad');
  } else if(picked!=null) b.classList.add('done');
  if(session.items[i].needs_review) b.classList.add('flag');
  if(i===session.pos) b.classList.add('here');
});
}
function qImg(q){ if(!q.image) return null; const i=new Image(); i.className='qimg'; i.src=q.image; i.alt='Question exhibit'; return i; }
function renderQ(){
const q=session.items[session.pos];
const es=esEntry(q.id), orig=QMAP.get(q.id);
$('m-pos').textContent=session.pos+1;
$('m-done').textContent=session.picks.filter(p=>p!=null).length;
$('q-id').textContent=q.id.toUpperCase()+' · '+q.topic;
$('q-flag').textContent=q.needs_review?'⚑ flagged — sources disagree':'';
const qtextEl=$('q-text'); qtextEl.innerHTML='';
qtextEl.append(document.createTextNode(q.question), trBadge(q.question, es&&es.q));
const qi=qImg(q); if(qi) qtextEl.append(qi);
const box=$('q-opts'); box.innerHTML='';
const reveal=session.mode==='practice'&&session.picks[session.pos]!=null;
q.options.forEach((o,i)=>{
  const row=document.createElement('div'); row.className='opt-row';
  const b=document.createElement('button');
  b.type='button'; b.className='opt';
  b.setAttribute('aria-pressed',session.picks[session.pos]===o);
  b.innerHTML='<span class="k">'+'ABCDEFGH'[i]+'</span><span></span>';
  b.lastChild.textContent=o;
  if(reveal){
    b.disabled=true;
    if(q.answers.includes(o)) b.classList.add('correct');
    else if(session.picks[session.pos]===o) b.classList.add('wrong');
  } else b.onclick=()=>pick(o);
  row.appendChild(b);
  const oi=orig.options.indexOf(o);
  row.appendChild(trBadge(o, es&&es.o&&es.o[oi]));
  box.appendChild(row);
});
paintRail();
}
function pick(o){
session.picks[session.pos]=o;
saveSession();
if(session.mode==='practice') renderQ();
else { renderQ(); if(session.pos<session.items.length-1) setTimeout(()=>move(1),120); }
}
function move(d){
if(!session) return;
const n=session.pos+d;
if(n<0||n>=session.items.length) return;
session.pos=n; renderQ(); saveSession();
document.querySelector('.card').scrollIntoView({block:'start',behavior:'smooth'});
}
function finishExam(auto){
if(!auto){
  const un=session.picks.filter(p=>p==null).length;
  if(un && !confirm(un+' question'+(un>1?'s are':' is')+' unanswered. Submit anyway?')) return;
}
if(tick){clearInterval(tick);tick=null;}
session.done=true;
clearSession();
const total=session.items.length;
let right=0; const byTopic={}, misses=[];
session.items.forEach((q,i)=>{
  const p=session.picks[i], ok=p!=null&&q.answers.includes(p);
  byTopic[q.topic]??={n:0,ok:0};
  byTopic[q.topic].n++; if(ok){right++;byTopic[q.topic].ok++;}
  else misses.push({q,p});
});
const pct=Math.round(right/total*100), passed=pct>=SUBJECT.passPct;
$('verdict').className='verdict '+(passed?'pass':'fail');
$('r-word').textContent=passed?'PASS':'NOT YET';
$('r-score').textContent=right+' of '+total+' correct · '+pct+'% · pass mark '+SUBJECT.passPct+'%'+
  (auto?' · time expired':'');
const bars=$('r-bars'); bars.innerHTML='<div class="count">Where you stand, by syllabus area</div>';
Object.entries(byTopic).sort((a,b)=>a[1].ok/a[1].n-b[1].ok/b[1].n).forEach(([t,d])=>{
  const p=Math.round(d.ok/d.n*100);
  const el=document.createElement('div');
  el.className='bar'+(p<SUBJECT.passPct?' weak':'');
  el.innerHTML='<div class="lbl"><span></span><span>'+d.ok+'/'+d.n+' · '+p+'%</span></div>'+
    '<div class="track"><div class="fill" style="width:'+p+'%"></div></div>';
  el.querySelector('.lbl span').textContent=t;
  bars.appendChild(el);
});
const rev=$('r-review');
rev.innerHTML='<div class="count">'+(misses.length?misses.length+' to fix':'Nothing missed')+'</div>';
misses.forEach(({q,p})=>{
  const d=document.createElement('div'); d.className='miss';
  const qd=document.createElement('div'); qd.className='q'; qd.textContent=q.question;
  d.appendChild(qd); const mi=qImg(q); if(mi) d.appendChild(mi);
  const mk=(lbl,val,cls)=>{const r=document.createElement('div');r.className='row';
    const i=document.createElement('i');i.textContent=lbl;const s=document.createElement('span');
    s.className=cls;s.textContent=val;r.append(i,s);return r;};
  d.appendChild(mk('You',p??'— not answered','yours'));
  d.appendChild(mk('Answer',q.answers.join(' / '),'right'));
  d.appendChild(mk('Area',q.topic,''));
  if(q.needs_review){const f=document.createElement('div');f.className='flagline';
    f.textContent='⚑ Sources disagree on this one — verify against the official syllabus';d.appendChild(f);}
  rev.appendChild(d);
});
go('result');
}

/* ---------------- browse ---------------- */
function initBrowse(){
const sel=$('f-topic');
sel.innerHTML='<option value="">All areas</option>';
[...new Set(SUBJECT.questions.map(q=>q.topic))].sort().forEach(t=>{
  const o=document.createElement('option'); o.value=t; o.textContent=t; sel.appendChild(o);
});
browseInitedFor=SUBJECT.id;
renderBrowse();
}
function renderBrowse(){
const term=$('f-text').value.trim().toLowerCase();
const topic=$('f-topic').value, only=$('f-only').value;
const list=SUBJECT.questions.filter(q=>{
  if(topic&&q.topic!==topic) return false;
  if(only==='adj'&&!q.adjudicated) return false;
  if(only==='rev'&&!q.needs_review) return false;
  if(term&&!(q.question+' '+q.options.join(' ')).toLowerCase().includes(term)) return false;
  return true;
});
$('b-count').textContent=list.length+' of '+SUBJECT.questions.length+' questions';
const box=$('b-list'); box.innerHTML='';
list.slice(0,400).forEach(q=>{
  const es=esEntry(q.id);
  const d=document.createElement('details'); d.className='item';
  const s=document.createElement('summary');
  const n=document.createElement('span'); n.className='n'; n.textContent=q.id.toUpperCase();
  const t=document.createElement('span'); t.textContent=q.question;
  s.append(n,t,trBadge(q.question, es&&es.q)); d.appendChild(s);
  const b=document.createElement('div'); b.className='body';
  const bi=qImg(q); if(bi) b.appendChild(bi);
  q.options.forEach((o,i)=>{
    const r=document.createElement('div');
    r.className='ans'+(q.answers.includes(o)?' is-right':'');
    const m=document.createElement('span'); m.className='m';
    m.textContent=q.answers.includes(o)?'✓':'ABCDEFGH'[i];
    const x=document.createElement('span'); x.textContent=o;
    r.append(m,x,trBadge(o, es&&es.o&&es.o[i])); b.appendChild(r);
  });
  const meta=document.createElement('div'); meta.className='src';
  meta.textContent=q.topic+' · '+(q.sources[0]==='original'?'original — exam-style':q.sources.join(', '))+(q.adjudicated?' · answer corrected':'');
  b.appendChild(meta);
  if(q.needs_review){const f=document.createElement('div');f.className='flagline';
    f.textContent='⚑ Sources disagree — verify against the official syllabus';b.appendChild(f);}
  d.appendChild(b); box.appendChild(d);
});
if(list.length>400){const p=document.createElement('div');p.className='count';
  p.textContent='Showing the first 400 — narrow the search to see the rest.';box.appendChild(p);}
}
function toggleAll(open){document.querySelectorAll('#b-list details').forEach(d=>d.open=open);}

document.addEventListener('keydown',e=>{
if($('v-exam').classList.contains('hidden'))return;
if(e.key==='ArrowRight')move(1);
if(e.key==='ArrowLeft')move(-1);
const i='abcdefgh'.indexOf(e.key.toLowerCase());
if(i>=0){const b=$('q-opts').querySelectorAll('.opt')[i]; if(b&&!b.disabled)b.click();}
});
(function(){
let initial='datadog';
try{
  const saved=localStorage.getItem(SUBJECT_KEY);
  if(saved && SUBJECTS[saved]) initial=saved;
}catch(e){}
setSubject(initial);
})();
if(restoreSession()) enterExam(); else go('setup');
