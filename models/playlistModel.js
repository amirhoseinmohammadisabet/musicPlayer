const { connectDB } = require('../helper');

async function findAll(req, res) {

    const pool = connectDB()


    const queryGetPlaylists = `SELECT * FROM playlist`;
    const resultGetPlaylists = await (await pool.query(queryGetPlaylists)).rows;
    return resultGetPlaylists;
}

async function findById(id) {

    const pool = connectDB()



    let checkForLike = await (await pool.query('SELECT * FROM playlist where id=($1)', [id])).rows
    pool.end();
    return checkForLike;
}

async function create(obj) {

    const pool = connectDB()


    let checkForLike = await (await pool.query('insert into playlist ("name","user_id","info") values ($1,$2,$3)', [obj.name, obj.user_id, obj.info])).rows;

    pool.end();
    return checkForLike;
}


async function findSongs(playlistId) {
    const pool = connectDB();
    
    const queryForGettingMap = await (await pool.query('SELECT * FROM "map_music_playlist" WHERE playlist_id=($1)', [playlistId])).rows
    let mySongs = []
    for (let n = 0; n <= queryForGettingMap.length - 1; n++) {
        const queryForGetingMusic = `SELECT * FROM music where id=${queryForGettingMap[n].music_id}`;
        const arrayOfMusic = await pool.query(queryForGetingMusic);
        mySongs = mySongs.concat(arrayOfMusic.rows)
    }
    pool.end();
    return mySongs
}


module.exports = {
    findAll,
    findById,
    create,
    findSongs
}