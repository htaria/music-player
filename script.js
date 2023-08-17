let musics = [
    {
        name: "Set fire to the rain",
        cover: "./img/3.jpg",
        audio: new Audio("./player/adele-set-fire-to-the-rain-musicfeed.ir_.mp3")
    },
    {
        name: "lose yourself",
        cover: "./img/2.jpg",
        audio: new Audio("./player/eminem_lose_yourself.mp3")
    },
    {
        name: "ready for it",
        cover: "./img/1.jpeg",
        audio: new Audio("./player/01.ready_for_it.mp3")
    }
];

const musicName = document.getElementById('music-name');
const musicCover = document.getElementById('music-cover');
const range = document.getElementById('music-time');
const playBtn = document.getElementById('play-btn');
const preBtn = document.getElementById('pre-btn');
const nextBtn = document.getElementById('next-btn');

let curretMusic = 0;

let audio = musics[curretMusic].audio;
musicCover.src = musics[curretMusic].cover;
musicName.innerText = musics[curretMusic].name;

audio.addEventListener('canplay', (e) => {
    console.log(audio.duration);
    range.max = audio.duration;
});

audio.addEventListener('timeupdate', (e) => {
    range.value = audio.currentTime;
});

audio.addEventListener('ended',(e)=>{
        changeMusic("next");
});

range.addEventListener('input', (e) => {
    audio.currentTime = range.value;
});

playBtn.addEventListener('click', (e) => {
    if (audio.paused) {
        audio.play();
        musicCover.style.animationPlayState = "running";
        range.style.appearance = "auto";
        playBtn.classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
    } else {
        audio.pause();
        musicCover.style.animationPlayState = "paused";
        playBtn.classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
    }
});

nextBtn.addEventListener('click', (e) => {
    changeMusic("next");
});

preBtn.addEventListener('click', (e) => {
    changeMusic("pre");
});



function changeMusic(state) {
    audio.pause();
    musicCover.style.animationPlayState = "paused";
    playBtn.classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
    range.style.appearance = "none";
    range.value = 0;
    audio.currentTime = 0;
    audio.curretMusic = 0;
    if (state == "next") {
        if (curretMusic == musics.length - 1)
            curretMusic = 0;
        else
            curretMusic += 1;
    } else {
        if (curretMusic == 0)
            curretMusic = musics.length - 1;
        else
            curretMusic -= 1;
    }
    audio = musics[curretMusic].audio;
    musicCover.src = musics[curretMusic].cover;
    musicName.innerText = musics[curretMusic].name;
    audio.play();
    musicCover.style.animationPlayState = "running";
    range.style.appearance = "auto";
    playBtn.classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
}