const { Pool } = require('pg')

async function findAll(req, res) {

    const pool = new Pool({
        user: 'mirage',
        host: '192.168.5.121',
        Port: '5432',
        database: 'college',
        schema: 'mirage',
        password: '&6Tw3C0V4q@w'
    });

    const queryGetPlaylists = `SELECT * FROM playlist`;
    const resultGetPlaylists = await (await pool.query(queryGetPlaylists)).rows;
    return resultGetPlaylists;
}

async function findById(id) {

    const pool = new Pool({
        user: 'mirage',
        host: '192.168.5.121',
        Port: '5432',
        database: 'college',
        schema: 'mirage',
        password: '&6Tw3C0V4q@w'
    });


    let checkForLike = await (await pool.query('SELECT * FROM playlist where id=($1)', [id])).rows
    pool.end();
    return checkForLike;
}

async function create(obj) {

    const pool = new Pool({
        user: 'mirage',
        host: '192.168.5.121',
        Port: '5432',
        database: 'college',
        schema: 'mirage',
        password: '&6Tw3C0V4q@w'
    });

    let checkForLike = await (await pool.query('insert into playlist ("name","user_id","info") values ($1,$2,$3)', [obj.name, obj.user_id, obj.info])).rows;

    pool.end();
    return checkForLike;
}


async function findSongs(obj) {

    const pool = new Pool({
        user: 'mirage',
        host: '192.168.5.121',
        Port: '5432',
        database: 'college',
        schema: 'mirage',
        password: '&6Tw3C0V4q@w'
    });


    const query2 = `SELECT * FROM map_music_playlist where playlist_id=2`;
    const res2 = await pool.query(query2);
    let mySong = []
    for (let n = 0; n <= res2.rows.length - 1; n++) {
        const myMusic = `SELECT * FROM music where id=${res2.rows[n].music_id}`;
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