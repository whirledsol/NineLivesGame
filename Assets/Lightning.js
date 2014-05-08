/**
* Lightning.js
* Will Rhodes
* Randomly generates lighning
*  MUST BE ATTACHED TO A THIN CUBE WHERE THE LIGHNING STEMS FROM
*/
#pragma strict

//declarations for the random timing of the lightning
private var durationToNextFlash = 0.0;
private var flash = false;
private var lastflash = 0.0;

//declarations for the procedural lightning bolt
private var hit : RaycastHit; //the raycasthit used for when hitting objects
private var line : LineRenderer; //the linerenderer used to create the lightning
var ray : Ray; //the ray for raycasting
var lightningPoints = 8; //the number of points in each lightning bolt
var frequency = 2.0; //seconds until the next flash
var basicMaterial : Material;//the material of the lightning bolt

//Nine Lives related
var character: GameObject; //used to see if the character was hit
var hitMaterial : Material;//the material/color used when the character is hit


function Start () {
	   gameObject.AddComponent(LineRenderer);
	   line = GetComponent(LineRenderer);
	   line.material = basicMaterial;//OBJECT MUST HAVE A LINE RENDERER ON IT
       line.SetVertexCount(lightningPoints);//the number of points ~3-6
       //line.renderer.material = lineMaterial; //make the attached material the bolt material
       line.SetWidth(0.2f, 0.2f); //how wide is the bolt?

	//if we don't specify a hit material, use the basic material
	if (hitMaterial == null){
		hitMaterial = basicMaterial;
	}
}

function Update () {
	
	//the line is hidden but after the flash
	if(Time.time - lastflash > 0.4)
		line.enabled = false;

	//is it time to flash?
	if(Time.time - lastflash > durationToNextFlash){
		flash = true;
	}

	//produce a flash
	if(flash){
		durationToNextFlash = Random.value*frequency; //set the next random time
		lastflash = Time.time; //reset the lastFlash time
		//Debug.Log("random num: "+durationToNextFlash);//DEBUG
		flash = false;//important - set this back to false
		
		//if the character is undernearth the cube, zap near it now and again
		if(isBelowClouds()){
			zing(getRandomPointAroundCharacter(5.0));//procedurally generate the flash
		}
		else{
			zing(getRandomPointOnPlane());
		}
	}

}


function zing(startingPoint:Vector3){
	
	
	var totalDirection = Vector3(0,-1,Random.Range(-1,1));
	var localVariation = Vector3(Random.Range(-2,2),-1,Random.Range(-2,2));
	//Debug.Log("Starting point"+startingPoint);
	ray = Ray(startingPoint,totalDirection);
	if(Physics.Raycast(ray,hit,Mathf.Infinity))
	{
		//if we hit the character, change the color
		if(hit.transform.gameObject == character){
			line.material = hitMaterial;
			Debug.Log("LIGHTNING HIT THE CHARACTER");
			//we hit the character with the lightning!
		}
		else{
			line.material = basicMaterial;
		}
		line.enabled = true;
    	line.SetPosition(0, startingPoint);
		
		var distanceToOffset = hit.distance/(lightningPoints-2);
		//Debug.Log("Lightning Params "+lightningPoints+" "+distanceToOffset);
        for(var i=1;i<=(lightningPoints-2);i++){
			if(i%2==0){
				localVariation.z = -localVariation.z; 
				localVariation.x = -localVariation.x; 
			}
			var rotatePoint = ray.GetPoint(distanceToOffset);
			line.SetPosition(i, rotatePoint);
			ray = Ray(rotatePoint,localVariation);
		}
		line.SetPosition(lightningPoints-1, hit.point);
		//Debug.Log("Ending Point"+hit.point);
		//Debug.DrawLine(startingPoint,Vector3(startingPoint.x,-10,startingPoint.z),Color.red,10.0);
	}
	

}

/**
* creates a basic, vertical flash
*/
function zing_basic(){
	
	var startingPoint = getRandomPointOnPlane();

	Debug.Log("Starting point"+startingPoint);
	ray = Ray(startingPoint,Vector3.down);
	if(Physics.Raycast(ray,hit,Mathf.Infinity))
	{
		line.enabled = true;
    	line.SetPosition(0, startingPoint);
        line.SetPosition(1, hit.point);
		Debug.Log("Ending Point"+hit.point);
		Debug.DrawLine(startingPoint,Vector3(startingPoint.x,-10,startingPoint.z),Color.red,10.0);
	}
	

}


/**
* Gets a random point on the cube this script is attached to
*/
function getRandomPointOnPlane()
{
	var point: Vector3;
	point.y = transform.position.y;
	//find random points in the x and z direction (a unity plane is scaled 10.0 for 1.0 in localScale)
	point.x = (transform.position.x-(transform.localScale.x*0.5))+(Random.value*transform.localScale.x*1.0);
	point.z = transform.position.z-(transform.localScale.z*0.5)+(Random.value*transform.localScale.z*1.0);
	
	return point;
}

/**
* Gets a random point on the cube this script is attached to but around the character
*/
function getRandomPointAroundCharacter(distance: float)
{
	var point: Vector3;
	point.y = transform.position.y;
	//find random points in the x and z direction (a unity plane is scaled 10.0 for 1.0 in localScale)
	point.x = (transform.position.x-(transform.localScale.x*0.5))+(Random.value*transform.localScale.x*1.0);
	point.z = character.transform.position.z-(distance/2.0)+(Random.value*distance);
	
	return point;
}

/**
* returns true if character is below the cube
*/
function isBelowClouds(){
	var characterPos = character.transform.position;
	var lbZ = transform.position.z - transform.localScale.z*0.5;
	var ubZ = transform.position.z + transform.localScale.z*0.5;
	var lbX = transform.position.x - transform.localScale.x*0.5;
	var ubX = transform.position.x + transform.localScale.x*0.5;
	if(characterPos.z<=ubZ && characterPos.z>=lbZ && characterPos.x <= ubX   &&   characterPos.x >= lbX  && characterPos.y < transform.position.y){
		return true;
	}
	else{
		return false;
	}
}