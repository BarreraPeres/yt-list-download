import fastifyCors from "@fastify/cors"
import fastify from "fastify"
import { routes } from "./controllers/routes.js"

const app = fastify()

app.register(routes)

app.register(fastifyCors, {
    origin: "*",
    exposedHeaders: ["content-disposition"]
})

app.listen({ port: 3333 }).then((address) => {
    console.log(`server is running in ${address}`)
})