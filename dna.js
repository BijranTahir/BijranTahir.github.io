import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const canvas=document.getElementById("dnaCanvas");
if(!canvas) throw new Error("dnaCanvas not found");

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(32,1,0.1,100);
camera.position.set(0,0,10.5);

const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:"high-performance"});
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.7));
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.setClearColor(0x000000,0);

const group=new THREE.Group();
group.rotation.x=0.06;
scene.add(group);

scene.add(new THREE.AmbientLight(0x8deee0,1.2));
const key=new THREE.PointLight(0x42e0b0,18,20); key.position.set(3,3,5); scene.add(key);
const fill=new THREE.PointLight(0x43bfff,11,18); fill.position.set(-4,-2,4); scene.add(fill);
const rim=new THREE.PointLight(0x9ffff0,8,16); rim.position.set(0,4,-3); scene.add(rim);

const cyan=new THREE.MeshStandardMaterial({color:0x38e8b7,emissive:0x0b8f70,emissiveIntensity:1.1,metalness:.25,roughness:.3});
const blue=new THREE.MeshStandardMaterial({color:0x55cfff,emissive:0x0b668c,emissiveIntensity:.9,metalness:.25,roughness:.28});
const baseA=new THREE.MeshStandardMaterial({color:0xffd58a,emissive:0x8b4d16,emissiveIntensity:.55,metalness:.15,roughness:.35});
const baseB=new THREE.MeshStandardMaterial({color:0x9feeff,emissive:0x126c8b,emissiveIntensity:.7,metalness:.15,roughness:.3});

function helixPoints(phase){
  const pts=[];
  const turns=2.35;
  const count=180;
  const radius=1.45;
  const height=7.3;
  for(let i=0;i<count;i++){
    const t=i/(count-1);
    const a=t*Math.PI*2*turns+phase;
    pts.push(new THREE.Vector3(Math.cos(a)*radius, (t-.5)*height, Math.sin(a)*radius));
  }
  return pts;
}
function tube(points,material){
  const curve=new THREE.CatmullRomCurve3(points);
  return new THREE.Mesh(new THREE.TubeGeometry(curve,180,.105,10,false),material);
}
group.add(tube(helixPoints(0),cyan));
group.add(tube(helixPoints(Math.PI),blue));

function cylinderBetween(a,b,r,material){
  const dir=new THREE.Vector3().subVectors(b,a);
  const len=dir.length();
  const geo=new THREE.CylinderGeometry(r,r,len,10);
  const m=new THREE.Mesh(geo,material);
  m.position.copy(a).add(b).multiplyScalar(.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize());
  return m;
}
const rungCount=34;
for(let i=1;i<rungCount;i++){
  const t=i/rungCount;
  const a=t*Math.PI*2*2.35;
  const y=(t-.5)*7.3;
  const p1=new THREE.Vector3(Math.cos(a)*1.45,y,Math.sin(a)*1.45);
  const p2=new THREE.Vector3(Math.cos(a+Math.PI)*1.45,y,Math.sin(a+Math.PI)*1.45);
  const rung=cylinderBetween(p1,p2,.055,i%2?baseA:baseB);
  group.add(rung);
  const s1=new THREE.Mesh(new THREE.SphereGeometry(.13,12,12),i%2?baseB:baseA);
  const s2=new THREE.Mesh(new THREE.SphereGeometry(.13,12,12),i%2?baseA:baseB);
  s1.position.copy(p1); s2.position.copy(p2);
  group.add(s1,s2);
}

// Subtle surrounding molecular particles
const particleGroup=new THREE.Group();
for(let i=0;i<70;i++){
  const a=Math.random()*Math.PI*2;
  const r=2.1+Math.random()*1.7;
  const y=(Math.random()-.5)*8.2;
  const p=new THREE.Mesh(
    new THREE.SphereGeometry(.025+Math.random()*.045,8,8),
    new THREE.MeshBasicMaterial({color:i%3?0x42e0b0:0x65dfff,transparent:true,opacity:.35+Math.random()*.45})
  );
  p.position.set(Math.cos(a)*r,y,Math.sin(a)*r);
  particleGroup.add(p);
}
group.add(particleGroup);

// A few recognizable molecular clusters
for(let j=0;j<5;j++){
  const cluster=new THREE.Group();
  const center=new THREE.Mesh(new THREE.SphereGeometry(.14,12,12),new THREE.MeshStandardMaterial({color:0x8fffe8,emissive:0x1d8c77,emissiveIntensity:.8}));
  cluster.add(center);
  for(let k=0;k<3;k++){
    const ang=k*Math.PI*2/3;
    const atom=new THREE.Mesh(new THREE.SphereGeometry(.08,10,10),new THREE.MeshStandardMaterial({color:0x65dfff,emissive:0x11607c,emissiveIntensity:.7}));
    atom.position.set(Math.cos(ang)*.3,Math.sin(ang)*.3,0);
    cluster.add(atom, cylinderBetween(new THREE.Vector3(0,0,0),atom.position,.025,baseB));
  }
  const a=Math.random()*Math.PI*2, r=2.6+Math.random()*1.1;
  cluster.position.set(Math.cos(a)*r,(Math.random()-.5)*6,Math.sin(a)*r);
  cluster.userData.speed=.15+Math.random()*.2;
  particleGroup.add(cluster);
}

let pointerX=0,pointerY=0;
window.addEventListener("pointermove",e=>{
  pointerX=(e.clientX/window.innerWidth-.5);
  pointerY=(e.clientY/window.innerHeight-.5);
},{passive:true});

function resize(){
  const rect=canvas.getBoundingClientRect();
  const w=Math.max(1,rect.width),h=Math.max(1,rect.height);
  renderer.setSize(w,h,false);
  camera.aspect=w/h;
  camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(canvas);
resize();

let last=performance.now();
function animate(now){
  const dt=Math.min(.05,(now-last)/1000); last=now;
  group.rotation.y+=dt*.34;
  group.rotation.x=.08+pointerY*.08;
  group.rotation.z=pointerX*.035;
  particleGroup.children.forEach((p,i)=>{
    if(p.userData.speed) p.position.y+=Math.sin(now*.001*p.userData.speed+i)*dt*.06;
  });
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

const reduce=matchMedia("(prefers-reduced-motion: reduce)");
if(reduce.matches) group.rotation.y=.35;
