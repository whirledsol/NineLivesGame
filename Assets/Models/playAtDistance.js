#pragma strict

/*
PlayAtDistance.js
Will Rhodes

Moves the attached obj when the character gets close to a CustomEditor. Used for moving flames. 
*/

var cue:Transform; //the object you get close to within seperation, sep
var character:Transform; //the character obj
var sep = 4.0; //the distance between character and cue before action
var yPos: float; //the movement of the obj this script is applied to. Only affects y motion currently

private var originalPos:Vector3;


function Start () {
	originalPos = transform.position;
}

function Update () {
	//Debug.Log(transform.position+"  "+character.position+"   "+ Vector3.Distance(transform.position, character.position));
	if (Vector3.Distance(cue.position, character.position) < sep)
		{
				var newPos = new Vector3(originalPos.x,originalPos.y+yPos,originalPos.z);
				transform.position = Vector3.MoveTowards(transform.position,newPos,6.0);
				Debug.Log("UH OH. FYREEEEE! "+transform.position);
			
		}
}