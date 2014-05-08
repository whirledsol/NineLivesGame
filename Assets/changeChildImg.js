/*
changeChildImg.js
Will Rhodes

Programically changes the texture of the child obj of a prefab. Apply to the sign prefab so to change the sign image.


*/


#pragma strict
var image: Texture2D;
function Start () {
	transform.Find("sign").gameObject.renderer.material.mainTexture= image;
}

function Update () {

}