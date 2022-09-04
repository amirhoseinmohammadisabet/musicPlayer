const http = require('http');
const { getMusics, createMusic, likeMusic,tpt } = require('./controller/musicController');
const { getPlaylists, createPlaylist, playlistSongs } = require('./controller/playlistController');
const { fetchQueryStringFromURL,bodyFromPost } = require('./middlewares');

const RouterClass = require('./Router');
const Router = new RouterClass();

Router.addRoute('/musics', getMusics, 'get').middleware([fetchQueryStringFromURL]);
Router.addRoute('/musics/create', createMusic, 'post').middleware([])
Router.addRoute('/musics/like', likeMusic, 'post').middleware([])
Router.addRoute('musics/testpost',tpt,'post').middleware([bodyFromPost])

Router.addRoute('/playlists', getPlaylists, 'get').middleware(fetchQueryStringFromURL);
Router.addRoute('/playlists/create', createPlaylist, 'post').middleware([])
Router.addRoute('/playlists/songs', playlistSongs, 'get').middleware(fetchQueryStringFromURL)


const server = http.createServer((req, res) => {
    Router.route(req, res);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server lintening on ${PORT}`);

});
