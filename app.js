(function(){
var idx=window.GT_INDEX||[];
var q=document.getElementById('q'),res=document.getElementById('results'),chips=document.getElementById('chips'),cat='';
var params=new URLSearchParams(location.search);
if(params.get('q'))q.value=params.get('q');
function render(){
  var term=(q.value||'').toLowerCase().trim();
  var hits=idx.filter(function(e){return (!cat||e.cs===cat)&&(!term||e.n.toLowerCase().indexOf(term)>-1||e.m.toLowerCase().indexOf(term)>-1||e.c.toLowerCase().indexOf(term)>-1);});
  res.innerHTML=hits.length?hits.map(function(e){return '<article class="card"><h3><a href="/'+e.u+'">'+e.n+'</a></h3><p class="card-meta">'+e.c+' · '+e.m+'</p></article>';}).join(''):'<p class="note">No entries match yet. Try a gravy, a plate, or a maker.</p>';
}
q.addEventListener('input',render);
document.getElementById('search-form').addEventListener('submit',function(ev){ev.preventDefault();render();});
chips.addEventListener('click',function(ev){var b=ev.target.closest('button[data-cat]');if(!b)return;cat=b.getAttribute('data-cat');chips.querySelectorAll('.chip').forEach(function(x){x.classList.remove('active');});b.classList.add('active');render();});
render();
})();
