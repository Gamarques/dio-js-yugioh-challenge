const state = {
    score: {
        playerScore: 0,
        computerSccore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    actions: { 
        button: document.getElementById("next-duel"),
    }, 
    currentGameState: "inicio",
    game: {
        INICIO: "inicio",
        SELECIONANDO: "selecionando",
        DUELANDO: "duelando",
        FIM: "fim"
    },
    audio:{
        Win: "./src/assets/audios/Win.wav",
        Lose: "./src/assets/audios/Lose.wav",
        Tema: "./src/assets/audios/egyptian_duel.mp3",
        Clique: "./src/assets/audios/clique.mp3",
        Draw: "./src/assets/audios/Draw.mp3",
        Nav: "./src/assets/audios/nav.wav",
    },
    audioInstances: {},
    audioInitialized: false,
    userInteracted: false
}


const playerSides = {
    player1: "player-cards",
    player2: "computer-cards",
}

const cardData = [
    {
        id:0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: "./src/assets/icons/dragon.png",
        WinOf:[1],
        LoseOf:[2],
    },
        {
        id:1,
        name: "Dark Magician",
        type: "Rock",
        img: "./src/assets/icons/magician.png",
        WinOf:[2],
        LoseOf:[0],
    },
        {
        id:2,
        name: "Exodia",
        type: "Scizor",
        img: "./src/assets/icons/exodia.png",
        WinOf:[0],
        LoseOf:[1],
    }
]

// Função para pré-carregar e criar instâncias de áudio
function preloadAudio() {
    return new Promise((resolve) => {
        let loadedCount = 0;
        const totalAudios = Object.keys(state.audio).length;
        
        Object.keys(state.audio).forEach(key => {
            const audio = new Audio(state.audio[key]);
            audio.preload = 'auto';
            audio.volume = 0.7; // Volume padrão
            
            // Para sons que serão tocados múltiplas vezes, criar múltiplas instâncias
            if (key === 'Clique' || key === 'Nav') {
                state.audioInstances[key] = [];
                for (let i = 0; i < 3; i++) {
                    const audioClone = new Audio(state.audio[key]);
                    audioClone.preload = 'auto';
                    audioClone.volume = 1.0;
                    state.audioInstances[key].push(audioClone);
                }
            } else {
                state.audioInstances[key] = audio;
            }
            
            // Contador para saber quando todos os áudios foram carregados
            audio.addEventListener('canplaythrough', () => {
                loadedCount++;
                if (loadedCount === totalAudios) {
                    resolve();
                }
            });
            
            // Fallback em caso de erro
            audio.addEventListener('error', () => {
                console.warn(`Erro ao carregar áudio: ${key}`);
                loadedCount++;
                if (loadedCount === totalAudios) {
                    resolve();
                }
            });
        });

        setTimeout(() => {
            if (loadedCount < totalAudios) {
                resolve();
            }
        }, 5000);
    });
}

async function initializeAudio() {
    if (state.audioInitialized) return;
    
    try {
        const unlockPromises = [];
        
        Object.keys(state.audioInstances).forEach(key => {
            const audio = state.audioInstances[key];
            if (Array.isArray(audio)) {
                audio.forEach(audioInstance => {
                    unlockPromises.push(unlockAudio(audioInstance));
                });
            } else if (audio) {
                unlockPromises.push(unlockAudio(audio));
            }
        });
        
        await Promise.all(unlockPromises);
        
        state.audioInitialized = true;
        
        setTimeout(() => {
            if (state.audioInstances.Tema) {
                playAudio('Tema');
            }
        }, 500);
        
    } catch (error) {
        console.warn('⚠️ Erro ao inicializar áudio:', error);
        state.audioInitialized = true;
    }
}

async function unlockAudio(audioElement) {
    try {
        audioElement.volume = 0;
        audioElement.muted = true;
        await audioElement.play();
        audioElement.pause();
        audioElement.currentTime = 0;
        audioElement.muted = false;
        audioElement.volume = 0.7;
    } catch (error) {
    }
}

async function playAudio(status) {
    if (!state.audioInitialized) {
        return;
    }
    
    try {
        if (status === 'Clique' || status === 'Nav') {
            const audioArray = state.audioInstances[status];
            if (audioArray && Array.isArray(audioArray)) {
                const availableAudio = audioArray.find(audio => 
                    audio.paused || audio.ended || audio.currentTime === 0
                );
                
                if (availableAudio) {
                    availableAudio.currentTime = 0;
                    await availableAudio.play();
                }
            }
        } else {
            const audio = state.audioInstances[status];
            if (audio) {
                audio.currentTime = 0;
                await audio.play();
            }
        }
    } catch (error) {
    }
}

async function getRandomCardId(){
    const card = Math.floor(Math.random()* cardData.length)
    return cardData[card].id;
}

function drawSelectCard(idCard){
    state.cardSprites.avatar.src = cardData[idCard].img;
    state.cardSprites.name.innerText = cardData[idCard].name;
    state.cardSprites.type.innerText = `Attribute: ${cardData[idCard].type}`;
}

async function removeAllCards() {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => card.remove());
}

async function updateScore(duelResults){
    if (duelResults === "Win"){
        state.score.playerScore += 1;
    }else if(duelResults === "Lose"){
        state.score.computerSccore +=1;
    }
    
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerSccore}`;
}

async function checkDuelResults(cardId, computerCardId){
        const playerCard = cardData[cardId];

        if(playerCard.WinOf.includes(computerCardId)) {
            return "Win";
        }else if(playerCard.LoseOf.includes(computerCardId)){
            return "Lose";
        }else {
            return "Draw";
        }
}

async function drawButton(text){
    state.actions.button.innerText = text.toUpperCase();
    state.actions.button.style.display = "block";
}

async function setCardsField(idCard){
    
    let computerCardId = await getRandomCardId();
    state.fieldCards.computer.style.display = "block";
    state.fieldCards.player.style.display = "block";

    state.fieldCards.computer.src = cardData[computerCardId].img
    state.fieldCards.player.src = cardData[idCard].img;

    let duelResults = await checkDuelResults(idCard, computerCardId)

    await updateScore(duelResults);
    await playAudio(duelResults);
    await drawButton(duelResults);
}

async function createCardImage(idCard, fieldSide){
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", idCard);
    cardImage.classList.add("card");

    if(fieldSide === playerSides.player1){
        cardImage.addEventListener("click", async () => {
            const overlay = document.getElementById('welcome-overlay');
            if (overlay && overlay.style.display !== 'none' && !overlay.classList.contains('hidden')) {
                return;
            }
            
            if (!state.userInteracted) {
                state.userInteracted = true;
                await initializeAudio();
            }
            
            playAudio("Clique")
            state.currentGameState = state.game.DUELANDO;
            document.querySelectorAll(".card").forEach(card => {
                card.style.pointerEvents = "none";
                cardImage.setAttribute("src", cardData[idCard].img);
                cardImage.classList.add("selected");
                if(card !== cardImage){
                    card.style.opacity = "0.5";
                    card.style.transform = "scale(0.8)";
                }
            });
            setCardsField(cardImage.getAttribute("data-id"));
            updateUIByState();
        });

        cardImage.addEventListener("mouseover", async () => {
            const overlay = document.getElementById('welcome-overlay');
            if (overlay && overlay.style.display !== 'none' && !overlay.classList.contains('hidden')) {
                return;
            }
            
            if (cardImage.src !== cardData[idCard].img) {
                cardImage.setAttribute("src", cardData[idCard].img);
                
                if (!state.userInteracted) {
                    state.userInteracted = true;
                    await initializeAudio();
                }
                
                playAudio('Nav');
                drawSelectCard(idCard);
            }
        });

        cardImage.addEventListener("mouseout", () => {
            if (!cardImage.classList.contains("selected") && cardImage.src !== "./src/assets/icons/card-back.png") {
                cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
            }
        });
    }

    return cardImage;
}

async function drawCards(cardNumbers, fieldSide) {
    for(let i = 0; i < cardNumbers; i++){
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard,fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }


};

async function resetDuel(){
    const overlay = document.getElementById('welcome-overlay');
    if (overlay && overlay.style.display !== 'none' && !overlay.classList.contains('hidden')) {
        return;
    }
    
    if (!state.userInteracted) {
        state.userInteracted = true;
        await initializeAudio();
    }
    
    await removeAllCards();
    state.currentGameState = state.game.INICIO;
    updateUIByState();
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.player2);
}

function updateUIByState() {
    switch(state.currentGameState) {
        case state.game.INICIO:
            state.fieldCards.player.style.display = "none";
            state.fieldCards.computer.style.display = "none";
            state.actions.button.style.display = "none";
            
            document.getElementById("player-cards").style.display = "flex";
            
            document.querySelectorAll(".card").forEach(card => {
                card.style.pointerEvents = "auto";
                card.style.opacity = "1";
                card.style.transform = "scale(1)";
                card.classList.remove("selected");
            });
            break;

        case state.game.SELECIONANDO:
            document.getElementById("player-cards").style.display = "flex";
            state.fieldCards.player.style.display = "none";
            state.fieldCards.computer.style.display = "none";
            state.actions.button.style.display = "none";
            break;

        case state.game.DUELANDO:
            state.fieldCards.player.style.display = "block";
            state.fieldCards.computer.style.display = "block";
            state.actions.button.style.display = "block";

            break;

        case state.game.FIM:
            state.fieldCards.player.style.display = "block";
            state.fieldCards.computer.style.display = "block";
            state.actions.button.style.display = "block";
            state.actions.button.innerText = "Next Duel";
            break;

        default:
            console.warn("Estado do jogo não reconhecido:", state.currentGameState);
    }
}

function hideWelcomeOverlay() {
    const overlay = document.getElementById('welcome-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500);
    }
}

function setupStartButton() {
    const startButton = document.getElementById('start-game');
    if (startButton) {
        startButton.addEventListener('click', async () => {
            state.userInteracted = true;
            await initializeAudio();
            hideWelcomeOverlay();
        });
    }
}

async function init() {
    setupStartButton();
    
    await preloadAudio();
    
    state.currentGameState = state.game.INICIO;
    updateUIByState();
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.player2);

}

init()