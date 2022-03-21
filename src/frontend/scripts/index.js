

//when document is ready
let titleBeforeChanges = new Object;

$(document).ready(async () => {
    let time = new Date().getHours();
    if (time >= 0 && time < 12) {
        $("#recommended h1").text("Good morning!")
    }
    else if (time >= 12 && time < 18) {
        $("#recommended h1").text("Good afternoon!")
    }
    else if (time >= 18 && time < 24) {
        $("#recommended h1").text("Good evening!")
    }






    let featured = window.localStorage.getItem("featured")
    let featuredSongsReq = await fetch("/api/getfeatured?featured=" + featured)
    let featuredSongs = await featuredSongsReq.json()
    for (let i = 0; i < featuredSongs.length; i++) {
        titleBeforeChanges[i] = featuredSongs[i].name
        songs = featuredSongs[i]
        $("#recommended").append(`
               <br>
               <h3 id="h3${i}">${songs.name}</h3> 
               <span id="delete-section-button" index=${i} onclick="deleteSectionButton(this)" class="material-icons">delete</span>
                <div id="${songs.name.split(" ").join("-")}" class="grid">
                    
                </div>
            `)
            $(`#h3${i}`).click(async () => {

                let index = i
                let featuredStorage =  JSON.parse(window.localStorage.getItem("featured"))
                let featuredSection = featuredStorage[index]
        
        
                let newText = await new swal({
                    title: "Change the section display text",
                    text: "Enter the new text",
                    input: "text",
                    showCancelButton: true,
                    inputValidator: (value) => {
                        if (!value) {
                            return "You need to write something!"
                        }else if(value.length<1){
                            return "It must be at least 1 character long!"
                        }
                    }
                })
        
                let newSearch = await new swal({
                    title: "Change the section search query for youtube search songs",
                    text: "Try something like " + newText.value + " songs",
                    input: "text",
                    showCancelButton: true,
                    inputValidator: (value) => {
                        if (!value) {
                            return "You need to write something!"
                        }else if(value.length<1){
                            return "It must be at least 1 character long!"
                        }
                    }
                })
                
                if(!newText.value || !newSearch.value)
                    return;
                
                //verify
                let search = await fetch("/api/verify?q=" + newSearch.value)
                let searchRes = await search.json()
                if(!searchRes){
                    swal("Error", "The search query need to be writen correctly (artist names, words...)", "error")
                }
                featuredSection.name = newText.value
                featuredSection.toSearch = newSearch.value
                featuredStorage[index] = featuredSection
                window.localStorage.setItem("featured", JSON.stringify(featuredStorage))
            
                window.location.reload()
            })
        for (x = 0; x < 5; x++) {
            try{
            let song = songs.search[x]
            let song_title = song.title
            let song_url = song.link
            let song_thumbnail = song.snippet.thumbnails.default.url
            let song_id = song.id.videoId
            let song_author = song.author

            if (song_title.length > 55) {
                song_title = song_title.substring(0, 55) + "..."
            }
            $("#" + songs.name.split(" ").join("-")).append(`
                    <div class="card" onclick="window.location.href = '/song/${song_id}'">
                        <div class="card mb-4 shadow-sm">
                            <img class="card-img-top" src="${song_thumbnail}" alt="Card image cap">
                            <div class="card-body">
                                <p class="card-text">${song_title}</p>
                            </div>
                        </div>
                    </div>
                `)
            }catch(e){
                console.log(e)
                console.log (songs.search)
            }
        }

    }
    $("#add-new-section").click(async () => {
        let newText = await new swal({
            title: "Change the section display text",
            text: "Enter the new text",
            input: "text",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "You need to write something!"
                }else if(value.length<1){
                    return "It must be at least 1 character long!"
                }
            }
        })
        let newSearch = await new swal({
            title: "Change the section search query for youtube search songs",
            text: "Try something like " + newText.value + " songs",
            input: "text",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "You need to write something!"
                }else if(value.length<1){
                    return "It must be at least 1 character long!"
                }
            }
        })
        if(!newText.value || !newSearch.value)
            return;
        let search = await fetch("/api/verify?q=" + newSearch.value)
        let searchRes = await search.json()
        if(!searchRes){
            swal("Error", "The search query need to be writen correctly (artist names, words...)", "error")
        }
        let featuredStorage =  JSON.parse(window.localStorage.getItem("featured"))
        let featuredSection = {
            name: newText.value,
            toSearch: newSearch.value
        }
        featuredStorage.push(featuredSection)
        window.localStorage.setItem("featured", JSON.stringify(featuredStorage))
        window.location.reload()
    })

});
async function deleteSectionButton(e){
    let index = $(e).attr("index")
    let featuredStorage =  JSON.parse(window.localStorage.getItem("featured"))
    let confirm = await new swal({
        title: "Are you sure to delete this section?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    })
    if (!confirm)
        return;
        
    featuredStorage.splice(index, 1)
    window.localStorage.setItem("featured", JSON.stringify(featuredStorage))
    window.location.reload()
}






