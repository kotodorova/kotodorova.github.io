function main() {
    const canvas = document.querySelector("#myCanvas");
    // Initialize the GL context
    const gl = canvas.getContext('experimental-webgl');
/*===============
    // Only continue if WebGL is available and working
    if (gl === null) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }
  
    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
=================*/
    /*======= Defining and storing the geometry ======*/

    var vertices = [
//out
        -0.73,0.16,0,  //0 chovka otpred
        -0.33,0.2,0,  //  1 chovka dolu dark brown vec3(0.196,0.133,0.035) ok
        -0.19,0.27,0,  //2 gelb glava gore
        0.32,0.65,0,   //  3 zadno krilo gore
        0.32,0.33,0,  //4  predno krilo gore
        0.68,0.27,0,   //5 predno krilo dqsno
        0.33,0.22,0, //6 dqsno na orangevoto
        0.12, -0.08,0, // 7 dqsno горе оранжево
        0.16,-0.68,0,  //8 долу опашката дълга част
        0.07,-0.58,0,  //9 долу опашката - по дълга част
        0.09, -0.29,0, //10 gore lqvo na malkata opashka
        // shared
        -0.36,0.25,0,   // 11 chovka gore obshta
        -0.04,0.15,0, // 12 gelb gornata polovina  vec3(0.984,0.835,0.31) ok
        -0.14,0.12,0, //13
        -0.12,0.22,0, //14
        0.18,0.26,0, //15
        0.06,-0.16,0, //16
        -0.14, -0.24,0, //17
        0.24,-0.33,0, //18
        0.16,-0.32,0, //19
        //eye
        -0.2,0.22,-0.8,  //20
        -0.2,0.26,-0.8,  //21
        -0.25,0.23,-0.8, // 22 eye    WHITE vec3(1.,1.,1.)

     ]

     indices = [0,1,11, //1 brown chovka
      11,2,12, //2 gelb
      11,13,12, //3 gelb
      11,13,17, // 4 dark orange pod chovka
      14, 3, 15, //5 zadno krilo gore
      14,15,12, // 6 zadno krilo dolu
      13,4,5, // 7 predno krilo
      13,6,16, // 8 dark pod krilo
      13,17,16, // 9 light orange
      16,7,18, // 10 gelb pod krilo
      17,16,18, // 11 dark orange dolu
      18,8,19, // 12 opashka golqmo
      19,9,10, //13 opashka malko
      20,21,22
];
var colors = [0.196,0.133,0.035, //1 
0.984,0.835,0.31, //2
0.984,0.835,0.31, //3
0.694,0.306,0.137, //4
0.694,0.306,0.137, // 5
0.694,0.306,0.137, //6
0.98,0.357,0.094, //7
0.557,0.243,0.11, //8
1.0,0.659,0.514, //9
0.984,0.835,0.31, //10

0.98,0.357,0.094, //11
0.976,0.535,0.428, //12
0.949,0.322,0.055, //13
0.984,0.835,0.31,//14
];
 
     // Create an empty buffer object and store vertex data
     var vertex_buffer = gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
     gl.bindBuffer(gl.ARRAY_BUFFER, null);

     // Create an empty buffer object and store Index data
     var Index_Buffer = gl.createBuffer();
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

     // Create an empty buffer object and store color data
     var color_buffer = gl.createBuffer ();
     gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

     /*======================= Shaders =======================*/
     
    // vertex shader source code
		var vertCode = 'attribute vec3 coordinates;' +
			'attribute vec3 color;' +
			'varying vec3 vColor;' +
			'void main(void) {' +
			' gl_Position = vec4(coordinates, 1.0);' +
			'vColor = color;' +
			'}';

		// Create a vertex shader object
		var vertShader = gl.createShader(gl.VERTEX_SHADER);

		// Attach vertex shader source code
		gl.shaderSource(vertShader, vertCode);

		// Compile the vertex shader
		gl.compileShader(vertShader);


		// fragment shader source code
		var fragCode = 'precision mediump float;' +
			'varying vec3 vColor;' +
			'void main(void) {' +
			'gl_FragColor = vec4(vColor, 1.);' +
			'}';

		// Create fragment shader object
		var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

		// Attach fragment shader source code
		gl.shaderSource(fragShader, fragCode);

		// Compile the fragmentt shader
		gl.compileShader(fragShader);

		// Create a shader program object to
		// store the combined shader program
		var shaderProgram = gl.createProgram();

		// Attach a vertex shader
		gl.attachShader(shaderProgram, vertShader);

		// Attach a fragment shader
		gl.attachShader(shaderProgram, fragShader);

		// Link both the programs
		gl.linkProgram(shaderProgram);

		// Use the combined shader program object
		gl.useProgram(shaderProgram);

		/* ======== Associating shaders to buffer objects =======*/

		// Bind vertex buffer object
		gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

		// Bind index buffer object
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

		// Get the attribute location
		var coord = gl.getAttribLocation(shaderProgram, "coordinates");

		// point an attribute to the currently bound VBO
		gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

		// Enable the attribute
		gl.enableVertexAttribArray(coord);

		// bind the color buffer
		gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);

		// get the attribute location
		var color = gl.getAttribLocation(shaderProgram, "color");

		// point attribute to the volor buffer object
		gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);

		// enable the color attribute
		gl.enableVertexAttribArray(color);

		/*============Drawing the Quad====================*/

		// Clear the canvas
		gl.clearColor(0.99,0.96,0.72, 1);

		// Enable the depth test
		gl.enable(gl.DEPTH_TEST);

		// Clear the color buffer bit
		gl.clear(gl.COLOR_BUFFER_BIT);

		// Set the view port
		gl.viewport(0, 0, canvas.width, canvas.height);

		//Draw the triangle
		gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
  }
  
  window.onload = main;