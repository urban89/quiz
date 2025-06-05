document.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.querySelector('button');
  let warningElement = null;
  let isPassed = false;

  const correctAnswers = {
    q1: 1,
    q2: 1,
    q3: 2,
    q4: 3,
    q5: 2
  };

  submitButton.addEventListener('click', () => {
    // Remove previous warning
    if (warningElement) {
      warningElement.remove();
      warningElement = null;
    }

    // Clear correct/incorrect styles
    document.querySelectorAll('label').forEach(label => {
      label.classList.remove('correct', 'incorrect');
    });

    let totalQuestions = 5;
    let answered = 0;
    let score = 0;

    for (let i = 1; i <= totalQuestions; i++) {
      const radios = document.getElementsByName(`q${i}`);
      let selectedIndex = -1;

      for (let j = 0; j < radios.length; j++) {
        const radio = radios[j];
        if (radio.checked) {
          selectedIndex = j + 1;
          const label = radio.closest('label');

          if (selectedIndex === correctAnswers[`q${i}`]) {
            label.classList.add('correct');
            score++;
          } else {
            label.classList.add('incorrect');
          }

          break;
        }
      }

      if (selectedIndex !== -1) {
        answered++;
      }
    }

    // Create feedback element
    warningElement = document.createElement('div');
    warningElement.classList.add('warning');

    if (answered < totalQuestions) {
      warningElement.textContent = 'You did not select some answer(s)';
    } else {
      const percent = Math.round((score / totalQuestions) * 100);
      warningElement.textContent = `Your score is ${percent}%`;

      const message = document.createElement('p');
      message.style.marginTop = '8px';
      message.style.fontSize = '16px';
      message.style.fontWeight = '500';

      if (percent > 40) {
        isPassed = true;
        message.textContent = 'SUCCESS: You are a true advisor!';
        createFloaters();
      } else {
        message.textContent = 'FAILURE: You have failed to display candor!';
      }

      warningElement.appendChild(message);
    }

    // Insert result
    submitButton.parentNode.insertBefore(warningElement, submitButton.nextSibling);
  });

function createFloaters() {
  const floaterCount = 6;
  const screenWidth = window.innerWidth;
  const spacing = screenWidth / (floaterCount + 1); // leave margin on both sides

  for (let i = 0; i < floaterCount; i++) {
    const floater = document.createElement('div');
    floater.classList.add('floater');

    // Position evenly across screen
    const leftPx = spacing * (i + 1) - 32.5; // center 65px wide floater
    floater.style.left = `${leftPx}px`;

    // Animation timing
    const duration = 7.5 + Math.random(); // 7.5–8.5s
    const delay = Math.random(); // 0–1s
    floater.style.animationDuration = `${duration}s`;
    floater.style.animationDelay = `${delay}s`;

    // Optional: add a background image
    // floater.style.backgroundImage = 'url("your-image.gif")';

    document.body.appendChild(floater);

    floater.addEventListener('animationend', () => {
      floater.remove();
    });
  }
}


});
