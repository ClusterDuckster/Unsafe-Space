function Planet( textureNr ){
    
    var myPlanet = this;

	this.name = 'Erde';

	this.textureNr = textureNr;

	//Ressourcen
	this.metal = 0;
	this.fiber = 0;
	this.nucleus = 0;
	this.infenites = 0;
	this.drones = 1;

	//Erstelle Planeten
	this.geometry = new THREE.SphereGeometry( 2, 16, 16 );
    //AUF KEINEN FALL THREE.MeshBasicMaterial() BENUTZEN!!! -> da kein emissive
    this.material = new THREE.MeshLambertMaterial( {} );
    this.mesh = new THREE.Mesh( this.geometry, this.material );
}
