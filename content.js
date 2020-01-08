
// Content Script listener responds on messages dispatched by main.js (main extension file)
// takes in a command input distructured to {action,color,phrase}
chrome.extension.onMessage.addListener(function ({action,color,phrase}, sender, sendResponse) {


    if (action == 'erase') {
        
        console.log(phrase)
        erase(phrase)
        sendResponse({});
    }
    if (action == 'mark') {
        
        highlighte({color,phrase})
        sendResponse({});
    }
    if (action == 'erase all'){
        location.reload(true);
    }
});

/**
 * Erase the previously highlighted word/phrase/
 * @param  {} phrase} - word/phrase to highlite
 */
erase = (phrase) =>{

    if (window.find && window.getSelection) {
        document.designMode = "on";
        var sel = window.getSelection();
        sel.collapse(document.body, 0);
        while (window.find(phrase)) {
            document.execCommand("RemoveFormat", false, null);
        }
        document.designMode = "off";
    }
    return sel;
}

/**
 * Highlighte specific keyword and set highliter color
 * @param  {} {color - color of highlighter
 * @param  {} phrase} - word/phrase to highlite
 */
highlighte = ({color,phrase}) =>{

    if (window.find && window.getSelection) {
        document.designMode = "on";
        var sel = window.getSelection();
        sel.collapse(document.body, 0);

        while (window.find(phrase)) {
            document.execCommand("HiliteColor", false, color);

        }
        document.designMode = "off";
    }

}

