import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increaseQuantity, decreaseQuantity, removeProduct } from '../ReduxSlice/ReduxSlice';
import toast from 'react-hot-toast';

function CartCompo({ handleCloseCartbuttonClick }) {
  
  const { userCart } = useSelector(state => state.Cart);
  const dispatch = useDispatch()

  const handleDecrementQuantity = (productID) => {
    toast.success('Item Quantity Updated')
    dispatch(decreaseQuantity(productID));
  }

  const handleIncrementQuantity = (productID) => {
    toast.success('Item Quantity Updated')
    dispatch(increaseQuantity(productID));
  }

  const handleRemoveFromCart = (productID) => {
    toast.success('Item Removed Successfully')
    dispatch(removeProduct(productID));
  }

  return (
  <div className="cartMainContainer">
      <aside className='cartSideContainer'>
        <h1 className='cartSideContainer__Heading'>Your Cart <i className="fa-solid fa-xmark closeCartContainer" onClick={handleCloseCartbuttonClick}></i></h1>
        {
          userCart.length === 0 ? <p className='emptyCartMessage'>Cart Empty </p> : <>
            {
              userCart.map((item) => {
                return <div key={item.id} className='cartProduct__Card'>

                  <div className="cartProduct__PosterContainer">
                    <img src={item.images[0]} alt="ProductPoster" className='cartProduct_Poster'  loading='lazy' />
                  </div>

                  <div className="cartProduct__infoContainer">
                    <p className="cartProduct__title">{item.title} </p>
                    <p className="cartProduct__rating">{(item.rating).toFixed(1)} <i className="fa-solid fa-star cartProduct__ratingICON"></i></p>

                    <div className="cartProduct__priceInfoBox">
                      <p className="cartProduct__Dprice">₹{Math.floor(item.price - item.price * item.discountPercentage / 100)}</p>
                      <p className="cartProduct__Aprice">₹{item.price}</p>
                      <p className="cartProduct__DiscountPercentage">{item.discountPercentage}% Off</p></div>

                    <div className="ItemquantityContainer">
                      <button className={`quantityButton ${item.itemQuantity ===1 && "disabledQuantityButton"}`} onClick={() => handleDecrementQuantity(item.id)}>-</button>
                      <span className='itemQuantity'>{item.itemQuantity}</span>
                      <button className='quantityButton' onClick={() => handleIncrementQuantity(item.id)}>+</button>
                    </div>

                    <button className='cartProduct__removeProductButton' onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                  </div>

                </div>
              })
            }

          </>
        }
      </aside>
    </div>
  )
}

export default CartCompo
