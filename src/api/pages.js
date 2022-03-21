
module.exports = async (...params) => {
    params[0].get("/song/*", async (req, res) => {
        res.sendFile(params[1] + "/frontend/song.html")
    });
}