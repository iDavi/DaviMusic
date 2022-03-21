if(!window.localStorage.getItem("featured")){
    window.localStorage.setItem("featured", JSON.stringify(
        [
            {
                "name": "NCS",
                "toSearch": "NoCopyrightSounds [NCS Release]"
            },
            {
                "name": "Nightcore",
                "toSearch": "UNDERDOGS Nightcore"
            }
        ]
    ))
}

if(!window.localStorage.getItem("liked")){
    window.localStorage.setItem("liked", "[]")
}
if(!window.localStorage.getItem("recently")){
    window.localStorage.setItem("recently", "[]")
}

if(!window.localStorage.getItem("downloaded")){
    window.localStorage.setItem("downloaded", "[]")
}

if(!window.localStorage.getItem("librarySection")){
    window.localStorage.setItem("librarySection", "liked")
}