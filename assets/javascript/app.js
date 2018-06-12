// 44, 54, 57

var triviaGame = {
    // Create an array of objects, each one representing a question
    questions: [ { q: "Which of the following was not a memeber of The Beatles?", a: ["Richard Starkey", "Pete Best", "Roger Daltrey", "Stuart Sutcliffe"], correct: 2, comment: "Roger Daltrey is the lead singer of English rock band, The Who.", shown: false },
                 { q: "Mexico is (about) how many times the size of the state of New Mexico?", a: ["2 times", "6 times", "10 times", "17 times"], correct: 1, comment: "6.23 times to be exact. Mexico has 1,964,375 sq km vs the 314,310 sq km of the state of New Mexico.", shown: false },
                 { q: "Which country has the most public holidays", a: ["India", "United States", "Mexico", "Austria"], correct: 0, comment: "India has the most in the world with 21 public holidays, whereas Mexico has only 7!", shown: false },
                 { q: "What is the capital of Peru?", a: ["Vtox", "Quito", "La Paz", "Lima"], correct: 3, comment: "Lima is the capital and largest city of Peru, with a population of 9,752,000 as of 2017", shown: false },
                 { q: "Close to which landmass does the Pacific Ocean reach its max depth?", a: ["Mariana Islands", "The Philippines", "Papua New Guinea", "Japan"], correct: 0, comment: "At this point you would have to dive 36,070 ft to reach the bottom of the ocean!", shown: false },
                 { q: "How many New York cities would you need to line up to cover the area of the United States?", a: ["1,250,000", "125,000", "12,500", "1,250"], correct: 2, comment: "There would be 12,464 Empire States Buildings and King Kongs", shown: false },
                ],
    winCount: 0,
    loseCount: 0,
    qCount: 0,
    indexQ: 0,
    timerSeconds: 20,
    
    generateQuestion: function() {
        // console.log(this);
        
        // Start a countdown
        $("#timer-label").text("Time left");
        $("#time-h2").text(this.timerSeconds);

        this.clearTimer();
        timer = setInterval(function() {
            // console.log(this);
            
            triviaGame.timerSeconds -= 1;
            
            if (triviaGame.timerSeconds !== 0) {
                $("#time-h2").text(triviaGame.timerSeconds);
            } else if (triviaGame.timerSeconds === 0 || $(".answers").data('clicked', true)) {
                $("#instructions").text("Time's up!");
                triviaGame.clearTimer();
                triviaGame.incorrectAnswer();
            };
        }, 1000);
        
        // Getting rid of the START button and countdown to next question (see confirm function below)
        $("#start-button").remove();
        $("#restart-button").remove();
        $("#next-in").empty();
        $("#options").empty();
        // Randomly pick a question that hasn't come up yet
        triviaGame.indexQ = Math.floor(Math.random() * this.questions.length);
        var currentObject = this.questions[triviaGame.indexQ];

        if (this.qCount < 5) {
            if (currentObject.shown === false) {
                this.qCount++;
                currentObject.shown = true;
                $("#instructions").html("Question #" + (this.qCount) + ":");
                $("#question").html(currentObject.q);
                
                //Generating the options with a loop
                for (var i = 0; i < 4; i++) {
                    var answer = $("<div id='option" + i + "' class='answers' data-a='" + i + "'>" + " " + currentObject.a[i] + "</div>");
                    answer.on("click", this.confirm);
                    $("#options").append(answer);
                };
            
            } else {
            
                this.generateQuestion();
    
            }    
        } else {
            // CREATE SUMMARY OF RIGHT/WRONG ANSWERS HERE!
            // GENERATE A BUTTON TO RESTART THE GAME
            $("#instructions").empty();
            switch (triviaGame.winCount) {
                case 5:
                $("#instructions").text("That was amazing! You got them all right!");
                break;

                case 4:
                $("#instructions").text("Very good work!");
                break;
                
                case 3:
                $("#instructions").text("Pretty good!");
                break;

                case 2:
                $("#instructions").text("Come on, you can do better than that!");
                break;

                case 1:
                $("#instructions").text("At least you got the 1");
                break;

                case 0:
                $("#instructions").text("Ouch... that must have hurt");
                break;
            }

            triviaGame.clearTimer();
            
            $("#question").empty();
            $("#next-in").empty();
            
            $("#options").append($("<h2>Correct: " + triviaGame.winCount + "</h2>"));
            $("#options").append($("<h2>Incorrect: " + triviaGame.loseCount + "</h2>"));

            for (let i = 0; i < triviaGame.questions.length; i++) {
                triviaGame.questions[i].shown = false;
            }

            $("main").append($("<button id='restart-button'>Play again</button>").on("click", restartGame));

            triviaGame.winCount = 0;
            triviaGame.loseCount = 0;
            triviaGame.qCount = 0;
        }
                
    },

    confirm: function() {
        triviaGame.clearTimer();

        if ($(this).attr("data-a") == triviaGame.questions[triviaGame.indexQ].correct) {
            triviaGame.clearTimer();
            triviaGame.winCount++;
            $("#instructions").text("Correct!");
            $("#question").text(triviaGame.questions[triviaGame.indexQ].comment);
            $("#options").empty();
            // ADD AN IMAGE HERE -> $("#options").;
            
            var seconds = 11;

            var timeToNextQuestion = setInterval(function() {
                seconds -= 1;

                if (seconds > 1) {
                    $("#next-in").text("Next question in " + seconds + " seconds");
                } else if (seconds === 1) {
                    $("#next-in").text("Next question in " + seconds + " second");
                } else if (seconds === 0) {
                    clearInterval(timeToNextQuestion);
                    triviaGame.generateQuestion();
                };
            }, 1000);

        } else {
            triviaGame.clearTimer();
            $("#instructions").text("Incorrect. The answer is " + triviaGame.questions[triviaGame.indexQ].a[triviaGame.questions[triviaGame.indexQ].correct]);
            triviaGame.incorrectAnswer();
        }
    },

    incorrectAnswer: function() {
        triviaGame.loseCount++;
        $("#question").text(triviaGame.questions[triviaGame.indexQ].comment);
        $("#options").empty();
        // ADD AN IMAGE HERE -> $("#options").;
        
        var seconds = 11;

        var timeToNextQuestion = setInterval(function() {
            seconds -= 1;

            if (seconds > 1) {
                $("#next-in").text("Next question in " + seconds + " seconds");
            } else if (seconds === 1) {
                $("#next-in").text("Next question in " + seconds + " second");
            } else if (seconds === 0) {
                clearInterval(timeToNextQuestion);
                triviaGame.generateQuestion();
            };

        }, 1000);
    },

    clearTimer: function(){
        clearInterval(timer);
        triviaGame.timerSeconds = 20;
    }
};

function restartGame() {
    triviaGame.generateQuestion();
}

var timer;

// When page loads, show a 'start' button. When clicked, first question appears in the jumbotron and timer starts counting down.
// If counter gets to 0, show "Time's up!" and question is marked as incorrect. Display the comment (and maybe and image) and the right answer.

// When the user chooses an option and hits the "Confirm" button:
// If user answered incorrectly, display comment "Incorrect" and the comment.
// If user answered right, display comment "Correct!" and the comment.

// After first question is answered, second question appears auntomatically after some time.
// Repeat the process for each question.

// At the end of the game, display correct and incorrect answers, as well as a button to restart the game.