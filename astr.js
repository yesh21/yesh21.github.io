
var ww = window.innerWidth,
	wh = window.innerHeight;

function init(){
	renderer = new THREE.WebGLRenderer({canvas : document.getElementById('scene'),antialias: true});
	renderer.setSize(ww,wh);
  //renderer.setClearColor( 0xffffff, 1 );
	scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0005 );
	camera = new THREE.PerspectiveCamera(50, ww/wh, 5, 10000);
	camera.position.set(0, 0, 1.2*wh);
	scene.add(camera);
  
 var light = new THREE.PointLight( 0xff7f24, 6, 1000 );
light.position.set(ww/4, 0, wh/2 );
	scene.add(light);
  
   var light2 = new THREE.PointLight( 0x6495ed, 6, 1000 );
light2.position.set(0, 0, 0 );
	scene.add(light2);

  var material = new THREE.PointCloudMaterial({
      color: 0x333333
    });
    
    var geometry = new THREE.Geometry();
    var x, y, z;
    for(var i=0;i<2000;i++){
      x = ww/2-(Math.random() * ww);
      y = wh/2-(Math.random() * wh);
      z = -100;
      
      geometry.vertices.push(new THREE.Vector3(x, y, z));
    };
    
    var pointCloud = new THREE.PointCloud(geometry, material);
    scene.add(pointCloud);
  
  var asteroids = createAsteroids();
  
  function update () {
    asteroids.forEach(function(obj){
          obj.rotation.x -= obj.r.x;
          obj.rotation.y -= obj.r.y;
          obj.rotation.z -= obj.r.z;
    })

    renderer.render(scene, camera);
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
};

function createAsteroids(){
  var maxWidth = 1000;
  var asteroids = [];
  for(var i=0;i<100;i++){
    asteroids.push(createRock(wh/30,ww,maxWidth,300,400));
  }
  return asteroids;
}



function createRock(size,spreadX,maxWidth,maxHeight,maxDepth){
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
  cube.scale.set(1+Math.random()*0.4,1+Math.random()*0.8,1+Math.random()*0.4);
  var x = spreadX/2-Math.random()*spreadX;
  var centeredness = 1-(Math.abs(x)/(maxWidth/2));
  var y = wh/2-(Math.random() * wh);
  var z = wh/2-(Math.random() * wh);
  cube.position.set(x,y,z)
  cube.r = {};
  cube.r.x = Math.random() * 0.005;
  cube.r.y = Math.random() * 0.005;
  cube.r.z = Math.random() * 0.005;
	scene.add(cube);
  return cube;
};

//Init our scene
init();
