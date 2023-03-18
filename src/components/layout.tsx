import { Link } from "gatsby"
import React, { FC, PropsWithChildren } from "react"
import { Navbar } from "./navbar/navbar"

import "typeface-roboto-mono"

import "./index.scss"
import "./App.scss"

export const Layout: FC<PropsWithChildren> = ({ children }) => (
    <div className="App">
        <div className="header dark">
            <div className="title">
                <p>
                    <a href="https://www.digitale-oberlausitz.eu">Digitale Oberlausitz e.V.</a> präsentiert:
                </p>
                <Link to="/">
                    <h1>
                        Hackathon
                        <br /> 2023
                    </h1>
                </Link>
            </div>
        </div>

        <div className="main">
            <Navbar />

            <main className="content">{children}</main>
        </div>

        <div className="footer dark">
            <div className="footer-content">
                <Link to="/impressum">Impressum</Link>
                <Link to="/code-of-conduct">Code of Conduct</Link>
            </div>
        </div>
    </div>
)
