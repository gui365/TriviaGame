var triviaGame = {
    // Create an array of objects, each one representing a question
    questions: [ { q: "Which of the following was not a memeber of The Beatles?", a: ["Richard Starkey", "Pete Best", "Roger Daltrey", "Stuart Sutcliffe"], correct: 2, comment: "Roger Daltrey is the lead singer of English rock band, The Who", shown: false },
                 { q: "Mexico is (about) how many times the size of the state of New Mexico?", a: ["2 times", "6 times", "10 times", "17 times"], correct: 1, comment: "Mexico has 1,964,375 sq km vs the 314,310 sq km of the state of New Mexico", shown: false },
                 { q: "How much is 2 + 5?", a: ["7", "-3", "10", "25"], correct: 0, comment: "Basic math...", shown: false },
                 { q: "Question 4?", a: ["1", "2", "3", "4"], correct: 0, comment: "No comment", shown: false },
                 { q: "Question 5?", a: ["5", "6", "7", "8"], correct: 0, comment: "No comment", shown: false },
                 { q: "Question 6?", a: ["6", "7", "8", "9"], correct: 0, comment: "No comment", shown: false },
                ],
    winCount: 0,
    loseCount: 0,
    qCount: 0,

    
    generateQuestion: function() {
        // Getting rid of the START button
        $("#main-options").empty();

        // Randomly pick a question that hasn't come up yet
        var indexQ = Math.floor(Math.random() * this.questions.length);
        var currentObject = this.questions[indexQ];

        if (this.qCount < 5) {
            if (currentObject.shown === false) {
                $("#instructions").html("Question #" + (this.qCount + 1) + ":");
                $("#question").html(currentObject.q);
                
                //Generating the options with a loop
                for (var i = 0; i < 4; i++) {
                    var answer = $("<div id='option" + i + "' class='answers' data-a='" + i + "'>" + " " + currentObject.a[i] + "</div>");
                    answer.on("click", this.confirm);
                    $("#main-options").append(answer);
                };
            
                this.qCount++;
                currentObject.shown = true;
            
            } else {
            
                this.generateQuestion();
    
            }    
        } else {
            // CREATE SUMMARY OF RIGHT/WRONG ANSWERS HERE!
            // GENERATE A BUTTON TO RESTART THE GAME
            console.log("All done!");
            $("#question").empty();
        }
                
    },

    confirm: function() {
        console.log($(this).attr("data-a"));
        // if data-a is equal to the correct answer in the question object, correct (settimer), else incorrect (settimer)
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