import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Main.css';
import {filterCurrentBanks} from "../../../constants/filter";
import {getCurrent} from '../../../requests/getCurrent/getCurrent'

import Sort_icon from '../../../media/free-icon-sort-1251670.png'
import close_icon from '../../../media/icons8-close-30.png'
import reset_icon from '../../../media/reset_icon.png'
import search_icon from '../../../media/icon _search.png';

const Main = () => {

    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [search, setSearch] = useState('')
    const [banks, setBanks] = useState(15)
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
        handleSearchReset()
        // getCurrent(setIsLoading, search, setData, banks)
        let k = data
        setWhatData(false)
        let sortedData = k.sort((a, b) => {
            return (b.rates[0][item] - a.rates[0][item])
        })
        setData2(sortedData)
    }

    const sortByPriceMin = (item) => {
        // getCurrent(setIsLoading, search, setData, banks)
        handleSearchReset()
        let k = data
        setWhatData(false)
        // setData2(data)
        let sortedData = k.sort((a, b) => {
            return (a.rates[0][item] - b.rates[0][item])
        })
        setData2(sortedData)
    }

    useEffect(() => {
        getCurrent(setIsLoading, search, setData, banks)
    }, [])

  return (
    <div className='main_div'>

        <button className='Sort-btn' onClick={() => {setFilterMenu(true)}}><img src={Sort_icon}></img></button>
        
        <div>
            {filerMenu ? <div className='filtres'>
                <button className='close_btn' onClick={() => {setFilterMenu(false)}}><img src={close_icon}></img></button>
                <div>

                    <input className='search_imp' value={search} onChange={(e) => {setSearch(`${e.target.value}`)}} type="text" />

                    <button className='reset-btn' onClick={handleSearchReset}>
                        <img src={reset_icon} alt="" />
                    </button>

                    <button className='search-btn' onClick={async () => await getCurrent(setIsLoading, search, setData, banks)}>
                        <img src={search_icon} alt="" />
                    </button>


                </div>
                    <span className='buy'>Покупка</span>
                    <span className='sell'>Продажа</span>
                    <span className='buy2'>Покупка</span>
                    <span className='sell'>Продажа</span>
                <div>
                    <button className='buy_btn' onClick={() => sortByPriceMax('buy_usd')}>$↑</button>
                    <button className='sell_btn' onClick={() => sortByPriceMax('sell_usd')}>$↑</button>
                    <button className='buy_btn' onClick={() => sortByPriceMin('buy_usd')}>$↓</button>
                    <button className='sell_btn' onClick={() => sortByPriceMin('sell_usd')}>$↓</button>
                </div>
                <div>
                    <button className='buy_btn' onClick={() => sortByPriceMax('buy_eur')}>€↑</button>
                    <button className='sell_btn' onClick={() => sortByPriceMax('sell_eur')}>€↑</button>
                    <button className='buy_btn' onClick={() => sortByPriceMin('buy_eur')}>€↓</button>
                    <button className='sell_btn' onClick={() => sortByPriceMin('sell_eur')}>€↓</button>
                </div>
                <div>
                    <button className='buy_btn' onClick={() => sortByPriceMax('buy_rub')}>₽↑</button>  
                    <button className='sell_btn' onClick={() => sortByPriceMax('sell_rub')}>₽↑</button>
                    <button className='buy_btn' onClick={() => sortByPriceMin('buy_rub')}>₽↓</button>
                    <button className='sell_btn' onClick={() => sortByPriceMin('sell_rub')}>₽↓</button>
                </div>
                <div>
                    <button className='buy_btn' onClick={() => sortByPriceMax('buy_kzt')}>₸↑</button>
                    <button className='sell_btn' onClick={() => sortByPriceMax('sell_kzt')}>₸↑</button>
                    <button className='buy_btn' onClick={() => sortByPriceMin('buy_kzt')}>₸↓</button>
                    <button className='sell_btn' onClick={() => sortByPriceMin('sell_kzt')}>₸↓</button>
                </div>
            </div> : null}

        </div>
            { isLoading ? 
            <div className='loading'>Loading...</div>
            :
            <div>

            

                <table className='table'>
                    <tr>
                        <td className='stolbs2'>Банк</td>
                        <td className='stolbs'>$ покупка</td>
                        <td className='stolbs'>$ продажа</td>
                        <td className='stolbs null'></td>
                        <td className='stolbs'>€ покупка</td>
                        <td className='stolbs'>€ продажа</td>
                        <td className='stolbs null'></td>
                        <td className='stolbs'>₽ покупка</td>
                        <td className='stolbs'>₽ продажа</td>
                        <td className='stolbs null'></td>
                        <td className='stolbs'>₸ покупка</td>
                        <td className='stolbs'>₸ продажа</td>
                    </tr>

                {whatData ?
                    data.map((item, idx) => {
                        return (
                            <tr key={idx}>
                                <td className='stolbs2'>{item.title}</td>
                                <td className='stolbs'>{item.rates[0].buy_usd}</td>
                                <td className='stolbs'>{item.rates[0].sell_usd}</td>
                                <td className='stolbs'></td>
                                <td className='stolbs'>{item.rates[0].buy_eur}</td>
                                <td className='stolbs'>{item.rates[0].sell_usd}</td>                                                
                                <td className='stolbs'></td>
                                <td className='stolbs'>{item.rates[0].buy_rub}</td>
                                <td className='stolbs'>{item.rates[0].sell_rub}</td>
                                <td className='stolbs'></td>
                                <td className='stolbs'>{item.rates[0].buy_kzt}</td>
                                <td className='stolbs'>{item.rates[0].sell_kzt}</td>
                            </tr>
                            )
                        })                
                    :
                    data2.map((item, idx) => {
                        return (
                            <tr key={idx}>
                                <td className='stolbs2'>{item.title}</td>
                                <td className='stolbs'>{item.rates[0].buy_usd}</td>
                                <td className='stolbs'>{item.rates[0].sell_usd}</td>
                                <td className='stolbs'></td>
                                <td className='stolbs'>{item.rates[0].buy_eur}</td>
                                <td className='stolbs'>{item.rates[0].sell_usd}</td>                                                
                                <td className='stolbs'></td>
                                <td className='stolbs'>{item.rates[0].buy_rub}</td>
                                <td className='stolbs'>{item.rates[0].sell_rub}</td>
                                <td className='stolbs'></td>
                                <td className='stolbs'>{item.rates[0].buy_kzt}</td>
                                <td className='stolbs'>{item.rates[0].sell_kzt}</td>
                            </tr>
                            )
                        })
                    }


                </table>

                <div className='NumBanks'>
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

            </div>
            }    
    </div>
  )
}

export default Main