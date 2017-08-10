//1. Find ALL VISIBLE POSTS
var allPosts = document.querySelectorAll("div[data-testid='fbfeed_story']")
    
    //1a. Create wrapper Div and keywordinput - see about return wrapper div then assigning to var
    createWrapperDiv(document.body)
    var wrapper = document.querySelector("#keyword-search-wrapper")

    createKeywordInput(wrapper)

/*---------- EVENT LISTENERS------------*/
//window.onscroll = function(){console.log("Window scrolled " + document.lastModified, "MJD " )}
//window.onload = function(){console.log("Window has LOADED","MJD",document.querySelector(".home_right_column"),window.domready)}
//window.onmouseover = function(){console.log(document.querySelector(".home_right_column"),"ON FOCUS","MJD")}

/*---------- FUNCTION CALLS------------*/ 
keywordSearch()


/*---------- FUNCTION DECLARATIONS-----*/ 

//2. SEARCH FUNCTION
function keywordSearch(){
    var k1 = "n", k2 = document.querySelector("#keyword-input").value 
    var keywords = [k2]
    var k = 0
    var allPosts = document.querySelectorAll("div[data-testid='fbfeed_story']")
    //2A.Reset/unHide hidden posts
    removeSpoilerDivs()
    
    //2B.Search for keywords
    allPosts.forEach(function(v,i){
        if(!keywords[0]){console.log(keywords[0] + " not valid!","MJD ");/*DO NOTHING*/}
        else if(v.innerText.toLowerCase().search(keywords[0]) > -1){            
            k++
            v.style.border = "1px solid red"
            createSpoilerDiv(v)
            hidePost(v)
        }
    })
    
    console.log(k + " Possible Spoilers have been hidden.","MJD")

    //2F1. SPOILER ALERT
    function createSpoilerDiv(eachDiv){
        //1a. create div for SPOOILER ALERT TEXT
        var preDiv = document.createElement("DIV")
        preDiv.innerText = "POSSIBLE SPOILER"
        preDiv.className = "spoiler-alert"
        eachDiv.prepend(preDiv)
        
        //1b. Click event to UNHIDE spoiler
        var spoilerDivs = document.querySelectorAll(".spoiler-alert")

        spoilerDivs.forEach(function(v,i){
            if(v.onclick === null){
                v.onclick = function(e){console.log("Current Spoiler Removed");removeCurrentSpoilerDiv(this)}}
        })

        //2F1-F1. RESET CURRENT SPOILER ALERT
        function removeCurrentSpoilerDiv(currentDiv){

            //2F1-F1a. Get all nextSibling's children AFTER spoiler alert div
            var divSiblingChild = currentDiv.nextSibling.children[0]        

            //2F1-F1b. RESET TO BLANK
            divSiblingChild.style.display = ""

            var divParent = currentDiv.parentElement
            divParent.removeChild(currentDiv)
        } //ENDOF: RESET CURRENT SPOILER ALERT

    }
    
    //2F2. HIDE POST
    function hidePost(eachDiv){
        //1b. With the Spoiler div created, the next child is what we want to HIDE
        eachDiv.children[1].children[0].style.display = "none"
    }
} //ENDOF: keywordSearch Function



//3. RESET SPOILER ALERTS
    function removeSpoilerDivs(){
        var allPosts = document.querySelectorAll("div[data-testid='fbfeed_story']")

        //3A. FINDS ALL SPOILER DIVS
        var allSpoilerDivs = document.querySelectorAll(".spoiler-alert")

        //3B. UNHIDE HIDDEN POSTS
        allSpoilerDivs.forEach(function(v,i){
            //3Ba. Get all nextSibling's children AFTER spoiler alert div
            var divSiblingChild = v.nextSibling.children[0]        
            
            //3Bb. RESET TO BLANK
            divSiblingChild.style.display = ""
        })
        
        //3C. removes all spoiler alert elements
        allSpoilerDivs.forEach(function(v,i){
            var divParent = v.parentElement
            divParent.removeChild(v)
        })
    } //ENDOF: RESET SPOILER ALERTS


//4. KEYWORD INPUT ELEMENT FUNCTION
function createKeywordInput(inputParent){
    //1a. create input for keyword
    var keywordInput = document.createElement("INPUT")
    keywordInput.placeholder = "Enter keyword"
    keywordInput.id = "keyword-input"
    keywordInput.style = "z-index: 302; border-radius: 15px; padding: 4px; outline:none"    

    inputParent.prepend(keywordInput)
    document.querySelector("#keyword-input").onchange = function(){keywordSearch()}
    return keywordInput
} //ENDOF: createKeywordInput

//5. CREATE WRAPPER DIV FUNCTION
function createWrapperDiv(divParent){
    var div = document.createElement("DIV")
    div.id = "keyword-search-wrapper"
    div.style = "position: fixed; right: 0px; z-index: 302; margin-right: 4%; margin-top: 7px"
    div.className = "_2t-f"

    //5a. Parent element of div - build in some error handling
    divParent.prepend(div)
    console.log("wraooer div created","MJD")
}

//6. CREATE NEW ELEMENT FUNCTION
function createNewElement(elementType, id, className){
    var newElement = document.createElement(elementType)
    
    if(id){newElement.id = id}
    if(className){newElement.className = className}

    console.log("new " + elementType + " created!","MJD")
    return newElement
}


/*----------NOTES------------*/
/*
1. "08/07/2017 00:36:39"
    a. Turn 2B into a function so I can reuse it to search an array - already done in original
2. "08/09/2017 03:30:32"
    a. finished styling the search button and moving to the right
    b. also create a wrapper div for all app elements
    c. also created 3 new functions (1 to make new element and pass in the parent element and return completed element to assign to var)
    d. 

*/ 
/*--------NOTES END--------*/



/*----------FEATURES------------*/
/*  
    THIS WEEK
    A. Div to house the search, the remove spoiler button, etc
    B. Create function that stores each keyword typed in THE ARRAY in order to persist previous keywords (create buttons to undo actions)
    C. Show number icon for
        a. total posts
        b. hidden posts
        c. onhover, show which users' names were hidden/what topic it was about?


    1. Make a button to add keywords to the MAIN LIST aka pushed into an array
    2. Add a fixed element to the right that hides when you scroll down 
        a. it can be clicked to expose the entire element
        b. Then you can add more keywords, remove keywords, etc.
    3. Hide the 1st 2 posts automatically ( see their keywords )
    4. Autocreate keywords to be chosen from by on click
        a. on click again, the word is removed from the array and the search is reactivated
    5. Create WARNING for words less than 3 letters. They will slowdown and will be deactivated if too common
    6. Create total count of Hidden Divs and look for main keywords that detail what they are?
    7. Be able to CLICK ON POST to show it again
    8. Create a feature that only shows positive posts
    9. Create a feature that only shows negative posts, funny posts, etc.
    10. COMMENT FILTER to show only your comment

*/