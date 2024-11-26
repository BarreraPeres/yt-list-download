import { after, before, describe, it } from "node:test"
import assert from "node:assert"
import request from "supertest"
import { app } from "../../server.js"

describe("controller download (e2e) ", () => {

    before(async () => {
        await app.ready()
    })

    after(async () => {
        await app.close()
    })

    it("should be possible to download playlist", async () => {
        const playlistVideosId = ["TNDBtW8YsM0", "SIqlmV7D_LI", "PPyuq7G0BZ0"]

        let status = []
        let res;
        for (let i = 0; i < playlistVideosId.length; i++) {

            //const requests = playlistVideosId.length

            await request(app.server)
                .get(`/download/${playlistVideosId}`)
                .send().then((response) => {
                    status.push(response.statusCode)
                    res = response.body
                })

        }

        assert(status.length === 3)
        assert(res instanceof Buffer)

    })

    it("should be possible to download unique video", async () => {
        const playlistVideosId = "PPyuq7G0BZ0"


        const res = await request(app.server)
            .get(`/download/${playlistVideosId}`)
            .send()


        assert(res.statusCode === 200)
        assert(res.body instanceof Buffer)

    })
})