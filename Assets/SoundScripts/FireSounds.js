/*
FireSounds.js
Will Rhodes

A simple script that controls the sounds emitted by a fire object.
*/
#pragma strict

function Start () {

}

function Update () {
	var ps = GetComponent(ParticleSystem);
	if(ps.isPlaying && !audio.isPlaying){
		audio.Play();
	}
	if(!ps.isPlaying && audio.isPlaying){
		audio.Stop();
	}
}