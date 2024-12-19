// Game State
let score = 0;
let level = 1;
let colors = ['#ff6347', '#32cd32', '#1e90ff', '#ff4500', '#ff6347', '#ff8c00'];
let bottles = [];
let bottleContents = [];
let colorsAvailable = ['#ff6347', '#32cd32', '#1e90ff', '#ff4500'];
let bottleCapacity = 4;
let bottlesPerLevel = 5;

// Initialize the game
function initGame() {
    bottles = [];
    bottleContents = [];
    document.getElementById('game-area').innerHTML = ''; // Clear any previous game content

    createBottles();
    setupLevel(level);

    // External link redirection every 15 seconds
    setInterval(() => {
        showExternalLink();
    }, 15000);

    // Display ad space
    showAds();
}

// Create the bottles dynamically
function createBottles() {
    const gameArea = document.getElementById('game-area');

    for (let i = 0; i < bottlesPerLevel; i++) {
        const bottle = document.createElement('div');
        bottle.classList.add('bottle');
        bottle.dataset.id = i;
        bottle.addEventListener('click', handleBottleClick);
        gameArea.appendChild(bottle);
        bottles.push(bottle);
        bottleContents.push([]);
    }
}

// Set up the level (randomly fill bottles)
function setupLevel(level) {
    for (let i = 0; i < bottles.length; i++) {
        const numColors = Math.floor(Math.random() * 3) + 1;
        let colorsToFill = [];

        for (let j = 0; j < numColors; j++) {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            colorsToFill.push(randomColor);
        }

        bottleContents[i] = colorsToFill;
        renderBottle(i);
    }
}

// Render a bottle's content
function renderBottle(bottleIndex) {
    const bottle = bottles[bottleIndex];
    const colorsInBottle = bottleContents[bottleIndex];
    bottle.innerHTML = '';

    colorsInBottle.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.classList.add('color');
        colorDiv.style.backgroundColor = color;
        bottle.appendChild(colorDiv);
    });
}

// Handle a bottle click
function handleBottleClick(event) {
    const bottleIndex = parseInt(event.currentTarget.dataset.id);
    const currentColors = bottleContents[bottleIndex];

    // If the bottle is full, do nothing
    if (currentColors.length >= bottleCapacity) return;

    // Add a random color to the bottle
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    currentColors.push(randomColor);
    bottleContents[bottleIndex] = currentColors;
    renderBottle(bottleIndex);

    // Increment score
    score += 10;
    updateScore();

    // Check if level is completed
    if (bottleContents.every(contents => contents.length === bottleCapacity)) {
        showNextLevelButton();
    }
}

// Update the score display
function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

// Show the "Next Level" button
function showNextLevelButton() {
    const nextLevelButton = document.getElementById('next-level-btn');
    nextLevelButton.style.display = 'inline-block';
}

// Go to the next level
function nextLevel() {
    level++;
    setupLevel(level);
    document.getElementById('next-level-btn').style.display = 'none';
}

// External link redirection
function showExternalLink() {
    const link = document.createElement('a');
    link.href = "https://www.example.com"; // Example link
    link.target = "_blank";
    link.innerHTML = "Visit our sponsor!";
    
    const placeholder = document.getElementById('external-link-placeholder');
    placeholder.innerHTML = '';
    placeholder.appendChild(link);
    placeholder.style.display = 'block';
}

// Ad space integration
function showAds() {
    const adSpace = document.getElementById('ad-space');
    adSpace.innerHTML = '<p>Advertisement Space (AdSense example)</p>';
}

// Customize game settings (optional)
function customizeGame(options) {
    if (options.gameName) document.getElementById('game-title').textContent = options.gameName;
    if (options.colors) colors = options.colors;
}

// Start the game
initGame();
customizeGame({ gameName: 'Water Sort Puzzle', colors: ['#ff6347', '#ff8c00', '#32cd32', '#1e90ff'] });
