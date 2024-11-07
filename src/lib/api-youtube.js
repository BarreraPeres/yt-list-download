var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.ytPlayer = null
window.lista = null
export async function apiYoutube(id_playlist) {
    return new Promise((resolve, reject) => {
        window.ytPlayer = new YT.Player("ytvideo", {
            events: {
                "onReady": loadVideo,
                "onStateChange": onReadyPlay,
            }
        })
        function loadVideo(event) {
            ytPlayer.loadPlaylist({
                list: id_playlist,
                listType: "playlist"
            })
        }
        function onReadyPlay(event) {
            setTimeout(set(event), 6000)
        }

        function set(e) {
            window.lista = e.target.getPlaylist()

            resolve()
        }


    })
}