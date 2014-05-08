#pragma strict
/*
darwinSounds
Will Rhodes

Applied to character object.
If using the horizontal keys, walking sound is played. If using up key or with the certain y velocity, flying is played.
Needs an audio source attached to obj
*/


var walkingGeneric: AudioClip; //Sound for walking
var flying: AudioClip; //Sound for flying
//var metal: AudioClip; //Sound for metal cat walking
//private var walkingSound: AudioClip; //the current walking sound


private var shouldPlay = false; //determines if audio should be played


function Start () {
	audio.Stop();
}

function Update () {
	//Debug.Log(GetComponent(ChangeModel).getCurrentModel().name);
	audio.loop = true;
	
	var intheair = transform.parent.gameObject.GetComponent(BasicSlideScrollMovement).areWeInTheAir();
	
	if (intheair)
	{
		//Debug.Log("FLYING SOUND");
		audio.clip = flying;
		shouldPlay  = true;
	}
	else if(Input.GetAxis("Horizontal")!=0 && !intheair) //WALKING SOUNDS
	{
		//Debug.Log("WALKING SOUND");
		audio.clip = walkingGeneric;
		shouldPlay = true;
	
	}
	
	if(Input.GetAxis("Horizontal") == 0 && !intheair)
	{
		shouldPlay = false;
	}
	
	////////////////////////////////////////////////////////
	if (shouldPlay && !audio.isPlaying)
	{
		//Debug.Log("PLAYING AUDIO");
		audio.Play();
	}
	if (!shouldPlay && audio.isPlaying)
	{
		//Debug.Log("STOPPING AUDIO");
		audio.Stop();
	}
	

}