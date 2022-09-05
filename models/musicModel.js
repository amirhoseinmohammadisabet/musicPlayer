const { connectDB } = require('../config');

async function findAll(req, res) {
    const pool = connectDB();
    const queryForGettingMusics = await pool.query('select * from musics')
    const resultForGettingMusics = queryForGettingMusics.rows
    pool.end();
    return resultForGettingMusics;
}

async function findById(id) {
    const pool = connectDB();
    const queryForGettingMusic = await pool.query(`SELECT * FROM musics where id=${id}`)
    const resultForGettingMusic = queryForGettingMusic.rows;
    pool.end();
    return resultForGettingMusic;
}

async function create(obj) {
    const pool = connectDB();
    const queryForInsertingMusic = await pool.query(`insert into musics (singer, name) values ($1,$2)`, [obj.singer, obj.name])
    return queryForInsertingMusic;
}

async function like(data) {
    const pool = connectDB();
    const queryChekForLike = await pool.query(`select * from likes where audience_id=${data.audience_id}`)
    const resultCheckForLike = queryChekForLike.rows

    if (resultCheckForLike.find(obj => obj.audience_id === data.audience_id && obj.music_id === data.music_id)) {
        const queryForDeletingLikes = await pool.query(`DELETE FROM likes WHERE audience_id=${data.audience_id} AND music_id=${data.music_id}`)
        const resultForDeletingLikes = queryForDeletingLikes.rows
        console.log('remove');
        pool.end();
        return resultForDeletingLikes
    }
    else {
        const queryForLike = await pool.query(`insert into likes (audience_id, music_id) values ($1,$2)`, [data.audience_id, data.music_id])
        const resultForLike = queryForLike.rows
        console.log('insert');
        pool.end();
        return resultForLike;
    }
}


module.exports = {
    findAll,
    findById,
    create,
    like
}