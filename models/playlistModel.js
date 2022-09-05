const { connectDB } = require('../config');

async function findAll(req, res) {
    const pool = connectDB();

    const queryGettingPlaylists = await pool.query('SELECT * FROM playlists')
    const resultGettingPlaylists = queryGettingPlaylists.rows;
    pool.end();
    return resultGettingPlaylists;
}

async function findById(id) {
    const pool = connectDB();

    const queryForGettingPlaylist = await pool.query(`SELECT * FROM playlists WHERE id=${id}`)
    const resultForGettingPlaylist = queryForGettingPlaylist.rows
    pool.end();
    return resultForGettingPlaylist;
}

async function create(obj) {
    const pool = connectDB();

    const queryForInsertingPlaylist = await pool.query(`insert into playlists (name, audience_id) values ($1,$2)`, [obj.name, obj.audience_id])
    pool.end();
    return queryForInsertingPlaylist;
}

async function findSongs(playlistId) {
    const pool = connectDB();

    const queryForGettingMap = await pool.query(`SELECT * FROM "map_music_playlist" WHERE playlist_id=${playlistId}`)
    const resultForGettingMap = queryForGettingMap.rows
    let mySong = []
    for (let n = 0; n <= resultForGettingMap.length - 1; n++) {
        const myMusic = `SELECT * FROM musics where id=${resultForGettingMap[n].music_id}`;
        const res3 = await pool.query(myMusic);
        mySong = mySong.concat(res3.rows)
    }
    pool.end();
    return mySong
}

module.exports = {
    findAll,
    findById,
    create,
    findSongs
}