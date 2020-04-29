import React from "react"
import { Helmet } from "react-helmet"
import HomePage from "./home"

const App = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pengumuman | SMK Negeri 2 Karanganyar</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <HomePage />
    </>
  )
}

export default App
