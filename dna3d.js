/* Tahir Ahmad Bijran — Realistic 3D molecular DNA hero */
(() => {
  const mount = document.getElementById("dna3d");
  if (!mount) return;

  const sources = [
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/three.js/r180/three.min.js"
  ];

  const load = src => new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });

  async function init() {
    if (!window.THREE) {
      for (const src of sources) {
        try { await load(src); if (window.THREE) break; } catch {}
      }
    }
    if (!window.THREE) {
      mount.innerHTML = '<div style="height:100%;display:grid;place-items:center;color:#42e0b0;font:700 11px system-ui;letter-spacing:.18em;text-align:center">3D DNA<br>WEBGL UNAVAILABLE</div>';
      return;
    }

    const T = window.THREE;
    const scene = new T.Scene();
    scene.fog = new T.FogExp2(0x071310, 0.055);

    const camera = new T.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 13);

    const renderer = new T.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.6));
    renderer.setClearColor(0x000000, 0);
    if ("outputColorSpace" in renderer) renderer.outputColorSpace = T.SRGBColorSpace;
    mount.replaceChildren(renderer.domElement);

    scene.add(new T.HemisphereLight(0x9affed, 0x02100d, 1.8));

    const lights = [
      [0x52efc8, 45, [4, 4, 7]],
      [0x55cfff, 28, [-5, -2, 5]],
      [0x9ffff0, 18, [0, -5, -4]]
    ];
    lights.forEach(([c,i,p]) => {
      const l = new T.PointLight(c,i,24);
      l.position.set(...p);
      scene.add(l);
    });

    const root = new T.Group();
    scene.add(root);

    const strandA = new T.MeshPhysicalMaterial({
      color: 0x27dca8, emissive: 0x063d31, emissiveIntensity: .7,
      roughness: .24, metalness: .15, clearcoat: .8
    });
    const strandB = new T.MeshPhysicalMaterial({
      color: 0x48cfff, emissive: 0x073b55, emissiveIntensity: .7,
      roughness: .22, metalness: .15, clearcoat: .8
    });

    const baseMats = [0xf4b36a,0x68d7ff,0x9fffe8,0xff8ea6].map(c =>
      new T.MeshPhysicalMaterial({
        color:c, emissive:c, emissiveIntensity:.12,
        roughness:.28, clearcoat:.7
      })
    );

    const turns = 2.55;
    const pairs = 42;
    const height = 8.2;
    const radius = 1.65;

    const point = (t, phase) => {
      const a = t * Math.PI * 2 * turns + phase;
      return new T.Vector3(
        Math.cos(a) * radius,
        (t - .5) * height,
        Math.sin(a) * radius
      );
    };

    function makeStrand(phase, material) {
      const pts = [];
      for (let i=0;i<=160;i++) pts.push(point(i/160,phase));
      const curve = new T.CatmullRomCurve3(pts);
      root.add(new T.Mesh(
        new T.TubeGeometry(curve,220,.11,14,false),
        material
      ));
    }

    makeStrand(0,strandA);
    makeStrand(Math.PI,strandB);

    const phosphate = new T.SphereGeometry(.18,18,14);
    const sugar = new T.TorusGeometry(.18,.065,10,18);

    function cylinderBetween(a,b,r,material) {
      const d = b.clone().sub(a);
      const mesh = new T.Mesh(
        new T.CylinderGeometry(r,r,d.length(),12),
        material
      );
      mesh.position.copy(a).add(b).multiplyScalar(.5);
      mesh.quaternion.setFromUnitVectors(
        new T.Vector3(0,1,0),
        d.normalize()
      );
      return mesh;
    }

    for (let i=0;i<pairs;i++) {
      const t=(i+.5)/pairs;
      const a=point(t,0);
      const b=point(t,Math.PI);

      const pa=new T.Mesh(phosphate,strandA);
      const pb=new T.Mesh(phosphate,strandB);
      pa.position.copy(a);
      pb.position.copy(b);
      root.add(pa,pb);

      const sa=new T.Mesh(sugar,strandA);
      const sb=new T.Mesh(sugar,strandB);
      sa.position.copy(a).multiplyScalar(.93);
      sb.position.copy(b).multiplyScalar(.93);
      sa.rotation.x=sb.rotation.x=Math.PI/2;
      root.add(sa,sb);

      const dir=b.clone().sub(a).normalize();
      const mid=a.clone().add(b).multiplyScalar(.5);
      const p1=mid.clone().add(dir.clone().multiplyScalar(-.72));
      const p2=mid.clone().add(dir.clone().multiplyScalar(.72));

      const base1=new T.Mesh(
        new T.SphereGeometry(.21,18,14),
        baseMats[i%4]
      );
      const base2=new T.Mesh(
        new T.SphereGeometry(.21,18,14),
        baseMats[(i+1)%4]
      );
      base1.position.copy(p1);
      base2.position.copy(p2);

      root.add(
        base1,base2,
        cylinderBetween(a,p1,.05,baseMats[i%4]),
        cylinderBetween(p2,b,.05,baseMats[(i+1)%4])
      );

      if (i%2===0) {
        root.add(cylinderBetween(
          p1,p2,.022,
          new T.MeshBasicMaterial({
            color:0xd6fff7,
            transparent:true,
            opacity:.75
          })
        ));
      }
    }

    // Subtle surrounding molecular particles.
    const particles = new T.Group();
    const particleMat = new T.MeshBasicMaterial({
      color:0x55e9c4, transparent:true, opacity:.55
    });
    const particleGeo = new T.SphereGeometry(.035,8,8);

    for (let i=0;i<100;i++) {
      const a=Math.random()*Math.PI*2;
      const r=2.2+Math.random()*2;
      const y=(Math.random()-.5)*9.5;
      const p=new T.Mesh(particleGeo,particleMat);
      p.position.set(Math.cos(a)*r,y,Math.sin(a)*r);
      p.userData={y,s:.2+Math.random()*.5,i};
      particles.add(p);
    }
    root.add(particles);

    let mx=0,my=0;
    addEventListener("pointermove",e=>{
      mx=(e.clientX/innerWidth-.5)*.16;
      my=(e.clientY/innerHeight-.5)*.08;
    },{passive:true});

    function resize(){
      const r=mount.getBoundingClientRect();
      const w=Math.max(1,r.width), h=Math.max(1,r.height);
      renderer.setSize(w,h,false);
      camera.aspect=w/h;
      camera.updateProjectionMatrix();
    }

    new ResizeObserver(resize).observe(mount);
    resize();

    let time=0;
    function animate(){
      time += .016;
      root.rotation.y += .0045;
      root.rotation.x = -.08 + my;
      root.rotation.z = mx;
      root.position.y = Math.sin(time*.55)*.07;

      particles.children.forEach(p=>{
        p.position.y = p.userData.y +
          Math.sin(time*p.userData.s+p.userData.i)*.05;
      });

      renderer.render(scene,camera);
      requestAnimationFrame(animate);
    }
    animate();
  }

  init();
})();
