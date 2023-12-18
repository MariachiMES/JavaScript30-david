const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//build functions

function togglePlay() {
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}
function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
}

function skip() {
	console.log(this.dataset.skip);
	video.currentTime = video.currentTime + parseFloat(this.dataset.skip);
}

function makeAdjustments(e) {
	console.log(e);

	video[e.target.name] = e.target.value;
}

function adjustPlayhead(e) {}

console.log(ranges);
//event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);

progress.addEventListener('click', adjustPlayhead);

ranges.forEach((range) => {
	range.addEventListener('mousemove', makeAdjustments);
});

skipButtons.forEach((skipButton) => {
	skipButton.addEventListener('click', skip);
});
