let correctanswer = "Red and Yellow";
let answerSelected = false;
let questionBox = document.getElementById("questionBox");
let optionBoxes = document.getElementsByClassName("optionBoxes")
let authorBox = document.getElementById("authorBox");
let postedAlert = document.getElementById("postedAlert");
let noMoreQuestions = document.getElementById("noMoreQuestions");


let solvedQuestions = []


const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        author: "John Doe",
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        author: "Jane Smith",
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        author: "David Lee",
        correctAnswer: "Pacific Ocean"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "J.K. Rowling", "George Orwell", "Mark Twain"],
        author: "Emily Johnson",
        correctAnswer: "Harper Lee"
    }
];

let questionNumber = Math.floor(Math.random() * questions.length);


function checkAnswer(e){
    let userSelection = e.target.innerHTML;
    if(!answerSelected){
    if (userSelection.toLowerCase()==(questions[questionNumber].correctAnswer).toLowerCase()){
        answerSelected = true;
        e.target.classList = "btn btn-success w-100 py-3 optionBoxes"
    } else{
        e.target.classList = "btn btn-danger w-100 py-3 optionBoxes"
        answerSelected = true;
    }
}
}

function getNewQuestion(){
    answerSelected = false;
    if(solvedQuestions.length != questions.length){
    while (solvedQuestions.includes(questionNumber)){
        questionNumber = Math.floor(Math.random() * questions.length);
    }
    questionBox.innerText = questions[questionNumber].question
    for(i=0; i<4; i++){
        optionBoxes[i].classList = "btn btn-outline-secondary w-100 py-3 optionBoxes";
        optionBoxes[i].innerText = questions[questionNumber].options[i];
    }
    authorBox.innerText = "Contributed By: " + questions[questionNumber].author;
    solvedQuestions.push(questionNumber)
    }
    else{
        postedAlert.classList.replace("d-none", "d-block")
    }
}

function postQuestion(event) {
    event.preventDefault();

    const question = document.getElementById("questionInput").value;
    const option1 = document.getElementById("option1").value;
    const option2 = document.getElementById("option2").value;
    const option3 = document.getElementById("option3").value;
    const option4 = document.getElementById("option4").value;
    const correctAnswer = document.getElementById("correctAnswer").value;
    const author = document.getElementById("author").value;


    console.log("question:", question);
    console.log("options:", [option1, option2, option3, option4]);
    console.log("correctAnswer:", correctAnswer);
    console.log("Contributed By:", author || "Anonymous");
    postedAlert.classList.replace("d-none", "d-block")
    document.getElementById("questionForm").reset();
}

getNewQuestion();
