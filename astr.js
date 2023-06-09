
var ww = window.innerWidth,
	wh = 2*window.innerHeight;

function init(){
	renderer = new THREE.WebGLRenderer({canvas : document.getElementById('scene'),antialias: true, alpha: true});
	renderer.setSize(ww,wh);
  renderer.setClearColor( 0xffffff, 0 );
	scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0xefd1b5, 0.00005 );
	camera = new THREE.PerspectiveCamera(50, ww/wh, 5, 10000);
	camera.position.set(0, 0, 1.2*wh);
	scene.add(camera);
  
 var light = new THREE.PointLight( 0xf17f24, 6, 3000 );
light.position.set(0, -Math.min(wh/2,ww), Math.min(wh/2,ww)/2 );
	scene.add(light);
  
   var light2 = new THREE.PointLight( 0x6495ed, 6, 1000 );
light2.position.set(0, -wh/4, wh/8 );
	scene.add(light2);

  var light3 = new THREE.PointLight( 0xf17f24, 6, 1000 );
  light3.position.set(ww/4, -wh/4, wh/4 );
    scene.add(light3);

    const geometry = new THREE.SphereGeometry(wh/15, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      //reflectivity: 0.5,
      shininess: 10,
      map: THREE.ImageUtils.loadTexture('https://yesh21.github.io/form1.png',THREE.SphericalRefractionMapping)});

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-ww/4, -wh/5, wh/2 );
    scene.add(mesh);

    const geometry1 = new THREE.SphereGeometry(Math.min(wh/2,ww)*.59, 32, 32);
    const material1 = new THREE.MeshPhongMaterial({
      //reflectivity: 0.5,
      shininess: 10,
      map: THREE.ImageUtils.loadTexture('https://yesh21.github.io/moon.png',THREE.SphericalRefractionMapping)});

    const mesh1 = new THREE.Mesh(geometry1, material1);
    mesh1.position.set(0, 0, -Math.min(wh/4,ww/2) );
    scene.add(mesh1);

    mesh1.rotation.y = -.5;
    var light5 = new THREE.PointLight( 0x6495ed, 6, wh/2 );
    light5.position.set(-ww/7, -wh/5, wh/1.5 );
      scene.add(light5);

  var asteroids = createAsteroids();
  //var asteroids1 = createAsteroids();

  var wdhid = ww/2+wh/45;
  var now,delta,then = Date.now();
var interval = 1000/30;

  function update () {
    now = Date.now();
    delta = now - then;
    //update time dependent animations here at 30 fps
    if (delta > interval) {
    if(document.getElementById('scene').getBoundingClientRect().top <= 3*wh){

    asteroids.forEach(function(p){
      p.rotation.z += 0.01;
      p.position.x += 5;
      p.position.z += 3;
      
      if (p.position.x > wdhid) {
        p.position.x = -wdhid;
        p.position.z = (Math.random() * wh/4);
      }
    })


    mesh.rotation.y -= 0.01;
    mesh.rotation.z -= 0.01;
  }
  then = now - (delta % interval);
}
    renderer.render(scene, camera);
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
};

function createAsteroids(){
  var asteroids = [];
  for(var i=0;i<80;i++){
    wmax = Math.max(wh, ww);
    asteroids.push(createRock(wmax/50));
  }
  return asteroids;
}

function createRock(size){
	geometry = new THREE.DodecahedronGeometry(size, 1);
  geometry.vertices.forEach(function(v){
    v.x += (0-Math.random()*(size/4));
    v.y += (0-Math.random()*(size/4));
    v.z += (0-Math.random()*(size/4));
  })
  var color = '#ffffff';
	texture = new THREE.MeshStandardMaterial({color:color,
                                        shading: THREE.FlatShading,
                                        //shininess: 0.5,
                                            roughness: 1,
                                            metalness: .5
                                        });

	cube = new THREE.Mesh(geometry, texture);
  cube.castShadow = true;
  cube.receiveShadow = true;
  //cube.scale.set(1+Math.random()*0.4,1+Math.random()*0.8,1+Math.random()*0.4);
  var x = ww/2-Math.random()*ww;
  var y = (wh/2-(Math.random() * wh));
  if(y>0){
    y = y*.7;
  }
  var z = (Math.random() * wh)/4;
  cube.position.set(x,y,z)
	scene.add(cube);
  return cube;
};

