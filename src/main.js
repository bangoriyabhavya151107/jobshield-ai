import "./style.css";
import { supabase, isConfigured } from "./lib/supabase.js";
const $ = (id) => document.getElementById(id);
let mode = "login", user = null;
const formMessage = $("formMessage"), authMessage = $("authMessage");
function msg(el, text, type="info") { el.textContent=text; el.className="message "+type; }
function esc(s="") { return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function setUser(u) { user=u; $("accountLabel").textContent=u?.email || "Not signed in"; $("signOutBtn").classList.toggle("hidden",!u); if(u) loadHistory(); else $("historyList").textContent="Sign in to see your saved reports."; }
function setMode(m) { mode=m; $("loginTab").classList.toggle("active",m==="login"); $("signupTab").classList.toggle("active",m==="signup"); $("authSubmit").textContent=m==="login"?"Sign in":"Create account"; }
$("loginTab").onclick=()=>setMode("login"); $("signupTab").onclick=()=>setMode("signup");
$("offerText").addEventListener("input",()=>{$("charCount").textContent=$("offerText").value.length+" / 10,000";});
$("authForm").addEventListener("submit",async e=>{
 e.preventDefault(); if(!supabase){msg(authMessage,"Configure Supabase values in .env first.","error");return;}
 const email=$("authEmail").value.trim(), password=$("authPassword").value; $("authSubmit").disabled=true;
 try {
  if(mode==="signup"){const {data,error}=await supabase.auth.signUp({email,password});if(error)throw error;if(data.session?.user){setUser(data.session.user);msg(authMessage,"Account created and signed in.","success");}else msg(authMessage,"Account created. Check your email and confirm it before signing in.","success");}
  else {const {data,error}=await supabase.auth.signInWithPassword({email,password});if(error)throw error;setUser(data.user);msg(authMessage,"You are signed in.","success");}
 } catch(err){msg(authMessage,err.message,"error");} finally{$("authSubmit").disabled=false;setMode(mode);}
});
$("signOutBtn").onclick=async()=>{if(!supabase)return;const {error}=await supabase.auth.signOut();if(error)msg(authMessage,error.message,"error");else{setUser(null);msg(authMessage,"Signed out.","success");}};
function renderReport(r){
 const arr=(a,empty)=>Array.isArray(a)&&a.length?`<ul>${a.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:`<p>${empty}</p>`;
 $("resultContent").innerHTML=`<div class="report"><div class="score"><strong>${r.risk_score}/100</strong><b class="risk ${r.risk_level.toLowerCase()}">${esc(r.risk_level)} RISK</b><p>Estimated from the text you submitted.</p></div><div class="explain"><h3>AI explanation</h3><p>${esc(r.explanation)}</p><aside>This is not proof that the offer is genuine or fake. This tool has not independently verified the company, recruiter or URL.</aside></div></div><div class="grid report-grid"><article><b>🚩 Possible warning signs</b>${arr(r.warning_signs,"No specific warning signs identified. This does not guarantee safety.")}</article><article><b>✓ Positive signals</b>${arr(r.positive_signs,"No clear positive signals supported by the text.")}</article><article><b>🛡 Safety recommendations</b>${arr(r.safety_recommendations,"No extra recommendations returned.")}</article><article><b>🔎 Verification steps</b>${arr(r.verification_steps,"Verify using independently found official channels.")}</article><article><b>ⓘ Uncertainty notes</b>${arr(r.uncertainty_notes,"AI can miss context or make mistakes.")}</article></div>`;
 $("resultSection").classList.remove("hidden"); $("resultSection").scrollIntoView({behavior:"smooth"});
}
$("analyzeForm").addEventListener("submit",async e=>{
 e.preventDefault(); if(!supabase){msg(formMessage,"Configure Supabase values in .env first.","error");return;}
 if(!user){msg(formMessage,"Please sign in or create an account below first.","error");$("account").scrollIntoView({behavior:"smooth"});return;}
 const text=$("offerText").value.trim();if(text.length<30){msg(formMessage,"Please enter at least 30 characters.","error");return;}
 const btn=$("analyzeBtn");btn.disabled=true;btn.textContent="Analyzing securely…";
 try{const {data,error}=await supabase.functions.invoke("analyze-offer",{body:{offerText:text,companyName:$("companyName").value.trim(),offerType:$("offerType").value}});if(error)throw error;if(!data?.report)throw new Error(data?.error||"Unexpected response");renderReport(data.report);msg(formMessage,"Analysis complete. Your report was saved privately.","success");await loadHistory();}
 catch(err){msg(formMessage,err.message||"Analysis failed. Check the function deployment and try again.","error");}
 finally{btn.disabled=false;btn.textContent="Analyze with AI →";}
});
async function loadHistory(){
 if(!supabase||!user)return;
 $("historyList").textContent="Loading…";
 const {data,error}=await supabase.from("scan_reports").select("company_name,offer_type,risk_score,risk_level,created_at").order("created_at",{ascending:false}).limit(10);
 if(error){$("historyList").textContent="History error: "+error.message;return;}
 if(!data.length){$("historyList").textContent="No scans yet. Analyze your first offer.";return;}
 $("historyList").innerHTML=data.map(r=>`<div class="history-row"><div><b>${esc(r.company_name||"Unnamed opportunity")}</b><small>${esc(r.offer_type)} · ${new Date(r.created_at).toLocaleString()}</small></div><b>${r.risk_score}/100 · ${esc(r.risk_level)}</b></div>`).join("");
}
$("refreshHistoryBtn").onclick=loadHistory;
if(isConfigured){supabase.auth.getSession().then(({data})=>setUser(data.session?.user||null));supabase.auth.onAuthStateChange((_event,session)=>setUser(session?.user||null));}
else msg(authMessage,"Setup required: create .env using .env.example. Only Supabase public values go here; never put your Gemini key in the browser.","error");
