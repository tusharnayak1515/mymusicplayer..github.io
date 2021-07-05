const title = document.getElementById("title");
const artist = document.getElementById("artist");
const image = document.getElementById("cover_img");
const music = document.querySelector("audio");
const prev = document.getElementById("prev");
const play = document.getElementById("play");
const next = document.getElementById("next");
let progress = document.getElementById("progress");
let progressDiv = document.getElementById("progressDiv");
let current_Time = document.getElementById("current_Time");
let total_duration = document.getElementById("total_duration");

const songs = [
    {
        name: "Still_Dre",
        title: "Still Dre",
        artist: "Dr. Dre"
    },
    {
        name: "3_59_AM",
        title: "3 59 AM",
        artist: "Divine"
    },
    {
        name: "Brown_Munde",
        title: "Brown Munde",
        artist: "AP Dhillon"
    },
    {
        name: "Tum_ho",
        title: "Tum Ho",
        artist: "Mohit Chawhan"
    }
];

let isPlaying = false;

const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    image.classList.add("animate");
};

const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    image.classList.remove("animate");
};

play.addEventListener("click", () => {
    isPlaying ? pauseMusic() : playMusic();
});

let songIndex = 0;

const loadSong = (songs) => {
    title.innerHTML = songs.title;
    artist.innerHTML = songs.artist;
    image.src = "images/" + songs.name + ".jpg";
    music.src = "songs/" + songs.name + ".mp3";
    playMusic();
};

const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
}

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
}

// progress bar logic 

music.addEventListener("timeupdate", (event) => {
    let { currentTime, duration } = event.srcElement;
    let progressTime = (currentTime / duration) * 100;
    progress.style.width = `${progressTime}%`;

    //    total duration logic
    let min_duration = Math.floor(duration/60);
    let sec_duration = Math.floor(duration%60);
    if(sec_duration < 10) {
        sec_duration = `0${sec_duration}`;
    }
    if(duration) {
        total_duration.innerHTML = `${min_duration}:${sec_duration}`;
    }

    //    current time logic
    let min_currentTime = Math.floor(currentTime/60);
    let sec_currentTime = Math.floor(currentTime%60);
    if(sec_currentTime < 10) {
        sec_currentTime = `0${sec_currentTime}`;
    }
    current_Time.innerHTML = `${min_currentTime}:${sec_currentTime}`;
});

progressDiv.addEventListener("click", (event)=> {
    const { duration } = music;
    let moveProgress = (event.offsetX / event.srcElement.clientWidth) * duration;
    music.currentTime = moveProgress;
    playMusic();
});

music.addEventListener("ended", nextSong);

next.addEventListener("click", nextSong);

prev.addEventListener("click", prevSong);