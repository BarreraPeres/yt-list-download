import fs from "node:fs";
import ytdl from "@distube/ytdl-core";

export async function downloadMp4(url, title) {
    console.log("Download iniciado: ", title)
    const writer = fs.createWriteStream(`${title}.mp4`)
    ytdl(url, {
        filter: "audioonly"
    })
        .pipe(writer)
        .on("finish", () => {
            console.log(`Download concluído do ${title}`);
        })
        .on("error", (e) => {
            console.error(`Erro no ${title}`, e);
        })

    writer.on("close", () => {
        console.log("...")
    })

}