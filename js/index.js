const title = document.getElementById("title");
const artist = document.getElementById("artist");
const image = document.getElementById("cover_img");
const music = document.querySelector("audio");
const prev = document.getElementById("prev");
const play = document.getElementById("play");
const next = document.getElementById("next");

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
        artist: "AP Dhillon,Gurinder Gill"
    },
    {
        name: "Tum_ho",
        title: "Tum Ho",
        artist: "Mohit Chawhan"
    }
];

let isPlaying = false;

const playMusic = ()=> {
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    image.classList.add("animate");
};

const pauseMusic = ()=> {
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    image.classList.remove("animate");
};

play.addEventListener("click", ()=> {
    isPlaying ? pauseMusic() : playMusic();
});

let songIndex = 0;

const loadSong = (songs)=> {
    title.innerHTML = songs.title;
    artist.innerHTML = songs.artist;
    image.src = "images/"+songs.name+".jpg";
    music.src = "songs/"+songs.name+".mp3";
    playMusic();
};

const nextSong = ()=> {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
}

const prevSong = ()=> {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
}

next.addEventListener("click", nextSong);

prev.addEventListener("click", prevSong);