import * as React from "react"
import { HeadFC, PageProps, Script } from "gatsby"
import Menu from "../components/Menu"

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}
const headingAccentStyles = {
  color: "#663399",
}
const paragraphStyles = {
  marginBottom: 48,
}
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}

const linkStyle = {
  color: "#8954A8",
  fontWeight: "bold",
  fontSize: 16,
  verticalAlign: "5%",
}


const ContactPage: React.FC<PageProps> = () => {
  return (
    <main style={pageStyles}>
      <Menu/>
      <h1 style={headingStyles}>
        Contact
      </h1>
      <p style={paragraphStyles}>
        Pls don't call us ever
      </p>
    </main>
  )
}

export default ContactPage

export const Head: HeadFC = () => <title>Contact</title>
