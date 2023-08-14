import React, { FC } from "react"
import { Layout } from "../components/layout"
import { graphql, HeadFC, PageProps } from "gatsby"

export const query = graphql`
    query ($id: String) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                slug
                title
            }
            html
        }
    }
`

type QueryResult = {
    markdownRemark: {
        frontmatter: {
            slug: string
            title: string
        }
        html: string
    }
}

const ContentPage: FC<PageProps<QueryResult>> = ({ data, children }) => {
    const {
        html,
        frontmatter: { slug },
    } = data.markdownRemark
    return (
        <Layout>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </Layout>
    )
}

export default ContentPage
export const Head: HeadFC<QueryResult> = ({ data }) => <title>{data.markdownRemark.frontmatter.title}</title>
