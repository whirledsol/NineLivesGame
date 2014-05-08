#pragma strict

function buttonResponse(on: boolean){

	if(on){
		GetComponent(Button).turnOff();
	}
	/*else{
		GetComponent(Button).turnOn();
	}*/
}