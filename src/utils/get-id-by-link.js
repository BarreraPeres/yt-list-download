export async function getIdByLink(url) {
    const [link, parms] = url.split("?v=")
    const [id_video, id_playlist] = parms.split("&list=")

    return { id_playlist }

}