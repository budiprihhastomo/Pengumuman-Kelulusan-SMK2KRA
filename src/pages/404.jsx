import React from "react"
import { Helmet } from "react-helmet"
import "../styles/404.css"
import { Link } from "gatsby"
import Body from "react-body-classname"

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Halaman Tidak Ditemukan | SMK Negeri 2 Karanganyar</title>
        <style></style>
      </Helmet>
      <Body className="bg-purple">
        <div className="stars">
          <div className="central-body">
            <img
              className="image-404"
              src="https://cbt.smkn2kra.sch.id/cbtadmin/theme/assets_pengumuman/404.svg"
              width="300px"
              alt="smkn2kra"
            />
            <Link to="/" className="btn-go-home">
              GO BACK HOME
            </Link>
          </div>
          <div className="objects">
            <img
              className="object_rocket"
              src="https://cbt.smkn2kra.sch.id/cbtadmin/theme/assets_pengumuman/rocket.svg"
              width="40px"
              alt="smkn2kra"
            />
            <div className="earth-moon">
              <img
                className="object_earth"
                src="https://cbt.smkn2kra.sch.id/cbtadmin/theme/assets_pengumuman/earth.svg"
                width="100px"
                alt="smkn2kra"
              />
              <img
                className="object_moon"
                src="https://cbt.smkn2kra.sch.id/cbtadmin/theme/assets_pengumuman/moon.svg"
                width="80px"
                alt="smkn2kra"
              />
            </div>
            <div className="box_astronaut">
              <img
                className="object_astronaut"
                src="https://cbt.smkn2kra.sch.id/cbtadmin/theme/assets_pengumuman/astronaut.svg"
                width="140px"
                alt="smkn2kra"
              />
            </div>
          </div>
          <div className="glowing_stars">
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
          </div>
        </div>
      </Body>
    </>
  )
}

export default NotFound
