import ytdl from "@distube/ytdl-core";
import { downloadMp4 } from "../use-cases/download-mp4.js"
export async function downloadController(request, reply) {


    try {
        const id_video = request.params.id_video
        const url = `https://www.youtube.com/watch?v=${id_video}`

        const { videoDetails } = await ytdl.getBasicInfo(url)

        await downloadMp4(url, videoDetails.title)

        return reply.status(200).send({ title: videoDetails.title })

    } catch (e) {
        console.log(e)
        return reply.status(500).send({ message: "erro ao baixar" })
    }




}