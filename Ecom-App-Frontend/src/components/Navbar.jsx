import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import React, { useContext, useState, useEffect } from 'react'
import Rightnavbar from './Rightnavbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { Logout, Search, ShoppingCart } from '@mui/icons-material';
import { makeStyles } from '@material-ui/core';
import "./Navbar.css";
import { Avatar, Badge, IconButton, List, ListItem, Menu, MenuItem } from '@mui/material';
import { Drawer } from '@mui/material';
import { Logincontext } from "./context/Contextprovider";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


 const usestyle = makeStyles({
    component: {
        marginTop:10,
        marginRight: "-50px",
        width: "300px",
        padding: 50,
        height: "300px"
    }
 })


const Navbar = () => {

  const history = useNavigate("");
  const { account, setAccount } = useContext(Logincontext);

  const [open, setOpen] = useState(false);

  //for searching in data
  const [text, setText] = useState("");

  //text which are entered
  //console.log(text);

  //list dropdown
  const [liopen, setLiopen] = useState(true);
  const [dropen, setDropen] = useState(false);

  //only for search
  const { products } = useSelector((state) => state.getproductsdata);

  const classes = usestyle();

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //given user are valid or not

  const getdetailsvaliduser = async () => {
    const res = await fetch("http://localhost:8000/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    if (res.status !== 201) {
      console.log("first login");
    } else {
      // console.log("cart add ho gya hain");
      setAccount(data);
    }
  };

  //it call just after page loading
  useEffect(() => {
    getdetailsvaliduser();
  }, []);

  // for logout
  const logoutuser = async () => {
    const res2 = await fetch("http://localhost:8000/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data2 = await res2.json();

    if (!res2.status === 201) {
      const error = new Error(res2.error);
      throw error;
    } else {
      setAccount(false);
      setOpen(false);
      toast.success("user Logout 😃!", {
        position: "top-center",
      });
      history("/");
    }
  };

  // for drawer

  const handelopen = () => {
    setDropen(true);
  };

  const handleClosedr = () => {
    setDropen(false);
  };

  const getText = (text) => {
  setText(text);
   setLiopen(false);
  };

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handelopen}>
            <MenuTwoToneIcon style={{ color: "#fff" }} />
          </IconButton>
          {/* here define the right header */}
          <Drawer open={dropen} onClose={handleClosedr}>
            <Rightnavbar userlog={logoutuser} logclose={handleClosedr} />
          </Drawer>

          <div className="navlogo">
            <NavLink to="/">
              <img src="./amazon_PNG25.png" alt="" />
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input
              type="text"
              name=""
              onChange={(e) => getText(e.target.value)}
              placeholder="Search Your Products"
            />
            <div className="search_icon">
              <Search id="search"/>
            </div>

            {/* now code for search filter only */}

            {text && (
              <List className="extrasearch" hidden={liopen}>
                {products
                  .filter((product) =>
                    product.title.longTitle
                      .toLowerCase()
                      .includes(text.toLowerCase())
                  )
                  .map((product) => (
                    <ListItem>
                      <NavLink
                        to={`http://localhost:8000/getproductsone/${product.id}`}
                        onClick={() => setLiopen(true)}
                      >
                        {product.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))}
              </List>
            )}
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            <NavLink to="/login">SignIn</NavLink>
          </div>

          {account ? (
            <NavLink to="/buynow">
              <div className="cart_btn">
                <Badge badgeContent={account.carts.length} color="secondary">
                  <ShoppingCart id="icon" />
                </Badge>

                <p>Cart</p>
              </div>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <div className="cart_btn">
                <Badge badgeContent={0} color="secondary">
                  <ShoppingCart id="icon" />
                </Badge>
                <p>Cart</p>
              </div>
            </NavLink>
          )}

          {
                        account ?
                            <Avatar className="avtar2"
                                onClick={handleClick} title={account.fname.toUpperCase()}>{account.fname[0].toUpperCase()}</Avatar> :
                            <Avatar className="avtar"
                                onClick={handleClick} />
                    }

          {/* {account ? (
            <Avatar className="avtar2">{account.fname[0].toUpperCase()}</Avatar>
          ) : (
            <Avatar className="avtar"></Avatar>
          )} */}

          <div className="menu_div">
            <Menu
              anchorEl={open}
              open={Boolean(open)}
              onClose={handleClose}
              className={classes.component}
            >
              <MenuItem onClick={handleClose} style={{ margin: 10 }}>
                My account
              </MenuItem>
              {account ? (
                <MenuItem
                  onClick={()=> { handleClose();logoutuser();}}
                  // for calling two function by one onclick in react we follow this syntax
                  // {() => { func1(); func2();}}
                  style={{ margin: 10 }}
                >
                  <Logout style={{ fontSize: 16, marginRight: 3 }} /> Logout
                </MenuItem>
              ) : (
                ""
              )}
            </Menu>
          </div>
          <ToastContainer />
        </div>
      </nav>
    </header>
  );
}


export default Navbar