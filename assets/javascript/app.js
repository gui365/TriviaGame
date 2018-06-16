var triviaGame = {
    // Create an array of objects, each one representing a question
    questions: [ { q: "In the movie 'The Wizard of Oz', what did the Scarecrow want from the wizard?", a: ["A heart", "Courage", "A brain", "A Pepsi"], correct: 2, comment: "Ray Bolger played the Scarecrow in the original 1939 movie.", shown: false },
                 { q: "What was the name of the second Indiana Jones movie, released in 1984?", a: ["Raiders of the Ark", "Indiana Jones and the Temple of Doom", "Indiana Jones and the Last Crusade", "Indiana Jones and the Kingdom of the Crystal Skull"], correct: 1, comment: "'Indiana' was actually the name of George Lucas' dog, an Alaskan malamute. He was also the prototype for Chewbacca.", shown: false },
                 { q: "In which year were the Academy Awards first presented?", a: ["1929", "1932", "1945", "1951"], correct: 0, comment: "The ceremony took place at a private dinner for about 270 people at the Hollywood Roosevelt Hotel in Los Angeles.", shown: false },
                 { q: "What is the name of the hobbit played by Elijah Wood in 'The Lord of the Rings' movies?", a: ["Bilbo", "Samwise", "Pippin", "Frodo"], correct: 3, comment: "The original cut for 'The Lord Of The Rings: The Fellowship Of The Ring' ran four and a half hours!", shown: false },
                 { q: "What is the name of the kingdom where the 2013 animated movie Frozen is set?", a: ["Arendelle", "Winterelle", "Villendelle", "Alaska"], correct: 0, comment: "Disney had been trying to adapt 'The Snow Queen' fairy tale for more than 70 years.", shown: false },
                 { q: "Which English director was responsible for the epic movie Gladiator in 2000?", a: ["James Cameron", "Christopher Nolan", "Ridley Scott", "Steven Spielberg"], correct: 2, comment: "The movie won 5 Academy Awards including Best Movie and Best Actor (Russell Crowe)", shown: false },
                 { q: "Which was the last feature film of screen legend Paul Newman, which was also the highest grossing movie of his career?", a: ["Road to Perdition", "The Meerkats", "Cars", "Empire Falls"], correct: 2, comment: "The estimated budget for the movie was $120,000,000 and had gross income for about $244,082,982.", shown: false },
                 { q: "From what movie is the quote 'You can't handle the truth!'?", a: ["A Few Good Men", "Saving Private Ryan", "Top Gun", "The Hurt Locker"], correct: 0, comment: "Tom Cruise, Jack Nicholson and Demi Moore starred in the 1992 movie.", shown: false },
                 { q: "Which actor played Stanley Kowalski in 'A Streetcar Named Desire'?", a: ["Paul Newman", "Robert Redford", "Karl Malden", "Marlon Brando"], correct: 3, comment: "A Streetcar Named Desire is a 1951 American drama film, adapted from Tennessee Williams's Pulitzer Prize-winning 1947 play of the same name.", shown: false },
                 { q: "What is Al Pacino's first name?", a: ["Albert", "Alfredo", "Alan", "Giuseppe"], correct: 1, comment: "He was born Alfredo James Pacino on April 25, 1940 in New York City.", shown: false },
                 { q: "Where was Natalie Portman born", a: ["Toronto, Canada", "Los Angeles, California", "Marrakesh, Morocco", "Jerusalem, Israel"], correct: 3, comment: "Her birth name is Neta-Lee Hershlag.", shown: false },
                 { q: "In the cast of which of the following movies, there are two actors who played Sherlock Holmes?", a: ["Fight Club", "Avengers: Infinity War", "There Will Be Blood", "American Psycho"], correct: 1, comment: "Both Benedict Cumberbatch (Sherlock) and Robert Downey Jr. (Sherlock Holmes) have played the character.", shown: false },
                ],
    winCount: 0,
    loseCount: 0,
    qCount: 0,
    indexQ: 0,
    timerSeconds: 20,
    
    generateQuestion: function() {
        $("#instructions").removeClass("animate-text");
        // console.log(this);
        
        // Start a countdown
        $("#timer-label").text("Time left");
        $("#time-h1").text(this.timerSeconds).css("color", "black");

        this.clearTimer();
        timer = setInterval(function() {
            // console.log(this);
            
            triviaGame.timerSeconds -= 1;
            
            if (triviaGame.timerSeconds < 11 && triviaGame.timerSeconds !== -1) {
                $("#time-h1").text(triviaGame.timerSeconds).css("color", "red");
            } else if (triviaGame.timerSeconds !== -1) {
                $("#time-h1").text(triviaGame.timerSeconds).css("color", "black");
            } else if (triviaGame.timerSeconds === -1) {
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
        $("#comment").empty();
        // Randomly pick a question that hasn't come up yet
        triviaGame.indexQ = Math.floor(Math.random() * this.questions.length);
        var currentObject = this.questions[triviaGame.indexQ];

        if (this.qCount < 5) {
            if (currentObject.shown === false) {
                this.qCount++;
                currentObject.shown = true;
                $("#instructions").empty();
                $("#question-number").html("Question #" + (this.qCount));
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
                $("#instructions").text("Not bad at all");
                break;

                case 2:
                $("#instructions").text("Come on, you can do better than that!");
                break;

                case 1:
                $("#instructions").text("At least you got the 1...");
                break;

                case 0:
                $("#instructions").text("Ouch... that must have hurt!");
                break;
            }

            triviaGame.clearTimer();
            
            $("#question").empty();
            $("#next-in").empty();
            
            $("#results").toggleClass("opacity");
            $("#results").toggleClass("no-opacity");
            $("#results").append($("<div class='flex space-between-row'><h2 style='padding: 0;'>Correct </h2><i style='font-size: 1.5rem; margin: 0 0.5rem;' class='fas fa-check-circle'></i>" + "<h2 style='padding: 0;'> " + triviaGame.winCount + "</h2></div><br>"));
            $("#results").append($("<div class='flex space-between-row'><h2 style='padding: 0;'>Incorrect </h2><i style='font-size: 1.5rem; margin: 0 0.5rem;' class='fas fa-times-circle'></i>" + "<h2 style='padding: 0;'> " + triviaGame.loseCount + "</h2></div>"));

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
            $("#question").empty();
            $("#instructions").text("Correct!");
            $("#comment").text(triviaGame.questions[triviaGame.indexQ].comment);
            $("#options").empty();
            // ADD AN IMAGE HERE -> $("#options").;
            
            var seconds = 11;

            nextTimer = setInterval(function() {
                seconds -= 1;

                if (seconds > 1) {
                    $("#next-in").text("Moving on in " + seconds + " seconds, or click here to skip");
                } else if (seconds === 1) {
                    $("#next-in").text("Moving on in " + seconds + " second");
                } else if (seconds === 0) {
                    clearInterval(nextTimer);
                    triviaGame.generateQuestion();
                };
            }, 1000);

            $("#next-in").on("click", function(){
                seconds = 0;
            });

        } else {
            triviaGame.clearTimer();
            $("#instructions").text("Incorrect. The answer is " + triviaGame.questions[triviaGame.indexQ].a[triviaGame.questions[triviaGame.indexQ].correct]);
            triviaGame.incorrectAnswer();
        }
    },

    incorrectAnswer: function() {
        triviaGame.loseCount++;
        $("#question").empty();
        $("#comment").text(triviaGame.questions[triviaGame.indexQ].comment);
        $("#options").empty();
        // ADD AN IMAGE HERE -> $("#options").;
        
        var seconds = 11;

        nextTimer = setInterval(function() {
            seconds -= 1;

            if (seconds > 1) {
                $("#next-in").text("Moving on in " + seconds + " seconds, or click here to skip");
            } else if (seconds === 1) {
                $("#next-in").text("Moving on in " + seconds + " second");
            } else if (seconds === 0) {
                clearInterval(nextTimer);
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
    $("#results").toggleClass("opacity");
    $("#results").toggleClass("no-opacity");
    $("#results").empty();
}

var timer;
var nextTimer;

$("#next-in").on("click", function(){
    clearInterval(nextTimer);
    triviaGame.generateQuestion();
});

// Notes:
// When page loads, show a 'start' button. When clicked, first question appears in the jumbotron and timer starts counting down.
// If counter gets to 0, show "Time's up!" and question is marked as incorrect. Display the comment (and maybe and image) and the right answer.

// When the user chooses an option and hits the "Confirm" button:
// If user answered incorrectly, display comment "Incorrect" and the comment.
// If user answered right, display comment "Correct!" and the comment.

// After first question is answered, second question appears auntomatically after some time.
// Repeat the process for each question.

// At the end of the game, display correct and incorrect answers, as well as a button to restart the game.