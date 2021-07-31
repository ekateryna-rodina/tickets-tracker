import Img from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Nav = (data) => {
  const [avatar, setAvatar] = useState("");
  const fetchPhoto = async () => {
    const res = await fetch(
      `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=avatar&client_id=${"PW2UN17TJQt413n2N-QZWaBSCaFB9EZTerCwpMl_W78"}`
    );
    const data = await res.json();
    console.log(data.results[0].urls.thumb);
    setAvatar(data.results[0].urls.thumb);
  };
  React.useEffect(() => {
    async function fetchData() {
      await fetchPhoto();
    }
    fetchData();
  });

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
        <a className="navbar-brand" href="#"></a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse d-flex justify-content-between align-content-center"
          id="navbarSupportedContent"
        >
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item btn btn-primary btn-sm mx-2">
                  <Link href="/">
                    <a className="nav-link" aria-current="page" href="#">
                      <i className="fas fa-clipboard-list fa-2x"></i>
                    </a>
                  </Link>
                </li>
                <li className="nav-item btn btn-primary btn-sm">
                  <Link href="/">
                    <a className="nav-link" aria-current="page" href="#">
                      <i className="far fa-grip-vertical fa-2x"></i>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </form>
          <div className="">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item btn btn-primary btn-sm">
                <Link href="/">
                  <a className="nav-link" aria-current="page">
                    <i className="far fa-bell fa-2x"></i>
                  </a>
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link href="/">
                  <a>
                    <div style={{ display: "grid" }}>
                      <Img
                        height={55}
                        width={55}
                        className="rounded-circle"
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDk3Mzh8MHwxfHNlYXJjaHwxfHxhdmF0YXJ8ZW58MHx8fHwxNjI3NDM0NDU1&ixlib=rb-1.2.1&q=80&w=200"
                        alt=""
                        // layout="fixed"
                      />
                    </div>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
