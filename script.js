const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake p');
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




function loadparagraph(){
    const paragraphs = [
  "The cat sat on the mat. It looked out the window. The sun was shining bright.",
  "I like to read books. Books take me to new places. Every story is an adventure.",
  "My name is Sam. I have a dog. His name is Max. He likes to play with a ball.",
  "Apples are red. Bananas are yellow. Grapes can be green or purple.",
  "It is a nice day. The sky is blue. The birds are flying high in the sky.",
  "We went to the park. I saw a duck and a frog. We had fun and ate ice cream.",
  "She sings a song. The song is soft and sweet. It makes me feel happy.",
  "I wake up early. I brush my teeth. I get ready for school every day.",
  "The train is fast. It goes from one city to another. I love looking out the window.",
  "It rained today. I wore my raincoat and boots. I jumped in the puddles."
];

    const paragraphIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML='';
    for(const char of paragraphs[paragraphIndex]){
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
}

//Handle User Input

function initTyping(){
    const char = input.querySelectorAll('span');
    const typedChar = input.ariaValueMax.charAt(charIndex);
    if(charIndex < char.length && timeLeft > 0){
        if(char[charIndex].innerHTML === typedChar){
            char[charIndex].classList.add('correct');
        }
    }
}

input.addEventListener("input", initTyping);



loadparagraph();