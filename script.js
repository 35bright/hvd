// ============================
// GLOBAL STATE & CONFIG
// ============================
let flowersRevealed = 0;
let songsPlayed = 0;
let wordsRevealed = 0;
let colorUnlocked = false;

const flowerMessages = {
    1: {
        title: 'Your Kindness',
        message: 'Your kindness radiates like sunshine, warming everyone around you. The way you treat people with such genuine care and compassion is truly beautiful. You make the world a better place just by being in it.'
    },
    2: {
        title: 'Your Smile',
        message: 'Your smile lights up every room you enter. When you laugh, it\'s contagious – everyone around you can\'t help but smile too. Your joy is one of the most precious gifts you give to the world.'
    },
    3: {
        title: 'Every Moment',
        message: 'You have this magical ability to turn ordinary moments into extraordinary memories. Whether we\'re talking about dreams or sharing comfortable silence, every second with you feels special and meaningful.'
    }
};

const songDetails = {
    1: {
        title: 'Perfect',
        artist: 'Ed Sheeran',
        meaning: 'Because you are perfect in every beautiful way. This song reminds me that finding someone you is the greatest blessing. That\'s exactly what you are to me – best.'
    },
    2: {
        title: 'Tumi',
        artist: 'Level Five',
        meaning: 'Because My every dream, every prayer, every hope, every wish, every destination is just you'
    },
    3: {
        title: 'Little Bit Better',
        artist: 'Caleb Hearn',
        meaning: 'Because you make my life a little bit better, not just a little bit, in the best way possible! With you in my life I would go far beyond the dreams!!!'
    }
};

// ============================
// RAINING HEARTS ANIMATION
// ============================
function initRainingHearts() {
    const canvas = document.getElementById('hearts-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        canvas.style.display = 'none';
        return;
    }

    const hearts = [];
    const heartCount = 20;

    class Heart {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 12 + 8;
            this.speed = Math.random() * 1.5 + 0.8;
            this.opacity = Math.random() * 0.3 + 0.15;
            this.wobble = Math.random() * 2;
            this.wobbleSpeed = Math.random() * 0.02 + 0.01;
            this.wobbleOffset = Math.random() * Math.PI * 2;
        }

        update() {
            this.y += this.speed;
            this.x += Math.sin(this.y * this.wobbleSpeed + this.wobbleOffset) * this.wobble;

            if (this.y > canvas.height + 20) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#FF8FAB';

            const x = this.x;
            const y = this.y;
            const s = this.size;

            ctx.beginPath();
            ctx.moveTo(x, y + s * 0.3);
            ctx.bezierCurveTo(x, y, x - s / 2, y, x - s / 2, y + s * 0.3);
            ctx.bezierCurveTo(x - s / 2, y + s * 0.7, x, y + s * 0.7, x, y + s);
            ctx.bezierCurveTo(x, y + s * 0.7, x + s / 2, y + s * 0.7, x + s / 2, y + s * 0.3);
            ctx.bezierCurveTo(x + s / 2, y, x, y, x, y + s * 0.3);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < heartCount; i++) {
        const heart = new Heart();
        heart.y = Math.random() * canvas.height;
        hearts.push(heart);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach(heart => {
            heart.update();
            heart.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============================
// COLOR SECTION
// ============================
function initColorSection() {
    const colorBtn = document.getElementById('bring-color');
    const colorReveal = document.querySelector('.color-reveal');
    const contentWrapper = document.getElementById('content-wrapper');
    const heartsCanvas = document.getElementById('hearts-canvas');
    const mainBg = document.getElementById('main-background');

    if (!colorBtn || !colorReveal || !contentWrapper) return;

    colorBtn.addEventListener('click', () => {
        if (colorUnlocked) return;
        colorUnlocked = true;

        contentWrapper.classList.remove('grayscale-mode');
        if (heartsCanvas) heartsCanvas.classList.remove('grayscale-mode');
        if (mainBg) mainBg.classList.remove('grayscale-mode');

        if (typeof gsap !== 'undefined') {
            gsap.to(colorBtn, {
                opacity: 0,
                scale: 0.5,
                duration: 0.6
            });
        } else {
            colorBtn.style.opacity = '0';
        }

        setTimeout(() => {
            colorReveal.classList.remove('hidden');
            if (typeof gsap !== 'undefined') {
                gsap.from(colorReveal, {
                    opacity: 0,
                    y: 40,
                    scale: 0.9,
                    duration: 1.2,
                    ease: 'back.out(1.5)'
                });
            }
        }, 1500);

        setTimeout(() => {
            if (typeof confetti !== 'undefined') {
                confetti({
                    particleCount: 120,
                    spread: 90,
                    origin: { y: 0.6 },
                    colors: ['#9D84B7', '#FF8FAB', '#FFB3D9', '#B8A5CE']
                });
            }
        }, 2500);
    });
}

// ============================
// NUMBERS GAME
// ============================
function initNumbers() {
    const herInput = document.getElementById('her-num');
    const myInput = document.getElementById('my-num');
    const checkBtn = document.getElementById('check-numbers');
    const successBox = document.getElementById('num-success');
    const errorBox = document.getElementById('num-error');

    if (!checkBtn) return;

    checkBtn.addEventListener('click', () => {
        const her = parseInt(herInput.value);
        const my = parseInt(myInput.value);

        if (her === 7 && my === 11) {
            errorBox.classList.add('hidden');
            successBox.classList.remove('hidden');

            if (typeof anime !== 'undefined') {
                anime({
                    targets: '.big-num',
                    scale: [0, 1.1, 1],
                    rotate: [0, 360],
                    opacity: [0, 1],
                    duration: 1500,
                    delay: anime.stagger(250),
                    easing: 'easeOutElastic(1, .6)'
                });
            }

            if (typeof gsap !== 'undefined') {
                gsap.from('.result-text', {
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    delay: 1.5
                });

                gsap.to('.numbers-container, #check-numbers', {
                    opacity: 0,
                    height: 0,
                    margin: 0,
                    duration: 0.6
                });
            }

        } else {
            successBox.classList.add('hidden');
            errorBox.classList.remove('hidden');

            if (typeof anime !== 'undefined') {
                anime({
                    targets: '.numbers-container',
                    translateX: [
                        { value: -20, duration: 100 },
                        { value: 20, duration: 100 },
                        { value: -20, duration: 100 },
                        { value: 20, duration: 100 },
                        { value: 0, duration: 100 }
                    ],
                    easing: 'easeInOutSine'
                });
            }

            setTimeout(() => {
                errorBox.classList.add('hidden');
            }, 2500);
        }
    });
}

// ============================
// HEART PUZZLE (4 PERFECT PIECES FROM SVG FILES)
// ============================
function initPuzzle() {
    const puzzleGrid = document.getElementById('puzzle-grid');
    const successBox = document.getElementById('puzzle-done');

    if (!puzzleGrid || !successBox) return;

    // Load 4 heart piece SVG files (perfect 2x2 split)
    const heartPieces = [
        'assets/images/heart-piece-0.svg',  // Top-left
        'assets/images/heart-piece-1.svg',  // Top-right
        'assets/images/heart-piece-2.svg',  // Bottom-left
        'assets/images/heart-piece-3.svg'   // Bottom-right
    ];

    // Shuffle the pieces
    const shuffled = [0, 1, 2, 3].sort(() => Math.random() - 0.5);

    shuffled.forEach((index) => {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.dataset.index = index;

        // Create img element to load SVG
        const img = document.createElement('img');
        img.src = heartPieces[index];
        img.alt = `Heart piece ${index}`;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';

        piece.appendChild(img);
        puzzleGrid.appendChild(piece);
    });

    // Make pieces draggable
    if (typeof Sortable !== 'undefined') {
        Sortable.create(puzzleGrid, {
            animation: 250,
            ghostClass: 'sortable-ghost',
            onEnd: checkComplete
        });
    }

    function checkComplete() {
        const pieces = Array.from(puzzleGrid.children);
        const correct = pieces.every((piece, i) => {
            return parseInt(piece.dataset.index) === i;
        });

        if (correct) {
            if (typeof gsap !== 'undefined') {
                gsap.to(puzzleGrid, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.7,
                    onComplete: () => {
                        puzzleGrid.style.display = 'none';
                    }
                });
            } else {
                puzzleGrid.style.display = 'none';
            }

            setTimeout(() => {
                successBox.classList.remove('hidden');
                if (typeof gsap !== 'undefined') {
                    gsap.from(successBox, {
                        opacity: 0,
                        scale: 0.6,
                        duration: 1.2,
                        ease: 'back.out(1.8)'
                    });
                }
            }, 800);
        }
    }
}

// ============================
// FLOWERS SECTION
// ============================
function initFlowers() {
    const flowerCards = document.querySelectorAll('.flower-card');
    const modal = document.getElementById('flower-modal');
    const closeBtn = modal ? modal.querySelector('.modal-close') : null;
    const overlay = modal ? modal.querySelector('.modal-overlay') : null;
    const hint = document.getElementById('flower-hint');
    const modalIconContainer = document.getElementById('modal-flower-icon');

    if (!modal) return;

    // Flower image paths
    const flowerImages = {
        1: 'assets/images/image1.png',
        2: 'assets/images/image2.png',
        3: 'assets/images/image3.png'
    };

    flowerCards.forEach(card => {
        card.addEventListener('click', () => {
            const num = parseInt(card.dataset.flower);
            const data = flowerMessages[num];

            if (card.dataset.revealed === 'false') {
                card.dataset.revealed = 'true';
                flowersRevealed++;

                if (flowersRevealed === 3 && hint) {
                    hint.style.display = 'none';
                }
            }

            const modalTitle = document.getElementById('modal-title');
            const modalMessage = document.getElementById('modal-message');

            if (modalTitle) modalTitle.textContent = data.title;
            if (modalMessage) modalMessage.textContent = data.message;

            // Update modal image
            if (modalIconContainer && flowerImages[num]) {
                modalIconContainer.innerHTML = `<img src="${flowerImages[num]}" alt="Flower" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
            }

            modal.classList.remove('hidden');

            if (typeof anime !== 'undefined') {
                anime({
                    targets: card,
                    scale: [1, 1.15, 1],
                    rotate: [0, 10, -10, 0],
                    duration: 600
                });
            }
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    if (overlay) overlay.addEventListener('click', () => modal.classList.add('hidden'));
}

// ============================
// SONGS SECTION WITH AUDIO
// ============================
function initSongs() {
    const songCards = document.querySelectorAll('.song-card');
    const modal = document.getElementById('song-modal');
    const closeBtn = modal ? modal.querySelector('.modal-close') : null;
    const overlay = modal ? modal.querySelector('.modal-overlay') : null;
    const hint = document.getElementById('song-hint');

    if (!modal) return;

    // Song file paths
    const songFiles = {
        1: 'assets/music/perfect.mp3',
        2: 'assets/music/tumi.mp3',
        3: 'assets/music/lil.mp3'
    };

    // Create audio elements
    const audioPlayers = {};
    Object.keys(songFiles).forEach(key => {
        const audio = new Audio(songFiles[key]);
        audio.loop = false;
        audioPlayers[key] = audio;
    });

    // Current playing audio
    let currentAudio = null;

    songCards.forEach(card => {
        const playBtn = card.querySelector('.play-circle');
        if (!playBtn) return;

        playBtn.addEventListener('click', () => {
            const num = parseInt(card.dataset.song);
            const data = songDetails[num];
            const audio = audioPlayers[num];

            // Stop any currently playing audio
            if (currentAudio && currentAudio !== audio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }

            // Mark as played
            if (card.dataset.played === 'false') {
                card.dataset.played = 'true';
                songsPlayed++;

                if (songsPlayed === 3 && hint) {
                    hint.style.display = 'none';
                }
            }

            // Update modal content
            const songTitle = document.getElementById('song-title');
            const songArtist = document.getElementById('song-artist');
            const songMeaning = document.getElementById('song-meaning');

            if (songTitle) songTitle.textContent = data.title;
            if (songArtist) songArtist.textContent = data.artist;
            if (songMeaning) songMeaning.textContent = data.meaning;

            // Show modal
            modal.classList.remove('hidden');

            // Play audio
            currentAudio = audio;
            audio.play().catch(err => {
                console.log('Audio playback failed:', err);
            });

            // Animate play button
            if (typeof anime !== 'undefined') {
                anime({
                    targets: playBtn,
                    scale: [1, 1.2, 1],
                    duration: 400
                });
            }
        });
    });

    // Stop audio when modal closes
    function closeModal() {
        modal.classList.add('hidden');
        if (currentAudio) {
            currentAudio.pause();
        }
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);
}

// ============================
// MESSAGES SECTION (9 WORDS)
// ============================
function initMessages() {
    const wordCards = document.querySelectorAll('.word-card');
    const sentence = document.getElementById('sentence');

    if (!sentence) return;

    wordCards.forEach(card => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('revealed')) {
                card.classList.add('revealed');
                wordsRevealed++;

                if (typeof anime !== 'undefined') {
                    anime({
                        targets: card,
                        rotateY: [0, 180],
                        duration: 600,
                        easing: 'easeInOutQuad'
                    });
                }

                if (wordsRevealed === 9) {
                    setTimeout(() => {
                        sentence.classList.remove('hidden');

                        if (typeof gsap !== 'undefined') {
                            gsap.from(sentence, {
                                opacity: 0,
                                y: 60,
                                scale: 0.85,
                                duration: 1.2,
                                ease: 'back.out(1.5)'
                            });
                        }

                        if (typeof confetti !== 'undefined') {
                            confetti({
                                particleCount: 100,
                                spread: 80,
                                origin: { y: 0.6 },
                                colors: ['#9D84B7', '#FF8FAB', '#FFB3D9']
                            });
                        }
                    }, 1000);
                }
            }
        });
    });
}

// ============================
// SCROLL ANIMATIONS
// ============================
function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.section').forEach((section, i) => {
        if (i > 0) {
            const container = section.querySelector('.container');
            if (container) {
                gsap.from(container, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 75%',
                        end: 'top 25%',
                        scrub: 1
                    },
                    opacity: 0,
                    y: 60,
                    duration: 1
                });
            }
        }
    });
}

// ============================
// INITIALIZE
// ============================
document.addEventListener('DOMContentLoaded', () => {
    console.log('💕 Initializing Valentine App...');

    try {
        initRainingHearts();
        initColorSection();
        initNumbers();
        initPuzzle();
        initFlowers();
        initSongs();
        initMessages();
        initScrollAnimations();

        console.log('✅ Valentine App Ready!');
    } catch (error) {
        console.error('❌ Error initializing app:', error);
    }
});
