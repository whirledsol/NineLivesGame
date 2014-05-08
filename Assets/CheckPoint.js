#pragma strict

/*
CheckPoint.js
Will Rhodes

Used in the CheckPoint Prefab.
Determines what happens when each checkpoint is reached and keeps track if the assocaited checkpoints have been reached or not.

USE THE setReachedPoint() function and not .reachedPoint!!!!!!!!!!!

*/

var reachedPoint = false;
var soundEffect: AudioClip;
/*function CheckPoint(in_position,in_reachedPoint){
	position = in_position;
	reachedPoint = in_reachedPoint;

}
*/
function setReachedPoint(status)
{
	reachedPoint = status;
	if (status == true)
	{
		haveReachedPoint();
	}
}

function haveReachedPoint(){
	GetComponent(ParticleSystem).Play();
	audio.clip = soundEffect;
	audio.Play();

}
