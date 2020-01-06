window.onload = () => {

    getTabId()
    // state of higlighted words on webpage
    state = {
        "yellow": null,
        "pink": null,
        "blue": null,
        "green": null
    }
    // updates the state variable if state exist for this tab session
    chrome.storage.sync.get(['state'], function(result) {
        //console.log('Value currently is ' + JSON.stringify(result.state));
        state = result.state
    })
    
    getState = (color) => {
        return state[color]
    }
    setState = (color, value) => {
        state[color] = value
    }
    isValidState = (color) => {
        if (state[color] != null) {
            return true
        }
        return false
    }


}
/**
 * Function higlites input text given a specific color.
 * @param  {} color - highlighter color
 * @param  {} input - input text
 */
highlight = (color, input) => {
    if (isValidState(color) == true) {
        erase(color)
    }
    //notify content.js to execute action
    execute(color, input)
    // set state of last action
    setState(color, input)
    // cashe state in chrome local storage
    cacheState(state)

    

}
/**
 * Erase the given highlighter
 * @param  {} color -highlighter color
 */
erase = (color) => {

    let lastInput = getState(color)
    console.log(lastInput)
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "erase", color: color, phrase: lastInput }, function (response) {
            if (response == undefined || Object.keys(response).length == 0) return;
        });
    });
    // update state
    setState(color,null)
    // cache state in chrome local storage
    cacheState(state)

}
eraseAll = () =>{
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "erase all"}, function (response) {
            if (response == undefined || Object.keys(response).length == 0) return;
        });
    });
}
/**
 * Messages the injected content script to execute highlighte operation
 * @param  {} color - highlighter color
 * @param  {} input - input text
 */
execute = (color, input) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "mark", color: color, phrase: input }, function (response) {
            if (response == undefined || Object.keys(response).length == 0) return;
        });
    });
}

//storage

/**
 * Stores the current state in chrome sync local storage
 * @param  {} state
 */
cacheState = (state) => {
    chrome.storage.sync.set({state:state}, ()=>{
        //console.log('Value is set to ' + JSON.stringify(state));
    })
}
/**
 * Retreves the cached state from local storage
 */
cacheRetreve = () =>{
    chrome.storage.sync.get(['state'],(res)=>{
        return res
    });

}
/**
 * Get current active tab id
 */
getTabId = () =>{
    chrome.tabs.getSelected(null, function(tab){
        return tab.id
    });
}

// event listeners
document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('highlighte-yellow').addEventListener('click', function () {
        let input = document.getElementById("input-yellow").value
        highlight("yellow", input)
    });
    document.getElementById('highlighte-pink').addEventListener('click', function () {
        let input = document.getElementById("input-pink").value
        highlight("pink", input)
    });
    document.getElementById('highlighte-blue').addEventListener('click', function () {
        let input = document.getElementById("input-lightblue").value
        highlight("lightblue", input)
    });
    document.getElementById('highlighte-green').addEventListener('click', function () {
        let input = document.getElementById("input-lightgreen").value
        highlight("lightgreen", input)
    });
    
    document.getElementById('highlighte-all').addEventListener('click', function () {
        
        let Inputs = {"input-yellow": null,"input-pink":null,"input-lightblue":null,"input-lightgreen":null}

        Object.keys(Inputs).forEach(element => {
            let input = document.getElementById(element).value
            Inputs[element] = input
        });
        // Highlites using all highliters
        Object.keys(Inputs).forEach(element =>{
            let key = element.split("-").pop()
            console.log(key)
            highlight(key,Inputs[element])
        })
    });
   

    document.getElementById('erase-yellow').addEventListener('click', () => {
        erase("yellow")
    })
    document.getElementById('erase-pink').addEventListener('click', () => {
        erase("pink")
    })
    document.getElementById('erase-blue').addEventListener('click', () => {
        erase('lightblue')
    })
    document.getElementById('erase-green').addEventListener('click', () => {
        erase('lightgreen')
    })
    document.getElementById('erase-all').addEventListener('click',  () => {
        eraseAll()
    });
});