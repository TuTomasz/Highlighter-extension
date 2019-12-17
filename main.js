window.onload = ()=> {

    state = {
        "yellow":null,
        "pink":null,
        "blue":null,
        "green":null
    }
    getState = (color) =>{
        return state[color]
    }
    setState = (color,value) =>{
        state[color] = value
    }
    isValidState = (color)=> {
        if (state[color] != null) {
            return true
        }
        return false
    }
    
    
    /**
     * Yellow highliter function
     */
    highlighteYellow = () =>{

        if (isValidState("yellow") == true) {
            eraseYellow()
        }

        let input = document.getElementById("input-yellow").value
        executeAction("yellow",input)
        setState("yellow",input)
    }

    /**
     * Pink highliter function
     */
    highlightePink = () =>{

        if (isValidState("pink") == true) {
            erasePink()
        }
        let input = document.getElementById("input-pink").value
        executeAction("pink",input)
        setState("pink",input)

    }
    /**
     * Blue highliter function
     */
    highlighteBlue = () =>{

        if (isValidState("blue") == true) {
            eraseBlue()
        }
 
        let input = document.getElementById("input-blue").value
        executeAction("blue",input)
        setState("blue",input)

    }
    /**
     * Green highliter function
     */
    highlighteGreen = () =>{

        if (isValidState("green") == true) {
            eraseGreen()
        }

        let input = document.getElementById("input-green").value
        executeAction("green",input)
        setState("green",input)

    }
    /**
     * Function sends messages to content script to execute the 
     * highlighte command
     * 
     * @param  {} color - highlighte color
     * @param  {} input - word/phrase to highlighte
     */
    executeAction = (color,input) =>{
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "mark",color:color,phrase:input}, function(response) {
                if(response == undefined || Object.keys(response).length == 0) return;
            });  
        });
    }

    /**
     * Erase specific highlighter
     */
    eraseYellow = () =>{

        let lastInput = getState("yellow")
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "erase",color:"yellow",phrase:lastInput}, function(response) {
                if(response == undefined || Object.keys(response).length == 0) return;
            });  
        });
      
    }
    /**
     * Erase specific highlighter
     */
    erasePink = () =>{

        let lastInput = getState("pink")
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "erase",color:"pink",phrase:lastInput}, function(response) {
                if(response == undefined || Object.keys(response).length == 0) return;
            });  
        });
      
    }/**
     * Erase specific highlighter
     */
    eraseBlue = () =>{

        let lastInput = getState("blue")
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "erase",color:"blue",phrase:lastInput}, function(response) {
                if(response == undefined || Object.keys(response).length == 0) return;
            });  
        });
      
    }
    /**
     * Erase specific highlighter
     */
    eraseGreen = () =>{

        let lastInput = getState("green")
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "erase",color:"green",phrase:lastInput}, function(response) {
                if(response == undefined || Object.keys(response).length == 0) return;
            });  
        });
      
    }

    /**
     * Event Listeners for highlighter buttons
     */

    document.getElementById('highlighte-yellow').onclick = highlighteYellow
    document.getElementById('highlighte-pink').onclick = highlightePink
    document.getElementById('highlighte-blue').onclick = highlighteBlue
    document.getElementById('highlighte-green').onclick = highlighteGreen

    document.getElementById('erase-yellow').onclick = eraseYellow;
    document.getElementById('erase-pink').onclick = erasePink;
    document.getElementById('erase-blue').onclick = eraseBlue;
    document.getElementById('erase-green').onclick = eraseGreen;


}