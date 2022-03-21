const fs = require("fs")
module.exports = (...params) => {
    params[0].get("/api/check-if-downloaded", (req, res) => {
        const videoId = req.query.vidId
        /*check if the `${videoId}.mp4` file exists in the `/downloads` folder*/
        const file = fs.readdirSync("./src/downloads")

        if (file.includes(`${videoId}.mp4`)) {
            res.json({
                downloaded: true
            })
        }else{
            res.json({
                downloaded: false
            })
        }
    });
    params[0].get("/api/get-video", (req, res) => {
        /*stream the video file in a player*/
        const videoId = req.query.vidId
        const file = fs.readFileSync(`./src/downloads/${videoId}.mp4`)
        res.writeHead(200, {
            "Content-Type": "video/mp4"
        })
        res.end(file)
    });
}