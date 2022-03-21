

module.exports = (...params) => {
    const yt = params[2]
    params[0].get("/api/getfeatured", async (req, res) => {
        featured = JSON.parse(req.query.featured)
        toSend = []
        /*
        featured:
            [
                {
                    "name": "NCS",
                    "toSearch": "NoCopyrightSounds [NCS Release]"
                }
            ]
        */
        for(let i = 0; i < featured.length; i++){
            let list = featured[i]
            let toSearch = list.toSearch
            let searchResults = await yt.search(toSearch)
            let name = list.name 
            toSend.push({
                name: name,
                search: searchResults
            })
        }
        res.send(toSend)
    })
    params[0].get("/api/search", async (req, res) => {
        res.json(await yt.search(req.query.q))
    });
    params[0].get("/api/verify", async (req, res) => {
        search = await yt.search(req.query.q)
        res.json(search.length > 0)
    });
}