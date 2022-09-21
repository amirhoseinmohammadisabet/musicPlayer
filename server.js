const http = require('http');
const { getMusics, createMusic, likeMusic } = require('./controller/musicController');
const { getPlaylists, createPlaylist, playlistSongs } = require('./controller/playlistController');
const { fetchQueryStringFromURL } = require('./middlewares');

const RouterClass = require('./Router');
const Router = new RouterClass();

Router.addRoute('/musics', getMusics, 'get').middleware([fetchQueryStringFromURL]);
Router.addRoute('/music/create', createMusic, 'post').middleware([])
Router.addRoute('/music/like', likeMusic, 'post').middleware([])

Router.addRoute('/playlists', getPlaylists, 'get').middleware(fetchQueryStringFromURL);
Router.addRoute('/addplaylist', createPlaylist, 'post').middleware([])
Router.addRoute('/playlistSongs', playlistSongs, 'get').middleware(fetchQueryStringFromURL)


const server = http.createServer((req, res) => {
    Router.route(req, res);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server lintening on ${PORT}`);

});
