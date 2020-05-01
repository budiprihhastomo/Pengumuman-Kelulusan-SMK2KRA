import React from "react"
import "../styles/styles.css"
import Home from "./home"

const ComingSoon = props => {
  const { days, hours, minutes, seconds, completed } = props
  if (completed) {
    return <Home />
  } else {
    document.body.classList.add("banner-container")
    return (
      <>
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
                <span style={{ color: "red" }}>❤</span> Stay Tuned! <p className="copyright-cs">Copyright © SMK Negeri 2 Karanganyar</p>
              </h3>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default ComingSoon
