console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItemsTelugu = Array.from(document.getElementsByClassName('songItemTelugu'));
let songItemsHindi = Array.from(document.getElementsByClassName('songItemHindi'));
let songItemsEnglish = Array.from(document.getElementsByClassName('songItemEnglish'))

let songsTelugu = [
    {songName: "Ramuloo Ramula", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Hoyna Hoyna", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Inthandham", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "TilluAnnaDJPedithe", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Top lesi poddie", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Neethone dance tonight ", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Ek baar", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Halamathi habibo", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Once Upon A Time", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
]

songItemsTelugu.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songsTelugu[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songsTelugu[i].songName; 
})

let songsHindi = [
    {songName: "Namo Namo", filePath: "songs/10.mp3", coverPath: "covers/10.jpeg"},
    {songName: "Kesariya", filePath: "songs/11.mp3", coverPath: "covers/11.jpeg"},
    {songName: "Raatan Lambiyan", filePath: "songs/12.mp3", coverPath: "covers/12.jpg"},
    {songName: "ae dil he mushkil", filePath: "songs/13.mp3", coverPath: "covers/13.jpeg"},
    {songName: "bekhayali", filePath: "songs/14.mp3", coverPath: "covers/14.jpg"},
]

songItemsHindi.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songsHindi[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songsHindi[i].songName; 
}) 

let songsEnglish = [
    {songName: "Believer", filePath: "songs/15.mp3", coverPath: "covers/15.jpg"},
    {songName: "Baby", filePath: "songs/16.mp3", coverPath: "covers/16.jpg"},
    {songName: "Love me like you do", filePath: "songs/17.mp3", coverPath: "covers/17.jpeg"},
    {songName: "Shape of you", filePath: "songs/18.mp3", coverPath: "covers/18.jpg"},
    {songName: "Sorry", filePath: "songs/19.mp3", coverPath: "covers/19.jpeg"},
]

songItemsEnglish.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songsEnglish[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songsEnglish[i].songName; 
}) 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        if(window.location.href === "http://127.0.0.1:5500/telugu.html")
        {
            masterSongName.innerText = songsTelugu[songIndex].songName;
        }
        else if(window.location.href === "http://127.0.0.1:5500/hindi.html"){
            masterSongName.innerText = songsHindi[songIndex].songName;
        }
        else{
            masterSongName.innerText = songsEnglish[songIndex].songName;
        }
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})