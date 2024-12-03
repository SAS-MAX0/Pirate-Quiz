document.addEventListener('DOMContentLoaded', () => {
    const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
    "#6A4E23", 
    "#9B6B3F", 
    "#D1B28A", 
    "#EAB843", 
    "#F8CF79", 
    "#8F6742", 
    "#5A3B1A", 
    "#3D2A15", 
    "#C0392B", 
    "#A89984"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();

    const questions = [
        {
            "question": "Ye be in a dark cave with a lantern, a bonfire, and a pirate ship's lantern. If ye only have one match, what be ye lightin' first?",
            "options": ["The Lantern", "The Bonfire", "The Pirate Ship's Lantern", "The Match"],
            "answer": "The Match"
        },
        {
            "question": "I be speakin' without a tongue and hearin' without ears. What be I?",
            "options": ["A Pirate Ship", "A Treasure Map", "A Parrot", "A Pirate's Voice"],
            "answer": "A Pirate's Voice"
        },
        {
            "question": "The capital of the Pirate Isles is a strange word. Would ye please spell it?",
            "options": ["P-I-R-A-T-E", "S-E-A", "C-A-P-T-A-I-N", "A-R-R-R"],
            "answer": "P-I-R-A-T-E"
        },
        {
            "question": "Ye sail the seven seas, but yer ship be lost in the storm. Who be yer captain now?",
            "options": ["Yer First Mate", "Yer Captain", "A Sea Monster", "The Parrot"],
            "answer": "Yer Captain"
        },
        {
            "question": "Ye have four pieces of treasure, but one be fake. Who be the faker?",
            "options": ["The Map", "The Parrot", "The Crew", "Ye Self"],
            "answer": "The Crew"
        },
        {
            "question": "A pirate’s favorite letter be 'R,' but what be the pirate’s second favorite letter?",
            "options": ["C", "P", "T", "X"],
            "answer": "C"
        },
        {
            "question": "Ye be stranded on a deserted island. What’s the first thing ye look for?",
            "options": ["Treasure Chest", "Coconuts", "A Ship", "A Parrot"],
            "answer": "A Ship"
        },
        {
            "question": "What be a pirate’s favorite type of music?",
            "options": ["Rock", "Sea Shanties", "Pop", "Classical"],
            "answer": "Sea Shanties"
        },
        {
            "question": "Ye be caught in a storm, and ye need a compass to find yer way. Which direction be 'north' on a compass?",
            "options": ["Top", "Right", "Left", "Bottom"],
            "answer": "Top"
        },
        {
            "question": "What be the name of the pirate ship that Captain Blackbeard sailed on?",
            "options": ["The Black Pearl", "The Queen Anne's Revenge", "The Jolly Roger", "The Sea Serpent"],
            "answer": "The Queen Anne's Revenge"
        },
        {
            "question": "Ye be walking the plank. What should ye do to survive?",
            "options": ["Jump into the sea", "Call for help", "Make peace with yer fate", "Swim to another ship"],
            "answer": "Jump into the sea"
        },
        {
            "question": "Which pirate is known for burying treasure and leaving behind a map?",
            "options": ["Captain Hook", "Blackbeard", "Long John Silver", "Bartholomew Roberts"],
            "answer": "Long John Silver"
        },
        {
            "question": "Ye find a mysterious map with an 'X' marking the spot. What do ye do?",
            "options": ["Dig there immediately", "Wait for reinforcements", "Study the map more", "Head to the nearest tavern"],
            "answer": "Dig there immediately"
        },
        {
            "question": "What be the pirate code?",
            "options": ["Do what ye want, but be loyal to yer crew", "Take what ye can, give nothing back", "Steal from the rich, give to the poor", "There be no rules in piracy"],
            "answer": "Take what ye can, give nothing back"
        },
        {
            "question": "Ye be having a duel with a rival pirate. What weapon do ye choose?",
            "options": ["A sword", "A pistol", "A cannon", "A knife"],
            "answer": "A sword"
        },
        {
            "question": "If a pirate says, 'Shiver me timbers!', what does that mean?",
            "options": ["They are cold", "They are scared", "They are angry", "They are excited"],
            "answer": "They are scared"
        }
    ];
    

    let currentQuestionIndex = 0;
    let score = 0;
    const totalQuestions = questions.length;

    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const nextButton = document.getElementById('next');
    const resultElement = document.getElementById('result');
    const quizCard = document.querySelector('.card'); 

    showQuestion();

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        answersElement.innerHTML = '';

        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('answer-btn'); 
            button.addEventListener('click', () => selectAnswer(option, button)); 
            answersElement.appendChild(button);
        });

        nextButton.disabled = true;
    }

    function selectAnswer(selectedOption, button) {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedOption === currentQuestion.answer) {
            score++;
            button.style.backgroundColor = 'green';
        } else {
            button.style.backgroundColor = 'red';
        }
        const allButtons = answersElement.querySelectorAll('button');
        allButtons.forEach(btn => btn.disabled = true);

        nextButton.disabled = false;
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;

        if (currentQuestionIndex < totalQuestions) {
            showQuestion();
        } else {
            quizCard.innerHTML = ''; 
            const pirateResult = calculatePirateIQ(score);
            resultElement.textContent = `Yer Score: ${score} - ${pirateResult.message}`;
            resultElement.style.color = pirateResult.color;
            quizCard.appendChild(resultElement);
        }
    });

    function calculatePirateIQ(score) {
        let message = '';
        let color = '';

        if (score >= 18) {
            message = `Arrr, yer IQ be 160 (Pirate King)! Ye be a master of the seas, a sharp thinker with the wisdom of the ancients! Keep sailin' true, matey!`;
            color = 'green';
        } else if (score >= 15) {
            message = `Yer IQ be between 130 and 159 (Above Average Pirate)! Ye've got the sharp wit of a seasoned pirate! Ready to command yer own ship!`;
            color = 'blue';
        } else if (score >= 10) {
            message = `Yer IQ be between 90 and 129 (Average Pirate). Ye know yer way around the ship and the treasure hunt, but there’s room to grow! Arrr!`;
            color = 'yellow'; 
            message = `Yer IQ be below 90 (Landlubber)! But don’t ye worry, ye can always improve yer skills with practice and plenty o' rum!`;
            color = 'red';
        }

        return { message, color };
    }
});

