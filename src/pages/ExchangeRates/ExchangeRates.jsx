import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ExchangeRates.css'
import {filterCurrentBanks} from "../../constants/filter";
import {getCurrent} from "../../requests/getCurrent/getCurrent";

const ExchangeRates = () => {

    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [search, setSearch] = useState('')
    const [banks, setBanks] = useState(20)
    const [isLoading, setIsLoading] = useState(false)
    const [filerMenu, setFilterMenu] = useState(false)
    const [whatData, setWhatData] = useState(true)

    const handleChange = async (title) => {
        await getCurrent(setIsLoading, search, setData, title)
    }

    const handleSearchReset = async () => {
        await setSearch('');
        await getCurrent(setIsLoading, false, setData, banks)
    }

    const sortByPriceMax = (item) => {
       let sortedData = data.sort((a, b) => {
            return (b.rates[0][item] - a.rates[0][item])
        })
        setData2(sortedData)
    }

    const sortByPriceMin = (item) => {
        let sortedData = data.sort((a, b) => {
            return (a.rates[0][item] - b.rates[0][item])
        })
        setData2(sortedData)
    }

    useEffect(() => {
        getCurrent(setIsLoading, search, setData, banks)
    }, [])

  return (
    <div>
        <h2>Курс Валют</h2>
        <button onClick={() => {setFilterMenu(true)}}>filtres</button>
        
        <div>
            {filerMenu ? <div className='filtres'>
                <button onClick={() => {setFilterMenu(false)}}>close</button>
                <div>

                    <input value={search} onChange={(e) => {setSearch(`${e.target.value}`)}} type="text" />

                    <button
                        onClick={handleSearchReset}
                    >
                        Reset</button>

                    <button
                        onClick={async () => await getCurrent(setIsLoading, search, setData, banks)}
                    >
                        Search
                    </button>


                </div>
                <div>
                    <button onClick={() => {sortByPriceMax('buy_usd')}}>Сначало дороже $ покупка</button>
                    <button onClick={() => {sortByPriceMax('sell_usd')}}>Сначало дороже $ продажа</button>
                </div>
                <div>
                    <button onClick={() => sortByPriceMax('buy_eur')}>Сначало дороже € покупка</button>
                    <button onClick={() => {sortByPriceMax('sell_eur')}}>Сначало дороже € продажа</button>
                </div>
                <div>
                    <button onClick={() => {sortByPriceMax('buy_rub')}}>Сначало дороже ₽ покупка</button>  
                    <button onClick={() => sortByPriceMax('sell_rub')}>Сначало дороже ₽ продажа</button>                    
                </div>
                <div>
                    <button onClick={() => {sortByPriceMax('buy_kzt')}}>Сначало дороже ₸ покупка</button>
                    <button onClick={() => {sortByPriceMax('sell_kzt')}}>Сначало дороже ₸ продажа</button>
                </div>
                <div>
                    <button onClick={() => {sortByPriceMin('buy_usd')}}>Сначало дешевле $ покупка</button>
                    <button onClick={() => {sortByPriceMin('sell_usd')}}>Сначало дешевле $ продажа</button>
                </div>
                <div>
                    <button onClick={() => {sortByPriceMin('buy_eur')}}>Сначало дешевле € покупка</button>
                    <button onClick={() => {sortByPriceMin('sell_eur')}}>Сначало дешевле € продажа</button>
                </div>
                <div>
                    <button onClick={() => {sortByPriceMin('buy_rub')}}>Сначало дешевле ₽ покупка</button>
                    <button onClick={() => {sortByPriceMin('sell_rub')}}>Сначало дешевле ₽ продажа</button>
                </div>
                <div>
                    <button onClick={() => {sortByPriceMin('buy_kzt')}}>Сначало дешевле ₸ покупка</button>
                    <button onClick={() => {sortByPriceMin('sell_kzt')}}>Сначало дешевле ₸ продажа</button>
                </div>
            </div> : null}

        </div>
            { isLoading ? 
            <div>Loading...</div>
            :
            <div>

             <div>
                 {filterCurrentBanks.map((item, idx) => {
                     return (
                         <span
                             onClick={() => handleChange(item.title)}
                             className='pointer'
                             key={idx}>
                             {item.title}
                         </span>
                     )
                 })}
             </div>

                <table border='1'>
                    <tr>
                        <td>Банк</td>
                        <td>$ покупка</td>
                        <td>$ продажа</td>
                        <td>__</td>
                        <td>€ покупка</td>
                        <td>€ продажа</td>
                        <td>__</td>
                        <td>₽ покупка</td>
                        <td>₽ продажа</td>
                        <td>__</td>
                        <td>₸ покупка</td>
                        <td>₸ продажа</td>
                    </tr>

                    {data.map((item, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{item.title}</td>
                                <td>{item.rates[0].buy_usd}</td>
                                <td>{item.rates[0].sell_usd}</td>
                                <td></td>
                                <td>{item.rates[0].buy_eur}</td>
                                <td>{item.rates[0].sell_usd}</td>
                                <td></td>
                                <td>{item.rates[0].buy_rub}</td>
                                <td>{item.rates[0].sell_rub}</td>
                                <td></td>
                                <td>{item.rates[0].buy_kzt}</td>
                                <td>{item.rates[0].sell_kzt}</td>
                            </tr>
                        )
                    })
                    }


                </table>
            </div>
            }
            
    </div>
  )
}

export default ExchangeRates