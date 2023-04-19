const socket = io("/")

const vidGrid = document.getElementById('video-grid');

const myVideo = document.createElement('video');
myVideo.muted = true;

var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: 3030
});

let myVideoStream
//Permissions to use vid and audio
navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(stream => {
     myVideoStream = stream
     addVideoStream(myVideo, stream)

     peer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
     })

     socket.on('user-connected', (userId) => {
        connectToNewUser(userId, stream);
    })
})

peer.on('open', id => {
    console.log("peer id", id)
    socket.emit('join-room', ROOM_ID, id);
})


const connectToNewUser = (userId, stream) => {
    console.log("new user",  userId)
    const call = peer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    });
}

//Showing the videostream on the browser
const addVideoStream = (video, stream) => {
    console.log("adding video stream")
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () =>{
        video.play()
    });

    vidGrid.append(video)
}






