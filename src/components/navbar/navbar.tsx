import { Link } from "gatsby"
import React, { FC } from "react"

import "./navbar.scss"

export const Navbar: FC = () => (
    <div className="navbar">
        <ul>
            <li>
                <Link to="/">Allgemein</Link>
            </li>
            <li>
                <Link to="/what-is-a-hackathon">Was ist ein Hackathon?</Link>
            </li>
            {/*<li>*/}
            {/*    <Link to="/challenges">Challenges</Link>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*    <Link to="/results">*/}
            {/*        <strong>Ergebnisse</strong>*/}
            {/*    </Link>*/}
            {/*</li>*/}
            <li>
                <Link to="/partner">Partner</Link>
            </li>
            <li>
                <Link to="/participate">Teilnehmen</Link>
            </li>
            <li>
                <Link to="/support">Unterstützen</Link>
            </li>
        </ul>
        <div className="archive">
            <p>Archiv</p>
            <ul>
                <li>
                    <a href="https://hackathon2022.digitale-oberlausitz.eu">2022</a>
                </li>
            </ul>
        </div>
    </div>
)
