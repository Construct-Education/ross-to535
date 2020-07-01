# TO535 code documentation

# Branching
Branching relies on 2 and a half things; one being an SCORM file which contains a hotspot quiz which when the user interacts with sends a score to canvas. 

Once in Canvas this uses the canvas mastery path's feature and code injected from the page to assign a students to a page/ path of their choice.

## The SCORM ILO file

The ILO (interactive learning object) as previously mentioned is a Articulate presentation with 3 slides:
1. A hotspot quiz page with the grading set to a score based on answer and 3 rectangle shapes on top of text that detect the user decision. Divided into 3 actual parts the rectangles capture one of three scores either **33.33% (Novice level) or 66.66% (Intermediate level) or  99.99% (Mastery level)**.
2.  A results slide that gets the result from slide 1 and posts it to the LMS (learning management system) before moving on to the next slide after a manual 5 second delay to give the LMS enough time to capture and process the score. 
3. A final "Quest level chosen" page which tells the user that they have been success full and should click the next button  in Canvas to proceed. *Admittedly this could have been on the results slide since that is a blank slide but was done this way when we were testing the progression and how long it takes for a score to be passed on from the LTI to Canvas vs how quick a user clicks the next button upon being prompted.* 

## Canvas Mastery paths and code injecting.
Mastery paths in Canvas are a way of separating students into different steams based on performance on a particular assignment or quiz.

In this scenario we wanted students to gets the chance to choose between 3  streams one being a Mastery level where they earn a total of 90 points throughout but receive no help or resources, another a Intermediate level where they can earn a total of 60 points with limited resources and the last being a Novice level where they can earn up to 30 points and they get all the help they need.

At this stage in this case the SCORM LTI would have sent a score of either 33.33%, 66.66% or 99.99% to Canvas and it would be unlocking the path the student chose.

**Problem**
Canvas typically relies on page refreshes inorder for links (like the next button link which needs to link to one of 3 pages in this case) to update and our solution didn't have that.  

**Solution:**
Add code to a particular page that tells canvas to refresh the page after user decides the level.

**Code added to the sub account:**

  

    //INJECTING CODE INTO CANVAS USING A DIV AND A FILE STORED IN THE ACTUAL COURSE
    
    // RUN THE SCAN FUNCTION FOR ANY DIV ONCE YOU GET TO THIS FILE
    window.onload = function() {detectCodeInjector();}
    
    function  detectCodeInjector() {
    // FIND DIVS(s) WITH THE CLASS page-code-injector
    const  injectors = document.querySelectorAll('.page-code-injector');

    // IF THERE ISNT A DIV ESCAPE THE FUNCTION
    if (!(injectors)) {return}
    
    // IF THERE IS RUN A LOOP FOR EACH DIV
    else {
    
    injectors.forEach(injector  => {
    const  link =  injector.children[0].getAttribute('href');

    switch (true) {
    case (injector.hasAttribute('data-css')):
    addExtraCSS(link);
    break;
    
    case (injector.hasAttribute('data-js')):
    addExtraJS(link);
    break;
    
    default:
    return;
    }})}}
  
    function  addExtraJS(location) {
    const  newScriptTag = document.createElement('script');
    
    newScriptTag.type = 'text/javascript';
    newScriptTag.src = location;
    document.body.appendChild(newScriptTag);
    }
    
    function  addExtraCSS(location) {
    const  newCssTag = document.createElement('link');
    newCssTag.rel = 'stylesheet';
    newCssTag.href = location;
    document.head.appendChild(newCssTag);
    }

.

**Code added on top of a branching page:**

    <div class="page-code-injector" data-js="true">
    <a href="LINK_TO_FILE_WITH_CODE_IN_CANVAS"></a>
    </div>

.
Then the .js file added in the Canvas files of the course and linked above's code:

    //DETECT URL IF IT HAS /?level-chosen THEN AUTOMATICALLY OPEN THE LINK ON THE BUTTON
    
    // IF NOT THEN TAKE THE CURRENT LINK AND APPEND /?level-chosen
    var  currentURL = window.location.href;
    var  safeURL =  currentURL.substring(0, (currentURL.indexOf("?")));
    var  nextBtn = document.querySelector('.module-sequence-footer-button--next > a');

    (function() {evaluateLink();}())

    function  evaluateLink() {
    if (currentURL.includes('?level-chosen')) {
    goToNextStage();
    } else {
    changeButtonURL();
    }}
    
    function  goToNextStage() {
    var  nextStageLink =  nextBtn.getAttribute('href');
    window.open(nextStageLink, '_self')
    }
    
    function  changeButtonURL() {
    // nextBtn.setAttribute('href', (safeURL + '?level-chosen'));
    nextBtn.removeAttribute('href')
    nextBtn.setAttribute('onclick', 'openLevelChosenLink()');
    }

    function  openLevelChosenLink() {
    setTimeout(function() { window.open(safeURL + '?level-chosen', '_self') }, 3000)
    }


