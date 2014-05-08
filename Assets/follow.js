#pragma strict

var randObj: Transform;

function Start () {

}

function Update () {
	var moveToward = Vector3.MoveTowards(transform.position,randObj.position,0.4);
	transform.position = moveToward;

}