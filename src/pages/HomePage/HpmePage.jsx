import React from 'react'
import '../HomePage/HomePage.css'

const HpmePage = () => {
  return (
    <div className='home'>
        <h1 className='question'>Куда отправимся?</h1>
        <div className='btns'>
          <a href="/weather"><input className='btn' type="button"  value='Прогноз погоды'/></a>
          <a href="/ExchangeRates"><input className='btn exBtn'  type="button"  value='Курсы валют' /></a>
        </div>
    </div>
  )
}

export default HpmePage