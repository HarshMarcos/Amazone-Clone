import React from 'react'
import Carousel from 'react-material-ui-carousel'
import './Banner.css'


const data = [
    "https://rukminim1.flixcart.com/flap/1680/280/image/1defb861e409319b.jpg?q=50",
    " https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/8d4150cc4f3f967d.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50"
]

const Banner = () => {
  return (
    <Carousel
        className='carousel'
        animation='slide'
        autoPlay={true}
        indicators={false}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        navButtonsProps={{
            style:{
                background: '#fff',
                color: '#494949',
                borderRadius: 0,
                marginTop: -22,
                height: '104px'
            }
        }}    
    >
        {
            data.map((img, i) => {
                return(
                    <>
                        <img src={img} alt='' className='' />
                    </>
                )
            })
        }
        
    </Carousel>
  )
}

export default Banner