import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LoaderCompo from './LoaderCompo';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../ReduxSlice/ReduxSlice';
import toast, { Toaster } from 'react-hot-toast';
import CartCompo from './CartCompo';
import FilterCompo from './FilterCompo';

function HomeComponent() {
  const [showFilterPopup, SetShowFilterPopup] = useState(false)
  const { totalQuantity } = useSelector((state) => state.Cart)
  const [product, setProduct] = useState([]);
  const [searchProduct, setSearchProduct] = useState([]);
  const [showSearchProduct, SetShowSearchProduct] = useState(false)
  const [IsLoading, SetisLoading] = useState(false);
  const [IsCartVisible, SetIsCartVisible] = useState(false);
  const dispatch = useDispatch();

  const loadProduct = () => {
    SetisLoading(true)
    axios.get("https://dummyjson.com/products").then((response) => {
      setProduct(response.data.products);
      SetisLoading(false);
      SetShowSearchProduct(false);
    }).catch((err)=>{
      console.log(err)
    })

  }

  useEffect(() => {
    try {
      loadProduct()
    } catch (err) {
      console.log(err)
    }
  }, []);

  const handleCloseCartbuttonClick = () => {
    SetIsCartVisible(false)
  }
  const handleOpenCartbuttonClick = () => {
    SetIsCartVisible(true)
  }

  const handleAddToCartClick = (product) => {
    toast.success('Item Added Successfully')
    dispatch(addToCart(product))
  }

  const handleOnChangeSearch = (e, priceRange) => {
    SetShowSearchProduct(true)
    if (priceRange) {
      let filteredData = product.filter((item) => (item.price) >= priceRange.minPrice && item.price <= priceRange.maxPrice)
      setSearchProduct(filteredData)
    }
    else {
      let tempSearchText = (e.target.value).trim().toLowerCase();
      let filteredData = product.filter((item) => (item.title).toLowerCase().includes(tempSearchText))
      setSearchProduct(filteredData)
    }
  }

  const handleShowFilterClick = () => {
    SetShowFilterPopup(!showFilterPopup)
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        className="toasterContainer"
      />

      <section className='homeComponent__mainContainer'>

        <header className='homeComponent_HeaderComponent'>

          <div className="HeaderComponent__searchContainer">
            <input type="text" className='searhContainer__searchBox' placeholder='Search Your Product Here' onChange={handleOnChangeSearch}  />
            <button className='clearSearchButton' onClick={loadProduct}>Clear</button>
          </div>

          <div className="cartCount__container" onClick={() => SetIsCartVisible(true)}>
            <i className="fa-solid fa-cart-shopping cartIcon" onClick={handleOpenCartbuttonClick}></i>
            <span className='cartCount__text'>{totalQuantity}</span>
          </div>
        </header>

        <div className="ProductCard__Container">
          <i className={`fa-solid ${showFilterPopup ? 'fa-xmark' : "fa-filter"} filterIconButton`} onClick={handleShowFilterClick}></i>
          {
            IsLoading ? <LoaderCompo /> : <>
              {
                showSearchProduct ?
                  <>
                    {
                      searchProduct.length === 0 ? <p className='productNotFoundMessage'>Product Not Found</p> : <>
                        {
                          searchProduct?.map((item, index) => {
                            return <div className="productCard" key={item.id}>
                              <div className="productPoster__Container">
                                <img src={item.thumbnail} alt="ProductPoster" className='productPoster' loading='lazy' />
                              </div>
                              <p className="productTitle">{item.title.slice(0, 20)}...</p>

                              <div className="cartProduct__priceInfoBox">
                                <p className="cartProduct__Dprice">₹{Math.floor(item.price - item.price * item.discountPercentage / 100)}</p>
                                <p className="cartProduct__Aprice">₹{item.price}</p>
                              </div>
                              <span className='product_discountPercentageText'>{Math.floor(item.discountPercentage)} % off</span>
                              <button type="button" className='addToCartButton' onClick={() => handleAddToCartClick(item)}> Add To Cart</button>
                            </div>
                          })
                        }
                      </>
                    }

                  </>
                  :

                  <>
                    {
                      product?.map((item, index) => {
                        return <div className="productCard" key={item.id}>
                          <div className="productPoster__Container">
                            <img src={item.thumbnail} alt="ProductPoster" className='productPoster' loading='lazy' />
                          </div>
                          <p className="productTitle">{item.title.slice(0, 20)}...</p>

                          <div className="cartProduct__priceInfoBox">
                            <p className="cartProduct__Dprice">₹{Math.floor(item.price - item.price * item.discountPercentage / 100)}</p>
                            <p className="cartProduct__Aprice">₹{item.price}</p>
                          </div>
                          <span className='product_discountPercentageText'>{Math.floor(item.discountPercentage)} % off</span>
                          <button type="button" className='addToCartButton' onClick={() => handleAddToCartClick(item)}> Add To Cart</button>
                        </div>
                      })
                    }
                  </>
              }
            </>
          }

          {
            IsCartVisible && <CartCompo handleCloseCartbuttonClick={handleCloseCartbuttonClick} />
          }

          {
            showFilterPopup && <FilterCompo filterFun={handleOnChangeSearch} handleShowFilterClick={handleShowFilterClick} />
          }
        </div>


      </section>
    </>
  )
}

export default HomeComponent
