import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import axios from "axios"
import ComingSoon from "../components/comingsoon"
import Countdown from "react-countdown"
import moment from "moment"

const url = process.env.ENDPOINT_SERVICE

const App = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(url + "/release").then(({ data }) => setData(data))
  }, [])
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pengumuman | SMK Negeri 2 Karanganyar</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div>
        <Countdown
          date={moment(data.time).valueOf()}
          renderer={props => <ComingSoon {...props} />}
        />
      </div>
    </>
  )
}

export default App
