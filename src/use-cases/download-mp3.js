import ytdl from "@distube/ytdl-core";
import fs from "node:fs"
import path from "node:path";
import { finished } from 'node:stream/promises';
export class YoutubeMp3 {

    async download(url, title) {
        const writer = fs.createWriteStream(path.resolve("./src/downloads/", `${title}.mp3`))

        ytdl(url, {
            filter: "audioonly",
        }).pipe(writer)
            .on("error", (e) => {
                console.log(e)
            })

        await finished(writer)
    }
}
