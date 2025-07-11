// Funções comuns
function spellChallenge(word) {
  const utter = new SpeechSynthesisUtterance(word);
  utter.rate = 0.8; speechSynthesis.speak(utter);
}
function checkCount() {
  const ans = +document.getElementById('countAnswer').value;
  alert(ans===3? 'Correto! 🎉':'Tente novamente 😊');
}
function checkAnswer(btn, result) {
  btn.disabled = true;
  btn.classList.add(result==='correct'? 'btn-success':'btn-danger');
}
