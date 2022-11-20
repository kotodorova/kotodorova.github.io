var rec_ball = ( function() {

	function createVertexData() {
		var rekursionsStuffe = document.getElementById('rek').value;

		//drei Komponenten vektor
		var newVec3 = function(x,y,z) {
			return {
				x: x,
				y: y,
				z: z,
				a: x,
				b: y,
				c: z,
			}
		}

		//Vektor normalisieren- Länge 1
		var normalize = function(vec) {
			var len = Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
			return newVec3(vec.x / len, vec.y / len, vec.z / len);
		}

		var corners = [];
		var surfaces = [];

		//eines Grundkörpers erstellen
		corners.push(normalize(newVec3( 0, -1,  0)));
		corners.push(normalize(newVec3(-1,  0,  1)));
		corners.push(normalize(newVec3( 1,  0,  1)));
		corners.push(normalize(newVec3( 1,  0, -1)));
		corners.push(normalize(newVec3(-1,  0, -1)));
		corners.push(normalize(newVec3( 0,  1,  0)));

		surfaces.push(newVec3(0, 2, 1));
        surfaces.push(newVec3(0, 3, 2));
        surfaces.push(newVec3(0, 4, 3));
        surfaces.push(newVec3(0, 1, 4));
        surfaces.push(newVec3(1, 2, 5));
        surfaces.push(newVec3(2, 3, 5));
        surfaces.push(newVec3(3, 4, 5));
        surfaces.push(newVec3(4, 1, 5));
		
		//Algorithmus der Mittelpunkt zwischen 2 Punkten berechnen; 
		var centrePointCalculate = function(p1, p2) {
			var pkt1 = corners[p1];
			var pkt2 = corners[p2];
			var centrepoint = newVec3((pkt1.x + pkt2.x) / 2,
										(pkt1.y + pkt2.y) / 2,
										(pkt1.z + pkt2.z) / 2);
			corners.push(normalize(centrepoint));
			return corners.length - 1;
		}

		//Rekursive Berechnung der neuen Punkte und Flächen
		var calculateNewAreas = function(surfaceNow, schritt) {
			if (schritt == 0)
				return surfaceNow; //Abbruchbedingung
			var surfaceNew = [];
			for (var i = 0; i < surfaceNow.length; i++) { 
				var three = surfaceNow[i];
				var new1 = centrePointCalculate(three.a, three.b);
				var new2 = centrePointCalculate(three.b, three.c);
				var new3 = centrePointCalculate(three.c, three.a);

				surfaceNew.push(newVec3(three.a,   new1, new3));
				surfaceNew.push(newVec3(  new1, three.b, new2));
				surfaceNew.push(newVec3(  new3,   new2, three.c));
				surfaceNew.push(newVec3(  new1,   new2, new3));
			}
			return calculateNewAreas(surfaceNew, schritt - 1);
		}

		//Aufruf der rekursive Berechnung
		surfaces = calculateNewAreas(surfaces, rekursionsStuffe);

		// Positions.
		this.vertices = new Float32Array(3 * corners.length);
		var vertices = this.vertices;
		// Normals.
		this.normals = new Float32Array(3 * corners.length);
		var normals = this.normals;
		// Index data.
		this.indicesLines = new Uint16Array(6 * surfaces.length);
		var indicesLines = this.indicesLines;
		this.indicesTris = new Uint16Array(3 * surfaces.length);
		var indicesTris = this.indicesTris;

		
		for (var i = 0; i < corners.length; i++)
		{
			vertices[i * 3]     = corners[i].x;
			vertices[i * 3 + 1] = corners[i].y;
			vertices[i * 3 + 2] = corners[i].z - 1.5;

			normals[i * 3]     = corners[i].x;
			normals[i * 3 + 1] = corners[i].y;
			normals[i * 3 + 2] = corners[i].z;
		}

		//Fläschen zu der indicies Arrays für Linien und Dreiecke übertragung
		for (var i = 0; i < surfaces.length; i++)
		{
			indicesLines[i * 6]     = surfaces[i].a;
			indicesLines[i * 6 + 1] = surfaces[i].b;
			indicesLines[i * 6 + 2] = surfaces[i].b;
			indicesLines[i * 6 + 3] = surfaces[i].c;
			indicesLines[i * 6 + 4] = surfaces[i].c;
			indicesLines[i * 6 + 5] = surfaces[i].a;

			indicesTris[i * 3]     = surfaces[i].a;
			indicesTris[i * 3 + 1] = surfaces[i].b;
			indicesTris[i * 3 + 2] = surfaces[i].c;
		}
	}

	return {
		createVertexData : createVertexData
	}

}());
