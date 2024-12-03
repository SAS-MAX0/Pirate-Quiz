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
const personalityQuestions = [
        {
            "question": "What’s yer ideal role on a pirate crew?",
            "options": ["Captain", "First Mate", "Cook", "Navigator"]
        },
        {
            "question": "Ye find a treasure chest. What do ye do first?",
            "options": ["Open it immediately", "Inspect it for traps", "Share it with the crew", "Bury it for safekeeping"]
        },
        {
            "question": "What be yer favorite pirate accessory?",
            "options": ["Hat", "Hook", "Parrot", "Boots"]
        },
        {
            "question": "How do ye handle mutiny aboard yer ship?",
            "options": ["Fight back fiercely", "Negotiate with the crew", "Abandon ship", "Join the mutineers"]
        },
        {
            "question": "What kind of pirate drink be yer favorite?",
            "options": ["Rum", "Grog", "Water", "Ale"]
        },
        {
            "question": "Ye be at the helm. How do ye steer through a storm?",
            "options": ["Full speed ahead", "Anchor and wait it out", "Follow the stars", "Ask the crew for advice"]
        },
        {
            "question": "If ye could name yer ship, what would ye call it?",
            "options": ["The Black Pearl", "The Sea Serpent", "The Golden Doubloon", "The Storm Chaser"]
        },
        {
            "question": "What treasure excites ye the most?",
            "options": ["Gold", "Jewels", "Ancient maps", "Legendary artifacts"]
        },
        {
            "question": "A rival pirate challenges ye to a duel. What weapon do ye choose?",
            "options": ["Sword", "Pistol", "Cannon", "Yer fists"]
        },
        {
            "question": "If ye could live anywhere, where would it be?",
            "options": ["On the open sea", "A deserted island", "A bustling port", "A hidden cave"]
        },
        {
            "question": "What’s yer greatest fear as a pirate?",
            "options": ["Losing me treasure", "Being marooned", "A mutiny", "Sea monsters"]
        },
        {
            "question": "What be yer strategy for finding buried treasure?",
            "options": ["Follow the map exactly", "Use clues and intuition", "Rely on the crew's knowledge", "Dig everywhere"]
        },
        {
            "question": "What’s yer pirate motto?",
            "options": ["Take what ye can, give nothing back", "A smooth sea never made a skilled sailor", "The code is more of a guideline", "Fortune favors the bold"]
        },
        {
            "question": "If ye could choose a pirate skill to master, what would it be?",
            "options": ["Sword fighting", "Navigating by the stars", "Charm and negotiation", "Treasure hunting"]
        },
        {
            "question": "What do ye value most in yer pirate crew?",
            "options": ["Loyalty", "Courage", "Cunning", "Strength"]
        }
    ];

    let currentQuestionIndex = 0;
    const totalQuestions = personalityQuestions.length;
    const results = {};

    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const nextButton = document.getElementById('next');
    const quizCard = document.querySelector('.card');
    const resultElement = document.getElementById('result');

    showQuestion();

    function showQuestion() {
        const currentQuestion = personalityQuestions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        answersElement.innerHTML = '';

        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('answer-btn');
            button.addEventListener('click', () => selectAnswer(option));
            answersElement.appendChild(button);
        });

        nextButton.disabled = true;
    }

    function selectAnswer(selectedOption) {
        results[currentQuestionIndex] = selectedOption;
        const allButtons = answersElement.querySelectorAll('button');
        allButtons.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === selectedOption) {
                btn.style.backgroundColor = 'gold';
            }
        });

        nextButton.disabled = false;
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < totalQuestions) {
            showQuestion();
        } else {
            displayPersonalityResult();
        }
    });

    function displayPersonalityResult() {
        quizCard.innerHTML = '';
        const dominantTrait = calculateDominantTrait(results);

        resultElement.textContent = `Yer Pirate Personality: ${dominantTrait.message}`;
        resultElement.style.color = dominantTrait.color;
        quizCard.appendChild(resultElement);
    }

    function calculateDominantTrait(answers) {
        const traits = {
            "Captain": { count: 0, message: "A born leader, fearless and respected!", color: "gold" },
            "First Mate": { count: 0, message: "Loyal, resourceful, and indispensable to the crew!", color: "blue" },
            "Navigator": { count: 0, message: "A strategic thinker who always finds the way!", color: "green" },
            "Cook": { count: 0, message: "The heart of the crew, keeping everyone fed and happy!", color: "red" }
        };

        Object.values(answers).forEach(answer => {
            if (traits[answer]) traits[answer].count++;
        });

        const dominant = Object.values(traits).reduce((prev, current) =>
            current.count > prev.count ? current : prev
        );

        return dominant;
    }
});
