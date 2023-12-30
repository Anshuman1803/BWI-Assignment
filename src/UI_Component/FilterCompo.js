import React, { useState } from 'react'

function FilterCompo({filterFun,handleShowFilterClick}) {
    const [priceRange, SetPriceRange] = useState({
        minPrice : 0,
        maxPrice : 2000
    });

    const handlePriceRangeChange = (e)=>{
        SetPriceRange({
            ...priceRange, [e.target.name] : Number(e.target.value)
        })
    }

    const handleFilterClick = (e)=>{
        filterFun(e, priceRange);
        handleShowFilterClick();
    }
    return (
        <div className='filterMainContainer'>
            <div className="filterPopup">
                <h2 className='filterPopup_heading'>Filter Based On Price</h2>
               <div className="filterPopup_rangeBox">
                <p className='filterPopup_priceRangeText'>Min Price : ₹ {priceRange.minPrice}</p>
               <input type="range" className='filterPopup__rangeItem' value={priceRange.minPrice} min={0} max={2000} name='minPrice' onChange={handlePriceRangeChange}/>
               </div>

               <div className="filterPopup_rangeBox">
                <p className='filterPopup_priceRangeText'>Max Price : ₹ {priceRange.maxPrice}</p>
               <input type="range" className='filterPopup__rangeItem' value={priceRange.maxPrice} min={10} max={2000}  name='maxPrice' onChange={handlePriceRangeChange}/>
               </div>

               <button onClick={handleFilterClick} className='filterPopup__button'>Filter</button>
            </div>
        </div>
    )
}

export default FilterCompo
