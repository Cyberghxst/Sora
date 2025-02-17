/**
 * Pattern to match SoundCloud URLs.
 */
const SOUNDCLOUD_REGEX = /((https|http):\/\/)?(soundcloud|on|snd|m)\.?(soundcloud|com|app|sc)(\.com|\.goo\.gl)?\/[a-zA-Z0-9]+(\/[a-zA-Z0-9-]+)?/g

/**
 * Pattern to match Spotify URLs.
 */
const SPOTIFY_REGEX = /(https?:\/\/open.spotify.com(\/intl-es)?\/(track|user|artist|album)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(track|user|artist|album):[a-zA-Z0-9]+(:playlist:[a-zA-Z0-9]+|))/g

/**
 * Pattern to match YouTube URLs.
 */
const YOUTUBE_REGEX = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu\.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/g

/**
 * Pattern to match Deezer URLs.
 */
const DEEZER_REGEX = /^https?:\/\/(?:www\.)?deezer\.com\/(track|album|playlist)\/(\d+)$/g

/**
 * Pattern to match Vimeo URLs.
 */
const VIMEO_REGEX = /^https?:\/\/(?:www\.)?vimeo\.com.+?(\d+).*$/g

/**
 * The ID of the bot owner.
 */
const OWNER_ID = '590267498192961540'


module.exports = {
    OWNER_ID,
    SOUNDCLOUD_REGEX,
    SPOTIFY_REGEX,
    DEEZER_REGEX,
    YOUTUBE_REGEX,
    VIMEO_REGEX
}
