import React, { Component } from "react"
import Ilust from "../assets/svg/Ilust.svg"
import Logo from "../assets/svg/Logo.svg"
import { Icon } from "@iconify/react"
import baselineSearch from "@iconify/icons-ic/search"
import baselineSend from "@iconify/icons-ic/send"
import { slideInRight, bounceInDown, fadeIn, slideInUp } from "react-animations"
import Radium, { StyleRoot } from "radium"
import InputMask from "react-input-mask"
import Swal from "sweetalert2"

const animation = {
  slideInRight: {
    animation: "x 2s",
    animationName: Radium.keyframes(slideInRight, "slideInRight"),
  },
  bounceInDown: {
    animation: "x 2.5s",
    animationName: Radium.keyframes(bounceInDown, "bounceInDown"),
  },
  fadeIn: {
    animation: "x 2.5s",
    animationName: Radium.keyframes(fadeIn, "fadeIn"),
  },
  slideInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(slideInUp, "slideInUp"),
  },
}

export default class Home extends Component {
  state = {
    nomorUjian: "",
  }

  onHandleInput = ({ target }) => {
    return this.setState({ [target.name]: target.value })
  }

  onSubmitData = e => {
    e.preventDefault()
    let nomorUjian = this.state.nomorUjian
    nomorUjian = nomorUjian.replace(/[^0-9]/g, "")

    if (nomorUjian.length === 0)
      return Swal.fire("Peringatan!", "Nomor Ujian masih kosong.", "warning")
    if (nomorUjian.length !== 13)
      return Swal.fire("Kesalahan!", "Nomor Ujian tidak valid.", "warning")

    let timerInterval
    Swal.fire({
      title: "Memeriksa Database!",
      html: "Proses sedang berlangsung dan butuh waktu selama <b></b> detik.",
      timer: 3000,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getContent()
          if (content) {
            const b = content.querySelector("b")
            if (b) {
              b.textContent = Swal.getTimerLeft()
                .toString()
                .substr(0, 1)
            }
          }
        }, 1000)
      },
      onClose: () => {
        clearInterval(timerInterval)
      },
    }).then(result => {
      if (result.dismiss === Swal.DismissReason.timer) {
        setTimeout(() => {
          Swal.fire({
            title: "Lulus Ujian",
            text: "Selamat, Kamu dinyatakan lulus ujian.",
            icon: "success",
            confirmButtonText: "Download SKL",
          }).then(() => {
            return false
          })
        }, 2000)
      }
    })
  }

  render() {
    const { nomorUjian } = this.state
    const nomorUjianNoMask = nomorUjian.replace(/[^0-9]/g, "")
    return (
      <StyleRoot>
        <div className="main" style={{ height: "100vh", position: "relative" }}>
          <div style={animation.slideInRight} className="wave" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              position: "absolute",
              right: 0,
              paddingRight: "150px",
            }}
          >
            <img
              src={Ilust}
              className="illust"
              style={animation.bounceInDown}
            />
          </div>
          <img src={Logo} className="logo" style={animation.fadeIn} />
          <section id="content" style={animation.fadeIn}>
            <div className="form-group">
              <div className="head-form">
                <div className="title-group">
                  <div className="primary-title">
                    <h3 className="open-title">PORTAL INFORMASI KELULUSAN</h3>
                    <h1 className="school-title">SMK NEGERI 2 KARANGANYAR</h1>
                  </div>
                  <p className="check-title">
                    Ayo, Periksa Hasil Ujian Kamu Disini !
                  </p>
                  <form
                    className="form-inline"
                    action="true"
                    onSubmit={this.onSubmitData}
                  >
                    <div
                      className={`input-decoration ${
                        nomorUjianNoMask.length < 13
                          ? nomorUjianNoMask.length !== 0
                            ? "error"
                            : ""
                          : "success"
                      }`}
                    >
                      <div className="prefix-icon">
                        <Icon className="icon" icon={baselineSearch} />
                      </div>
                      <InputMask
                        name="nomorUjian"
                        mask="9999-9999-9999-9"
                        placeholder="Masukan Nomor Ujian Kamu"
                        value={nomorUjian}
                        onChange={this.onHandleInput}
                      >
                        {inputProps => <input {...inputProps} type="text" />}
                      </InputMask>
                    </div>
                    <button className="btn btn-send">
                      <Icon className="prefix" icon={baselineSend} />
                    </button>
                  </form>
                </div>
              </div>
              <div className="bottom-form">
                <p className="description">
                  Website ini dibuat untuk sarana atau fasilitas guna mendukung
                  penyampaian informasi kelulusan siswa/i SMK Negeri 2
                  Karanganyar. Untuk menggunakannya, cukup masukan Nomor Ujian
                  kamu pada kolom diatas dan pastikan benar. Apabila sudah,
                  silahkan tekan tombol kirim berwarna hijau dan tunggu sesaat.
                  Hasil ujian kamu akan segera muncul.
                </p>
              </div>
            </div>
          </section>
          <section id="footer" style={animation.slideInUp}>
            <span className="author">
              Developed with <span style={{ color: "red" }}>❤</span> by Team-IT
              SMKN2KRA
            </span>
            <span className="divider"> | </span>
            <span className="copyright">
              Copyright © SMK Negeri 2 Karanganyar
            </span>
          </section>
        </div>
      </StyleRoot>
    )
  }
}
