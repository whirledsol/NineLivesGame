/*
ButtonResponse_Fire.js
Will Rhodes

Applied to an object with a particle system. If a Button.js links with the obj, this function gets called. Note that
this toggles the state of the particle system and does not match the calling state.
*/
#pragma strict

function buttonResponse(on: boolean){
	var ps = GetComponent(ParticleSystem);
		if(!ps.isPlaying){
			GetComponent(ParticleSystem).Play();
			//Debug.Log("Should be playing");
		}
		else{
			GetComponent(ParticleSystem).Stop();
			//Debug.Log("Should not be playing");
		}

}