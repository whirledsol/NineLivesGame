/**
* Destroy.js
* Will Rhodes
*  creates falling icicles randomly
*  attached to a cube object
*/
var whenToDestroy = 1; //how old the object has to be until it gets destroyed
private var age; //the age of the instantiated obj
var DestroyByCollision = false; //if it gets destroyed on collision



// Use this for initialization
function Start () {
	age = Time.time;
}


// Update is called once per frame
function Update () {

	if(Time.time - age > whenToDestroy){
		for(var percent = 1;percent>0.0;percent = percent - 0.1){
			gameObject.renderer.material.color.a = percent;
				//TODO: pause
		}
		Destroy(gameObject);
	
	}

}

function OnCollisionEnter(collision : Collision) {

		if (DestroyByCollision){
			var explosion = GetComponent(ParticleSystem);
			explosion.Play();
			
			Destroy(gameObject.renderer);
			Destroy(gameObject,0.25);
		

		}
	}