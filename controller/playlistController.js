const Playlist = require('../models/playlistModel');

async function getPlaylists(req, res) {
    try {
        const id = req.params?.id;
        if (id) await getPlaylist(req, res, id);
        else {
            let playlists = await Playlist.findAll();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(playlists));
        }
    } catch (e) {
        console.log(e);
    }
}

async function getPlaylist(req, res, id) {
    try {
        const playlist = await Playlist.findById(id)
        if (!playlist) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(playlist))
        }
    } catch (error) {
        console.log(error)
    }
}

async function createPlaylist(req, res) {
    try {
        let data = '';
        req.on('data', function (chunk) {
            data += chunk;
        })
        req.on('end', function () {
            data = JSON.parse(data);
            Playlist.create(data)
        })
        res.setHeader('content-type', 'application/json');
        res.write(JSON.stringify({ message: 'added Successfully' }));
        return res.end();
    } catch (e) {
        console.log(e);
    }
}

async function playlistSongs(req, res) {
    try {
        const songsInPlaylist = await Playlist.findSongs()
        res.setHeader('content-type', 'application/json');
        res.write(JSON.stringify(songsInPlaylist));
        return res.end()
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    getPlaylists,
    createPlaylist,
    playlistSongs
}