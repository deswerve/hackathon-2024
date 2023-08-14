import React, { useState } from "react"
import { HeadFC, PageProps } from "gatsby"
import { Layout } from "../components/layout"
import ReactMarkdown from "react-markdown"
import { SponsoringContractForm } from "../components/SponsoringContractForm"
import * as R from "ramda"
import "./sponsoring.scss"

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
            label: "Entwicklungsgesellschaft Niederschlesische Oberlausitz mbH",
            linkTarget: "https://wirtschaft-goerlitz.de/",
            // logoImgPath: "/logo_eno.webp",
            logoCss: {
                backgroundColor: "#032338",
                padding: "1em",
            },
        },
        {
            id: "zeiss",
            label: "ZEISS Digital Innovation",
            linkTarget: "https://www.zeiss.com/digital-innovation/home.html",
            logoImgPath: "/logo_zeiss.svg",
            logoCss: {
                height: "150px",
            },
        },
        {
            id: "launix",
            label: "Launix",
            linkTarget: "https://launix.de/launix/",
            // logoImgPath: "/logo_launix.png",
            logoCss: {
                width: "400px",
            },
        },
    ],
    silver: [
        {
            id: "sednasoft",
            label: "SednaSoft",
            linkTarget: "https://sedna-soft.de/",
            // logoImgPath: "/logo_sednasoft.png",
        },
    ],
    bronze: [
        {
            id: "tragwerk",
            label: "t(r)agwerk",
            linkTarget: "https://www.tragwerk.online",
            // logoImgPath: "/logo_tragwerk.jpg",
            logoCss: {
                width: "400px",
            },
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

const SponsoringPage: React.FC<PageProps> = () => {
    const [hideMarkdown, setHideMarkdown] = useState(false)

    return (
        <Layout>
            {!hideMarkdown && (
                <>
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

                    <ReactMarkdown
                        children={`
---
## Wir sind auf der Suche nach weiteren Sponsoren

Wir sind auf der Suche nach weiteren Sponsoren, die unsere Veranstaltung finanziell unterstützen möchten.

Wenn Sie unsere Vision teilen, unterstützen Sie uns! Das eingeworbene Geld wird vollständig für die 
Organisation des Hackathons sowie die Finanzierung von Preisen für die Teilnehmenden verwendet.

**Am Ende dieser Seite finden Sie ein Anfrageformular oder melden Sie sich bei Interesse oder Fragen gerne unter [hackathon@digitale-oberlausitz.eu](mailto:hackathon@digitale-oberlausitz.eu).**

## Bronze-Paket  (256 Euro)

- Nennung als Veranstaltungsparter auf Social-Media-Auftritten des Vereins
- Flyer/Info-Material als Beigabe zu Infobeuteln für Teilnehmende
- Erwähnung mit Logo auf Hackathon-Website
- Erwähnung als Veranstaltungspartner durch uns bei Eröffnungsveranstaltung
- kleines Logo auf Sponsoren-Poster bei der Veranstaltung
- Erwähnung auf Werbe-Plakat (zeitlich befristed bis 31.08.2023)

## Silber-Paket (512 Euro)
- alles aus Bronze-Paket
- Sponsor kann sich auf Eröffnungsveranstaltung selbst vorstellen (5 Min)
- Zugang zu Offline-Job-Wall (Pinnwand) bei der Veranstaltung
- Aufhängen von eigenen Plakaten (in Abstimmung mit uns)
- mittleres Logo auf Sponsoren-Poster
- Trailer/Poster auf Bildschirm-Wand im Durchlauf

## Gold-Paket (1024 Euro)
- alles aus Silber-Paket
- stellen eines Jury-Mitglieds (Details des Jury-Prozesses folgen)
- Zitat/Grußwort auf der Website (begrenzte Zeichenzahl, Foto von Personen + Logo möglich, Darstellung im Stile von Testimonials)
- aufstellen eines Rollups (muss von Sponsor bereitgestellt werden)
- großes Logo auf Sponsoring-Poster
            `}
                    />
                </>
            )}
            <SponsoringContractForm onShowResultPage={setHideMarkdown} />
        </Layout>
    )
}

export default SponsoringPage

export const Head: HeadFC = () => <title>Sponsoring</title>
