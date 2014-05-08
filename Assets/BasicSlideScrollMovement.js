#pragma strict
/*
BasicSlideScrollMovement.js
Will Rhodes
Mechanics for a character including jumping and camera
*/


var cam: Transform; //camera obj
var character: Transform; //character obj
private var startx: float; //character's start x position which should remain constant throughout game
private var camOffset: Vector3; //global difference between character and camera
var introZoomOut = Vector3(0,0,0);
//private var camStart; 
public var canfly = false; //decides if the character can have unlimited jumps
var jumpScale = 7.0; //how much vertical velocity goes into the character
private var intheair = false;


function Start () {
	

	startx = transform.position.x;
	camOffset = character.position - cam.position; 
	cam.position = (character.position - camOffset) - introZoomOut;
}

function Update () {
	//make the camera move to the character if not on it
	if(cam.position.x != (character.position - camOffset).x)//if we are zooming in
	{
		cameraZoom();
	}
	else //constant lock
	{
		cam.position = character.position - camOffset;
	}
	//except in the y direction, don't have it follow into the pit
		if (cam.position.y < 0.0)
		{
			cam.position.y = 0.0;
		}
	//set character on one x axis
	character.position.x = startx;
	
	
		//JUMPING	
		var shouldwejump: boolean;		
		
		if(canfly)
		{
			//continuous boost and no need to check for current y velocity
			shouldwejump = (Input.GetKey("up") || Input.GetKey("w") || Input.GetKey("space"));
		}
		else{
			//normal - cat can't fly silly
			var hit : RaycastHit;
			if (Physics.Raycast (character.position+Vector3(0,0.5,0), Vector3.down, hit)) {
				if(hit.distance > 2.0 || Mathf.Abs(character.rigidbody.velocity.y) > 0.5)
					intheair = true;
				else
					intheair = false;
				//Debug.Log("Hit distance" + hit.collider + hit.distance);
				shouldwejump = (Input.GetKeyDown("up") || Input.GetKeyDown("w")|| Input.GetKeyDown("space")) && !intheair;
			}
			else{
				Debug.Log("The cat is not over any colliders. This could be bad?");
				intheair = true;
			
			}
			
		}
		
		if(shouldwejump)
		{
			//we jump
			character.rigidbody.velocity.y = jumpScale;
		}
		// END JUMPING
		
		//downward force
		if(Input.GetKeyDown("s") || Input.GetKeyDown("down"))
		{
			//we add force down
			character.rigidbody.AddForce(Vector3.down*jumpScale*50);
		
		}
 
}
	
	function FixedUpdate(){
	
		var scale = 0.1;
		transform.Translate(0,0,Input.GetAxis("Horizontal")*scale); //change the z
		
		if(Input.GetKey("a") || Input.GetKey("left"))
		{
			//we turn around
			//character.rotation = Quaternion.Euler(0, 180, 0);
			character.rotation.y = 180; 

			
		}
		else if(Input.GetKey("d") || Input.GetKey("right"))
		{
			//we turn around
			//character.rotation = Quaternion.Euler(0, 0, 0);
			character.rotation.y = 0; 
		}

		

		
		
		
	//always make sure the cat is not rotating
	if (Mathf.Abs(character.rotation.x)>45);
		character.rotation.x = 0;
	character.rotation.z = 0; 

	//remove angular velocity
		character.rigidbody.angularVelocity = Vector3.zero;
	
	
}

//will use later
function cameraZoom()
{

	cam.position = Vector3.MoveTowards(cam.position, character.position - camOffset, 0.5);
}

//accessor for intheair variable to be used by the darwinSounds.js class
function areWeInTheAir(){
	return intheair;
}