#pragma strict

var randObj: Transform;
var randObj2: Transform;

function Start () {

}

function Update () {
	var moveToward = Vector3.MoveTowards(transform.position,randObj.position,0.4);
	transform.position = moveToward;
	randObj2.position = new Vector3(1.0,2.0,3.0);

}