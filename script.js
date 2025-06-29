// Quiz Data - all 10 questions
const questions = [
    {
        question: "When you wake up, what is the first thing you do?",
        answers: [
            { text: "Go on your phone", type: "banana" },
            { text: "Get dressed", type: "earl" },
            { text: "Snooze your alarm", type: "strawberry" },
            { text: "Journal & plan your day", type: "classic" }
        ]
    },
    {
        question: "Okay! It's time to get ready for work. How do you get dressed?",
        answers: [
            { text: "Spend time choosing outfit", type: "strawberry" },
            { text: "Put on whatever I see first", type: "banana" },
            { text: "Choose my outfit the night before", type: "classic" },
            { text: "Put on my uniform", type: "earl" }
        ]
    },
    {
        question: "Now you are ready to go to work. Time for breakfast. Do you:",
        answers: [
            { text: "Skip breakfast", type: "banana" },
            { text: "Go to a cafe", type: "strawberry" },
            { text: "Make breakfast at home", type: "classic" },
            { text: "Eat leftovers", type: "earl" }
        ]
    },
    {
        question: "It's almost time to leave for work. Are you the type to arrive:",
        answers: [
            { text: "Right on time", type: "classic" },
            { text: "Super very Early", type: "earl" },
            { text: "Super very Late", type: "banana" },
            { text: "Take a mental health day", type: "strawberry" }
        ]
    },
    {
        question: "When you arrive at work, do you:",
        answers: [
            { text: "Chat and catch up with your coworkers", type: "banana" },
            { text: "Go straight to your table and work", type: "earl" },
            { text: "Plan out your tasks first before diving into work", type: "classic" },
            { text: "Grab a coffee", type: "strawberry" }
        ]
    },
    {
        question: "From now to lunch do you:",
        answers: [
            { text: "Help out a coworker", type: "classic" },
            { text: "Focus on your work until lunchtime", type: "earl" },
            { text: "Work with music", type: "strawberry" },
            { text: "Pretend to work", type: "banana" }
        ]
    },
    {
        question: "Time to eat! How do you spend your lunchtime? Do you:",
        answers: [
            { text: "Eat with your coworkers", type: "strawberry" },
            { text: "Put on a video", type: "banana" },
            { text: "Work while you eat", type: "earl" },
            { text: "Eat outside & enjoy the weather", type: "classic" }
        ]
    },
    {
        question: "How would you spend your time after work?",
        answers: [
            { text: "Go home right away", type: "banana" },
            { text: "Stay overtime to finish the tasks", type: "earl" },
            { text: "Hang out with friends", type: "strawberry" },
            { text: "Go to the gym", type: "classic" }
        ]
    },
    {
        question: "What do you do when you get home?",
        answers: [
            { text: "Cook dinner", type: "classic" },
            { text: "Games", type: "banana" },
            { text: "Clean", type: "earl" },
            { text: "Call your friends/family", type: "strawberry" }
        ]
    },
    {
        question: "Calling it a night. Do you?",
        answers: [
            { text: "Read a book", type: "strawberry" },
            { text: "Stay up to watch movies", type: "banana" },
            { text: "Go straight to bed", type: "classic" },
            { text: "Journal", type: "earl" }
        ]
    }
];

// Matcha personality types
const matchaTypes = {
    strawberry: {
        name: "Strawberry Matcha",
        subtitle: "The Kawaii Dreamer",
        icon: "🌸",
        description: "You're the embodiment of cuteness and romance! You see the world through rose-colored glasses and turn everyday moments into Pinterest-worthy memories. Your aesthetic is soft pastels, cozy cafes, and anything that makes life feel like a fairytale. You believe in romanticizing the little things and finding beauty in every moment.",
        image: "resources/images/strawberrymatcha.jpg",
        traits: ["Kawaii", "Coquette", "Romantic", "Aesthetic", "Spring Vibes", "Pinterest Life"]
    },
    earl: {
        name: "Earl Grey Matcha",
        subtitle: "The Zen Wellness Guru",
        icon: "🧘",
        description: "You're all about that self-care lifestyle! Poetry, journaling, yoga sessions, and quiet moments with a good book define your perfect day. You prioritize mental health, have a morning routine that others envy, and know that true luxury is inner peace. Your vibe is calm, collected, and deeply nurturing.",
        image: "resources/images/earlgrey.jpg",
        traits: ["Self-Care", "Mindful", "Poetic", "Healthy", "Calm", "Winter Soul"]
    },
    banana: {
        name: "Banana Pudding Matcha",
        subtitle: "The Cozy Goofball",
        icon: "🐒",
        description: "You're the human version of a warm hug! Nostalgic, playful, and endlessly optimistic, you bring childlike wonder to everything you do. Studio Ghibli movies make you cry happy tears, and you believe love languages are real. You might seem quiet at first, but your humor shines once people get to know you.",
        image: "resources/images/bananamatcha.jpg",
        traits: ["Nostalgic", "Cozy", "Funny", "Warm Hug", "Ghibli Vibes", "Summer Child"]
    },
    classic: {
        name: "Classic Matcha Latte",
        subtitle: "The Structured Achiever",
        icon: "⏰",
        description: "You're the person everyone wishes they could be! Punctual, disciplined, and incredibly organized, you've mastered the art of routine. Your planner is your best friend, and you genuinely enjoy the satisfaction of checking things off your to-do list. Structure isn't limiting for you—it's liberating.",
        image: "resources/images/classicmatcha.jpg",
        traits: ["Punctual", "Disciplined", "Organized", "Routine", "Structured", "Goal-Oriented"]
    }
};

// Quiz state
let currentQuestion = 0;
let answers = { strawberry: 0, earl: 0, banana: 0, classic: 0 };

// Start the quiz
function startQuiz() {
    document.getElementById('homepage').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    loadQuestion();
}

// Load current question
function loadQuestion() {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('questionCounter').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    document.getElementById('questionTitle').textContent = question.question;

    const optionsContainer = document.getElementById('answerOptions');
    optionsContainer.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const option = document.createElement('div');
        option.className = 'answer-option';
        option.textContent = answer.text;
        option.onclick = () => selectAnswer(answer.type, option);
        optionsContainer.appendChild(option);
    });
}

// Handle answer selection
function selectAnswer(type, selectedOption) {
    // Remove previous selections
    document.querySelectorAll('.answer-option').forEach(option => {
        option.classList.remove('selected');
    });

    // Add selection to clicked option
    selectedOption.classList.add('selected');

    // Record answer
    answers[type]++;

    // Move to next question after a short delay
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 50);
}

// Show quiz results
function showResults() {
    // Find the matcha type with the highest score
    const resultType = Object.keys(answers).reduce((a, b) =>
        answers[a] > answers[b] ? a : b
    );

    const result = matchaTypes[resultType];

    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('resultsContainer').style.display = 'block';

    const resultImageElement = document.getElementById('resultImage');
    resultImageElement.src = result.image;
    resultImageElement.alt = result.name;

    document.getElementById('resultIcon').textContent = result.icon;
    document.getElementById('resultTitle').textContent = result.name;
    document.getElementById('resultSubtitle').textContent = result.subtitle;
    document.getElementById('resultDescription').textContent = result.description;

    const traitsContainer = document.getElementById('resultTraits');
    traitsContainer.innerHTML = '';
    result.traits.forEach(trait => {
        const tag = document.createElement('div');
        tag.className = 'trait-tag';
        tag.textContent = trait;
        traitsContainer.appendChild(tag);
    });
}

// Restart the quiz
function restartQuiz() {
    currentQuestion = 0;
    answers = { strawberry: 0, earl: 0, banana: 0, classic: 0 };

    document.getElementById('resultsContainer').style.display = 'none';
    document.getElementById('homepage').style.display = 'block';
}
