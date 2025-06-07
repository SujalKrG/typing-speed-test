const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

//set values
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;


document.addEventListener("keydown", ()=>{
        input.focus();
    });
typingText.addEventListener("click", () => {
        input.focus();
    });

function loadparagraph(){
    const paragraphs = [
  // Medium-length, natural-sounding sentences
  "The quick brown fox jumps over the lazy dog. This sentence contains all letters of the alphabet.",
  "Programming requires logic, creativity, and patience. Debugging code can be frustrating but rewarding.",
  "The sun sets behind the mountains, painting the sky in shades of orange, pink, and purple.",
  "Learning to type quickly and accurately will save you hours of work over your lifetime.",
  "The human brain can process images in just 13 milliseconds-faster than the blink of an eye.",
  
  // Longer paragraphs for better testing
  "In the digital age, typing speed matters more than ever. Whether you're writing emails, coding, or chatting, efficiency is key. Practice daily to see improvement.",
  "A well-balanced keyboard is crucial for typists. Mechanical keyboards offer tactile feedback, while membrane keyboards are quieter. Choose what suits your style.",
  "The average typing speed is around 40 WPM, but with consistent practice, reaching 80-100 WPM is achievable. Focus on accuracy first, then speed."
];

    const paragraphIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML='';
    for(const char of paragraphs[paragraphIndex]){
        typingText.innerHTML += `<span>${char}</span>`;
    }
    const spans = typingText.querySelectorAll('span');
spans.forEach(span => {
    span.classList.remove('correct', 'incorrect', 'active');
});
spans[0].classList.add('active');

    typingText.querySelectorAll('span')[0].classList.add('active');
}

//Handle User Input

let previousInputLength = 0;

function initTyping() {
    const chars = typingText.querySelectorAll('span');
    const currentInput = input.value;          // Full current input text
    const currentLength = currentInput.length; // Current length of input

    if (timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }

        if (currentLength < previousInputLength) {
            // User pressed backspace
            if (charIndex > 0) {
                charIndex--; // Move back one character

                // If character was incorrect, reduce mistake count
                if (chars[charIndex].classList.contains('incorrect')) {
                    mistake--;
                }

                // Remove styling
                chars[charIndex].classList.remove('correct', 'incorrect');
            }
        } 
        else if (currentLength > previousInputLength) {
            // User typed new character
            if (charIndex < chars.length) {
                const typedChar = currentInput.charAt(charIndex);

                if (typedChar === chars[charIndex].innerText) {
                    chars[charIndex].classList.add('correct');
                } else {
                    chars[charIndex].classList.add('incorrect');
                    mistake++;
                }

                charIndex++; // Move forward
            }
        }

        // Update active class
        chars.forEach(char => char.classList.remove('active'));
        if (charIndex < chars.length) {
            chars[charIndex].classList.add('active');
        }

        // Update stats
        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;

        // Check if finished typing
        if (charIndex === chars.length) {
            clearInterval(timer);
            input.value = '';
        }
    } else {
        clearInterval(timer);
        input.value = '';
    }

    // Update previous input length for next input event
    previousInputLength = currentLength;
}

function initTime(){
    if(timeLeft > 0){
        timeLeft--;
        time.innerText = timeLeft;
        const timeSpent = maxTime - timeLeft;
        const wpmVal = timeSpent > 0
        ? Math.round(((charIndex - mistake) / 5) / timeSpent * 60)
        : 0;
        wpm.innerText = wpmVal;

    }
    else{
        clearInterval(timer);
    }
}


function reset(){
    loadparagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    input.value = '';
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
    previousInputLength = 0;
}

input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);



loadparagraph();