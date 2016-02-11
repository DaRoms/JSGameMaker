/*
*   Has an array of GameObjects
*   Runs through all GameObjects and runs the code attached
*   Handles stuff
*/

var GameObjects = new Array();
var UpdateTime = 10;
var Running = false;
var Started = false;
var Code = ""; // The ultimate code to be generated and run


function GenerateCode() {
    Code = "";

    //Adding the load part
    for(var i = 0;i < GameObjects.length;i++) {
        Code += (GameObjects[i].LoadCode + "\n");
    }

    //Setting up the update loop
    Code += "setInterval(function() {\n";
    Code += "if(Running){\n";
    Code += "c.clearRect(0,0,2000,1500);\n"
    //Adding the update part
    for(var i = 0;i < GameObjects.length;i++) {
        Code += (GameObjects[i].UpdateCode + "\n");
    }
    Code += "}\n";
    Code += "}, UpdateTime);";

    return Code;
}
