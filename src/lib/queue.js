import axios from "axios"

export async function queue() {
    for (let i = 0; i < window.lista.length; i++) {
        try {
            const { data } = await axios.get(`http://localhost:3333/download/${window.lista[i]}`)
            alert("Download Concluido " + data.title)
        } catch (e) {
            console.log(e)
            throw new Error("Erro ao baixar")
        }

    }

}