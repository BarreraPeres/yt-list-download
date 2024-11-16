import ytdl from "@distube/ytdl-core"
import { YoutubeMp3 } from "../use-cases/download-mp3.js"
import path from 'node:path';
import fs from 'node:fs';
export async function downloadController(request, reply) {
    const audioMp3 = new YoutubeMp3()

    try {
        const { id_video } = request.params

        const url = `https://www.youtube.com/watch?v=${id_video}`
        const { videoDetails } = await ytdl.getBasicInfo(url)

        await audioMp3.download(url, videoDetails.title)

        const filepath = path.resolve("./src/downloads/", `${videoDetails.title}.mp3`)

        await new Promise((resolve, reject) => {
            const audio_read = fs.createReadStream(filepath)

            audio_read.on("end", resolve(
                reply.status(200).headers({
                    "content-type": "audio/mpeg",
                    "content-disposition": `attachment; filename=${videoDetails.title}.mp3`
                }).send(audio_read),
            ))
            audio_read.on("error", reject)
        })

    } catch (e) {
        console.log(e)
        return reply.status(500).send({ message: "erro ao baixar" })
    }

}