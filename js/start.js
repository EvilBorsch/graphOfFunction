// three.js animataed line using BufferGeometry

var renderer, scene, camera;

var line;
var MAX_POINTS = 10000;
var drawCount;

init();
animate();

function init() {

  // info
  var info = document.createElement('div');
  info.style.position = 'absolute';
  info.style.top = '30px';
  info.style.width = '100%';
  info.style.textAlign = 'center';
  info.style.color = '#fff';
  info.style.fontWeight = 'bold';
  info.style.backgroundColor = 'transparent';
  info.style.zIndex = '1';
  info.style.fontFamily = 'Monospace';
  info.innerHTML = "График функции y=x+2";
  document.body.appendChild(info);

  // renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // scene
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 0, 10000);

  // geometry
  var geometry = new THREE.BufferGeometry();

  // attributes
  var positions = new Float32Array(MAX_POINTS * 3); // 3 vertices per point

  geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));

  // drawcalls
  drawCount = 2; // draw the first 2 points, only
  geometry.setDrawRange(0, drawCount);

  // material
  var material = new THREE.LineBasicMaterial({color: 0xff0000, linewidth: 2});

  // line
  line = new THREE.Line(geometry, material);
  scene.add(line);






  drawLine(500,-500,600,1200)
  drawLine(600,1200,800,1500)
  drawAxis()
  //updatePositions();

}



function drawAxis(){
  let materialLine = new THREE.LineBasicMaterial({ color: 0x0000ff });
  let geometryLine = new THREE.Geometry();
  geometryLine.vertices.push(new THREE.Vector3(0, 0, 0));
  geometryLine.vertices.push(new THREE.Vector3(0, 10000, 0));
  geometryLine.vertices.push(new THREE.Vector3(0, 0, 0));
  geometryLine.vertices.push(new THREE.Vector3(20000, 0, 0));
  let line2 = new THREE.Line(geometryLine, materialLine);
  scene.add(line2);
}
function drawLine(x1,y1,x2,y2) {
  let materialLine = new THREE.LineBasicMaterial({ color: 0x0000ff });
  let geometryLine = new THREE.Geometry();
  geometryLine.vertices.push(new THREE.Vector3(x1, y1, 0));
  geometryLine.vertices.push(new THREE.Vector3(x2, y2, 0));
  let line2 = new THREE.Line(geometryLine, materialLine);
  scene.add(line2);
}

var lastPosition=0;
var y=0;
// update positions
function updatePositions() {

  var positions = line.geometry.attributes.position.array;

  for (let i=0;i<MAX_POINTS;i++){
    y=y+2;
    positions[lastPosition]=y;
    lastPosition++;
  }



}

// render
function render() {

  renderer.render(scene, camera);

}

// animate
function animate() {

  requestAnimationFrame(animate);

  drawCount = (drawCount + 1) % MAX_POINTS;

  line.geometry.setDrawRange(0, drawCount);
  // periodically, generate new data

  updatePositions();

  line.geometry.attributes.position.needsUpdate = true; // required after the first render

  line.material.color.setHSL(Math.random(), 1, 0.5);


  render();

}
