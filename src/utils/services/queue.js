import axios from "axios"
import { DownloadProgress } from "../download-progress.js"
import fileDownload from "js-file-download"

const options = {
    method: "GET",
    onDownloadProgress: (e) => {
        DownloadProgress(e.bytes * 100 / e.bytes)
    },
    responseType: "blob"
}

export async function queue() {
    for (let i = 0; i < window.lista.length; i++) {
        try {

            const { data, headers } = await axios.get(`http://localhost:3333/download/${window.lista[i]}`, options)
            const [filenames, title] = headers["content-disposition"].split("=")
            fileDownload(data, title)

            alert("Download Concluido ")

        } catch (e) {
            console.log(e)
            throw new Error("Erro ao baixar")
        }

    }

}

// with js vanilla             

// const blob = new Blob([data], { type: "audio/mpeg" })
// console.log('Content-Type:', headers)

// const url = window.URL.createObjectURL(blob)
// const button = document.createElement('a')
// button.href = url
// button.download = `${data.title}.mp3`

// document.body.appendChild(button)
// button.click()
// document.body.removeChild(button)
// window.URL.revokeObjectURL(url)