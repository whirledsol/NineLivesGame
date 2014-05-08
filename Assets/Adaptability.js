//#pragma strict //MUST BE OFF
/*
Adaptability.js
Will Rhodes

Specific for the AdaptivePlatformer. Includes checkpoint mechanics, flame interaction, and death actions.

*/

var character: GameObject; //character obj
var checkpointContainer: Transform; //the empty gameObject in the heirarchy that contains all the checkpoints
var flameContainer: Transform; //the empty gameObject in the heirarchy that contains all the flames - got to watch out for those
private var checkpoints; //global variable which is an array of all the checkpoints
private var hasFireArmor = false; //global variable which decides if the character should be affected by flames

public var totalNumOfLifes = 9; //mutable, total number of lives
private var numOfLives: int; //global, number of lives
public var gStyle: GUIStyle; //display for 

//var wingedModel: GameObject;
//var metalModel: GameObject;
////////////////////////////////////////////////////////////////////////////////////////
function Start () {
	checkpoints = new Transform[checkpointContainer.childCount];
	for(var i=0; i<checkpointContainer.childCount;i++){
		checkpoints[i] = checkpointContainer.GetChild(i);
	}
	Debug.Log("*****");
	for(i=0;i<checkpoints.length;i++){
		Debug.Log(checkpoints[i]);
	}
	Debug.Log("*****");
	/*
	checkpoints.Sort(function(a,b){
		if(a.name > b.name)
			return 1;
		if(a.name < b.name)
			return -1;
		return 0;
	});
	
	Debug.Log("*****");
	for(i=0;i<checkpoints.length;i++){
		Debug.Log(checkpoints[i].name);
	}
	Debug.Log("*****");
	*/
	
	
	numOfLives = totalNumOfLifes;
}
////////////////////////////////////////////////////////////////////////////////////////
function Update () {
	CheckPointListener();
	if(!hasFireArmor){
		FireListener();
	}


	if (character.transform.position.y < -3.5)
	{
		Death("pit");
	}
	
	/*
	for(var i=0; i< flames.childCount; i++)
	{
		if (Vector3.Distance(flames.GetChild(i).position, character.transform.position) < fireDistance && !hasFireArmor)
		{
			Death("fire");
		} 
	
	}*/
	
}
////////////////////////////////////////////////////////////////////////////////////////
function CheckPointListener(){

	//goes through checkpoints
	for(var i=checkpoints.length-1; i>=0; i--)
	{
		var thisCheckpoint = checkpoints[i];
		//only check points that have not been reached
		if (thisCheckpoint.GetComponent(CheckPoint).reachedPoint == false)
		{
			if(Vector3.Distance(thisCheckpoint.position, character.transform.position) <5.0)
			{
				//we have reached this point
				thisCheckpoint.GetComponent(CheckPoint).setReachedPoint(true);
			}
		}
		
	}


}
////////////////////////////////////////////////////////////////////////////////////////
function FireListener(){
		var particles = character.GetComponent(ChangeModel).getCollidedParticleSystem();
		if (particles !=null){
			Debug.Log(particles);
			//then we hit particles and we don't have armor
			if(particles.transform.IsChildOf(flameContainer))
			{
				//then we hit fire and we don't have armor
				Death("fire");
			}
		}

}
////////////////////////////////////////////////////////////////////////////////////////
function Death(type)
{

	//reset variables
	character.rigidbody.drag = 0; //change air drag
	GetComponent(BasicSlideScrollMovement).jumpScale = 7.0;
	hasFireArmor = false;
	GetComponent(BasicSlideScrollMovement).canfly = false;
	
	//reduce number of lives
	numOfLives = numOfLives-1;
	if (numOfLives == 0){
		GetComponent(LevelControl).gameOver();
	}
	
	if (type == "pit"){
		Debug.Log("Died from Pit. Getting wings.");
		GetComponent(BasicSlideScrollMovement).canfly = true; //it can now fly
		changeModel("pit"); //change prefab model
		character.rigidbody.drag = 3.0; //change air drag
	}
	else if (type=="fire"){
		Debug.Log("Died from fire. Getting armor.");
		hasFireArmor = true; //but it can go through FYREEEEEE
		changeModel("fire"); //change prefab model
		GetComponent(BasicSlideScrollMovement).jumpScale = 2.0; //can't jump as high
	}
	else{
	//NORMAL CAT
	}

	var goTo = null;
	for(var i=checkpoints.length-1; i>=0; i--)
	{
		
		var thischeckpoint = checkpoints[i].GetComponent(CheckPoint);
		
		if (thischeckpoint.reachedPoint){
			goTo = checkpoints[i].transform.position;
			break;
		}
	}
	
	
	Debug.Log("Last checkpoint " +goTo);
	//return to last checkpoint
	character.rigidbody.velocity = Vector3.zero;
	character.transform.position = goTo;
	//transform.position = goTo;
}
////////////////////////////////////////////////////////////////////////////////////////
function changeModel(type)
{
	if(type == "pit")
	{

		character.GetComponent(ChangeModel).changeModel("pit");
	}
	if (type=="fire")
	{
		character.GetComponent(ChangeModel).changeModel("fire");
	}
}
////////////////////////////////////////////////////////////////////////////////////////
function OnGUI () {
	GUI.Box (Rect (10,10,120,60), "Lives Remaining"); //background
	GUI.Label (Rect (55,35,50,50), ""+numOfLives,gStyle);
	if(GUI.Button(Rect(10,70,120,30),"Pause"))
	{
		GetComponent(LevelControl).pause();
	}

}
///////////////////////////////////////////////////////////////////////////////////////
function getNumOfLives(){
	return numOfLives;
}
function setNumOfLives(num){
	numOfLives = num;
}
///////////////////////////////////////////////////////////////////////////////////////