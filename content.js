
// Content Script listener responds on messages dispatched by main.js (main extension file)
// takes in a command input distructured to {action,color,phrase}
chrome.extension.onMessage.addListener(function ({action,color,phrase}, sender, sendResponse) {

    if (action == 'erase') {
        
        erase()
    }
    if (action == 'mark') {
        
        highlighte({color,phrase})
    }
});

/**
 * Erase the previously highlighted word/phrase/
 */
function erase() {

    if (window.find && window.getSelection) {
        document.designMode = "on";
        var sel = window.getSelection();
        sel.collapse(document.body, 0);

        while (window.find("easy")) {

            document.execCommand("undo");
            document.execCommand("undo");

        }
        document.designMode = "off";
    }
}

/**
 * Highlighte specific keyword and set highliter color
 * @param  {} {color - color of highlighter
 * @param  {} phrase} - word/phrase to highlite
 */
function highlighte({color,phrase}){

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





/*
(function highlight() {

    // initialize parameters invoked on content script execution

    let search_param = "a"
    let color_param = "yellow"
    console.log('as')


    if (window.find && window.getSelection) {
        document.designMode = "on";
        var sel = window.getSelection();
        sel.collapse(document.body, 0);

        while (window.find(search_param)) {
            document.execCommand("HiliteColor", false, color_param);
            sel.collapseToEnd();
        }
        document.designMode = "off";
    }

}());

**/