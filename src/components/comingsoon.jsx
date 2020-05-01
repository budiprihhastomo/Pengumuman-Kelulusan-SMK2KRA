import React from "react"
import "../styles/styles.css"
import Home from "./home"
import Body from "react-body-classname"

const ComingSoon = props => {
  const { days, hours, minutes, seconds, completed } = props
  if (completed) {
    return <Home />
  } else {
    return (
      <Body className="banner-container">
        <section id="home">
          <div className="container">
            <div className="heading text-center"></div>
            <div className="countdown styled">
              <div>
                {days} <span>Hari</span>
              </div>
              <div>
                {hours} <span>Jam</span>
              </div>
              <div>
                {minutes} <span>Menit</span>
              </div>
              <div>
                {seconds} <span>Detik</span>
              </div>
            </div>
            <div className="heading text-center">
              <h2>Yeay ! Pengumuman Kelulusan sebentar lagi.</h2>
              <h3>
                <span style={{ color: "red" }}>❤</span> Stay Tuned!{" "}
                <p className="copyright-cs">
                  Copyright © SMK Negeri 2 Karanganyar
                </p>
              </h3>
            </div>
          </div>
        </section>
      </Body>
    )
  }
}

export default ComingSoon
