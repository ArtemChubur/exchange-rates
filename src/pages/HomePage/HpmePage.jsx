import React from 'react'

const HpmePage = () => {
  return (
    <div>
        <h2>Выберите страницу</h2>
        <a href="/weather"><input type="button"  value='Прогноз погоды'/></a>
        <a href="/ExchangeRates"><input  type="button"  value='Курсы валют' /></a>
    </div>
  )
}

export default HpmePage