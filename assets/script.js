// Define your coding-related questions and answers as an array of objects
const questions = [
    {
      question: "What does HTML stand for?",
      choices: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyperlinks and Text Manipulation Language"],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "What is the CSS box model used for?",
      choices: ["Styling web page layouts", "Creating interactive web forms", "Manipulating web page content", "Executing JavaScript code"],
      answer: "Styling web page layouts"
    },
    {
      question: "Which of the following is NOT a programming language?",
      choices: ["Java", "Python", "HTML", "C++"],
      answer: "HTML"
    },
    {
      question: "What is the purpose of JavaScript?",
      choices: ["To style web pages", "To create web page layouts", "To add interactivity to web pages", "To define web page structure"],
      answer: "To add interactivity to web pages"
    },
    {
      question: "What does CSS stand for?",
      choices: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
      answer: "Cascading Style Sheets"
    },
    // Add more coding-related questions...
  ];
  
  let currentQuestionIndex = 0;
  let timeLeft = 60; // Initial time in seconds
  let timerInterval;
  
  // Function to start the quiz
  function startQuiz() {
    // Hide the start button
    const startButton = document.getElementById("start-button");
    startButton.style.display = "none";
    
    // Start the timer
    startTimer();
    
    // Display the first question
    displayQuestion();
  }
  
  // Function to start the timer
  function startTimer() {
    timerInterval = setInterval(function() {
      timeLeft--;
      document.getElementById("time-left").textContent = timeLeft;
      
      if (timeLeft <= 0) {
        endQuiz();
      }
    }, 1000);
  }
  
  // Function to display a question and its choices
  function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";
    
    currentQuestion.choices.forEach(function(choice) {
      const choiceButton = document.createElement("button");
      choiceButton.textContent = choice;
      
      choiceButton.addEventListener("click", function() {
        handleChoiceClick(choice, currentQuestion.answer);
      });
      
      choicesElement.appendChild(choiceButton);
    });
  }
  
  // Function to handle user's choice selection
  function handleChoiceClick(choice, answer) {
    if (choice === answer) {
      // Correct answer
      currentQuestionIndex++;
      
      if (currentQuestionIndex < questions.length) {
        displayQuestion();
      } else {
        endQuiz();
      }
    } else {
      // Incorrect answer
      timeLeft -= 10; // Subtract 10 seconds from the timer
    }
  }
  
  // Function to end the quiz
  function endQuiz() {
    clearInterval(timerInterval);
    
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const timerElement = document.getElementById("timer");
    const finalScoreElement = document.getElementById("final-score");
    const initialsContainer = document.getElementById("initials-container");
    
    questionElement.textContent = "";
    choicesElement.innerHTML = "";
    timerElement.textContent = "";
    finalScoreElement.textContent = "Your final score: " + timeLeft;
    initialsContainer.style.display = "block";
    
    const saveButton = document.getElementById("save-button");
    saveButton.addEventListener("click", saveScore);
  }
  
  // Function to save initials and score
  function saveScore() {
    const initialsInput = document.getElementById("initials-input");
    const initials = initialsInput.value;
    
    // Save initials and score
    // Example: You can use localStorage to store the data
    
    // Reset the quiz for a new game
    resetQuiz();
  }
  
  // Function to reset the quiz
  function resetQuiz() {
    currentQuestionIndex = 0;
    timeLeft = 60;
    
    const initialsInput = document.getElementById("initials-input");
    const initialsContainer = document.getElementById("initials-container");
    
    initialsInput.value = "";
    initialsContainer.style.display = "none";
    
    startQuiz();
  }
  
  // Add event listener to the start button
  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", startQuiz);
  