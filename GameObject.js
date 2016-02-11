function GameObject(text) {
    this.Name = text;
    this.LoadCode = "//This piece of code is attached to the currently selected GameObject\n"; //By default
    this.UpdateCode = "//This piece of code is attached to the currently selected GameObject\n"; //By default
    this.UIElement = document.createElement("div");
    this.UIElement.className = "listitem";


    var GameObject = this; // This, because mouse events can't operate on this GameObject's properties
    var UIElement = this.UIElement; // Used with mouse/kb events
    var clicked = false; // Used for checking double click

    this.GetUIElement = function(){
        this.UIElement.innerHTML = this.Name;
        return this.UIElement;
    }

    // This function will do multiple things depending on which view the user is looking at
    this.UIElement.onclick = function() {
        SelectedGameObject = GameObject;

        // Removing selected from every listitem
        $(".listitem").removeClass("selected");

        //Adding selected classname to this element as it's now the selected one
        if(UIElement.className.indexOf("selected") == -1) // If it hasnt been selected yet
            UIElement.className += " selected";

        //If already clicked once in small portion of time
        if(clicked) {
            var tbox = document.createElement("input")
            tbox.type = "text";
            tbox.className = "tbox";
            tbox.value = GameObject.Name;

            tbox.onkeyup = function(e) {
                if(e.which == 13) { // if enter pressed
                    if(tbox.value != ""){
                        msg("Renamed " + GameObject.Name + " to " + tbox.value);
                        GameObject.Name = tbox.value;
                        UIElement.innerHTML = GameObject.Name;
                    }
                }
            }

            UIElement.innerHTML = "";
            UIElement.appendChild(tbox);
        }
        clicked = true;
        setTimeout(function() {
            clicked = false;
        }, 500); // Half a second time to click again

        //If code edit
        if(SelectedTab == "editor_container"){
            if(CodeMode == "load"){
                CodeEditor.setValue(GameObject.LoadCode);
            }
            if(CodeMode == "update"){
                CodeEditor.setValue(GameObject.UpdateCode);
            }
        }
    };

    this.RunLoadCode = function() {
        eval(this.LoadCode); // Runs the script attached to this gameobject on load
    };
    this.RunUpdateCode = function(){
        eval(this.UpdateCode); // Runs the script attached to this gameobject on update
    };

    // Remove this when room editor is working, because the game should only run the
    // code of those objects which are in the room
    GameObjects.push(this);

    this.destroy = function(){
        GameObjects.splice(GameObjects.indexOf(this), 1);
    }
}
