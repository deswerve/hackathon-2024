import React from "react"
import * as R from "ramda"
import { HeadFC, PageProps } from "gatsby"
import ReactMarkdown from "react-markdown"
import { Layout } from "../components/layout"
import "./sponsors.scss"

type Sponsor = {
    /** used internally as identifier. Has to be unique */
    id: string
    /** the company name as it should appear on the page */
    label?: string
    /** the URL for the link */
    linkTarget: string
    /** a (local) path/URL to the image of the logo (e.g. "/logo_acme.png" */
    logoImgPath?: string

    /** additional CSS applied to the logo to make the logo look ok and to get all logos look equally big */
    logoCss?: React.CSSProperties
}

const sponsors: Record<"gold" | "silver" | "bronze", Array<Sponsor>> = {
    gold: [
        {
            id: "eno",
            label: "Unbezahlbarland / ENO",
            linkTarget: "https://wirtschaft-goerlitz.de/",
            logoImgPath: "/logo_ubl.png",
        },
        {
            id: "zeiss",
            label: "ZEISS Digital Innovation",
            linkTarget: "https://www.zeiss.com/digital-innovation/home.html",
            logoImgPath: "/logo_zeiss.svg",
        },
        {
            id: "launix",
            label: "Launix",
            linkTarget: "https://launix.de/",
            logoImgPath: "/logo_launix.png",
        },
    ],
    silver: [
        {
            id: "sednasoft",
            label: "SednaSoft",
            linkTarget: "https://sedna-soft.de/",
            logoImgPath: "/logo_sednasoft.svg",
        },
    ],
    bronze: [
        {
            id: "tragwerk",
            label: "tragwerk",
            linkTarget: "https://tragwerk-goerlitz.de/",
            logoImgPath: "/logo_tragwerk.jpg",
        },
    ],
}

const SponsorDetails: React.FC<{ sponsor: Sponsor }> = ({ sponsor }) => (
    <div className="sponsor-details">
        <a href={sponsor.linkTarget} title={sponsor.label}>
            {sponsor.logoImgPath && (
                <img style={{ ...sponsor.logoCss }} alt={`Logo ${sponsor.label}`} src={sponsor.logoImgPath} />
            )}
            <p>{sponsor.label}</p>
        </a>
    </div>
)

const SponsorsInCategory: React.FC<{ label: string; sponsorsInCategory: Array<Sponsor> }> = ({
    label,
    sponsorsInCategory,
}) => (
    <>
        <h2>{label}</h2>
        {R.sortBy(R.prop("id"), sponsorsInCategory).map((sponsor) => (
            <SponsorDetails key={sponsor.id} sponsor={sponsor} />
        ))}
    </>
)

const SponsorsOverview: React.FC<{ sponsors: Record<"gold" | "silver" | "bronze", Array<Sponsor>> }> = ({
    sponsors,
}) => (
    <div className="sponsor-overview">
        <SponsorsInCategory label="Gold" sponsorsInCategory={sponsors.gold} />
        <SponsorsInCategory label="Silber" sponsorsInCategory={sponsors.silver} />
        <SponsorsInCategory label="Bronze" sponsorsInCategory={sponsors.bronze} />
    </div>
)

const SponsorsPage: React.FC<PageProps> = () => (
    <Layout>
        <ReactMarkdown
            children={`
# Unsere Sponsoren

Wir bedanken uns bei unseren Sponsoren, ohne die der Hackathon so nicht möglich wäre.
Wir glauben, dass ein Hackathon in Görlitz ein Beitrag zur positiven Entwicklung der Region sein kann.
In Görlitz und der Oberlausitz gibt es viele junge und kluge Leute, die ihre Kreativität für
sinnvolle Projekte einsetzen möchten. Ein Hackathon kann ein Ort dafür sein und Technik-Interessierte Menschen
zusammenbringen.
Unsere Sponsoren unterstützen uns aktiv bei der Verwirklichung dieser Vision.
            `}
        />

        <SponsorsOverview sponsors={sponsors} />
    </Layout>
)

export default SponsorsPage
export const Head: HeadFC = () => <title>Unsere Sponsoren</title>
