#pragma strict
/*
LevelUp.js
Will Rhodes

Determines if the level is completed. Applied to the door or ending object.

*/


var character:Transform; //character obj
var sep = 4.0; //seperation between character and the applied obj
var soundEffect: AudioClip; //the sound effect associated with the success
private var audioPlayed = false; //used globally to make sure the audio only plays once
private var showWindow : boolean; //used OnGUI to determine if the window should be shown or not.
private var animationHasPlayed = false; //determines if we should play the animation
function Start () {
	showWindow = false;
}

function Update () {
	
	if (Vector3.Distance(character.position, transform.position) < sep){	
	
		//open the door
		try{
			if (!animationHasPlayed){
				GetComponent(Animation).Play();
				animationHasPlayed = true;
			}
		}
		catch(err){
			//err.......i don't know what happened
			Debug.Log(err);
		}
		
		if (!audioPlayed)
		{
			audio.clip = soundEffect;
			audio.Play();
			audioPlayed = true;
		}
		character.parent.gameObject.GetComponent(LevelControl).levelCompleted();
	}
}
