var toImmutable = require('nuclear-js').toImmutable;

exports.feed = ['feed'];
exports.savedTracks = ['savedTracks'];
exports.tracks = ['tracks'];
exports.playbackStatus = ['playbackStatus'];
exports.currentTrackId = ['currentTrackId'];
exports.currentPlaylistId = ['currentPlaylistId'];

exports.feedTracks = [
    ['tracks'],
    ['playbackStatus'],
    ['feed', 'tracks'],
    function (tracks, playbackStatus, feedTracks) {
        return feedTracks.map(function (trackId) {
            return tracks
                .get(trackId)
                .merge(playbackStatus.get(trackId));
        });
    }
];

exports.savedTracksWithTrackInfo = [
    ['tracks'],
    ['playbackStatus'],
    ['savedTracks', 'tracks'],
    function (tracks, playbackStatus, savedTracks) {
        return savedTracks.map(function (trackId) {
            return tracks
                .get(trackId)
                .merge(playbackStatus.get(trackId));
        });
    }
];

exports.nextTrackId = [
    ['currentPlaylistId'],
    ['feed'],
    ['savedTracks'],
    function (currentPlaylistId, feed, savedTracks) {
        switch (currentPlaylistId) {
            case 'feed':
                return feed.get('nextTrack');
            case 'savedTracks':
                return savedTracks.get('nextTrack');
        }
    }
];

exports.currentTrack = [
    ['tracks'],
    ['playbackStatus'],
    ['currentTrackId'],
    function (tracks, playbackStatus, currentTrackId) {
        if (!tracks.has(currentTrackId)) {
            return toImmutable({
                title: '',
                currentTime: 0,
                duration: 1,
            });
        }
        return tracks
            .get(currentTrackId)
            .merge(playbackStatus.get(currentTrackId));
    }
];
