/*
Level Control.js

TODO: should be integrated with LevelUp for encapsulation purposes

Will Rhodes
*/

#pragma strict
public var gameOverStyle: GUIStyle;
public var titleStyle: GUIStyle;

public var titleTexture: Texture;
private var showOverlay = false;
public var msg = "WTF";
private var isPaused = false; //adds a continue button if true
public var showTitle = false; //displays the title screen
private var titleText: String;
function Start () {
	titleText = "Welcome to Nine Lives, the game where death pays off! Our friend Darwin here is an aristo-cat who loves searching for treasure in dangerous places.\n\nHelp him reach the door to move deeper into the temple, by using the very traps sent to keep him out!\n\nIf Darwin gets hurt, he’ll adapt and become immune to the trap that hurt him. But he’ll have new weaknesses between forms...and he only has nine lives!\n\nGet Darwin to each the end using as little lives as possible!";
}
function Update () {



}

function OnGUI () {


	if (showTitle){
		Time.timeScale = 0;
		showOverlay = false; //don't show both, you whipper snapper
		GUI.Box (Rect (0,0,Screen.width,Screen.height), titleText, titleStyle); //background
		
		GUI.DrawTexture(Rect(parseInt(Screen.width/4.0),10,860,182), titleTexture);
		
		
		if (GUI.Button(Rect(parseInt(Screen.width/2),parseInt(3.0*Screen.height/4),250,50),"Play")){
					Time.timeScale = 1.0;
					showTitle = false;
					
		} 
	
	}
	if(showOverlay){
		GUI.Box (Rect(0,0,Screen.width,Screen.height), msg, gameOverStyle); //background
		if(isPaused){
			//show continue button
			if (GUI.Button(Rect(parseInt(Screen.width/2),parseInt(2.5*Screen.height/4),250,50),"Continue")){
				Debug.Log("Continue");
				Time.timeScale = 1;
				showOverlay = false;
			}  

		}
		if (GUI.Button(Rect(parseInt(Screen.width/3),parseInt(3*Screen.height/4),250,50),"Try Again")){
			Debug.Log("Trying again");
			Time.timeScale = 1;
			Application.LoadLevel (0);  
		}
		if (GUI.Button(Rect(parseInt(2*Screen.width/3),parseInt(3*Screen.height/4),250,50),"Exit")){
			Debug.Log("Quit");
			Application.Quit();  
		}

	}
}






function gameOver(){
	isPaused = false;
	showOverlay = true;
	msg = "Game Over!";
	Time.timeScale = 0;
}
function pause(){
	isPaused = true;
	showOverlay = true;
	msg = "Paused";
	Time.timeScale = 0;

}
function levelCompleted(){
	isPaused = false;
	showOverlay = true;
	msg = "Level Completed!";
}

