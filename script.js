let questions = [
{
question:"What does HTML stand for?",
options:[
"Hyper Text Markup Language",
"Home Tool Markup Language",
"Hyperlinks Text Markup Language",
"Hyper Tool Multi Language"
],
answer:0
},
{
question:"Which language is used for styling web pages?",
options:["HTML","CSS","Python","Java"],
answer:1
},
{
question:"Which is a JavaScript framework?",
options:["Django","Laravel","React","Flask"],
answer:2
},
{
question:"Which tag is used for images?",
options:["img","image","src","pic"],
answer:0
},
{
question:"Which company developed JavaScript?",
options:["Google","Microsoft","Netscape","Apple"],
answer:2
},
{
question:"Inside which HTML element do we put JavaScript?",
options:["script","js","javascript","code"],
answer:0
},
{
question:"Which symbol is used for comments in JS?",
options:["//","<!-- -->","##","**"],
answer:0
},
{
question:"Which method prints in console?",
options:["print()","console.log()","write()","echo()"],
answer:1
},
{
question:"Which property changes text content?",
options:["innerHTML","textStyle","font","color"],
answer:0
},
{
question:"Which keyword declares variable?",
options:["var","int","string","float"],
answer:0
}
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");

function shuffleQuestions(){
questions.sort(() => Math.random() - 0.5);
}

function loadQuestion(){

clearInterval(timer);

timeLeft = 30;
startTimer();

let q = questions[currentQuestion];

document.getElementById("progress-text").innerText =
`Question ${currentQuestion+1} of ${questions.length}`;

document.getElementById("progress-bar").style.width =
`${((currentQuestion+1)/questions.length)*100}%`;

questionEl.innerText = q.question;
optionsEl.innerHTML = "";

q.options.forEach((option,index)=>{

let btn = document.createElement("button");

btn.innerText = option;
btn.classList.add("option");

btn.onclick = () => checkAnswer(btn,index);

optionsEl.appendChild(btn);

});
}

function checkAnswer(button,index){

let q = questions[currentQuestion];
let buttons = document.querySelectorAll(".option");

buttons.forEach(btn=>btn.disabled=true);

if(index===q.answer){

button.classList.add("correct");
score++;

}
else{

button.classList.add("wrong");
buttons[q.answer].classList.add("correct");

}
}

nextBtn.addEventListener("click",()=>{

currentQuestion++;

if(currentQuestion<questions.length){

loadQuestion();

}
else{

showResult();

}

});

function showResult(){

clearInterval(timer);

document.getElementById("quiz-box").classList.add("hidden");
document.getElementById("result-box").classList.remove("hidden");

let percent = (score/questions.length)*100;

document.getElementById("score").innerText =
`Score: ${score}/${questions.length}`;

document.getElementById("percentage").innerText =
`Percentage: ${percent}%`;

let msg = "";

if(percent>=80){
msg="Excellent Work!";
}
else if(percent>=50){
msg="Good Job!";
}
else{
msg="Keep Practicing!";
}

document.getElementById("message").innerText = msg;
}

function startTimer(){

document.getElementById("timer").innerText = `${timeLeft}s`;

timer = setInterval(()=>{

timeLeft--;

document.getElementById("timer").innerText = `${timeLeft}s`;

if(timeLeft===0){

clearInterval(timer);

currentQuestion++;

if(currentQuestion<questions.length){
loadQuestion();
}
else{
showResult();
}

}

},1000);
}

function restartQuiz(){

shuffleQuestions();

currentQuestion = 0;
score = 0;

document.getElementById("result-box").classList.add("hidden");
document.getElementById("quiz-box").classList.remove("hidden");

loadQuestion();
}

shuffleQuestions();
loadQuestion();