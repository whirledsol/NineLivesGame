/*
Button.js
Will Rhodes

Applied to a button object, basic button pressing and reaction functionality
*/

#pragma strict

public var character: GameObject; //links to the character obj in Darwin. Used to check if the character is on the button
private var characterInContact = false;//global var to see if the character is colliding with the button
public var compressButton:Vector3;//the direction and magnitude in which the button presses
public var on = false;//boolean that shows if the button is pressed or not
private var offPosition:Vector3;//the original position of the button that is determined during start
public var affectedComponents: GameObject[];//an array of objects that should have ButtonResponse.js scripts on them

function Start () {

	//Debug.Log("Starting pos:"+on);
	if (on){
		offPosition = transform.position;
		//turnOn();
	}
	else{
		offPosition = transform.position;
		//turnOff();
	}
}

function Update () {

	transform.rotation = Quaternion.identity;
	
	if(on){
		transform.position = Vector3.MoveTowards(transform.position,offPosition-compressButton,0.01);
	}
	else{
		transform.position = Vector3.MoveTowards(transform.position,offPosition,0.01);
	}

	var pressbutton = characterInContact && !on;

	if (compressButton.y != 0) //that means it has to be pushed down or up and requires being in the same z
	{
		pressbutton = pressbutton && Mathf.Abs(character.transform.position.z - transform.position.z) <= 0.5;
	} 

	if (pressbutton){
		turnOn();
	}
}







function turnOn(){
	Debug.Log("Button is now active and pressed");
	on = true;
	try
	{
		for(var i=0;i<affectedComponents.length;i++){	
			affectedComponents[i].BroadcastMessage("buttonResponse",true);
		}
	}
	catch(err)
		{Debug.Log("BUTTON RESPONSE NOT SETUP PROPERLY:"+err);}
}


function turnOff(){
	Debug.Log("Button is now NOT active");
	on = false;
	try
	{
		for(var i=0;i<affectedComponents.length;i++){	
			affectedComponents[i].BroadcastMessage("buttonResponse",false);
		}
	}
	catch(err)
		{Debug.Log("BUTTON RESPONSE NOT SETUP PROPERLY:"+err);}
}


function OnCollisionEnter(collision : Collision) {

	if (collision.gameObject == character){
		//Debug.Log("collides with character");
		characterInContact = true;
	}

}
function OnCollisionExit(collision : Collision) {

	if (collision.gameObject == character){
		//Debug.Log("collides with character");
		characterInContact = false;
	}

}