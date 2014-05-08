#pragma strict

var animate: Animation; 
function Start () {
	animate = GetComponent(Animation);
	animate.wrapMode = WrapMode.Loop;
 	animate.Play();
}

function Update () {
 	//Debug.Log(animate.IsPlaying("Take001"));
}