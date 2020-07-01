//CLICK TO REVEAL EFFECT
$('#showing').click(function(event) {
    const showing = document.getElementById("showing");
    showing.style.display = "none";
    document.getElementById("hidden").style.display = "unset";

    //THIS IS FOR THE CASE THAT WE HAVE A TRIGGER TO HIDE A PARENT
    if (showing.classList.contains('with-parent')) {
        document.getElementById("showing-parent").style.display = "none";
    }
});



//INJECTING CODE INTO CANVAS FROM A DIV
window.onload = function() {
    detectCodeInjector();
}

function detectCodeInjector() {

    const injectors = document.querySelectorAll('.page-code-injector');

    if (!(injectors)) {} else {
        injectors.forEach(injector => {

            const link = injector.children[0].getAttribute('href');

            switch (true) {
                case (injector.hasAttribute('data-css')):
                    addExtraCSS(link);
                    break;

                case (injector.hasAttribute('data-js')):
                    addExtraJS(link);
                    break;

                default:
                    return;
            }
        })
    }
}


function addExtraJS(location) {
    const newScriptTag = document.createElement('script');
    newScriptTag.type = 'text/javascript';
    newScriptTag.src = location;

    document.body.appendChild(newScriptTag);
}

function addExtraCSS(location) {
    const newCssTag = document.createElement('link');
    newCssTag.rel = 'stylesheet';
    newCssTag.href = location;

    document.head.appendChild(newCssTag);
}