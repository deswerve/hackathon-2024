import { GatsbyNode } from "gatsby"

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
    const { createRedirect } = actions

    createRedirect({
        fromPath: "/newsletter",
        toPath: "https://mailchi.mp/26ea828e4a83/newsletter-hackathon",
        statusCode: 200,
        redirectInBrowser: true,
    })
}
