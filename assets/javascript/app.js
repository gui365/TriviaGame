var triviaGame = {
    // Create an array of objects, each one representing a question
    questions: [ { q: "Which of the following was not a memeber of The Beatles?", a1: "Richard Starkey", a2: "Pete Best", a3: "Roger Daltrey", a4: "Stuart Sutcliffe", correct: 3, comment: "Roger Daltrey is the lead singer of English rock band, The Who" },
                 { q: "Mexico is (about) how many times the size of the state of New Mexico?", a1: "2 times", a2: "6 times", a3: "10 times", a4: "17 times", correct: 2, comment: "Mexico has 1,964,375 sq km vs the 314,310 sq km of the state of New Mexico" },
                 { q: "?", a1: "", a2: "", a3: "", a4: "", correct: 0, comment: "" } ],
    winCount: 0,
    loseCount: 0,
    qCount: 0,
    currentObject: this.questions[this.qCount],
    generateQuestion: function() {
        // Getting rid of the START button
        $("#main-options").empty();
        
        var currentObject = triviaGame.questions[triviaGame.qCount];
        $("#question").html(currentObject.q);
        
        //Generating the options with a loop
        for (var i = 1; i < 5; i++) {
            $("#main-options").append('<input id="option' + i + '" type="radio">' + " " + currentObject['a'+i] + '</input><br>');
        };

        // Generate a button to confirm answer
        $("#main-options").append("<button id='confirm-button' onclick='triviaGame.confirm()'>Confirm</button>");
        triviaGame.qCount++;
    },

    confirm: function() {
        if (condition) {
            
        }
        
        
        if (triviaGame.qCount === triviaGame.questions.length) {
            $("#main-options").empty();
            $("#main-options").append
        } else {
            triviaGame.generateQuestion();
            console.log(triviaGame.questions.length);
            console.log(triviaGame.qCount);
            
        }
    },

    lastQ: function() {
        console.log("Last question");
        
    }
};

// When page loads, show a 'start' button. When clicked, first question appears in the jumbotron and timer starts counting down.
// If counter gets to 0, show "Time's up!" and question is marked as incorrect. Display the comment (and maybe and image) and the right answer.

// When the user chooses an option and hits the "Confirm" button:
// If user answered incorrectly, display comment "Incorrect" and the comment.
// If user answered right, display comment "Correct!" and the comment.

// After first question is answered, second question appears auntomatically after some time.
// Repeat the process for each question.

// At the end of the game, display correct and incorrect answers, as well as a button to restart the game.