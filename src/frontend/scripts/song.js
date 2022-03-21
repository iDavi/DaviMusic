let downloadButtonPressed = false;
$(document).ready(async () =>{
    let recentlyPlayed = JSON.parse(window.localStorage.getItem("recently"))

    if(recentlyPlayed.includes(window.location.href.split("/")[4])){
        recentlyPlayed.splice(recentlyPlayed.indexOf(window.location.href.split("/")[4]), 1)
        recentlyPlayed.push(window.location.href.split("/")[4])
    }else{
        recentlyPlayed.push(window.location.href.split("/")[4])
    }
    if(recentlyPlayed.length > 5)
        recentlyPlayed.shift()

    window.localStorage.setItem("recently", JSON.stringify(recentlyPlayed))
    refreshLikes()
    let reqVideo = await fetch("/api/search?q=" + window.location.href.split("/")[4])
    let bodyVideo = await reqVideo.json()

    let isDownloadedReq = await fetch("/api/check-if-downloaded?vidId=" + window.location.href.split("/")[4])
    let isDownloaded = await isDownloadedReq.json()
    if(isDownloaded){
        $("#download-button").text("check")
        downloadButtonPressed = true
        $("#video").attr("src", "/api/get-video?vidId=" + window.location.href.split("/")[4])
    }else{
        $("#video").attr("src", "https://www.youtube.com/embed/" + window.location.href.split("/")[4] + "?loop=1&playlist=" + window.location.href.split("/")[4] + "&autoplay=1")
    }
    $("#background-iframe").attr("src", "https://www.youtube.com/embed/" + window.location.href.split("/")[4] + "?autoplay=1&controls=0&loop=1&playlist=" + window.location.href.split("/")[4] + "&modestbranding=1&rel=0&showinfo=0&autohide=1&mute=1")
    let video = bodyVideo[0]
    let video_title = video.title
    let video_url = video.link
    let video_thumbnail = video.snippet.thumbnails.default.url
    let video_id = video.id.videoId


    $("#video-title").text(video_title)
    console.log(video_title)

    //load related videos
    let relatedVideosReq = await fetch("/api/search?q=" + video_title + "song")
    let relatedVideos = await relatedVideosReq.json()

    for (let i = 0; i < 5; i++) {
        let relatedVideo = relatedVideos[i]
        let relatedVideo_title = relatedVideo.title
        let relatedVideo_thumbnail = relatedVideo.snippet.thumbnails.default.url
        let relatedVideo_id = relatedVideo.id.videoId

        if(relatedVideo_title.length > 55){
            relatedVideo_title = relatedVideo_title.substring(0, 55) + "..."
        }
        $("#related-videos").append(`
            <div class="card" onclick="window.location.href = '/song/${relatedVideo_id}'">
                <div class="card mb-4 shadow-sm">
                    <img class="card-img-top" src="${relatedVideo_thumbnail}" alt="Card image cap">
                    <div class="card-body">
                        <p class="card-text">${relatedVideo_title}</p>
                    </div>
                </div>
            </div>
        `)
    }
    
    $("#like-video-button").click(async () => {
        toggleLikes()
        
    })

    $("#download-video-button").click(async () => {
        if(downloadButtonPressed)
            return;
        Swal.fire({
            title: 'Downloading...',
            onBeforeOpen: () => {
                Swal.showLoading()
            }
        })
        downloadButtonPressed = true
        $("#download-video-button").text("refresh")
        let req = await fetch("/api/download?vidId=" + window.location.href.split("/")[4] + "&format=mp4")
        let body = await req.json()
        console.log(body)
        if(body.error){
            
            $("#download-video-button").attr("style", "color: red;")
            /*sweetalert2 error*/ 
            Swal.fire({
                title: 'Error',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }else{
            Swal.fire({
                title: 'Success',
                text: 'Downloaded',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            $("#download-video-button").text("check")
            downloaded = JSON.parse(window.localStorage.getItem("downloaded"))
            if(downloaded.includes(window.location.href.split("/")[4])){
                downloaded.splice(downloaded.indexOf(window.location.href.split("/")[4]), 1)
                downloaded.push(window.location.href.split("/")[4])
            }
            else{
                downloaded.push(window.location.href.split("/")[4])
            }
            window.localStorage.setItem("downloaded", JSON.stringify(downloaded))
        }
    })
});

function refreshLikes(){
    liked = JSON.parse(window.localStorage.getItem("liked"))
    if(liked.includes(window.location.href.split("/")[4])){
        $("#like-video-button").addClass("like-video-button-pressed")
    }else{
        $("#like-video-button").removeClass("like-video-button-pressed")
    }
}

function toggleLikes(){
    liked = JSON.parse(window.localStorage.getItem("liked"))
    if(liked.includes(window.location.href.split("/")[4])){
        liked.splice(liked.indexOf(window.location.href.split("/")[4]), 1)
        window.localStorage.setItem("liked", JSON.stringify(liked))
    }else{
        liked.push(window.location.href.split("/")[4])
        window.localStorage.setItem("liked", JSON.stringify(liked))
    }
    refreshLikes()
}