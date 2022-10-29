function main() {
    const canvas = document.querySelector("#myCanvas");
    // Initialize the GL context
    const gl = canvas.getContext("webgl");
  
    // Only continue if WebGL is available and working
    if (gl === null) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }
  
    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);

    /*======= Defining and storing the geometry ======*/

    var vertices = [
        -0.799,0.27,0,
        -0.48,0.63,0,
        -0.29,0.68,0,
        -0.2,0.62,0,
        0.05,0.9,0,
        0.32,0.96,0,
        0.32,0.87,0,
        0.32,0.84,0,
        0.44,0.9,0,
        0.3,0.67,0,
        -0.03,0.44,0,
        -0.03,0.26,0,
        0.47,-0.06,0,
        0.48,-0.08,0,
        0.56,0.05,0,
        0.65,-0.06,0,
        0.655,-0.064,0,
        0.655,-0.24,0,
        0.65,-0.27,0,
        0.59,-0.3,0,
        0.72,-0.52,0,
        0.37,-0.86,0,
        0.35,-0.86,0,
        0.29,-0.94,0,
        -0.07,-0.94,0,
        0.04,-0.78,0,
        -0.21,-0.74,0,
        -0.02,-0.62,0,
        -0.21,-0.34,0,
        -0.54,-0.44,0,
        -0.45,-0.28,0,
        -0.65,-0.34,0,
        -0.31,0.08,0,
        -0.32,0.07,0,
        -0.38,0.06,0,
        -0.38,0.07,0,
        -0.45,0.1,0,
        -0.6,0.2,0,

     ]

     // Create an empty buffer object
     var vertex_buffer = gl.createBuffer();

     // Bind appropriate array buffer to it
     gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  
     // Pass the vertex data to the buffer
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

     // Unbind the buffer
     gl.bindBuffer(gl.ARRAY_BUFFER, null);

     /*=================== Shaders ====================*/

     // Vertex shader source code
     var vertCode =
        'attribute vec3 coordinates;' +
        'void main(void) {' +
           ' gl_Position = vec4(coordinates, 1.0);' +
        '}';

     // Create a vertex shader object
     var vertShader = gl.createShader(gl.VERTEX_SHADER);

     // Attach vertex shader source code
     gl.shaderSource(vertShader, vertCode);

     // Compile the vertex shader
     gl.compileShader(vertShader);

     // Fragment shader source code
     var fragCode =
        'void main(void) {' +
           'gl_FragColor = vec4(0.45, 0.46, 0.72, 0.1);' +
        '}';

     // Create fragment shader object
     var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

     // Attach fragment shader source code
     gl.shaderSource(fragShader, fragCode);

     // Compile the fragmentt shader
     gl.compileShader(fragShader);

     // Create a shader program object to store
     // the combined shader program
     var shaderProgram = gl.createProgram();

     // Attach a vertex shader
     gl.attachShader(shaderProgram, vertShader);

     // Attach a fragment shader
     gl.attachShader(shaderProgram, fragShader);

     // Link both the programs
     gl.linkProgram(shaderProgram);

     // Use the combined shader program object
     gl.useProgram(shaderProgram);

     /*======= Associating shaders to buffer objects ======*/

     // Bind vertex buffer object
     gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

     // Get the attribute location
     var coord = gl.getAttribLocation(shaderProgram, "coordinates");

     // Point an attribute to the currently bound VBO
     gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

     // Enable the attribute
     gl.enableVertexAttribArray(coord);

     /*============ Drawing the triangle =============*/

     // Clear the canvas
     gl.clearColor(0.8, 0.8, 0.8, 0.9);

     // Enable the depth test
     gl.enable(gl.DEPTH_TEST);

     // Clear the color and depth buffer
     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

     // Set the view port
     gl.viewport(0,0,canvas.width,canvas.height);

     // Draw the triangle
     gl.drawArrays(gl.LINE_LOOP, 0, 37);

     // POINTS, LINE_STRIP, LINE_LOOP, LINES,
     // TRIANGLE_STRIP,TRIANGLE_FAN, TRIANGLES
  }
  
  window.onload = main;