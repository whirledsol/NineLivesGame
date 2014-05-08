#pragma strict

/*
ChangeModel.js
Will Rhodes

Programically and dynamically changes the prefab used for the cat based on what death it went through. 
Gets called from Adapatability.
Each model must be imported as a gameobject and Instantiated
Attached to character object and not Darwin
Use getCurrentModel to access the gameObject prefab


Also controls animations for models
*/


var originalCat:GameObject;
var wingedCat:GameObject;
var metalCat:GameObject;
private var currentModel:GameObject;
private var particleSystemThatCollided = null

;
function Start () {
	currentModel = Instantiate(originalCat, transform.position,transform.rotation) as GameObject;
	currentModel.transform.parent = transform;
		try{
			currentModel.GetComponent(Animation).wrapMode = WrapMode.Loop;
		}
		catch(err){
			//do nothing
		}
}

function changeModel(type){

	var thisModel: GameObject;
	
	if(type == "pit")
	{
		thisModel = Instantiate(wingedCat, transform.position, transform.rotation) as GameObject;
	}
	if(type == "fire")
	{
		thisModel = Instantiate(metalCat,transform.position,transform.rotation) as GameObject;
	}
	
		Destroy(currentModel);
		thisModel.transform.parent = transform;
		currentModel = thisModel;
		
		try{
			currentModel.GetComponent(Animation).wrapMode = WrapMode.Loop;
		}
		catch(err){
			//do nothing
		}
}

function Update(){
	//link the model's transform properties with the character obj
	currentModel.transform.position = transform.position;
	currentModel.transform.rotation = transform.rotation;
	particleSystemThatCollided = null;
	
	
	//animation
	
	if(Input.GetKey("a") || Input.GetKey("left") || Input.GetKey("d") || Input.GetKey("right"))
	{
		try{
			 
			currentModel.GetComponent(Animation).Play();
		}
		catch(err){
			//Debug.Log(err);
		}
		
	}
	else{
		try{
			 
			currentModel.GetComponent(Animation).Stop();
			currentModel.GetComponent(Animation).Rewind("walking");
		}
		catch(err){
			//Debug.Log(err);
		}
	}
	
	
	
}


function getCurrentModel()
{
	return currentModel;

}

function OnParticleCollision(ps : GameObject){
		particleSystemThatCollided = ps;
		Debug.Log("PARTICLE COLLISION");
	

}
function getCollidedParticleSystem(){
	return particleSystemThatCollided;
}
