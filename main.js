//CLICK TO REVEAL EFFECT
// ### THIS IS A FEAUTURE USED TO GET THE USER TO CLICK ON ONE ELEMENT i.e. A BUTTON AND AS SOON AS THAT HAPPENDS A PREVIOUSLY HIDDEN ELEMENT i.e. AN IMAGE APPEARS...
$('#showing').click(function(event) {
    const showing = document.getElementById("showing");
    showing.style.display = "none";
    document.getElementById("hidden").style.display = "unset";

    //THIS IS FOR THE CASE THAT WE HAVE A TRIGGER TO HIDE A PARENT (OR SOMETHING ELSE...)
    if (showing.classList.contains('with-parent')) {
        document.getElementById("showing-parent").style.display = "none";
    }
});



//INJECTING CODE INTO CANVAS USING A DIV AND A FILE STORED IN THE ACTUAL COURSE

// RUN THE SCAN FUNCTION FOR ANY DIV 
window.onload = function() {
    detectCodeInjector();
}

function detectCodeInjector() {

    const injectors = document.querySelectorAll('.page-code-injector');

    if (!(injectors)) {return} else {
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

