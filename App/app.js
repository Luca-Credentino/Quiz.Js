const domandeRisposte = [
    {
        domanda: "1. Quanti fusi orari ci sono in Russia?",
        answer: "11",
        options: [
        "11",
        "12",
        "9",
        "10"
        ]
    },
    {
        domanda: "2. Qual è il fiore nazionale del Giappone?",
        answer: "Fiore di ciliegio",
        options: [
        "Fiore di pesco",
        "Fiore di loto",
        "Fiore di ciliegio",
        "Fiore di riso"
        ]
    },
    {
        domanda: "3. Quante strisce ci sono sulla bandiera americana?",
        answer: "13",
        options: [
        "11",
        "5",
        "15",
        "13"
        ]
    },
    {
        domanda: "4. Quanti giorni ci vogliono affinché la Terra orbiti attorno al Sole?",
        answer: "365",
        options: [
        "365",
        "364",
        "12",
        "375"
        ]
    },
    {
        domanda: "5. Qual è il paese più piccolo del mondo?",
        answer: "Vaticano",
        options: [
        "San Marino",
        "Molise",
        "Vaticano",
        "Udine"
        ]
    },
];

//requires 
const replayQuizBtn = document.querySelector(".replayBtn");
const quitQuizBtn = document.querySelector(".quitBtn");
const listText = document.querySelector("ol")
const domandaText = document.querySelector(".domanda");
const scoreText = document.querySelector(".score");
const nextQuestionBtn = document.querySelector(".nextQuestion");
const counterTimeText = document.querySelector(".counter-time");
const progressbar = document.querySelector("#progressBar");
const userPointsTxt = document.querySelector(".userPoints");
let countIndex = 0;
let counterDomande = 1;
let userPoints = 0;
let dowloadTimer;

showQuestionAndAnswere(0) //INDEX "0" PERCHE DOVRA SEMPRE APPARIRE LA PRIMA DOMANDA
counterTime(15)

nextQuestionBtn.addEventListener("click", ()=>{
    if(countIndex >= 4){
        const modalPoints = document.querySelector(".modal-bg");
        modalPoints.classList.add("active");
        //points
        userPointsTxt.innerHTML = userPoints;
    }else{
        counterDomande++;
        countIndex++;
        clearInterval(dowloadTimer);
        counterTime(15);
        showQuestionAndAnswere(countIndex);
        scoreText.innerHTML = counterDomande;
    }
})//DOPO IL CLICK VERRÀ RESETTATA LA FUNZIONE DI TIMER E LE RISPOSTE E DOMANDE AGGIORNATE OGNI CLICK

function showQuestionAndAnswere(index){
    domandaText.innerHTML = `${domandeRisposte[index].domanda}`;
    listText.innerHTML = `
    <h3 data-risposta="1" class="risposte">${domandeRisposte[index].options[0]}</h3><span></span>
    <h3 data-risposta="2" class="risposte">${domandeRisposte[index].options[1]}</h3><span></span>
    <h3 data-risposta="3" class="risposte">${domandeRisposte[index].options[2]}</h3><span></span>
    <h3 data-risposta="4" class="risposte">${domandeRisposte[index].options[3]}</h3><span></span>`;
    const risposte = document.querySelectorAll(".risposte");
    risposte.forEach((elements)=>{
        elements.setAttribute("onclick", "answerOnClick(this)")
    })
}//DISPLAY QUESTION 

function counterTime (seconds) {
    let timeleft = seconds;
     dowloadTimer = setInterval(()=>{
        if (timeleft <= 0){
            clearInterval(dowloadTimer);
            counterTimeText.innerHTML = "0";
            progressbar.value = seconds
            //quando il tempo rimasto è inferiore o uguale a 0 non si potrà rispondere
            const risposte = document.querySelectorAll(".risposte");
            risposte.forEach((elements)=>{
                elements.setAttribute("onclick", "null")
            })
        }else{
            counterTimeText.innerHTML = timeleft; 
            progressbar.value = seconds - timeleft;
        }
        timeleft -= 1;
    }, 1500)
}//TIMER

//OnClick le diverse opzioni di risposta
function answerOnClick(answer){
    let userAnswer = answer.textContent
    let correctAnswere = domandeRisposte[countIndex].answer;
    if(userAnswer == correctAnswere){
         const correctAnswereIcon =  document.createElement("i")
         correctAnswereIcon.className = "far fa-check-circle correctAnswereIcon"
         correctAnswereIcon.style.color = "green"
         answer.style.color = "green"
        answer.appendChild(correctAnswereIcon);
        userPoints++
        answer.setAttribute("onclick", "null"); //reset della funzione answerOnClick()
    }else{
        const wrongAnswereIcon = document.createElement("i");
        wrongAnswereIcon.className = "far fa-times-circle wrongAnswereIcon";
        wrongAnswereIcon.style.color = "red";
        answer.style.color = "red"
        answer.appendChild(wrongAnswereIcon);
        answer.setAttribute("onclick", "null");
    }
}

/***************************     END QUIZ  SECTION    **************************************/


//replay quiz
replayQuizBtn.addEventListener("click", () => {
    location.href = "quiz.html";
})

//quit quiz
quitQuizBtn.addEventListener("click", () => {
   location.href = "/Projects/Quiz/index.html";
})
