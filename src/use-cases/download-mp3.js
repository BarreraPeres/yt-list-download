import ytdl from "@distube/ytdl-core";
import fs from "node:fs"
import path from "node:path";
import { finished } from 'node:stream/promises';
import { createFolder } from "../utils/create-folder.js";
export class YoutubeMp3 {

    async download(url, title) {
        const folder = await createFolder()
        const writer = fs.createWriteStream(path.resolve(folder, `${title}.mp3`))

        ytdl(url, {
            filter: "audioonly",
        }).pipe(writer)
            .on("error", (e) => {
                console.log(e)
            })

        await finished(writer)
    }
}
