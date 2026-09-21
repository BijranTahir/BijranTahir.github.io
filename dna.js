
(() => {
  const canvas = document.getElementById("dnaCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  let W = 1, H = 1, dpr = 1;
  let t = 0;
  let px = 0, py = 0;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    const r = canvas.getBoundingClientRect();
    W = Math.max(1, r.width);
    H = Math.max(1, r.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  new ResizeObserver(resize).observe(canvas);
  resize();

  window.addEventListener("pointermove", e => {
    px = (e.clientX / window.innerWidth - .5);
    py = (e.clientY / window.innerHeight - .5);
  }, {passive:true});

  const TAU = Math.PI * 2;
  const N = 170;

  function project(theta, y, phase, scale) {
    const r = Math.min(W, H) * 0.18 * scale;
    const a = theta + phase;
    const depth = Math.sin(a);
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const perspective = 1 + z / (r * 3.8);
    return {
      x: W * .48 + x * perspective + px * 8,
      y: H * .50 + y * perspective + py * 10,
      z,
      s: perspective
    };
  }

  function glowStroke(points, color, width, blur) {
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.strokeStyle = color;
    ctx.globalAlpha = .30;
    ctx.lineWidth = width * 2.8;
    ctx.beginPath();
    points.forEach((p,i)=> i ? ctx.lineTo(p.x,p.y) : ctx.moveTo(p.x,p.y));
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = blur * .55;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.restore();
  }

  function drawParticle(x,y,r,color,a) {
    ctx.save();
    ctx.globalAlpha=a;
    ctx.fillStyle=color;
    ctx.shadowColor=color;
    ctx.shadowBlur=14;
    ctx.beginPath();
    ctx.arc(x,y,r,0,TAU);
    ctx.fill();
    ctx.restore();
  }

  function frame() {
    const speed = reduced ? 0.001 : 0.0009;
    t += speed * 16.67;

    ctx.clearRect(0,0,W,H);

    // Atmospheric halo behind the DNA.
    const halo = ctx.createRadialGradient(W*.48,H*.48,0,W*.48,H*.48,Math.min(W,H)*.48);
    halo.addColorStop(0,"rgba(47,225,181,.14)");
    halo.addColorStop(.48,"rgba(20,137,117,.07)");
    halo.addColorStop(1,"rgba(0,0,0,0)");
    ctx.fillStyle=halo;
    ctx.fillRect(0,0,W,H);

    const scale = Math.min(1.15, Math.max(.78, W/390));
    const height = Math.min(H*.84, 520);
    const centerY = H*.50;
    const phase = reduced ? 0.35 : t;

    const left=[], right=[];
    for(let i=0;i<N;i++){
      const u=i/(N-1);
      const theta=u*TAU*2.25 + phase;
      const y=(u-.5)*height;
      left.push(project(theta,y,0,scale));
      right.push(project(theta,y,Math.PI,scale));
    }

    // Floating molecular particles.
    for(let i=0;i<22;i++){
      const a=i*2.399 + t*.18;
      const rr=Math.min(W,H)*(.20 + (i%5)*.028);
      const x=W*.48+Math.cos(a)*rr;
      const y=centerY+Math.sin(a*1.23)*height*.47;
      drawParticle(x,y,1.5+(i%3), i%2 ? "#57dfff" : "#5cf2c8", .28+(i%4)*.08);
    }

    // Orbit lines.
    ctx.save();
    ctx.translate(W*.48,centerY);
    ctx.rotate(-.24 + px*.08);
    ctx.strokeStyle="rgba(91,239,205,.17)";
    ctx.lineWidth=1;
    for(let k=0;k<3;k++){
      ctx.beginPath();
      ctx.ellipse(0,0,Math.min(W,H)*(.34+k*.035),height*(.14+k*.02),k*.45,0,TAU);
      ctx.stroke();
    }
    ctx.restore();

    // Base-pair rungs first so the backbones sit visually above them.
    for(let i=3;i<N-3;i+=5){
      const a=left[i], b=right[i];
      const grad=ctx.createLinearGradient(a.x,a.y,b.x,b.y);
      grad.addColorStop(0,"#54f2ca");
      grad.addColorStop(.48,"#e0fff8");
      grad.addColorStop(1,"#61dfff");

      ctx.save();
      ctx.lineCap="round";
      ctx.shadowColor="#49e7c5";
      ctx.shadowBlur=10;
      ctx.globalAlpha=.72;
      ctx.strokeStyle=grad;
      ctx.lineWidth=Math.max(2.5, 5*a.s);
      ctx.beginPath();
      ctx.moveTo(a.x,a.y);
      ctx.lineTo(b.x,b.y);
      ctx.stroke();
      ctx.restore();

      drawParticle(a.x,a.y,Math.max(2.2,4.5*a.s),"#8cfff0",.9);
      drawParticle(b.x,b.y,Math.max(2.2,4.5*b.s),"#76ddff",.9);
    }

    // The two unmistakable DNA backbones.
    glowStroke(left,"#42e7b8",6,18);
    glowStroke(right,"#54dfff",6,18);

    // Subtle highlight beads on alternating backbone segments.
    for(let i=8;i<N;i+=12){
      drawParticle(left[i].x,left[i].y,2.8,"#d5fff6",.9);
      drawParticle(right[i].x,right[i].y,2.8,"#bdefff",.9);
    }

    // Molecular clusters around the helix.
    for(let j=0;j<5;j++){
      const a=j*1.3+t*.16;
      const rr=Math.min(W,H)*(.25+.025*j);
      const cx=W*.48+Math.cos(a)*rr;
      const cy=centerY+Math.sin(a*1.4)*height*.38;
      const nodes=[];
      for(let k=0;k<3;k++){
        const na=k*TAU/3+a;
        nodes.push([cx+Math.cos(na)*12,cy+Math.sin(na)*12]);
      }
      ctx.save();
      ctx.strokeStyle="rgba(104,224,255,.35)";
      ctx.lineWidth=2;
      nodes.forEach(n=>{
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(n[0],n[1]); ctx.stroke();
      });
      nodes.forEach(n=>drawParticle(n[0],n[1],4,"#5bdfff",.75));
      drawParticle(cx,cy,5,"#6df3cf",.85);
      ctx.restore();
    }

    requestAnimationFrame(frame);
  }
  frame();
})();
