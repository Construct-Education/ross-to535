//Atomic Search
var atomicSearchWidgetScript = document.createElement("script");
atomicSearchWidgetScript.src = "https://d2u53n8918fnto.cloudfront.net/atomic_search_widget.js" + "?ts=" + new Date().getTime();
document.getElementsByTagName("head")[0].appendChild(atomicSearchWidgetScript);


// Winter Garden Online Tool (WGOT)
// GLOBAL VARIABLES NAMESPACED UNDER WGOT

var WGOT_SUB_ACCOUNT_ID = 1231; /* REPLACE null WITH THE ID FOR THE SUB ACCOUNT HERE eg: 135 */
var WGOT_ACCOUNT_IDS = [1231, 1235];
//PUT THE IDS OF ALL SUBACCOUNTS HERE INCLUDING THE ID ABOVE


var WGOT_ID = 21936; /* PUT THE ID FOR THE EXTERNAL TOOL HERE eg 12863 */

$.get('/api/v1/courses').then(function(courses) {
    $(document).ready(function() {

        function intersection(listA, listB) {
            for (var i = 0; i < listA.length; i++) {
                for (var j = 0; j < listB.length; j++) {
                    if (listA[i] == listB[j]) return true;
                }
            }
            return false;
        }

        var account_ids = courses.map(function(course) { return course.account_id; });
        if (intersection(account_ids, WGOT_ACCOUNT_IDS)) {
            var $coursesLink = $("#global_nav_courses_link").parent();
            var html = '<li id="context_external_tool_' + WGOT_ID + '_menu_item" class="menu-item ic-app-header__menu-list-item"><a class="ic-app-header__menu-list-link" href="/accounts/' + WGOT_SUB_ACCOUNT_ID + '/external_tools/' + WGOT_ID + '?launch_type=global_navigation"><svg version="1.1" class="ic-icon-svg ic-icon-svg--lti menu-item__icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><path d="M 42.667969 29.332031 C 47.09375 29.332031 50.640625 25.761719 50.640625 21.332031 C 50.640625 16.90625 47.09375 13.332031 42.667969 13.332031 C 38.238281 13.332031 34.667969 16.90625 34.667969 21.332031 C 34.667969 25.761719 38.238281 29.332031 42.667969 29.332031 Z M 21.332031 29.332031 C 25.761719 29.332031 29.308594 25.761719 29.308594 21.332031 C 29.308594 16.90625 25.761719 13.332031 21.332031 13.332031 C 16.90625 13.332031 13.332031 16.90625 13.332031 21.332031 C 13.332031 25.761719 16.90625 29.332031 21.332031 29.332031 Z M 21.332031 34.667969 C 15.121094 34.667969 2.667969 37.785156 2.667969 44 L 2.667969 50.667969 L 40 50.667969 L 40 44 C 40 37.785156 27.546875 34.667969 21.332031 34.667969 Z M 42.667969 34.667969 C 41.894531 34.667969 41.011719 34.71875 40.078125 34.800781 C 43.171875 37.039062 45.332031 40.054688 45.332031 44 L 45.332031 50.667969 L 61.332031 50.667969 L 61.332031 44 C 61.332031 37.785156 48.878906 34.667969 42.667969 34.667969 Z M 42.667969 34.667969"></path></svg><div class="menu-item__text">Winter Garden</div></a></li>';

            var $newIcon = $(html);

            $newIcon.insertAfter($coursesLink);
        }
    });
});



window.addEventListener('load', function() {

    // accordion

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }


    // tabs

    $("li[role='tab']").click(function() {
        $("li[role='tab']").attr("aria-selected", "false"); //deselect all the tabs 
        $(this).attr("aria-selected", "true"); // select this tab
        var tabpanid = $(this).attr("aria-controls"); //find out what tab panel this tab controls  
        var tabpan = $("#" + tabpanid);
        $("div[role='tabpanel']").attr("aria-hidden", "true"); //hide all the panels 
        $("div[role='tabpanel']").addClass("hidden");
        tabpan.attr("aria-hidden", "false");
        tabpan.removeClass("hidden"); // show our panel
    });

    $("li[role='tab']").keydown(function(ev) {
        if (ev.which == 13) {
            $(this).click()
        }
    });

    if (document.getElementById("tab1")) {
        document.getElementById("tab1").tabIndex = 0;
    }

    if (document.getElementById("tab2")) {
        document.getElementById("tab2").tabIndex = 0;
    }

    if (document.getElementById("tab3")) {
        document.getElementById("tab3").tabIndex = 0;
    }

    if (document.getElementById("tab4")) {
        document.getElementById("tab4").tabIndex = 0;
    }

    if (document.getElementById("tab5")) {
        document.getElementById("tab5").tabIndex = 0;
    }

    if (document.getElementById("tab6")) {
        document.getElementById("tab6").tabIndex = 0;
    }


}, false);


/*FOR THE IMAGE DROPDOWNS*/

let coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}




//CONSTRUCT JAVASCRIPT ADDED FROM THIS POINT

//CLICK TO REVEAL EFFECT
$('#showing').click(function(event) {
    const showing = document.getElementById("showing");
    showing.style.display = "none";
    document.getElementById("hidden").style.display = "unset";

    //THIS IS FOR THE CASE THAT WE HAVE A TRIGGER TO HIDE A PARENT (OR SOMETHING ELSE...)
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

