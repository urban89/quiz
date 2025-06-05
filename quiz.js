// quiz.js

document.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.querySelector('button');
  let warningElement = null; // Track current warning message
  let isPassed = false; // Will be set later if score is above 40%

  const correctAnswers = {
    q1: 1,
    q2: 1,
    q3: 2,
    q4: 3,
    q5: 2
  };

  submitButton.addEventListener('click', () => {
    // Remove old warning/result if exists
    if (warningElement) {
      warningElement.remove();
      warningElement = null;
    }

    let totalQuestions = 5;
    let answered = 0;
    let score = 0;

    for (let i = 1; i <= totalQuestions; i++) {
      const radios = document.getElementsByName(`q${i}`);
      let selectedIndex = -1;

      for (let j = 0; j < radios.length; j++) {
        if (radios[j].checked) {
          selectedIndex = j + 1; // 1-based
          break;
        }
      }

      if (selectedIndex !== -1) {
        answered++;
        if (selectedIndex === correctAnswers[`q${i}`]) {
          score++;
        }
      }
    }

    warningElement = document.createElement('div');
    warningElement.classList.add('warning');

    if (answered < totalQuestions) {
      warningElement.textContent = 'You did not select some answer(s)';
    } else {
      const percent = Math.round((score / totalQuestions) * 100);
      warningElement.textContent = `Your score is ${percent}%`;

      // Add extra message
      const message = document.createElement('p');
      message.style.marginTop = '8px';
      message.style.fontSize = '16px';
      message.style.fontWeight = '500';

      if (percent > 40) {
        isPassed = true;
        message.textContent = 'You are a true advisor!';
      } else {
        message.textContent = 'You have failed to display candor!';
      }

      warningElement.appendChild(message);
    }

    // Insert result/warning under submit button
    submitButton.parentNode.insertBefore(warningElement, submitButton.nextSibling);
  });
});
