
$(document).ready(async () => {
    $("#select-library-section").val(window.localStorage.getItem("librarySection"))
    $("#select-library-section")
    $("#select-library-section").change(async () => {
        window.localStorage.setItem("librarySection", $("#select-library-section").val())
        window.location.reload()
    });
    refreshSongs()
});

async function refreshSongs(){
    const user = {
        liked: JSON.parse(window.localStorage.getItem("liked")),
        recently: JSON.parse(window.localStorage.getItem("recently"))
    }
    const selected = $("#select-library-section").val()
    for (let x = user[selected].length - 1; x > 0 && $("#select-library-section").val() === selected; x--) {
        try {
            console.log(user[selected][x])
            const videoId = user[selected][x]
            const videoResultsReq = await fetch(`/api/search?q=${videoId}`)
            const videoResults = await videoResultsReq.json()
            const videoInfo = videoResults[0]

            let video_title = videoInfo.title
            const video_image = videoInfo.snippet.thumbnails.default.url

            if (video_title.length > 55) {
                video_title = video_title.substring(0, 55) + "..."
            }
            $("#result").append(`
            <div class="card" onclick="window.location.href = '/song/${videoId}'">
                <div class="card mb-4 shadow-sm">
                    <img class="card-img-top" src="${video_image}" alt="Card image cap">
                    <div class="card-body">
                        <p class="card-text">${video_title}</p>
                    </div>
                </div>
            </div>
        `)
        }catch(e){
            console.log(e)
        }
    }
}