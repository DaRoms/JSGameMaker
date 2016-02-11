/*
* Controls the main view
*/

//TODO: Add renaming to GameObjects

var Console = null;
var CodeEditor = null;
var SelectedGameObject = null;
var SelectedTab = null;
var c = null; // Game canvas context
var CodeMode = null; //Load by default

// UI properties and such
setInterval(function() {
    if(SelectedGameObject != null){
        document.getElementById("selected_gameobject_label").innerHTML = "Selected: " + SelectedGameObject.Name;
    }
}, 50);


function onload(){
    Console = document.getElementById("console");
    CodeEditor = ace.edit("editor");
    CodeEditor.setTheme("ace/theme/dawn");
    CodeEditor.getSession().setMode("ace/mode/javascript");

    CodeEditor.getSession().on('change', function(e) {
        if(SelectedGameObject != null) {
            if(CodeMode == "load"){
                SelectedGameObject.LoadCode = CodeEditor.getValue();
            }
            if(CodeMode == "update"){
                SelectedGameObject.UpdateCode = CodeEditor.getValue();
            }
        }
    });

    c = document.getElementById("game_view_canvas").getContext("2d");

    setCodeMode("load");
}

function setCodeMode(mode) {
    CodeMode = mode;

    if(SelectedGameObject != null) {
        if(CodeMode == "load"){
            CodeEditor.setValue(SelectedGameObject.LoadCode);
        }
        if(CodeMode == "update"){
            CodeEditor.setValue(SelectedGameObject.UpdateCode);
        }
    }
}

function msg(msg){
    var p = document.createElement("p");
    p.innerHTML = "- " + msg;
    p.className = "console_message";
    Console.appendChild(p);

    Console.scrollTop = Console.scrollHeight;
}

function showTab(tab){
    document.getElementById("editor_container").style.display = "none";
    document.getElementById("room_editor").style.display = "none";
    document.getElementById("game_view").style.display = "none";

    document.getElementById(tab).style.display = "inline-block";
    SelectedTab = tab;
}

function AddGameObject(){
    var obj = new GameObject("New GameObject");
    document.getElementById("gameobjectlist").appendChild(obj.GetUIElement());
}

function runGame() {
    if(Running) {
        Started = false;
    }

    showTab("game_view");
    Running = true;

    //Run the game
    eval(GenerateCode());
}

function stopGame() {
    Running = false;
    Started = false;
}
