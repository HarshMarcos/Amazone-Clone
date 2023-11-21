import React, { useEffect, useState } from 'react'
import './Buynow.css'
import { Divider } from '@mui/material';
import Empty from './Empty';
import Subtotal from './Subtotal';
import Right from './Right';
import Option from './Option';

const Buynow = () => {

  const [cartdata, setCartdata] = useState("");

  const getdatabuy = async () =>{
    const res = await fetch("/cartdetails", {
        method:"GET",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials:'include',
    });

    const data = await res.json();

    if(res.status !== 201){
        alert("no data available");
    }else{
        console.log("Data cart");
        setCartdata(data.carts);
    }
  };

  useEffect(() => {
    getdatabuy();
  }, []);

  return (
    <>
        {cartdata.length ? (
            <div className='buynow_section'>
                <div className='buynow_container'>
                    <div  className='left_but'>
                        <h1>Shopping Cart</h1>
                        <p>Select all items</p>
                        <span className='leftbuyprice'>Price</span>
                        <Divider />

                        {cartdata.map((e, ind) => {
                            return(
                                <>
                                    <div className='item_container' key={ind}>
                                        <img src={e.detailUrl} alt='imgitem' />
                                        <div className='item_details'>
                                            <h3>{e.title.longTitle}</h3>
                                            <h3>{e.title.shortTitle}</h3>
                                            <h3 className='differentprice'>Rs{e.price.cost}.00</h3>
                                            <p className='unusuall'>
                                                Usually dispatched in 8 days.
                                            </p>
                                            <p>Eligible for FREE shipping</p>
                                            <img
                                                src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png"
                                                alt="logo"
                                            />
                                            <Option deletedata={e.id} get={getdatabuy} />
                                        </div>
                                        <h3 className='item_price'>Rs{e.price.cost}.00</h3>
                                    </div>
                                    <Divider />
                                </>
                            );
                        })}

                        <Subtotal iteam={cartdata} />
                    </div>
                    <Right iteam={cartdata} />
                </div>
            </div>
        ) : (
            <Empty />
        )}
    
    </>
    
  )
}

export default Buynow