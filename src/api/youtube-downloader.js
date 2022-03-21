
const ytdl = require("ytdl-core");
const fs = require("fs")
module.exports = (...params) => {
    params[0].get("/api/download", async (req, res) => {
        try {
            let vidId = req.query.vidId
            let format = req.query.format
            let url = "https://www.youtube.com/watch?v=" + vidId
            let video = ytdl(url)
            let stream = video.pipe(fs.createWriteStream("./src/downloads/" + vidId + "." + format))
            stream.on("finish", () => {
                res.json({ error: false })
            })
        } catch (err) {
            console.log(err)
            res.json({ error: true })
        }
    })
}