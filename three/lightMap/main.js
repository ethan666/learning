import * as THREE from 'three';

			import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
      import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
      import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

			let container;

			let camera, scene, renderer, controls;

			let mouseX = 0, mouseY = 0;

			let windowHalfX = window.innerWidth / 2;
			let windowHalfY = window.innerHeight / 2;

			let object;

			init();
			animate();


			function init() {

				// container = document.createElement( 'div' );
				// document.body.appendChild( container );

        container = document.querySelector('#container');

				camera = new THREE.PerspectiveCamera(41.4, window.innerWidth / window.innerHeight, 50, 10000 );
				camera.position.set(0, 1500, 3000)
        camera.up.set(0, 1, 0);
        camera.lookAt(new THREE.Vector3(0, 1500, 0))
        camera.updateProjectionMatrix()

				// scene

				scene = new THREE.Scene();
        scene.background = new THREE.Color('#aaa')
        window.__scene = scene;

        const axesHelper = new THREE.AxesHelper( 5 );
        scene.add( axesHelper );

				const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.6 );
				scene.add( ambientLight );

				const pointLight = new THREE.PointLight( 0xffffff, 0.5 );
				camera.add( pointLight );
				scene.add( camera );

        controls = new OrbitControls( camera, container );

      

				// manager

				function loadModel() {

					object.traverse( function ( child ) {

						// if ( child.isMesh ) child.material.map = texture;

					} );

					// object.position.y = - 95;
					scene.add( object );

				}

				const manager = new THREE.LoadingManager( loadModel );

				// texture

				const textureLoader = new THREE.TextureLoader( manager );
				// const texture = textureLoader.load( 'textures/uv_grid_opengl.jpg' );

				// model

				function onProgress( xhr ) {

					if ( xhr.lengthComputable ) {

						const percentComplete = xhr.loaded / xhr.total * 100;
						console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );

					}

				}

				function onError() {}


        new MTLLoader().load('../assets/model/JOMA球服模型.mtl', (materials ) => {
          const loader = new OBJLoader( manager );
          loader.setMaterials( materials )
          loader.load( '../assets/model/JOMA球服模型.obj', function ( obj ) {
  
            object = obj;

          }, onProgress, onError );
        })

				//

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				// container.appendChild( renderer.domElement );

        document.querySelector('#container').appendChild( renderer.domElement );

				document.addEventListener( 'mousemove', onDocumentMouseMove );

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX ) / 2;
				mouseY = ( event.clientY - windowHalfY ) / 2;

			}

			//

			function animate() {

				requestAnimationFrame( animate );
				render();
			}

			function render() {
				renderer.render( scene, camera );
        controls.update()
			}