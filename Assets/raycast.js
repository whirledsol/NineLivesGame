#pragma strict

function Start () {

}

function Update(){

		//create a ray, which is a line that starts from a position in the world and goes in a certain direction
		// the camera has a special function which creates a ray from the camera in the direction of the mouse position
	    var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
	    
		//create an empty RaycastHit object, we'll need to use this later
		var hit : RaycastHit;
	    
		//if we click on the left (0) mouse button (other options: right = 1, middle = 2)
		if(Input.GetMouseButtonDown(0))
	    {
	    	Debug.Log("shoot");
	    	
			// now create a raycast of our defined ray and of infinite length which does stuff to the hit object
			// it returns a boolean
			var didItHit = Physics.Raycast(ray, hit, Mathf.Infinity);
 
			//if it hits and the hit body has a rigidbody
		    if (didItHit && hit.rigidbody !=null) {
		    	Debug.Log("hit");

				//we can access the rigidbody of the object hit and apply a force at that point
				//the force has a magnitude of -1000/hit.distance: negative because it is away from the character
		    	hit.rigidbody.AddForceAtPosition(-1000*hit.normal/hit.distance, hit.point);
				
				
			}
	    }

	
	//to give it a gravity gun effect, we can use the right mouse button to add a force towards the character (+1000/hitdistance)
	if(Input.GetMouseButtonDown(1))
	    {
	    	Debug.Log("shoot");
	    	
		    if (Physics.Raycast(ray, hit, Mathf.Infinity) && hit.rigidbody !=null) {
		    	Debug.Log(hit.rigidbody);
		    	hit.rigidbody.AddForceAtPosition(1000*hit.normal/hit.distance, hit.point);
				
				
			}
	    }
		
	    
}