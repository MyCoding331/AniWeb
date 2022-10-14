import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useScrollBlock from "../useScrollBlock";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { IconContext } from "react-icons";
import Search from "./Search";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { HiMenuAlt3 } from "react-icons/hi";
import "./Navigation.scss";
import { CSSTransition } from "react-transition-group";
function Nav() {
  const [isActive, setIsActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  const { width } = useWindowDimensions();

  const [blockScroll, allowScroll] = useScrollBlock();

  const allowscrollMenu = () => {
    allowScroll();
    setOpen(!open);
  };
  const handleMenu = () => {
    blockScroll();

    setOpen(!open);
  };

  const handleClick = () => {
    blockScroll();
    setIsActive(!isActive);
  };
  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setMenu(!menu);
  };

  return (
    <>
      <div className="nav-bar slide-up">
        <nav>
          <Link to="/">
            <h1>
              Ani<span style={{ color: "#7676ff" }}>Web</span>{" "}
            </h1>
          </Link>

          {width <= 800 && (
            <IconContext.Provider
              value={{
                size: "1.5rem",
                style: {
                  verticalAlign: "middle",
                  marginBottom: "0.2rem",
                  marginRight: "0.3rem",
                },
              }}
            >
              <div className="flex">
                <Link to={"/donate"} className="donate-wrapper">
                  <button className="click-donate">
                    <p>$</p>
                  </button>
                </Link>
                <button onClick={handleClick}>
                  <FiSearch />
                </button>
                <button onClick={handleMenu}>
                  <HiMenuAlt3 />
                </button>
              </div>
            </IconContext.Provider>
          )}
          {width > 800 && (
            <IconContext.Provider
              value={{
                size: "1rem",
                style: {
                  verticalAlign: "middle",
                  marginBottom: "0.2rem",
                  marginRight: "0.3rem",
                },
              }}
            >
              <div className="flex">
                <Link to={"/donate"}>
                  <button className="click-donate">donate $</button>
                </Link>
                <div className="menu-burger">
                  <AiOutlineMenu onClick={toTop} />
                </div>
                <button onClick={handleClick}>
                  <FiSearch />
                  Search
                </button>
              </div>
            </IconContext.Provider>
          )}
        </nav>
      </div>
      <CSSTransition in={menu} timeout={500} classNames="my-node" unmountOnExit>
        <div className={"nav-container"}>
          <div className="nav-links">
            <NavLink
              to="/"
              // onClick={() => setMenu(!menu)}
            >
              Home
            </NavLink>
            <NavLink
              to="/trending"
              // onClick={() => setMenu(!menu)}
            >
              Trending
            </NavLink>
            <NavLink
              to="/explore"
              // onClick={() => setMenu(!menu)}
            >
              Explore
            </NavLink>
            <NavLink
              to="/favourites"
              // onClick={() => setMenu(!menu)}
            >
              Favourites
            </NavLink>
            <NavLink
              to="/top50"
              // onClick={() => setMenu(!menu)}
            >
              Top 50
            </NavLink>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition in={open} timeout={500} classNames="my-burger" unmountOnExit>
        <div className="hamburger-menu">
          <NavLink to="/" onClick={allowscrollMenu}>
            Home
          </NavLink>
          <NavLink to="/trending" onClick={allowscrollMenu}>
            Trending
          </NavLink>
          <NavLink to="/explore" onClick={allowscrollMenu}>
            Explore
          </NavLink>
          <NavLink to="/favourites" onClick={allowscrollMenu}>
            Favourites
          </NavLink>
          <NavLink to="/top50" onClick={allowscrollMenu}>
            Top 50
          </NavLink>
          <div className="btn">
            <button className="close">
              <IoMdClose onClick={allowscrollMenu} />
            </button>
          </div>
        </div>
      </CSSTransition>

      <div className="allow" onClick={allowScroll}>
        {isActive && <Search isActive={isActive} setIsActive={setIsActive} />}
      </div>
      {isActive && <div className="shadow"></div>}
      {open && <div className="shadow"></div>}
    </>
  );
}

export default Nav;
