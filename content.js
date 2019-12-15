console.log("from content")

chrome.extension.onMessage.addListener(function (command, sender, sendResponse) {


    if (command.action == 'erase') {
        
        erase()
    }
    if (command.action == 'mark') {
        
        highlighte(command)
    }
});

function erase() {

    console.log("undoo")
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
 * @param  {} command - action command from main.js dispatcher
 */
function highlighte(command){

    if (window.find && window.getSelection) {
        document.designMode = "on";
        var sel = window.getSelection();
        sel.collapse(document.body, 0);

        while (window.find(command.phrase)) {
            document.execCommand("HiliteColor", false, command.marker_color);

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