import * as React from "react"
import { HeadFC, PageProps } from "gatsby"
import { Layout } from "../components/layout"

const NotFoundPage: React.FC<PageProps> = () => {
    return (
        <Layout>
            <p>404</p>
        </Layout>
    )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
