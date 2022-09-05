const http = require('http');
const { getMusics, createMusic, likeMusic } = require('./controller/musicController');
const { getPlaylists, createPlaylist, playlistSongs } = require('./controller/playlistController');
const { fetchQueryStringFromURL, getPostData } = require('./middlewares');

const RouterClass = require('./Router');
const Router = new RouterClass();

Router.addRoute('/musics', getMusics, 'get').middleware([fetchQueryStringFromURL]);
Router.addRoute('/musics/create', createMusic, 'post').middleware([getPostData])
Router.addRoute('/musics/like', likeMusic, 'post').middleware([getPostData])

Router.addRoute('/playlists', getPlaylists, 'get').middleware([fetchQueryStringFromURL]);
Router.addRoute('/playlists/create', createPlaylist, 'post').middleware([getPostData])
Router.addRoute('/playlists/songs', playlistSongs, 'get').middleware([fetchQueryStringFromURL])


const server = http.createServer((req, res) => {
    Router.route(req, res);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server lintening on ${PORT}`);

});
