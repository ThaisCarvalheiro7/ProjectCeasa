(function(){
  const data = [2400, 3100, 2850, 4200, 3700, 4900, 5200];
  const months = ['Out','Nov','Dez','Jan','Fev','Mar','Abr'];
  const W = 460, H = 200, padL = 50, padR = 16, padT = 14, padB = 36;
  const maxVal = 6000;
  const svg = document.getElementById('lineChart');
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
 
  // gridlines
  [0,1500,3000,4500,6000].forEach(v => {
    const y = padT + chartH - (v/maxVal)*chartH;
    const line = el('line',{x1:padL,y1:y,x2:W-padR,y2:y,stroke:'#E2E8DF','stroke-width':'1'});
    svg.appendChild(line);
    const txt = el('text',{x:padL-6,y:y+4,'text-anchor':'end',fill:'#9aab94','font-size':'10','font-family':'DM Mono,monospace'});
    txt.textContent = v===0?'0':v>=1000?(v/1000)+'k':'';
    svg.appendChild(txt);
  });
 
  // area fill
  const xs = data.map((_,i)=> padL + (i/(data.length-1))*chartW);
  const ys = data.map(v=> padT + chartH - (v/maxVal)*chartH);
  let areaD = `M${xs[0]},${ys[0]}`;
  for(let i=1;i<xs.length;i++){
    const cx=(xs[i-1]+xs[i])/2;
    areaD += ` C${cx},${ys[i-1]} ${cx},${ys[i]} ${xs[i]},${ys[i]}`;
  }
  areaD += ` L${xs[xs.length-1]},${padT+chartH} L${xs[0]},${padT+chartH} Z`;
  const area = el('path',{d:areaD,fill:'rgba(45,155,78,.12)',stroke:'none'});
  svg.appendChild(area);
 
  // line
  let pathD = `M${xs[0]},${ys[0]}`;
  for(let i=1;i<xs.length;i++){
    const cx=(xs[i-1]+xs[i])/2;
    pathD += ` C${cx},${ys[i-1]} ${cx},${ys[i]} ${xs[i]},${ys[i]}`;
  }
  const path = el('path',{d:pathD,fill:'none',stroke:'#2D9B4E','stroke-width':'2.5','stroke-linecap':'round'});
  svg.appendChild(path);
 
  // dots + month labels
  xs.forEach((x,i)=>{
    const circle = el('circle',{cx:x,cy:ys[i],r:'5',fill:'#2D9B4E',stroke:'#fff','stroke-width':'2'});
    svg.appendChild(circle);
    const txt = el('text',{x:x,y:H-padB+18,'text-anchor':'middle',fill:'#6B7C65','font-size':'11','font-family':'DM Sans,sans-serif'});
    txt.textContent = months[i];
    svg.appendChild(txt);
  });
})();
 
/* ── BAR CHART ──────────────────────────── */
(function(){
  const data = [40,58,50,72,65,78,92];
  const months = ['Out','Nov','Dez','Jan','Fev','Mar','Abr'];
  const W = 460, H = 200, padL = 40, padR = 12, padT = 14, padB = 36;
  const maxVal = 100;
  const svg = document.getElementById('barChart');
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const barW = (chartW / data.length) * 0.55;
 
  // gridlines
  [0,25,50,75,100].forEach(v=>{
    const y = padT + chartH - (v/maxVal)*chartH;
    const line = el('line',{x1:padL,y1:y,x2:W-padR,y2:y,stroke:'#E2E8DF','stroke-width':'1'});
    svg.appendChild(line);
    const txt = el('text',{x:padL-6,y:y+4,'text-anchor':'end',fill:'#9aab94','font-size':'10','font-family':'DM Mono,monospace'});
    txt.textContent = v;
    svg.appendChild(txt);
  });
 
  data.forEach((v,i)=>{
    const slotW = chartW / data.length;
    const x = padL + i*slotW + (slotW-barW)/2;
    const barH = (v/maxVal)*chartH;
    const y = padT + chartH - barH;
    const rect = el('rect',{x,y,width:barW,height:barH,fill:'#F5A623',rx:'5'});
    svg.appendChild(rect);
    const txt = el('text',{x:x+barW/2,y:H-padB+18,'text-anchor':'middle',fill:'#6B7C65','font-size':'11','font-family':'DM Sans,sans-serif'});
    txt.textContent = months[i];
    svg.appendChild(txt);
  });
})();
 
function el(tag, attrs){
  const e = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));
  return e;
}