import * as THREE from 'three';
import OBC from 'three-orbit-controls';

export default class Circle3DRenderer {

  static execute(root, props) {
    const OrbitControls = OBC(THREE);

    this.w = props.width;
    this.h = props.height;
    this.words = props.words;

    var renderer = new THREE.WebGLRenderer({antialias: true});

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    renderer.setSize(this.w, this.h);

    root.appendChild(renderer.domElement);

    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xa000000, 0.15, 1500);

    var viewAngle = 80;
    var near   = 1;
    var far    = 1000;
    var aspect = this.w / this.h;

    var camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
    // camera.position.x = 150;
    camera.position.y = 60;
    camera.position.z = 0;
    scene.add(camera);

    let controls = new OrbitControls(camera);
    controls.minDistance = 1;
    controls.maxDistance = 250;
    controls.target.set( 0, 60, 0 );

    var ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    var light = new THREE.SpotLight( 0x999999, 1, 0, Math.PI / 2 );
    light.position.set( 0, 400, 0 );
    light.target.position.set( 0, 0, 0 );
    light.castShadow = true;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 30;
    light.shadow.bias = 0.01;
    scene.add(light);

    var lights = [];
    lights[ 0 ] = new THREE.PointLight( 0x222222, 1, 0 );
    lights[ 1 ] = new THREE.PointLight( 0x555555, 1, 0 );
    // lights[ 2 ] = new THREE.PointLight( 0x666666, 1, 0 );

    lights[ 0 ].position.set( 0, 125, 0 );
    lights[ 1 ].position.set( 0, 60, 0);
    // lights[ 2 ].position.set(-300, 10, -300);

    lights[0].castShadow = true;
    // lights[2].castShadow = true;

    scene.add( lights[ 0 ] );
    scene.add( lights[ 1 ] );
    // scene.add( lights[ 2 ] );

    let boardSize = [
      [60, 45],
      [60, 45],
      [50, 37.5],
      [42, 31.5],
    ][this.words.length / 4 - 2];

    var boardGeometry  = new THREE.CubeGeometry(...boardSize, 1);
    var labelGeometry  = new THREE.PlaneBufferGeometry(80, 20);

    var boardMeshes = [];

    var unit = 360 / this.words.length;
    var r = 150;
    var rad = Math.PI * 2 / 360.0

    /*
    var images = [
      'burp.jpg',
      'carp.jpg',
      'chirp.jpg',
      'corp.jpg',
      'gorp.jpg',
      'harp.jpg',
      'scarp.jpg',
      'sharp.jpg',
      'slurp.jpg',
      'tarp.jpg',
      'usurp.jpg',
      'warp.jpg',
    ];
    var textureLoader = new THREE.TextureLoader();
    */

    var labelGeometry2  = new THREE.PlaneBufferGeometry(800, 80);

    var canvas = document.createElement('canvas');
    canvas.width = 1024; canvas.height = 128;

    var ctx = canvas.getContext('2d');
    // var txt = 'abcdefghijklmnopqrstuvwxyz';
    var txt = 'pattern';
    // ctx.fillStyle = '#333333';
    ctx.fillStyle = '#3F4444';
    ctx.font = "60px sans-serif";
    ctx.textAlign = 'center';
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(txt, 400, 65);
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var labelMaterial  = new THREE.MeshPhongMaterial({
      side: THREE.FrontSide,
      map: texture,
      transparent: true,
    });

    var label = new THREE.Mesh(labelGeometry2, labelMaterial);
    label.position.set(0, 200, 0);
    // label.scale.set(2,1,1)
    // label.rotation.x = - Math.PI / 2;

    scene.add(label);


    for (var i = 0; i < this.words.length; i++) {
      var color;
      if (i % 3 == 0) {
        color = 0x999999;
      } else {
        color = 0x000000;
      }
      color = 0xffffff;

      // テクスチャを描画
      var canvas = document.createElement('canvas');
      canvas.width = 512; canvas.height = 128;

      var ctx = canvas.getContext('2d');
      ctx.fillStyle = 'black';
      ctx.font = "40px sans-serif";
      ctx.textAlign = 'center';
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillText(this.words[i].word, 256, 64);
      var texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;

      // var boardTexture = textureLoader.load('img/' + images[i]);

      var boardMaterial  = new THREE.MeshPhongMaterial({
        color: color,
        shininess: 60,
        wireframe: false,
        side: THREE.FrontSide,
        // side: THREE.DoubleSide,
        // map: boardTexture,
        // transparent: true
      });

      var labelMaterial  = new THREE.MeshPhongMaterial({
        side: THREE.FrontSide,
        map: texture,
        transparent: true
      });

      var board = new THREE.Mesh(boardGeometry, boardMaterial);
      var label = new THREE.Mesh(labelGeometry, labelMaterial);

      var x = r * Math.cos((unit * i - 90) * rad);
      var z = r * Math.sin((unit * i - 90) * rad);

      // 30 + (6 - Math.abs(6 - i)) * 10
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
      boardMeshes.push(board)

      // axes = new THREE.AxisHelper(5);
      // axes.position.y = 50;
      // board.add(axes);
    }


    var floorColor = 0xa0adaf;
    var wallColor = 0xCDDBDD;
    // var floorColor = 0x662E12;
    // var floorColor = 0xffffff;
    // var floorColor = 0xeeeeee;
    var floorGeometry = new THREE.PlaneBufferGeometry(900, 900);
    var floorMaterial  = new THREE.MeshPhongMaterial( { color: floorColor, shininess: 80, wireframe: false,  } );
    // var floorMaterial = new THREE.MeshBasicMaterial({ color : 0x333333 });
    var floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);

    floorMesh.rotation.x = - Math.PI / 2;
    floorMesh.position.set(0, 0, 0);
    // floorMesh.scale.set( 100, 100, 100 );

    // floorMesh.castShadow = false;
    floorMesh.receiveShadow = true;

    scene.add(floorMesh);


    var ceilMesh = new THREE.Mesh(floorGeometry, floorMaterial);

    ceilMesh.rotation.x = Math.PI / 2;
    ceilMesh.position.set(0, 300, 0);
    // ceilMesh.receiveShadow = true;
    scene.add(ceilMesh);


    var group = new THREE.Group();

    var s = new THREE.Shape();
    s.moveTo(  0,   0)
    s.lineTo(  0, 300)
    s.lineTo(900, 300)
    s.lineTo(900,   0)

    var doorSize = [100, 180];

    s.lineTo(900 / 2 + doorSize[0] / 2,   0)
    s.lineTo(900 / 2 + doorSize[0] / 2,   doorSize[1])
    s.lineTo(900 / 2 - doorSize[0] / 2,   doorSize[1])
    s.lineTo(900 / 2 - doorSize[0] / 2,   0)

    s.lineTo(0,0);

    var wallMaterial  = new THREE.MeshPhongMaterial( { color: wallColor, shininess: 0, wireframe: false,  } );

    var wall = new THREE.ShapeGeometry(s);
    var wallMesh = new THREE.Mesh(wall, wallMaterial);
    wallMesh.position.set(-450,0,-450);

    // scene.add(wallMesh);
    group.add(wallMesh);

    var corridorGeometry = new THREE.PlaneBufferGeometry(doorSize[0], 900);
    var corridorMesh = new THREE.Mesh(corridorGeometry, floorMaterial);
    corridorMesh.position.set(0,0,-900);
    corridorMesh.rotation.x = - Math.PI / 2;
    group.add(corridorMesh);

    corridorMesh = new THREE.Mesh(corridorGeometry, floorMaterial);
    corridorMesh.position.set(0,doorSize[1],-900);
    corridorMesh.rotation.x = Math.PI / 2;
    group.add(corridorMesh);

    corridorGeometry = new THREE.PlaneBufferGeometry(doorSize[1], 900);
    corridorMesh = new THREE.Mesh(corridorGeometry, wallMaterial);
    corridorMesh.position.set(-doorSize[0] / 2, doorSize[1] / 2,-900);
    corridorMesh.rotation.x = Math.PI / 2;
    corridorMesh.rotation.y = Math.PI / 2;
    group.add(corridorMesh);

    corridorMesh = new THREE.Mesh(corridorGeometry, wallMaterial);
    corridorMesh.position.set(doorSize[0] / 2, doorSize[1] / 2,-900);
    corridorMesh.rotation.x = Math.PI / 2;
    corridorMesh.rotation.y = -Math.PI / 2;
    group.add(corridorMesh);

    scene.add(group);

    var g2 = group.clone();
    g2.position.set(0,0,0);
    g2.rotation.y = Math.PI / 2;
    scene.add(g2);

    g2 = group.clone();
    g2.position.set(0,0,0);
    g2.rotation.y = Math.PI;
    scene.add(g2);

    g2 = group.clone();
    g2.position.set(0,0,0);
    g2.rotation.y = - Math.PI / 2;
    scene.add(g2);

    var controlsEnabled = true;
    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var canJump = false;
    var prevTime = performance.now();
    var velocity = new THREE.Vector3();

      var clock = new THREE.Clock();

    var animate = () => {
      requestAnimationFrame(animate);
      render();
    };

    var render = () => {
      // var delta = clock.getDelta();
      // controls.update( delta );

      var time = performance.now();
      var delta = ( time - prevTime ) / 150;

      var breakBase = 3.0;
      velocity.x -= velocity.x * breakBase * delta;
      velocity.z -= velocity.z * breakBase * delta;
      velocity.y -= 9.8 * 5.0 * delta; // 100.0 = mass
      var speedBase = 180.0

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

      renderer.render( scene, camera );
    };

    animate();
  }
}
