let progressbar = document.getElementById("progressBar");
let mastersongplay = document.getElementById("mastersongplay");
let gif = document.getElementById("gif");
let songsitem = Array.from(document.getElementsByClassName("songitem"));
let songinfoName = document.querySelector(".songinfo .songname");

let songindex = 0;

let songs = [
    { songname: 'Salam e ishq', filepath: './songs/1.mp3', coverpath: './covers/1.jpg' },
    { songname: 'Tumhen Dekha to', filepath: './songs/2.mp3', coverpath: './covers/2.jpg' },
    { songname: 'Mery Rashk e qamar', filepath: './songs/3.mp3', coverpath: './covers/3.jpg' },
    { songname: 'Mein Yahn hun', filepath: './songs/4.mp3', coverpath: './covers/4.jpg' },
    { songname: 'Paany ki chahta', filepath: './songs/5.mp3', coverpath: './covers/5.jpg' },
    { songname: 'Tum mery ho', filepath: './songs/6.mp3', coverpath: './covers/6.jpg' },
    { songname: 'Dont love with me', filepath: './songs/7.mp3', coverpath: './covers/7.jpg' },
    { songname: 'Larki bari anjani h', filepath: './songs/8.mp3', coverpath: './covers/8.jpg' },
    { songname: 'Ajanbi ka intzar', filepath: './songs/9.mp3', coverpath: './covers/9.jpg' },
    { songname: 'Salam e ishq', filepath: './songs/10.mp3', coverpath: './covers/10.jpg' }
];


let audioElement = new Audio(songs[0].filepath);

songsitem.forEach((element, i) => {
    index=i
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
    updateSongInfo()
})



mastersongplay.addEventListener("click", () => {
    if(audioElement.paused){
        mastersongplay.style.transform="scale(1.5)"
    }
    else{
        mastersongplay.style.transform="scale(1)"
    }
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        mastersongplay.classList.remove("fa-play");
        mastersongplay.classList.add('fa-pause');
        gif.style.opacity = 1;

    }
    else {
        audioElement.pause();
        mastersongplay.classList.remove('fa-pause');
        mastersongplay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})


audioElement.addEventListener("timeupdate", () => {
    if (!isNaN(audioElement.duration)) {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        progressbar.value = progress;
    }
})

progressbar.addEventListener("input", () => {
    audioElement.currentTime = progressbar.value * audioElement.duration / 100;
});


function makeallplay() {
    Array.from(document.getElementsByClassName("songitemplay")).forEach(element => {
        element.classList.remove("fa-pause")
        element.classList.add("fa-play")
    })
}


Array.from(document.getElementsByClassName("songitemplay")).forEach(element => {
    element.addEventListener("click", (e) => {
        songindex = parseInt(e.target.id)
        e.target.classList.remove("fa-play")
        e.target.classList.add("fa-pause")
        audioElement.src = `./songs/${songindex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play()
        gif.style.opacity=1
        mastersongplay.classList.remove("fa-play");
        mastersongplay.classList.add("fa-pause")
    })
})



document.getElementById("next").addEventListener("click", () => {
    if(songindex>9){
        songindex=0
    }
    else{
        songindex+=1;
        makeallplay();
        audioElement.src = `./songs/${songindex + 1}.mp3`;

        audioElement.currentTime = 0;
        audioElement.play()
        mastersongplay.classList.remove("fa-play");
        mastersongplay.classList.add("fa-pause")
        updateSongInfo();
    }
});



document.getElementById("previous").addEventListener("click",()=>{
    if(songindex<=0){
        songindex=0;
        audioElement.currentTime=0
    }
    else{
        songindex -=1;
        audioElement.src = `./songs/${songindex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play()
        mastersongplay.classList.remove("fa-play");
        mastersongplay.classList.add("fa-pause")
        updateSongInfo();
    }
})

function updateSongInfo() {
    songinfoName.innerText = songs[songindex].songname;
}
