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
      choices: ["To add interactivity to web pages", "To style web pages", "To define web page structure", "To handle server-side operations"],
      answer: "To add interactivity to web pages"
    },
    {
      question: "What does CSS stand for?",
      choices: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
      answer: "Cascading Style Sheets"
    },
    {
      question: "Which keyword is used to declare a variable in JavaScript?",
      choices: ["var", "let", "const", "all of the above"],
      answer: "all of the above"
    },
    {
      question: "What is the purpose of the 'console.log()' function in JavaScript?",
      choices: ["To display messages in the browser console", "To execute a function", "To manipulate the DOM", "To create an alert box"],
      answer: "To display messages in the browser console"
    },
    // Add more coding-related questions...
  ];
  
  let currentQuestionIndex = 0;
  let timeLeft = 60; // Initial time in seconds
  let timerInterval;
  let quizCompleted = false;
  let score = 0;
  
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
    const timerElement = document.getElementById("timer");
    timerElement.textContent = timeLeft;
    
    timerInterval = setInterval(function() {
      timeLeft--;
      timerElement.textContent = timeLeft;
      
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
    
    if (quizCompleted) {
      // Hide the question and choices until the user clicks the "Redo Quiz" button
      questionElement.style.display = "none";
      choicesElement.style.display = "none";
    } else {
      // Show the question and choices
      questionElement.style.display = "block";
      choicesElement.style.display = "block";
    }
  }
  
  // Function to handle user's choice selection
  function handleChoiceClick(choice, answer) {
    const selectedChoiceButton = event.target;
  
    if (choice === answer) {
      // Correct answer
      selectedChoiceButton.style.backgroundColor = '#00FF00'; // Set background color to green
      selectedChoiceButton.style.color = '#FFFFFF'; // Set text color to white
  
      score++;
    } else {
      // Incorrect answer
      selectedChoiceButton.style.backgroundColor = '#FF0000'; // Set background color to red
      selectedChoiceButton.style.color = '#FFFFFF'; // Set text color to white
  
      // Find the index of the correct answer and highlight it in green
      const choices = document.querySelectorAll('#choices button');
      const correctIndex = questions[currentQuestionIndex].choices.indexOf(answer);
      choices[correctIndex].style.backgroundColor = '#00FF00'; // Set background color to green
      choices[correctIndex].style.color = '#FFFFFF'; // Set text color to white
  
      timeLeft -= 10; // Subtract 10 seconds from the timer
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      setTimeout(() => {
        displayQuestion();
      }, 1000);
    } else {
      setTimeout(() => {
        endQuiz();
      }, 1000);
    }
  }
  
  // Function to end the quiz
  function endQuiz() {
    clearInterval(timerInterval);
    
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const timerElement = document.getElementById("timer");
    const initialsContainer = document.getElementById("initials-container");
    const finalScoreElement = document.getElementById("final-score");
    const redoButton = document.getElementById("redo-button");
    const saveButton = document.getElementById("save-button");
    
    questionElement.textContent = "";
    choicesElement.innerHTML = "";
    timerElement.textContent = "";
    
    const finalScore = Math.max(0, score * timeLeft); // Calculate the final score
    finalScoreElement.textContent = "Your final score: " + finalScore;
    
    initialsContainer.style.display = "block";
    redoButton.style.display = "block";
    saveButton.style.display = "block";
    
    finalScoreElement.style.display = "block";
    finalScoreElement.style.marginBottom = "10px";
    
    quizCompleted = true;
  }
  
  // Function to save initials and score
  function saveScore() {
    const initialsInput = document.getElementById("initials-input");
    const initials = initialsInput.value;
    
    // Save initials and score
    // Example: You can use localStorage to store the data
    
    // Hide the initials input and save button
    const initialsContainer = document.getElementById("initials-container");
    const saveButton = document.getElementById("save-button");
    initialsContainer.style.display = "none";
    saveButton.style.display = "none";
  }
  
  // Function to reset the quiz
  function resetQuiz() {
    currentQuestionIndex = 0;
    timeLeft = 60;
    score = 0;
    
    const initialsInput = document.getElementById("initials-input");
    const initialsContainer = document.getElementById("initials-container");
    const finalScoreElement = document.getElementById("final-score");
    const redoButton = document.getElementById("redo-button");
    const saveButton = document.getElementById("save-button");
    
    initialsInput.value = "";
    initialsContainer.style.display = "none";
    finalScoreElement.style.display = "none";
    redoButton.style.display = "none";
    saveButton.style.display = "none";
    
    quizCompleted = false;
    
    startQuiz();
  }
  
  // Add event listener to the start button
  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", startQuiz);
  
  // Add event listener to the save button
  const saveButton = document.getElementById("save-button");
  saveButton.addEventListener("click", saveScore);
  
  // Add event listener to the redo button
  const redoButton = document.getElementById("redo-button");
  redoButton.addEventListener("click", resetQuiz);