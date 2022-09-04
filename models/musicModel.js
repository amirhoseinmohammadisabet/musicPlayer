const { connectDB } = require('../helper')

async function findAll(req, res) {

    const pool = connectDB()
    const queryForGetMusics = 'select * from music';
    const resultForGetMusics = await (await pool.query(queryForGetMusics)).rows;
    pool.end();
    return resultForGetMusics;
}

async function findById(id) {

    const pool = connectDB()


    const queryForGetMusic = `SELECT * FROM music where id=${id}`;
    const resultForGetMusic = await (await pool.query(queryForGetMusic)).rows;
    pool.end();
    return resultForGetMusic;
}

async function create(obj) {

    const pool = connectDB()


    let queryForInsertingMusic = await pool.query('insert into music (title ,singer) values ($1,$2)', [obj.title, obj.singer]);
    return queryForInsertingMusic;
}

async function like(data) {

    const pool = connectDB()


    let checkForLike = await (await pool.query('select * from "like" where audience_id=($1)', [data.audience_id])).rows

    const likeModel = {}
    likeModel.audience_id = data.audience_id
    likeModel.music_id = data.music_id

    if (checkForLike.find(obj => obj.audience_id === likeModel.audience_id && obj.music_id === likeModel.music_id)) {
        pool.end();
        console.log('liked before');
    }
    else {
        const queryForLike = await (await pool.query('insert into "like" (audience_id, music_id) values ($1, $2)', [data.audience_id, data.music_id])).rows
        pool.end();
        return queryForLike;
    }
}


module.exports = {
    findAll,
    findById,
    create,
    like
}