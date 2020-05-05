
let questions = [{
  question: 'What University does Gus Malzahn coach at as of the year 2020?',
  explanation: 'Since December 2012, Gus Malzahn has served as Auburn\'s head football coach.',
  answers: ['Auburn University',
    'Harper College',
    'Seton Hall',
    'Valparaiso University',
    'Depaul University'
  ],
  correctAnswer: 'Auburn University'
},

{
  question: 'What is Gus Malzahn\'s given first name?',
  explanation: 'Gus Malzahn\'s full name is Arthur Gustavo Malzahn III.',
  answers: ['Ronald',
    'Tim',
    'Arthur',
    'John',
    'Frederick'
  ],
  correctAnswer: 'Arthur'
},

{
  question: 'What is the name of Gus Malzahn\'s wife?',
  explanation: 'Gus has been married to his wife, Kristi, since 1989.',
  answers: ['Erin',
    'Lori',
    'Kristi',
    'Alex',
    'Twyla'
  ],
  correctAnswer: 'Kristi'
},

{
  question: 'At which University did Gus Malzahn land his first head coaching job?',
  explanation: 'Gus Malzahn\'s first head coaching job was at Arkansas State.',
  answers: ['Mizzou',
    'Kansas',
    'Georgetown',
    'Georgia Tech',
    'Arkansas State'
  ],
  correctAnswer: 'Arkansas State'
},

{
  question: 'At which two colleges did Gus Malzahn play football at?',
  explanation: 'Gus was a walk-on at Arkansas before transferring to play at Henderson State.',
  answers: ['Arkansas, Henderson State',
    'DePaul, Harper College',
    'Pitt, Marshall',
    'West Virginia, Washington State',
    'Florida Atlantic, Florida State'
  ],
  correctAnswer: 'Arkansas, Henderson State'
},

];


// updateScore() - updates the score/question number display at the top of the screen each time the 'checkAnswer' button is clicked.
function updateScore() {
  $('.hud p').text(`

      SCORE: ${currentScore}/${currentQuestion}
`)
}

// generateNextQ() - this function starts the process of generating the next question when the 'nextQuestion' button is clicked, and calls the drawQuestion() function, which renders the question to the form
function generateNextQ() {

  $(document).on("click", ".nextQuestionButton", event => {
    event.preventDefault();
    if (currentQuestion <= 4) {

      drawQuestion(currentQuestion);

    } else {
      currentQuestion = 5;

      $("#card").html(`

     <div class ='gamePage end'>
         Thanks for playing!
         Your final score is at the top of the screen!
         <button class="btn playAgainButton">Play Again</button>
         </div>

       `)
restartQuiz();
    }
    updateScore();

  });
}

// drawQuestion() - this function renders the question to the form
function drawQuestion(currentQuestion) {

  $("#card").html(`

    <div class ='gamePage afterStart'>
        <form id='question-form'>
        <h3 class='quizQuestions'>${questions[currentQuestion].question}</h3>
          <div class='row'>
          <input type="radio"
          value="${questions[currentQuestion].answers[0]}"
           name="answerChoice" required>
          <label class='answer' id='choice0' >${questions[currentQuestion].answers[0]}</label>
          </div>

          <div class='row'>
          <input type="radio"
          value="${questions[currentQuestion].answers[1]}""
           name="answerChoice" required>
          <label class='answer' id='choice1' >${questions[currentQuestion].answers[1]}</label>
          </div>

          <div class='row'>
          <input type="radio" value="${questions[currentQuestion].answers[2]}"
          name="answerChoice" required>
          <label class='answer' id='choice2' >${questions[currentQuestion].answers[2]}</label>
          </div>

          <div class='row'>
          <input type="radio"
           value="${questions[currentQuestion].answers[3]}"
           name="answerChoice" required>
          <label class='answer' id='choice3' >${questions[currentQuestion].answers[3]}</label>
          </div>

          <div class='row'>
          <input type="radio"
          value="${questions[currentQuestion].answers[4]}"
          name="answerChoice" required>
          <label class='answer' id='choice4' >${questions[currentQuestion].answers[4]}</label>
          </div>

<button type="submit" class="btn checkAnswerButton">Check Answer</button>
        </form>

      </div>
    `)
}

// startQuiz() - this function takes you to the first question once you click the 'startQuiz' button.
function startQuiz() {
  $(".startButton").on('click', function () {
    $('h1').hide();
    $(".startButton").hide();

    drawQuestion(currentQuestion);

  });
}

// checkAnswer() - this function provides feedback regarding answer selection
function checkAnswer() {
  $("#card").on('submit', "form", event => {
    event.preventDefault();

    let userAnswer = $('input[name="answerChoice"]:checked').val()

    let rightAnswer = questions[currentQuestion].correctAnswer

    if (userAnswer == rightAnswer) {
      currentScore += 1;
      updateScore();
      $('#question-form').css("background-color", "#E87722").html(`
     <div class='correct'>
     <p>Correct!</p>
     <img src="images/Gus_Boom.gif" alt="Happy coach">
     <button type="submit" class="nextQuestionButton btn">${currentQuestion == 4 ? "View Results" : "Next Question"}</button>
     </div>
   `)

    } else if (userAnswer !== rightAnswer) {
      updateScore();
      $('#question-form').css("background-color", "#E87722").html(`
      <div class='wrong'>
      <p>Incorrect</p>
      <img src="images/Gus_VeryMad.gif" alt="Mad coach">
      </div>
      `)
      // showExplanation();
      setTimeout(function () {
        $('#question-form').fadeOut()
        $('#card').hide();
        //at 5 seconds - the above happens
      }, 5000)
      setTimeout(function () {
        $('#card').show()
        $('#question-form').fadeIn().css("background-color", "#E87722").html(`
        <div class='wrong'>
        <p class='explanations'>${questions[currentQuestion - 1].explanation}</p>
        <button type="submit" class="nextQuestionButton btn">${currentQuestion == 5 ? "View Results" : "Next Question"}</button>
        </div>
      `)
      // at 5.5 seconds - the above happens
      }, 5500)   
    };
    currentQuestion++;
    updateScore()

  });
}

function restartQuiz() {
  $(".playAgainButton").on('click', function () {
    currentQuestion = 0;
    currentScore = 0;
    updateScore();
    drawQuestion(currentQuestion);
  });
}
