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

let musicIndex = Math.floor(Math.random() * allMusic.length + 1);
window.addEventListener("load", () => {
	loadMusic(musicIndex);
	playingSong();
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

nextMusic = () => {
	musicIndex++;
	musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
	loadMusic(musicIndex);
	playMusic();
	playingSong();
};
prevMusic = () => {
	musicIndex--;
	musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex);
	loadMusic(musicIndex);
	playMusic();
	playingSong();
};
playPauseBtn.addEventListener("click", () => {
	const isMusicPaused = container.classList.contains("pause");
	isMusicPaused ? pauseMusic() : playMusic();
});
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
	let currentlMin = Math.floor(currentTimes / 60);
	let currentlSec = Math.floor(currentTimes % 60);
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

const repeatBtn = container.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
	let getText = repeatBtn.innerText;
	switch (getText) {
		case "repeat":
			repeatBtn.innerText = "repeat_one";
			repeatBtn.setAttribute("title", "song looped");
			break;
		case "repeat_one":
			repeatBtn.innerText = "shuffle";
			repeatBtn.setAttribute("title", "playback shuffled");
			break;
		case "shuffle":
			repeatBtn.innerText = "repeat";
			repeatBtn.setAttribute("title", "playlist looped");
			break;
	}
});

mainAudio.addEventListener("ended", () => {
	let getText = repeatBtn.innerText;
	switch (getText) {
		case "repeat":
			nextMusic();
			break;
		case "repeat_one":
			mainAudio.currentTime = 0;
			loadMusic(musicIndex);
			playMusic();
			break;
		case "shuffle":
			let randIndex = Math.floor(Math.random() * allMusic.length + 1);
			do {
				randIndex = Math.floor(Math.random() * allMusic.length + 1);
			} while (musicIndex == randIndex);
			musicIndex = randIndex;
			loadMusic(musicIndex);
			playMusic();
			playingSong();
			break;
	}
});
moreMusicBtn.addEventListener("click", () => {
	musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", () => {
	moreMusicBtn.click();
});

const ulTag = container.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {
	let liTag = `<li li-index="${i + 1}">
	<div class="row">
		<span>${allMusic[i].name}</span>
		<p>${allMusic[i].artist}</p>
	</div>
	<audio class="${allMusic[i].src}" src="music/${allMusic[i].src}.mp3"></audio>
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
const allLiTags = ulTag.querySelectorAll("li");
playingSong = () => {
	for (let j = 0; j < allLiTags.length; j++) {
		let audioTag = allLiTags[j].querySelector(".audio-duration");
		if (allLiTags[j].classList.contains("playing")) {
			allLiTags[j].classList.remove("playing");
			let adDuration = audioTag.getAttribute("t-duration");
			audioTag.innerText = adDuration;
		}
		if (allLiTags[j].getAttribute("li-index") == musicIndex) {
			allLiTags[j].classList.add("playing");
			audioTag.innerText = "Playing";
		}
		allLiTags[j].setAttribute("onclick", "clicked(this)");
	}
};
clicked = (element) => {
	let getLiIndex = element.getAttribute("li-index");
	musicIndex = getLiIndex;
	loadMusic(musicIndex);
	playMusic();
	playingSong();
};
