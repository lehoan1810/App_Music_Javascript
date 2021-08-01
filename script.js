const container = document.querySelector(".container");
let musicImg = container.querySelector(".img-area img");
let musicName = container.querySelector(".song-details .name");
let musicArtist = container.querySelector(".song-details .artist");
let mainAudio = container.querySelector("#main-audio");
let playPauseBtn = container.querySelector(".play-pause");
let progressArea = container.querySelector(".progress-area");
let progressBar = container.querySelector(".progress-bar");
let nextBtn = container.querySelector("#next");
let prevBtn = container.querySelector("#prev");
let musicList = container.querySelector(".music-list");
let moreMusicBtn = container.querySelector("#more-music");
let closemoreMusic = container.querySelector("#close");

let musicIndex = 2;
window.addEventListener("load", () => {
	loadMusic(musicIndex);
});

loadMusic = (indexNumb) => {
	musicName.innerText = allMusic[indexNumb - 1].name;
	musicArtist.innerText = allMusic[indexNumb - 1].artist;
	musicImg.src = `img/${allMusic[indexNumb - 1].src}.jpg`;
	mainAudio.src = `music/${allMusic[indexNumb - 1].src}.mp3`;
};

playMusic = () => {
	container.classList.add("pause");
	playPauseBtn.querySelector("i").innerText = "pause";
	mainAudio.play();
};
pauseMusic = () => {
	container.classList.remove("pause");
	playPauseBtn.querySelector("i").innerText = "play_arrow";
	mainAudio.pause();
};

playPauseBtn.addEventListener("click", () => {
	const isMusicPaused = container.classList.contains("pause");
	console.log(container.classList);
	isMusicPaused ? pauseMusic() : playMusic();
});
nextMusic = () => {
	musicIndex++;
	musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
	loadMusic(musicIndex);
	playMusic();
};
prevMusic = () => {
	musicIndex--;
	musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex);
	loadMusic(musicIndex);
	playMusic();
};
nextBtn.addEventListener("click", nextMusic);
prevBtn.addEventListener("click", prevMusic);

mainAudio.addEventListener("timeupdate", (e) => {
	const currentTimes = e.target.currentTime;
	const durationTimes = e.target.duration;
	let proWidth = (currentTimes / durationTimes) * 100;
	progressBar.style.width = `${proWidth}%`;

	let musicCurrentTime = container.querySelector(".current-time");
	let musicDurationTime = container.querySelector(".max-duration");

	mainAudio.addEventListener("loadeddata", () => {
		let mainAudioDuration = mainAudio.duration;
		let totalMin = Math.floor(mainAudioDuration / 60);
		let totalSec = Math.floor(mainAudioDuration % 60);
		if (totalSec < 10) {
			totalSec = `0${totalSec}`;
		}
		musicDurationTime.innerText = `${totalMin}:${totalSec}`;
	});
	let mainAudioDuration = mainAudio.currentTime;
	let currentlMin = Math.floor(mainAudioDuration / 60);
	let currentlSec = Math.floor(mainAudioDuration % 60);
	if (currentlSec < 10) {
		currentlSec = `0${currentlSec}`;
	}
	musicCurrentTime.innerText = `${currentlMin}:${currentlSec}`;
});

progressArea.addEventListener("click", (e) => {
	let progressWidth = progressArea.clientWidth; //lấy width của progressArea
	let clickedoffsetX = e.offsetX;
	let songDuration = mainAudio.duration;
	mainAudio.currentTime = (clickedoffsetX / progressWidth) * songDuration;
	playMusic();
});

moreMusicBtn.addEventListener("click", () => {
	musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", () => {
	moreMusicBtn.click();
});

const ulTag = container.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {
	let liTag = `<li li-index=${i + 1}>
	<div class="row">
	<span>${allMusic[i].name}</span>
	<p>${allMusic[i].artist}</p>
	</div>
	<audio id="${allMusic[i].src}" src="music/${allMusic[i].src}.mp3"></audio>
	<span id="${allMusic[i].src}" class="audio-duration">1:45</span>
	</li>`;
	ulTag.insertAdjacentHTML("beforeend", liTag);
	let liAudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`);
	let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

	liAudioTag.addEventListener("loadeddata", () => {
		let duration = liAudioTag.duration;
		let totalMin = Math.floor(duration / 60);
		let totalSec = Math.floor(duration % 60);
		if (totalSec < 10) {
			totalSec = `0${totalSec}`;
		}
		liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;
		liAudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
	});
}
const alllitags = ultag.querySelector("li");
console, log(alllitags);
