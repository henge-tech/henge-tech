import * as THREE from 'three';
import OrbitControls from './ModifiedOrbitControls.jsx';
import speechSynth from '../models/SpeechSynth.jsx';
import I from 'immutable';

export default class Circle3DRenderer {
  constructor(w, h, floorStatus, handlers) {
    this.w = w;
    this.h = h;
    this.floorStatus = floorStatus;
    this.handlers = handlers;

    this.floorData = floorStatus.get('floorData');
    this.words = floorStatus.get('words');
    this.floorPos = floorStatus.get('floorPos');

    this.stage = document.getElementById('stage');
    this.removeEventListeners = null;
  }

  createRenderer() {
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    renderer.setSize(this.w, this.h);

    // Hide Firefox warnings.
    // https://github.com/mrdoob/three.js/issues/9716#issuecomment-271910097
    const ctx = renderer.context;
    ctx.getShaderInfoLog = function () { return '' };

    return renderer;
  }

  createCamera() {
    const viewAngle = 80;
    const near   = 1;
    const far    = 1000;
    const aspect = this.w / this.h;

    const camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
    camera.position.x = 0;
    camera.position.y = 60;
    camera.position.z = 60;
    // camera.rotation.x = - Math.PI / 2;

    return camera;
  }

  addLights(scene) {
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    const light = new THREE.SpotLight( 0x999999, 1, 0, Math.PI / 2 );
    light.position.set( 0, 400, 0 );
    light.target.position.set( 0, 0, 0 );
    light.castShadow = true;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 30;
    light.shadow.bias = 0.01;
    scene.add(light);

    const lights = [];
    lights[0] = new THREE.PointLight(0x222222, 1, 0);
    lights[1] = new THREE.PointLight(0x555555, 1, 0);

    lights[0].position.set(0, 125, 0);
    lights[1].position.set(0, 60, 0);

    lights[0].castShadow = true;

    scene.add(lights[0]);
    scene.add(lights[1]);

    return [ambientLight, light, ...lights];
  }

  createRoomLabel(txt, name, fontSize, v = 0) {
    const geometry = new THREE.PlaneBufferGeometry(800, 80);

    const canvas = document.createElement('canvas');
    canvas.width = 1024; canvas.height = 128;

    const ctx = canvas.getContext('2d');
    // const txt = 'inte_tion';
    // const txt = 'abcdefghijklmnopqrstuvwxyz';

    // ctx.fillStyle = '#333333';
    ctx.fillStyle = '#ffffff';
    ctx.font = fontSize + "px sans-serif";
    ctx.textAlign = 'center';
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(txt, 512, 65);
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    const material  = new THREE.MeshPhongMaterial({
      side: THREE.FrontSide,
      map: texture,
      transparent: true,
    });

    const label = new THREE.Mesh(geometry, material);
    label.name = name;
    const pos = 'wall';
    if (pos == 'floor') {
      label.position.set(0, 2, 20);
      label.rotation.x = - Math.PI / 2;
    } else if (pos == 'air') {
      label.position.set(0, 180, 0);
    } else if (pos == 'wall') {
      label.position.set(0, 220 + v, -445);
    }

    return label;
  }

  addBoards(scene) {
    scene.add(this.createRoomLabel(this.floorStatus.get('pattern'), 'centerlabel', 60));

    /*
    const xGeometry  = new THREE.CubeGeometry(1, 1, 1);
    const xMaterial  = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 60,
        wireframe: true,
        side: THREE.FrontSide,
        // side: THREE.DoubleSide,
        // map: boardTexture,
        // transparent: true
    });
    const xMesh = new THREE.Mesh(xGeometry, xMaterial);
    xMesh.position.set(0, 60, 0);
    scene.add(xMesh);
    */

    let boardSize = [
      [60, 45],
      [60, 45],
      [50, 37.5],
      [42, 31.5],
    ][this.words.size / 4 - 2];

    const boardGeometry  = new THREE.CubeGeometry(...boardSize, 1);
    const labelGeometry  = new THREE.PlaneBufferGeometry(80, 20);
    const boardMeshes = [];

    const unit = 360 / this.words.size;
    const r = 150;
    const rad = Math.PI * 2 / 360.0

    for (var i = 0; i < this.words.size; i++) {
      let color = 0xffffff;
      const word = this.words.get(i);
      const wordText = word.text;

      // テクスチャを描画
      const canvas = document.createElement('canvas');
      canvas.width = 512; canvas.height = 128;

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'black';
      ctx.font = "40px sans-serif";
      ctx.textAlign = 'center';
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillText(wordText, 256, 64);
      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;

      const textureLoader = new THREE.TextureLoader();
      textureLoader.crossOrigin = '*';

      const boardMaterial  = new THREE.MeshPhongMaterial({
        color: color,
        shininess: 60,
        wireframe: false,
        side: THREE.FrontSide,
        // side: THREE.DoubleSide,
        // blending: 0,
        transparent: true,
        // opacity: 0.5
      });

      if (word.imageExts !== null) {
        const turl = word.imageURL(0);
        const boardTexture = textureLoader.load(turl, (texture) => {

          // Hide warnings:
          // THREE.WebGLRenderer: image is not power of two (...). Resized to 512x512
          // https://threejs.org/docs/api/textures/Texture.html
          texture.minFilter = THREE.LinearFilter;

          boardMaterial.map = boardTexture;
          boardMaterial.needsUpdate = true;
        });
      }

      const labelMaterial  = new THREE.MeshPhongMaterial({
        side: THREE.FrontSide,
        map: texture,
        transparent: true
      });

      const board = new THREE.Mesh(boardGeometry, boardMaterial);
      board.name = 'board';
      board.userData.word = word;
      const label = new THREE.Mesh(labelGeometry, labelMaterial);
      label.name = 'label';

      const x = r * Math.cos((unit * i - 90) * rad);
      const z = r * Math.sin((unit * i - 90) * rad);

      board.position.set(x, 60, z);
      board.rotation.y = (360 - unit * i) * rad;
      board.castShadow = true;
      board.receiveShadow = true;

      label.position.set(x, 20, z);
      label.rotation.y = (360 - unit * i) * rad;
      // label.castShadow = true;
      // label.receiveShadow = true;

      scene.add(board);
      scene.add(label);
      boardMeshes.push(board);
    }
  }

  doorWallShape(wallSize, doorSize) {
    const doorWallShape = new THREE.Shape();
    doorWallShape.moveTo(  0,   0)
    doorWallShape.lineTo(  0, wallSize[1])
    doorWallShape.lineTo(wallSize[0], wallSize[1])
    doorWallShape.lineTo(wallSize[0],   0)

    doorWallShape.lineTo(wallSize[0] / 2 + doorSize[0] / 2,   0)
    doorWallShape.lineTo(wallSize[0] / 2 + doorSize[0] / 2,   doorSize[1])
    doorWallShape.lineTo(wallSize[0] / 2 - doorSize[0] / 2,   doorSize[1])
    doorWallShape.lineTo(wallSize[0] / 2 - doorSize[0] / 2,   0)
    doorWallShape.lineTo(0,0);

    return doorWallShape;
  }

  doorWallMesh(wallSize, doorSize, floorSize, wallMaterial) {
    const wallGeom = new THREE.ShapeGeometry(this.doorWallShape(wallSize, doorSize));

    const wallMesh = new THREE.Mesh(wallGeom, wallMaterial);
    wallMesh.name = 'wall';
    wallMesh.position.set(- wallSize[0] / 2, 0, - floorSize / 2);

    return wallMesh;
  }

  doorMesh(doorSize, floorSize) {
    const doorGeom = new THREE.PlaneBufferGeometry(doorSize[0], doorSize[1]);

    const materialOpts = { color: '#ffccdd', shininess: 0, wireframe: false, visible: false };
    const material  = new THREE.MeshPhongMaterial(materialOpts);

    const doorMesh = new THREE.Mesh(doorGeom, material);
    doorMesh.name = 'door';
    doorMesh.position.set(0, doorSize[1] / 2, - floorSize / 2 + 2);

    return doorMesh;
  }

  wallWithCorridorGroup(floorMaterial, wallMaterial, wallSize, doorSize, floorSize) {
    const group = new THREE.Group();

    group.add(this.doorWallMesh(wallSize, doorSize, floorSize, wallMaterial));
    group.add(this.doorMesh(doorSize, floorSize));

    let corridorGeometry = new THREE.PlaneBufferGeometry(doorSize[0], 900);

    // Corridor Floor
    let corridorMesh = new THREE.Mesh(corridorGeometry, floorMaterial);
    corridorMesh.name = 'corridorfloor';
    corridorMesh.position.set(0,0,-900);
    corridorMesh.rotation.x = - Math.PI / 2;
    group.add(corridorMesh);

    // Corridor Ceil
    corridorMesh = new THREE.Mesh(corridorGeometry, floorMaterial);
    corridorMesh.name = 'corridorceil';
    corridorMesh.position.set(0,doorSize[1],-900);
    corridorMesh.rotation.x = Math.PI / 2;
    group.add(corridorMesh);

    // Corridor Wall L
    corridorGeometry = new THREE.PlaneBufferGeometry(doorSize[1], 900);
    corridorMesh = new THREE.Mesh(corridorGeometry, wallMaterial);
    corridorMesh.name = 'corridorwall1';
    corridorMesh.position.set(-doorSize[0] / 2, doorSize[1] / 2,-900);
    corridorMesh.rotation.x = Math.PI / 2;
    corridorMesh.rotation.y = Math.PI / 2;
    group.add(corridorMesh);

    // Corridor Wall R
    corridorMesh = new THREE.Mesh(corridorGeometry, wallMaterial);
    corridorMesh.name = 'corridorwall2';
    corridorMesh.position.set(doorSize[0] / 2, doorSize[1] / 2,-900);
    corridorMesh.rotation.x = Math.PI / 2;
    corridorMesh.rotation.y = -Math.PI / 2;
    group.add(corridorMesh);

    return group;
  }

  addIndexRoom(scene) {
    const floorColor = 0xa0adaf;
    const floorMaterialOpts = { color: floorColor, shininess: 80, wireframe: false };
    const floorMaterial  = new THREE.MeshPhongMaterial(floorMaterialOpts);
    const floorGeometry = new THREE.PlaneBufferGeometry(1000, 1000);

    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.name = 'floor';
    floorMesh.rotation.x = - Math.PI / 2;
    floorMesh.position.set(0, 0, 0);
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    const ceilMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    ceilMesh.name = 'ceil';
    ceilMesh.rotation.x = Math.PI / 2;
    ceilMesh.position.set(0, 300, 0);
    scene.add(ceilMesh);

    const wallColor  = 0x999999;
    const wallColor2 = 0x666666;
    const wallMaterialOpts = { color: wallColor, shininess: 0, wireframe: false };
    const wallMaterial  = new THREE.MeshPhongMaterial(wallMaterialOpts);
    const wallMaterialOpts2 = { color: wallColor2, shininess: 0, wireframe: false };
    const wallMaterial2  = new THREE.MeshPhongMaterial(wallMaterialOpts2);

    const wallSize = [280, 300];
    const doorSize = [100, 180];
    const floorSize = 900;
    const group = this.wallWithCorridorGroup(floorMaterial, wallMaterial, wallSize, doorSize, floorSize);

    let g2;

    const unit = 360 / this.words.size;
    const r = 50;
    const rad = Math.PI * 2 / 360.0

    for (var i = 0; i < this.words.size; i++) {
      g2 = group.clone();
      if (i % (this.words.size / 4) == 0) {
        g2.getObjectByName('wall').material = wallMaterial2;
      }
      const pattern = this.floorData.circles[i].pattern;
      g2.add(this.createRoomLabel(pattern, 'corridorLabel', 30, -30));

      g2.getObjectByName('door').userData.pattern = pattern;

      const x = r * Math.cos((unit * i - 90) * rad);
      const z = r * Math.sin((unit * i - 90) * rad);

      g2.position.set(x, 0, z);
      g2.rotation.y = (360 - unit * i) * rad;

      // g2.position.set(0,0,0);
      // g2.rotation.y = Math.PI / 2;
      scene.add(g2);
    }
  }

  addRoom(scene) {
    // const floorColor = 0xa0adaf;
    // const floorColor = 0xffffff;

    // const wallColor = 0xcddbdd; // blue
    // const wallColor = 0xffffff; // white
    // const wallColor = 0xcccccc; // gray
    // const wallColor = 0x666666; // gray2

    const floorColor = 0xfceec7; // wood
    const wallColor = 0x333333; // black

    const floorMaterialOpts = { color: floorColor, shininess: 80, wireframe: false };
    const floorMaterial  = new THREE.MeshPhongMaterial(floorMaterialOpts);
    const floorGeometry = new THREE.PlaneBufferGeometry(900, 900);

    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.name = 'floor';
    floorMesh.rotation.x = - Math.PI / 2;
    floorMesh.position.set(0, 0, 0);
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    const ceilMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    ceilMesh.name = 'ceil';
    ceilMesh.rotation.x = Math.PI / 2;
    ceilMesh.position.set(0, 300, 0);
    scene.add(ceilMesh);

    const wallMaterialOpts = { color: wallColor, shininess: 0, wireframe: false };
    const wallMaterial  = new THREE.MeshPhongMaterial(wallMaterialOpts);

    const wallGeometry = new THREE.PlaneBufferGeometry(900, 600);
    const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
    wallMesh.name = 'frontWall';
    wallMesh.position.set(0, 0, -450);
    scene.add(wallMesh);

    const wallSize = [900, 300];
    const doorSize = [100, 180];
    const floorSize = 900;
    const group = this.wallWithCorridorGroup(floorMaterial, wallMaterial, wallSize, doorSize, floorSize, 'x');

    // Left
    let g2 = group.clone();

    let prevIndex = this.floorPos - 1;
    if (prevIndex < 0) {
      prevIndex = this.floorData.circles.length - 1;
    }
    const leftRoomPattern = this.floorData.circles[prevIndex].pattern;
    g2.add(this.createRoomLabel(leftRoomPattern, 'corridorLabel', 30, -30));
    g2.getObjectByName('door').userData.pattern = leftRoomPattern;

    g2.position.set(0,0,0);
    g2.rotation.y = Math.PI / 2;
    scene.add(g2);

    // Back
    g2 = group.clone();
    g2.add(this.createRoomLabel(this.floorData.floor, 'corridorLabel', 30, -30));
    g2.getObjectByName('door').userData.floor = this.floorData.floor;
    g2.position.set(0,0,0);
    g2.rotation.y = Math.PI;
    scene.add(g2);

    // Right
    g2 = group.clone();
    let nextIndex = this.floorPos + 1;
    if (nextIndex >= this.floorData.circles.length) {
      nextIndex = 0;
    }
    const rightRoomPattern = this.floorData.circles[nextIndex].pattern;
    g2.add(this.createRoomLabel(rightRoomPattern, 'corridorLabel', 30, -30));

    g2.getObjectByName('door').userData.pattern = rightRoomPattern;
    g2.position.set(0,0,0);
    g2.rotation.y = - Math.PI / 2;
    scene.add(g2);
  }

  draw(renderer, scene, camera) {
    let controlsEnabled = true;
    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;
    let canJump = false;
    let prevTime = performance.now();
    let velocity = new THREE.Vector3();

    let clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      render();
    };

    const render = () => {
      // const delta = clock.getDelta();
      // controls.update( delta );

      const time = performance.now();
      const delta = ( time - prevTime ) / 150;

      const breakBase = 3.0;
      velocity.x -= velocity.x * breakBase * delta;
      velocity.z -= velocity.z * breakBase * delta;
      velocity.y -= 9.8 * 5.0 * delta; // 100.0 = mass
      const speedBase = 180.0

      if ( moveForward )  velocity.z  -= speedBase * delta;
      if ( moveBackward ) velocity.z  += speedBase * delta;
      if ( moveLeft )     velocity.x  -= speedBase * delta;
      if ( moveRight )    velocity.x  += speedBase * delta;

      /*
      if ( isOnObject === true ) {
        velocity.y = Math.max( 0, velocity.y );
        canJump = true;
      }
      */

      /*
      controls.getObject().translateX( velocity.x * delta );
      controls.getObject().translateY( velocity.y * delta );
      controls.getObject().translateZ( velocity.z * delta );

      if (controls.getObject().position.z < -520) {
        controls.getObject().position.z = 520;
      } else if (controls.getObject().position.z > 520) {
        controls.getObject().position.z = -520;
      } else if (controls.getObject().position.x < -520) {
        controls.getObject().position.x = 520;
      } else if (controls.getObject().position.x > 520) {
        controls.getObject().position.x = -520;
      }

      if ( controls.getObject().position.y < 10 ) {
        velocity.y = 0;
        controls.getObject().position.y = 10;
        canJump = true;
        }
      */
      prevTime = time;

      renderer.render(scene, camera);
    };

    animate();
  }

  gotoRoom(pattern) {
    // this.stop();
    // this.handlers.gotoRoom(this.floorStatus, pattern);
    this.handlers.redirect('/circles/' + pattern + '.html');
  }

  gotoFloor(floor) {
    // this.stop();
    this.handlers.redirect('/floors/' + floor + '.html');
  }

  drawOrbit(renderer, scene, camera, light) {
    const target = new THREE.Vector3(0, 60, 0)
    const controls = new (OrbitControls(THREE))(camera, document, target, light);
    this.controls = controls;

    const render = () => {
      light.position.copy(camera.position);
      renderer.render(scene, camera);
    }

    const animate = () => {
      if (!this.animating) return;
      requestAnimationFrame(animate);
      controls.update();
      render();
    }

    controls.addEventListener('change', render);
    animate();
  }

  handleMouseEvent(scene, camera) {
    const onMouseClick = (e) => {
      if (new Date().getTime() - this.mouseDownTime > 300) {
        return;
      }
      // console.log(e);

      const rect = e.target.getBoundingClientRect();
      let mouseX = 0;
      let mouseY = 0;
      if (e.clientX) {
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      } else if (e.pageX) {
        mouseX = e.pageX - rect.left;
        mouseY = e.pageY - rect.top;
      }

      mouseX =  (mouseX / window.innerWidth)  * 2 - 1;
      mouseY = -(mouseY / window.innerHeight) * 2 + 1;

      const pos = new THREE.Vector3(mouseX, mouseY, 1);
      pos.unproject(camera);

      const ray = new THREE.Raycaster(camera.position, pos.sub(camera.position).normalize());
      const objs = ray.intersectObjects(scene.children, true); // TODO: limit targets

      if (false) {
        if (this.arrow) {
          scene.remove(this.arrow);
        }
        // this.arrow = new THREE.ArrowHelper(camera.getWorldDirection(), camera.getWorldPosition(), 100, 0x0000ff);
        this.arrow = new THREE.ArrowHelper(ray.ray.direction, ray.ray.origin, 300, 0xff0000);
        scene.add(this.arrow);
      }

      if (objs.length <= 0) {
        return;
      }

      for (let i = 0; i < objs.length; i++) {
        // console.log(objs[i].object.name);
        if (objs[i].object.name == 'board') {
          const w = objs[i].object.userData.word;
          if (this.floorStatus.roomType() == 'index') {
            speechSynth.speakWords(new I.List(this.floorData.circles[w.index].words), -1);
          } else if (objs[i].distance < 120) {
            speechSynth.speakWord(w.text);
          } else {
            const unit = this.words.size / 4;
            speechSynth.speakWords(this.words, Math.floor(w.index / unit));
          }
          break;
        } else if (objs[i].object.name == 'centerlabel') {
          speechSynth.speakWords(this.words, -1);
          break;
        } else if (objs[i].object.name == 'door') {
          if (objs[i].object.userData.pattern) {
            this.gotoRoom(objs[i].object.userData.pattern);
          } else {
            this.gotoFloor(objs[i].object.userData.floor);
          }
        }
      }
    };

    const onMouseDown = (e) => {
      this.mouseDownTime = new Date().getTime();
    };

    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mouseup', onMouseClick, false);
    document.addEventListener('touchstart', onMouseDown, false);
    document.addEventListener('touchend', onMouseClick, false);

    this.removeEventListeners = () => {
      document.removeEventListener('mousedown', onMouseDown, false);
      document.removeEventListener('mouseup', onMouseClick, false);
      document.removeEventListener('touchstart', onMouseDown, false);
      document.removeEventListener('touchend', onMouseClick, false);
      this.removeEventListeners = null;
    }
  }

  stop() {
    this.animating = false;
    this.controls.dispose();

    if (this.removeEventListeners) {
      this.removeEventListeners();
    }
  }

  execute() {
    while (this.stage.firstChild) {
      this.stage.removeChild(this.stage.firstChild);
    }

    const renderer = this.createRenderer();
    this.stage.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xa000000, 0.15, 1500);

    const camera = this.createCamera();
    scene.add(camera);

    const lights = this.addLights(scene);
    this.addBoards(scene);
    if (this.floorStatus.roomType() == 'index') {
      this.addIndexRoom(scene);
    } else {
      this.addRoom(scene);
    }

    this.handleMouseEvent(scene, camera);

    // this.draw(renderer, scene, camera);
    this.animating = true;
    this.drawOrbit(renderer, scene, camera, lights[3]);
  }
}
