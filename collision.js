

var ctx = canvas_1.getContext("2d");
var discs = [];
var walls = [];

canvas_1.width = window.innerWidth;
canvas_1.height = window.innerHeight;

var w_ = canvas_1.width;
var h_ = canvas_1.height;
var scale = w_/canvas_1.scrollWidth;

function length(x, y) {
  return Math.sqrt(x * x + y * y);
}
var frame = 0;
var discCount = 13;
//time
var time = Date.now();
var dt;

//coefficient of restitution
var restitution = 0.5;

var TWO_PI = 2 * Math.PI;

var wall_x_offset = 0; //canvas_1.width;
var wall_y_offset = 0; // canvas_1.height;
var wall_width = canvas_1.width;
var wall_height = canvas_1.height;

var wall_A = {x_0: wall_x_offset, y_0: wall_y_offset, x_1: wall_width, y_1: wall_y_offset};
var wall_B = {x_0: wall_width, y_0: wall_height, x_1: wall_x_offset,y_1: wall_height};
var wall_C = {x_0: wall_x_offset, y_0: wall_height, x_1: wall_x_offset, y_1: wall_y_offset};
var wall_D = {x_0: wall_width, y_0: wall_y_offset, x_1: wall_width, y_1: wall_height};

walls.push(wall_A);
walls.push(wall_B);
walls.push(wall_C);
walls.push(wall_D);

var max_radius = Math.min(canvas_1.width, canvas_1.height)/13;

canvas_1.addEventListener("mousedown", mouse_down);
canvas_1.addEventListener("mousemove", mouse_move);
canvas_1.addEventListener("mouseup", mouse_up);

canvas_1.addEventListener("touchstart", touch_start);
canvas_1.addEventListener("touchend", touch_end);
canvas_1.addEventListener("touchcancel", touch_cancel);
canvas_1.addEventListener("touchmove", touch_move);

//dat.gui library controls
var gui = new dat.GUI({ autoPlace: false });
gui.add(this,'restitution').min(0.0).max(1.0).step(0.1).listen();
gui.close();

var drag = false;
var active_node = -1;
var mouse_pos_x;
var mouse_pos_y;
var mouse_last_x;
var mouse_last_y;

function getPos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.touches[0].clientX * scale - rect.left,
    y: evt.touches[0].clientY * scale - rect.top
  };
}

function touch_start(event) {
  event.preventDefault();

  active_node = -1;
  mouse_pos_x = getPos(canvas_1, event).x;
  mouse_pos_y = getPos(canvas_1, event).y;
  for(i = 0; i < discCount; i++){
    if (dist(mouse_pos_x - discs[i].x, mouse_pos_y - discs[i].y) < discs[i].radius){
      active_node = i;
      break;
    }
  }
}
function touch_end(event) {
  event.preventDefault();
  active_node = -1;
}
function touch_cancel(event) {
  event.preventDefault();
  active_node = -1;
}
function touch_move(event) {
  event.preventDefault();
  mouse_last_x = mouse_pos_x;
  mouse_last_y = mouse_pos_y;
  mouse_pos_x = getPos(canvas_1, event).x;
  mouse_pos_y = getPos(canvas_1, event).y;
  var dx = mouse_pos_x - mouse_last_x;
  var dy = mouse_pos_y - mouse_last_y;
    if(active_node != -1){
      discs[active_node].x += dx;
      discs[active_node].y += dy;
      discs[active_node].x_vel = dx/scale;
      discs[active_node].y_vel = dy/scale;
    }
}

function mouse_down(event){
  drag = true;

  active_node = -1;
  mouse_pos_x = event.offsetX * scale;
  mouse_pos_y = event.offsetY * scale;
  for(i = 0; i < discCount; i++){
    if (dist(mouse_pos_x - discs[i].x, mouse_pos_y - discs[i].y) < discs[i].radius){
      active_node = i;
      break;
    }
  }
}
var drag = false;
function mouse_move(event){

  mouse_last_x = mouse_pos_x;
  mouse_last_y = mouse_pos_y;
  mouse_pos_x = event.offsetX * scale;
  mouse_pos_y = event.offsetY * scale;
  var dx = mouse_pos_x - mouse_last_x;
  var dy = mouse_pos_y - mouse_last_y;
  if(drag){
    if(active_node != -1){
      discs[active_node].x += dx;
      discs[active_node].y += dy;
      discs[active_node].x_vel = dx/scale;
      discs[active_node].y_vel = dy/scale;
    }
  }
}

function mouse_up(event){
  drag = false;
  active_node = -1;
}

function createDiscs(){
  discs =[];
  var discCount = 13;
for (i = 0; i < discCount; i++) {

  var r = Math.max(10, max_radius - i*2);
  var disc = {
    x: canvas_1.width/2+i,
    y: canvas_1.height/2+i,
    radius: r,
    x_vel: 1 + ((discCount - i) / 5),
    y_vel: 1 + (discCount - i) / 5,
    mass: 10 * r
  };
  discs.push(disc);
}
}
createDiscs();
var n_x = walls.map(function(i) {
  return -(i.y_1 - i.y_0) / length(i.x_1 - i.x_0, i.y_1 - i.y_0);
});
var n_y = walls.map(function(i) {
  return (i.x_1 - i.x_0) / length(i.x_1 - i.x_0, i.y_1 - i.y_0);
});


function move() {
  var count = 0;
  for (i = 0; i < discCount; i++) {
    if (discs[i].x < discs[i].radius) {
      discs[i].x = discs[i].radius;
      discs[i].x_vel = -discs[i].x_vel;
    }
    if (discs[i].y < discs[i].radius) {
      discs[i].y = discs[i].radius;
      discs[i].y_vel = -discs[i].y_vel;
    }
    if (discs[i].x > canvas_1.width - discs[i].radius) {
      discs[i].x = canvas_1.width - discs[i].radius;
      discs[i].x_vel = -discs[i].x_vel;
    }
    if (discs[i].y > canvas_1.height - discs[i].radius) {
      discs[i].y = canvas_1.height - discs[i].radius;
      discs[i].y_vel = -discs[i].y_vel;
    }
    if(i != active_node){
      discs[i].x += discs[i].x_vel;
      discs[i].y += discs[i].y_vel;
    }

    if (discs[i].x > canvas_1.width -(canvas_1.height/5) && discs[i].y > canvas_1.height -(canvas_1.height/5)) {
      //discs[i].radius = 0;
      if(count==0){
      count++;
      discs[i].x_vel = (canvas_1.width - discs[i].x-canvas_1.height/10)/10;
      discs[i].y_vel = (canvas_1.height - discs[i].y-canvas_1.height/10)/10;
      if(Math.round(discs[i].x) == Math.round(canvas_1.width-(canvas_1.height/10)) && Math.round(discs[i].y) == Math.round(canvas_1.height - canvas_1.height/10)){
        console.log( discs.splice(i, 1) );
        discCount--;
    }
    } else{
      discs[i].x_vel = -(canvas_1.width - discs[i].x)/10;
      discs[i].y_vel = -(canvas_1.height - discs[i].y)/10;
    }
    }
  }
}



function dist(dx, dy){
  return Math.sqrt(dx * dx + dy * dy);
}
function disc_distance(i, j) {
  var dx = discs[j].x - discs[i].x;
  var dy = discs[j].y - discs[i].y;
  return dist(dx, dy);
};

function wall_distance(wx, wy, nx, ny, px, py) {
  // Value of vector scalar product of surface normal and vector from wall to object centre
  return ((px - wx) * nx + (py - wy) * ny);
}

function get_impulse(i, j, point_x, point_y, col_norm_x, col_norm_y) {
  var relative_vel_x = discs[j].x_vel - discs[i].x_vel;
  var relative_vel_y = discs[j].y_vel - discs[i].y_vel;

  return (-(1 + restitution) * (relative_vel_x * col_norm_x + relative_vel_y * col_norm_y)) / (1.0 / discs[i].mass + 1.0 / discs[j].mass);
}

function collision(dt) {
  for (i = 0; i < discCount; i++) {
    var inside = true;
    for (j = 0; j < walls.length; j++) {
      var distance = wall_distance(walls[j].x_0, walls[j].y_0, n_x[j], n_y[j], discs[i].x, discs[i].y);
      if (distance < discs[i].radius) {
        inside = false;
        //move directly to right position
        discs[i].x -= n_x[j] * ((distance) - discs[i].radius);
        discs[i].y -= n_y[j] * ((distance) - discs[i].radius);

        var old_x = discs[i].x_vel;
        var old_y = discs[i].y_vel;
        //reflect velocities from normal
        discs[i].x_vel = -(2 * (old_x * n_x[j] + old_y * n_y[j]) * n_x[j] - old_x)*0.9;
        discs[i].y_vel = -(2 * (old_x * n_x[j] + old_y * n_y[j]) * n_y[j] - old_y)*0.9;

      }
    }
  }
  for (i = 0; i < discs.length; i++) {
    for (j = i + 1; j < discs.length; j++){
      if (disc_distance(i, j) < (discs[i].radius + discs[j].radius)) {

        //length of vector connecting two objects
        var magnitude = length(discs[j].x - discs[i].x, discs[j].y - discs[i].y);
        //intersection of two objects
        var overlap = discs[i].radius + discs[j].radius - magnitude;
        //collision normal
        var col_norm_x = (discs[j].x - discs[i].x) / magnitude;
        var col_norm_y = (discs[j].y - discs[i].y) / magnitude;

        //point from centre of first object to collision point
        var to_col_x = (discs[i].radius - overlap / 2) * col_norm_x;
        var to_col_y = (discs[i].radius - overlap / 2) * col_norm_y;

        //collision point
        var point_x = discs[i].x + to_col_x;
        var point_y = discs[i].y + to_col_y;

        magnitude = length(to_col_x, to_col_y);

        if(i != active_node){
          discs[i].x -= (to_col_x / magnitude) * overlap * 0.5;
          discs[i].y -= (to_col_y / magnitude) * overlap * 0.5;
        }

        to_col_x = (discs[j].radius - overlap / 2) * col_norm_x;
        to_col_y = (discs[j].radius - overlap / 2) * col_norm_y;
        magnitude = length(to_col_x, to_col_y);

        if(j != active_node){
          discs[j].x += (to_col_x / magnitude) * overlap * 0.5;
          discs[j].y += (to_col_y / magnitude) * overlap * 0.5;
        }

        //impulse to be applied to both objects
        var impulse = get_impulse(i, j, point_x, point_y, col_norm_x, col_norm_y);
        if(i != active_node){
          discs[i].x_vel -= impulse / discs[i].mass * col_norm_x;
          discs[i].y_vel -= impulse / discs[i].mass * col_norm_y;
        }

        if(j != active_node){
          discs[j].x_vel += impulse / discs[j].mass * col_norm_x;
          discs[j].y_vel += impulse / discs[j].mass * col_norm_y;
        }
      }
    }
  }
}


function draw() {

  scale = w_ / canvas_1.scrollWidth;

  //ctx.fillStyle = "rgb(153,153,153)";
  //ctx.fillRect(0,0,canvas_1.width,canvas_1.height);
  ctx.clearRect(0,0,canvas_1.width,canvas_1.height);


  if(frame < 5){
    for(i = 0; i < discs.length; i++){
      discs[i].x_vel = 0;
      discs[i].y_vel = 0;
    }
  }
  fps = 1000 / (Date.now() - time);

  //fps is lower when the tab is not focused, leading to all sorts of strange results. If unfocused, do nothing.
  if (fps > 10) {

    ctx.strokeStyle = "rgb(255,255,255)";
    dt = 1 / fps;
    collision();
    move();
  }

  ctx.fillStyle = "rgb(220, 20, 60)";
  ctx.arc(canvas_1.width-canvas_1.height/10, canvas_1.height-canvas_1.height/10, 1.41*canvas_1.height/10, 0, TWO_PI);
  ctx.fill();

  if(discCount == 2){
    discCount = 13;
    createDiscs();
  }

  ctx.fillStyle = "rgb(0,0,0)";
  //ctx.lineWidth = 1;
  
  for (i = 0; i < discs.length; i++) {
    ctx.beginPath();
    ctx.arc(discs[i].x, discs[i].y, discs[i].radius, 0, TWO_PI);
    ctx.fill();
  }
  time = Date.now();
  frame++;
  window.requestAnimationFrame(draw);
}
draw();
