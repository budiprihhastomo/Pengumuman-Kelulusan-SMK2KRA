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
import Axios from "axios"
import FileDownload from "downloadjs"
import Body from "react-body-classname"

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

const url = process.env.ENDPOINT_SERVICE
const loading = dataPeserta => {
  const { namaSiswa } = dataPeserta
  let timerInterval
  return Swal.fire({
    title: "Memuat Data!",
    html: `Hai ${namaSiswa}! Data kamu sedang diproses. Tunggu <b></b> detik.`,
    timer: 6000,
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
  })
}

export default class Home extends Component {
  state = {
    noUjian: "",
    dataPeserta: [],
  }

  onHandleInput = ({ target }) => {
    return this.setState({ [target.name]: target.value })
  }

  _onHandleCheck = () => {
    const { noUjian } = this.state
    return Axios.post(url + "/hasil", { noUjian })
  }

  _onHandleDownloadSKL = () => {
    const { suratKeterangan } = this.state.dataPeserta
    return Axios.get(url + "/download/" + suratKeterangan, {
      responseType: "blob",
    })
      .then(({ data }) =>
        FileDownload(data, suratKeterangan, "application/pdf")
      )
      .catch(() => Swal.fire("Kesalahan!", "Data Tidak Ditemukan.", "error"))
  }

  onSubmitData = e => {
    e.preventDefault()
    let noUjian = this.state.noUjian
    noUjian = noUjian.replace(/[^0-9]/g, "")

    if (noUjian.length === 0)
      return Swal.fire("Peringatan!", "Nomor Ujian masih kosong.", "warning")
    if (noUjian.length !== 13)
      return Swal.fire("Kesalahan!", "Nomor Ujian tidak valid.", "warning")

    this._onHandleCheck()
      .then(({ data }) => {
        const dataPeserta = data.data[0]
        this.setState({ dataPeserta })
        loading(dataPeserta).then(result => {
          const { namaSiswa } = dataPeserta
          if (result.dismiss === Swal.DismissReason.timer) {
            setTimeout(() => {
              Swal.fire({
                title: "Lulus Ujian",
                text: `Selamat, ${namaSiswa} telah dinyatakan lulus ujian.`,
                icon: "success",
                confirmButtonText: "Download SKL",
              }).then(res => res.value && this._onHandleDownloadSKL())
            }, 1000)
          }
        })
      })
      .catch(err => {
        if (err.response.status === 404)
          Swal.fire("Kesalahan!", "Data Tidak Ditemukan.", "error")
        return this.setState({ data: err.response.data })
      })
  }

  render() {
    const { noUjian } = this.state
    const noUjianNoMask = noUjian.replace(/[^0-9]/g, "")
    return (
      <Body className="">
        <StyleRoot>
          <div
            className="main"
            style={{ height: "100vh", position: "relative" }}
          >
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
                alt="ilustrator_smkn2kra"
                src={Ilust}
                className="illust"
                style={animation.bounceInDown}
              />
            </div>
            <img
              src={Logo}
              className="logo"
              style={animation.fadeIn}
              alt="logo_smkn2kra"
            />
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
                          noUjianNoMask.length < 13
                            ? noUjianNoMask.length !== 0
                              ? "error"
                              : ""
                            : "success"
                        }`}
                      >
                        <div className="prefix-icon">
                          <Icon className="icon" icon={baselineSearch} />
                        </div>
                        <InputMask
                          name="noUjian"
                          mask="9999-9999-9999-9"
                          placeholder="Masukan Nomor Ujian Kamu"
                          value={noUjian}
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
                    Website ini dibuat untuk sarana atau fasilitas guna
                    mendukung penyampaian informasi kelulusan siswa/i SMK Negeri
                    2 Karanganyar. Untuk menggunakannya, cukup masukan Nomor
                    Ujian kamu pada kolom diatas dan pastikan benar. Apabila
                    sudah, silahkan tekan tombol kirim berwarna hijau dan tunggu
                    sesaat. Hasil ujian kamu akan segera muncul.
                  </p>
                </div>
              </div>
            </section>
            <section id="footer" style={animation.slideInUp}>
              <span className="author">
                Developed with <span style={{ color: "red" }}>❤</span> by
                Team-IT SMKN2KRA
              </span>
              <span className="divider"> | </span>
              <span className="copyright">
                Copyright © SMK Negeri 2 Karanganyar
              </span>
            </section>
          </div>
        </StyleRoot>
      </Body>
    )
  }
}
