/**
* Icicles.js
* Will Rhodes
*  creates falling icicles randomly
*  attached to a cube object
*/
#pragma strict

var rate = 1.0; //the amount of seconds between falls 
var icicleObj: GameObject; //the object that will fall

private var lastFall : float; //used for timing, the time of the last icicle fall

private var fallenObjs : GameObject[]; //a list of fallen game objects that still exist

function Start () {

}

function Update () {
	if (Time.time - lastFall > rate){
		var rotated = Quaternion.identity;
		rotated.z = 180;
		var tempIcicle = Instantiate(icicleObj,getRandomPointOnPlane(),rotated);
		lastFall = Time.time;
	}
	
}


/**
* Gets a random point on the cube this script is attached to
*/
function getRandomPointOnPlane()
{
	var point: Vector3;
	point.y = transform.position.y - 2;
	//find random points in the x and z direction (a unity plane is scaled 10.0 for 1.0 in localScale)
	point.x = (transform.position.x-(transform.localScale.x*0.5))+(Random.value*transform.localScale.x*1.0);
	point.z = transform.position.z-(transform.localScale.z*0.5)+(Random.value*transform.localScale.z*1.0);
	
	return point;
}