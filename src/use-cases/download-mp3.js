import ytdl from "@distube/ytdl-core";
import fs from "node:fs"
import path from "node:path";
export class YoutubeMp3 {

    async download(url, title) {

        const audio = ytdl(url, {
            filter: "audioonly",
        })
        const writer = fs.createWriteStream(path.resolve("./src/downloads/", `${title}.mp3`))

        return new Promise((resolve, reject) => {
            audio
                .pipe(writer)
                .on("finish", () => {
                    console.log(`Download concluído do ${title}`)
                    resolve()
                })
                .on("error", (e) => {
                    console.error(`Erro no ${title} `, e)
                    reject()
                })

        })
    }
}