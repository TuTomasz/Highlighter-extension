window.onload = ()=> {
    
    /**
     * Yellow highliter function
     */
    highlighteYellow = () =>{

        let input = document.getElementById("input-yellow").value
        executeAction("yellow",input)
    }

    /**
     * Pink highliter function
     */
    highlightePink = () =>{

        let input = document.getElementById("input-pink").value
        executeAction("pink",input)

    }
    /**
     * Blue highliter function
     */
    highlighteBlue = () =>{

        let input = document.getElementById("input-blue").value
        executeAction("blue",input)

    }
    /**
     * Green highliter function
     */
    highlighteGreen = () =>{

        let input = document.getElementById("input-green").value
        executeAction("green",input)

    }
    /**
     * Function sends messages to content script to execute the 
     * highlighte command
     * 
     * @param  {} color - highliter color
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
    erase = () =>{

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "erase"}, function(response) {
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

    document.getElementById('test').onclick = erase;

}