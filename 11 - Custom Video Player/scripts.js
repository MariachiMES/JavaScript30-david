const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const restart = document.getElementById('restart-btn');
const toggle = document.getElementById('play-btn');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const playbackRate = document.getElementById('playbackRate');
const volume = document.getElementById('volume');
const fullScrnBtn = document.getElementById('full-screen');
const timeEl = document.getElementById('video-duration');

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
	if (e.target.name === playbackRate.id) {
		playbackRate.textContent = e.target.value;
	} else {
		volume.textContent = Math.floor(e.target.value * 100);
	}
}

function adjustPlayhead(e) {
	let minutesTicker = Math.floor(video.currentTime / 60);
	let secondsTicker = Math.floor(video.currentTime % 60);
	if (minutesTicker < 10) {
		minutesTicker = `0${minutesTicker}`;
	}
	if (secondsTicker < 10) {
		secondsTicker = `0${secondsTicker}`;
	}

	const percentage = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percentage}%`;
	timeEl.textContent = `${minutesTicker}: ${secondsTicker}`;
}
let seeking = false;

function restartVideo() {
	video.currentTime = 0;
}

function scrub(e) {
	if (seeking === true) {
		const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
		video.currentTime = scrubTime;
	}
}

function goToCursor(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

function enterFullScreen() {
	if (video.requestFullscreen) {
		video.requestFullscreen();
	} else if (video.webkitRequestFullscreen) {
		/* Safari */
		video.webkitRequestFullscreen();
	} else if (video.msRequestFullscreen) {
		/* IE11 */
		video.msRequestFullscreen();
	}
}

console.log(ranges);
//event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', adjustPlayhead);
toggle.addEventListener('click', togglePlay);
restart.addEventListener('click', restartVideo);
fullScrnBtn.addEventListener('click', enterFullScreen);

progress.addEventListener('mousedown', () => {
	seeking = true;
});
progress.addEventListener('mouseup', () => {
	seeking = false;
});

progress.addEventListener('mousemove', scrub);
progress.addEventListener('click', goToCursor);

ranges.forEach((range) => {
	range.addEventListener('mousemove', makeAdjustments);
});

skipButtons.forEach((skipButton) => {
	skipButton.addEventListener('click', skip);
});
