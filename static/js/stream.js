const APP_ID = '63854ba40540452badce03ec59f8eb8d'
const CHANNEL = sessionStorage.getItem('room')
const TOKEN = sessionStorage.getItem('token')
let UID = Number(sessionStorage.getItem('UID'))

const client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'})

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
    document.getElementById('room-name').innerText = CHANNEL

    client.on('user-published', handleUserJoined)
    client.on('user-left', handleUserLeft)

    try {
        await client.join(APP_ID, CHANNEL, TOKEN, UID)
    }catch (error){
        onsole.error(error)
        window.open('/', '_self')
    }


    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = '<div class="video-container" id="user-container-${UID}">\n' +
        '                <div class="username-wrapper"><span class="user-name"> My Name</span></div>\n' +
        '                <div class="video-player" id="user-${UID}"></div>\n' +
        '            </div>'
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play('user-${UID}')

    await client.publish([localTracks[0], localTracks[1]])
}

handleUserJoined = async (user, mediatype) => {
    remotUser[user.uid] = user
    await client.subscribe(user, mediatype)

    if (mediatype === 'video') {
        let player = document.getElementById(`user-container=${user.uid}`)
        if (player != null) {
            player.remove()
        }

        player = '<div class="video-container" id="user-container-${user.uid}">\n' +
            '                <div class="username-wrapper"><span class="user-name"> My Name</span></div>\n' +
            '                <div class="video-player" id="user-${user.uid}"></div>\n' +
            '            </div>'
        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)
        user.videoTrack.play('user-${user.uid}')
    }

    if (mediatype === 'audio') {
        user.audioTrack.play()
    }
}


let handleUserLeft = async (user) => {
    delete remoteUsers[user.uid]
    document.getElementById('user-container-${user.uid}').remove()
}


let LeaveAndRemoveLocalStream = async () => {
    for (let i =0; localTracks.length > i; i++){
        localTracks[i].stop()
        localTracks[i].close()
    }
    await client.leave()
    window.open('/', '_self')
}

let toggleCamera = async (e) => {
    if (localTracks[1].muted){
        await localTracks[1].setMuted(false)
        e.target.style.backgroundColor = '#fff'
    }else {
        await localTracks[1].setMuted(true)
        e.target.style.backgroundColor = 'rgb(255, 80, 80, 1)'
    }
}

let toggleMic = async (e) => {
    if (localTracks[0].muted){
        await localTracks[0].setMuted(false)
        e.target.style.backgroundColor = '#fff'
    }else {
        await localTracks[0].setMuted(true)
        e.target.style.backgroundColor = 'rgb(255, 80, 80, 1)'
    }
}

joinAndDisplayLocalStream()


document.getElementById('leave-btn').addEventListener('click', LeaveAndRemoveLocalStream)
document.getElementById('camera-btn').addEventListener('click', toggleCamera)
document.getElementById('mic-btn').addEventListener('click', toggleMic)