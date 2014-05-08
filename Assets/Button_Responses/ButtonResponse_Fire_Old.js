/*
ButtonResponse_Fire_Old
Will Rhodes

Applied to an object with a particle system. If a Button.js links with the obj, this function gets called. 
*/
#pragma strict

function buttonResponse(on: boolean){

	if(on){
		GetComponent(ParticleSystem).Play();
	}
	else{
		//off
		GetComponent(ParticleSystem).Stop();
	}
}