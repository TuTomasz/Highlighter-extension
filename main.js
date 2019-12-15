window.onload = ()=> {
    
    /**
     * @param  {} =>{console.log("add"
     */
 
    highlighte = () =>{

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "mark",color:"yellow",phrase:"easy"}, function(response) {});  
        });
    }
    
    erase = () =>{

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "erase"}, function(response) {});  
        });
      
    }

    
    document.getElementById('highlighte-yellow').onclick = highlighte
    document.getElementById('highlighte-pink').onclick = erase;

}