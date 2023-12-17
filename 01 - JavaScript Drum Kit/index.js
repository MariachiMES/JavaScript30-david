window.addEventListener('keydown', playSound);

const keys = document.querySelectorAll('.key');
keys.forEach((key) => {
	key.addEventListener('transitionend', () => {
		key.classList.remove('playing');
	});
});

function playAudio(e) {}

function playSound(e) {
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

	key.classList.toggle('playing');

	console.log(audio);
	if (!audio) {
		return;
	}
	audio.currentTime = 0;
	audio.play();
}
