let correctanswer = "Red and Yellow";
let answerSelected = false;
let questionBox = document.getElementById("questionBox");
let optionBoxes = document.getElementsByClassName("optionBoxes");
let authorBox = document.getElementById("authorBox");
let postedAlert = document.getElementById("postedAlert");
let noMoreQuestions = document.getElementById("noMoreQuestions");
let question = {}
let questionNumber = 1; 




let solvedQuestions = [];

function checkAnswer(e){
    let userSelection = e.target.innerHTML;
    if(!answerSelected){
    if (userSelection.toLowerCase()==(question.correctAnswer).toLowerCase()){
        answerSelected = true;
        e.target.classList = "btn btn-success w-100 py-3 optionBoxes"
    } else{
        e.target.classList = "btn btn-danger w-100 py-3 optionBoxes"
        answerSelected = true;
    }
}
}

async function getNewQuestion() {
    await fetch('https://xj6km39ref.execute-api.us-east-2.amazonaws.com/production/questions-count')
    .then(response=>response.json())
    .then(data=>{
        totalQuestions = data.total_count;
        console.log(totalQuestions)
    })
    answerSelected = false;
    let questionNumber = Math.floor(Math.random() * totalQuestions)+1; 

    fetch(`https://xj6km39ref.execute-api.us-east-2.amazonaws.com/production/question?questionNumber=${questionNumber}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.question && solvedQuestions.length!=totalQuestions) {
                if (solvedQuestions.includes(questionNumber)) {
                    getNewQuestion();
                } else {
                    question = data;
                    questionBox.innerText = question.question;
                    authorBox.innerText = "Contributed By: " + question.author;

                    for (let i = 0; i < 4; i++) {
                        optionBoxes[i].classList = "btn btn-outline-secondary w-100 py-3 optionBoxes";
                        optionBoxes[i].innerText = question.options[i];
                    }

                    solvedQuestions.push(questionNumber); 
                }
            } else {
                noMoreQuestions.classList.replace("d-none", "d-block");
            }
        })
        .catch(error => {
            console.error('Error fetching question:', error);
        });
}

function postQuestion(event) {
    event.preventDefault();

    const question = document.getElementById("questionInput").value;
    const option1 = document.getElementById("option1").value;
    const option2 = document.getElementById("option2").value;
    const option3 = document.getElementById("option3").value;
    const option4 = document.getElementById("option4").value;
    const correctAnswer = document.getElementById(document.getElementById("correctAnswer").value).value;
    const author = document.getElementById("author").value;

    const newQuestion = {
        question,
        options: [option1, option2, option3, option4],
        correctAnswer,
        author: author || "Anonymous"
    };

    fetch('https://xj6km39ref.execute-api.us-east-2.amazonaws.com/production/question', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuestion)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Question posted:', data);
        postedAlert.classList.replace("d-none", "d-block");
        document.getElementById("questionForm").reset();
    })
    .catch(error => {
        console.error('Error posting question:', error);
    });
}

getNewQuestion()
