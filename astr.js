
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
  
 var light = new THREE.PointLight( 0xf17f24, 6, 1000 );
light.position.set(ww/4, -wh/4, wh/4 );
	scene.add(light);
  
   var light2 = new THREE.PointLight( 0x6495ed, 6, 1000 );
light2.position.set(0, -wh/4, wh/8 );
	scene.add(light2);

  var light3 = new THREE.PointLight( 0x6495ed, 6, 2000 );
  light3.position.set(0, wh/4, wh/8 );
    scene.add(light3);

    var light4 = new THREE.PointLight( 0x6495ed, 6, 1000 );
  light4.position.set(0, wh/4, wh/4 );
    scene.add(light4);
    const geometry = new THREE.SphereGeometry(wh/15, 32, 32);
    const material = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('https://yesh21.github.io/form1.png',THREE.SphericalRefractionMapping)});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-ww/4, -wh/5, wh/2 );
    scene.add(mesh);
    var light5 = new THREE.PointLight( 0x6495ed, 6, wh/2 );
    light5.position.set(-ww/6, -wh/5, wh/1.5 );
      scene.add(light5);
  var asteroids = createAsteroids();
  
  function update () {
    if(document.getElementById('scene').getBoundingClientRect().top <= 3*wh){
    asteroids.forEach(function(obj){
          obj.rotation.x -= obj.r.x;
          obj.rotation.y -= obj.r.y;
          obj.rotation.z -= obj.r.z;
    })
    mesh.rotation.x -= 0.005;
    mesh.rotation.y -= 0.005;
    mesh.rotation.z -= 0.005;
    //const timer = 0.001 * Date.now();
    //camera.lookAt(scene.position);
    //camera.position.x = Math.sin(timer /2 ) * -20;
    //camera.position.z = Math.cos(timer / 2) * 20;
    //console.log("testing")
  }
    renderer.render(scene, camera);
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
};

function createAsteroids(){
  var maxWidth = 1000;
  var asteroids = [];
  for(var i=0;i<100;i++){
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
  var y = (wh/2-(Math.random() * wh))*.9;
  var z = (Math.random() * wh)/4;
  cube.position.set(x,y,z)
  cube.r = {};
  cube.r.x = Math.random() * 0.005;
  cube.r.y = Math.random() * 0.005;
  cube.r.z = Math.random() * 0.005;
	scene.add(cube);
  return cube;
};

