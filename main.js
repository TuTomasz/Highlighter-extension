window.onload = () => {

    // state of higlighted words on webpage
    state = {
        "yellow": null,
        "pink": null,
        "blue": null,
        "green": null
    }
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
    execute(color, input)
    setState(color, input)

}
/**
 * Erase the given highlighter
 * @param  {} color -highlighter color
 */
erase = (color) => {

    let lastInput = getState(color)
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "erase", color: color, phrase: lastInput }, function (response) {
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
        let input = document.getElementById("input-blue").value
        highlight("blue", input)
    });
    document.getElementById('highlighte-green').addEventListener('click', function () {
        let input = document.getElementById("input-green").value
        highlight("green", input)
    });

    document.getElementById('erase-yellow').addEventListener('click', () => {
        erase("yellow")
    })
    document.getElementById('erase-pink').addEventListener('click', () => {
        erase("pink")
    })
    document.getElementById('erase-blue').addEventListener('click', () => {
        erase('blue')
    })
    document.getElementById('erase-green').addEventListener('click', () => {
        erase('green')
    })
});