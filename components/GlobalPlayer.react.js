var React = require('react');
var ProgressBar = require('./ProgressBar.react');
var TracksModule = require('../modules/tracks');

var reactor = require('../reactor');

var getters = TracksModule.getters;
var actions = TracksModule.actions;

module.exports = React.createClass({
    mixins: [reactor.ReactMixin],

    getDataBindings: function () {
        return {
            track: getters.currentTrack
        };
    },

    next: function () {
        TracksModule.actions.next();
    },

    togglePlayback: function () {
        var playbackStatus = this.state.track.get('playbackStatus');
        if (playbackStatus === 'playing') {
            actions.pauseTrack(this.state.track.get('id'));
        } else {
            actions.playTrack(this.state.track.get('id'));
        }
    },

    blacklistTrack: function () {
        actions.blacklistTrack(this.state.track.get('id'));
    },

    saveTrack: function () {
        actions.saveTrack(this.state.track.get('id'));
    },


    render: function () {
        var artist = '';
        if (this.state.track.has('user')) {
            artist = this.state.track.get('user').get('username');
        }
        var text = this.state.track.get('playbackStatus') === 'playing' ? 'Pause' : 'Play';
        return (
            <div className="global-player">
                <img src={this.state.track.get('artwork_url')} />
                <div>{artist} - {this.state.track.get('title')}</div>
                <div className="blacklist-button" onClick={this.blacklistTrack}>Blacklist</div>
                <div className="save-button" onClick={this.saveTrack}>Save</div>
                <div className="playback-button" onClick={this.togglePlayback}>{text}</div>
                <div className="next-button" onClick={this.next}>Next</div>
                <ProgressBar
                    currentTime={this.state.track.get('currentTime')}
                    duration={this.state.track.get('duration')}
                    trackId={this.state.track.get('id')}
                />
            </div>
        );
    }
});
