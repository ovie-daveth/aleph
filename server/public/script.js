const socket = io("/")

const vidGrid = document.getElementById('video-grid');

const myVideo = document.createElement('video');
myVideo.muted = true;

let myVideoStream

//Permissions to use vid and audio
navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(stream => {
     myVideoStream = stream
     addVideoStream(myVideo, stream)
})

socket.emit('join-room');

//Showing the videostream on the browser
const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () =>{
        video.play()
    });

    vidGrid.append(video)
}
