const express = require('express');
const router = express();
const test = require("./tests.js");
const port = 8756;
const fs = require('fs');
const { app, BrowserWindow } = require('electron')
const yt = require("youtube-search-without-api-key")


console.log("\x1b[32m%s\x1b[0m", "Server is running on port " + port);

router.use(express.static('./src/frontend'));
router.listen(port)

fs.readdirSync('./src/api').forEach(function(file) {
    if (file.substr(-3) == '.js') {
        require('./api/' + file)(router, __dirname, yt);
    }
});



/*
    Electron setup
*/

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
    })
    win.maximize()
    //change window title
    win.setTitle("DaviMusic - The Spotify Killer")

    //change window icon
    win.setIcon(__dirname + '\\frontend\\favicon.icns')
  
    win.loadURL(`http://localhost:${port}`)
}


app.whenReady().then(() => {
    createWindow()
})
