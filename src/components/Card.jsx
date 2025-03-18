import React from 'react'
import '../styles/Card.css'

const Card = ({item,handleClick,showCartVal}) => {
    const {image,title,price} = item
  return (
    <div className='card'>
        <div className='img-box'>
            <img src={image} alt='image'/>
        </div>
        <div className='details'>
            <p>{title}</p>
            <p>Price - Rs{price}</p>

            {!showCartVal && <button onClick={() => handleClick(item)}>Add to cart</button>}
        </div>
    </div>
  )
}
export default Card
