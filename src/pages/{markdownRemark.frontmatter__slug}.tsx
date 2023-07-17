import React, { FC, useState } from "react"
import { Layout } from "../components/layout"
import { graphql, HeadFC, PageProps } from "gatsby"
import { SponsoringContractForm } from "../components/SponsoringContractForm";

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
    const [hideMarkdown, setHideMarkdown] = useState(false);
    const {html, frontmatter: {slug}} = data.markdownRemark;
    return (
        <Layout>
            {!hideMarkdown && <div dangerouslySetInnerHTML={{__html: html}}/>}
            {slug === 'sponsoring' && <SponsoringContractForm onShowResultPage={setHideMarkdown}/>}
        </Layout>
    );
}

export default ContentPage
export const Head: HeadFC<QueryResult> = ({ data }) => <title>{data.markdownRemark.frontmatter.title}</title>
