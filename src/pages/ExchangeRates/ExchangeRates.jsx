import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ExchangeRates.css'
import {filterCurrentBanks} from "../../constants/filter";
import {getCurrent} from "../../requests/getCurrent/getCurrent";

const ExchangeRates = () => {
    const TOKEN = 'yoTH6nCXCxRK9HaJdMJ4Aw3rBCcrRYpX58yjDGGXeffbae5a'

    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [search, setSearch] = useState('')
    const [banks, setBanks] = useState(20)
    const [isLoading, setIsLoading] = useState(false)
    const [filerMenu, setFilterMenu] = useState(false)
    const [whatData, setWhatData] = useState(true)

    const [filteresUsdBuyMax, setFilteresUsdBuyMax] = useState(false)
    const [filteresEurBuyMax, setFilteresEurBuyMax] = useState(false)
    const [filteresRubBuyMax, setFilteresRubBuyMax] = useState(false)
    const [filteresKztBuyMax, setFilteresKztBuyMax] = useState(false)
    const [filteresUsdBuyMin, setFilteresUsdBuyMin] = useState(false)
    const [filteresEurBuyMin, setFilteresEurBuyMin] = useState(false)
    const [filteresRubBuyMin, setFilteresRubBuyMin] = useState(false)
    const [filteresKztBuyMin, setFilteresKztBuyMin] = useState(false)

    const filter = () => {
        let filteredData = data
        filteredData = filteredData.filter(item => item.id < banks + 1)
        setWhatData(false)
        setData2(filteredData)
        if (filteresUsdBuyMax === true) {
            filteredData = filteredData.sort((a, b) => {
                return (b.rates[0].buy_usd - a.rates[0].buy_usd)
            })
            setFilteresEurBuyMax(false)
            setFilteresRubBuyMax(false)
            setFilteresKztBuyMax(false)
        } else if (filteresEurBuyMax === true) {
            filteredData = filteredData.sort((a, b) => {
            return (b.rates[0].buy_eur - a.rates[0].buy_eur)
            })
            setFilteresUsdBuyMax(false)
            setFilteresRubBuyMax(false)
            setFilteresKztBuyMax(false)
        } else if (filteresRubBuyMax === true) {
            filteredData = filteredData.sort((a, b) => {
                return (b.rates[0].buy_rub - a.rates[0].buy_rub)
               })
               setFilteresUsdBuyMax(false)
               setFilteresEurBuyMax(false)
               setFilteresKztBuyMax(false)
        } else if (filteresKztBuyMax === true) {
            filteredData = filteredData.sort((a, b) => {
                return (b.rates[0].buy_kzt - a.rates[0].buy_kzt)
               })
               setFilteresEurBuyMax(false)
               setFilteresRubBuyMax(false)
               setFilteresUsdBuyMax(false)
        }
    }



    // const filteres_usd_buy_max = () => {
    //         let filteredData = data
    //         filteredData = filteredData.filter(item => item.id < banks + 1)
    //         filteredData = filteredData.sort((a, b) => {
    //          return (b.rates[0].buy_usd - a.rates[0].buy_usd)
    //         })
    //         setData(filteredData)
    // }

    // const filteres_eur_buy_max = () => {
    //     let filteredData = data
    //     filteredData = filteredData.filter(item => item.id < banks + 1)
    //     filteredData = filteredData.sort((a, b) => {
    //         return (b.rates[0].buy_eur - a.rates[0].buy_eur)
    //     })
    //     setData(filteredData)
    // }

    // const filteres_rub_buy_max = () => {
    //     let filteredData = data
    //     filteredData = filteredData.filter(item => item.id < banks + 1)
    //     filteredData = filteredData.sort((a, b) => {
    //      return (b.rates[0].buy_rub - a.rates[0].buy_rub)
    //     })
    //     setData(filteredData)
    // }

    // const filteres_kzt_buy_max = () => {
    //     let filteredData = data
    //     filteredData = filteredData.filter(item => item.id < banks + 1)
    //     filteredData = filteredData.sort((a, b) => {
    //      return (b.rates[0].buy_kzt - a.rates[0].buy_kzt)
    //     })
    //     setData(filteredData)
    // }




    const filteres_usd_sell_max = () => {
        let filteredData = data
        filteredData = filteredData.filter(item => item.id < banks + 1)
        filteredData = filteredData.sort((a, b) => {
         return (b.rates[0].buy_usd - a.rates[0].buy_usd)
        })
        setData(filteredData)
    }

    const filteres_eur_sell_max = () => {
        let filteredData = data
        filteredData = filteredData.filter(item => item.id < banks + 1)
        filteredData = filteredData.sort((a, b) => {
        return (b.rates[0].sell_eur - a.rates[0].sell_eur)
        })
        setData(filteredData)
    }

    const filteres_rub_sell_max = () => {
        let filteredData = data
        filteredData = filteredData.filter(item => item.id < banks + 1)
        filteredData = filteredData.sort((a, b) => {
        return (b.rates[0].sell_rub - a.rates[0].sell_rub)
        })
        setData(filteredData)
    }

    const filteres_kzt_sell_max = () => {
        let filteredData = data
        filteredData = filteredData.filter(item => item.id < banks + 1)
        filteredData = filteredData.sort((a, b) => {
        return (b.rates[0].sell_kzt - a.rates[0].sell_kzt)
        })
        setData(filteredData)
    }



    const filteres_usd_buy_min = () => {
        let filteredData = data
        filteredData = filteredData.filter(item => item.id < banks + 1)
        filteredData = filteredData.sort((a, b) => {
         return (a.rates[0].buy_usd - b.rates[0].buy_usd)
        })
        setData(filteredData)
    }

    const filteres_eur_buy_min = () => {
        let filteredData = data
        filteredData = filteredData.filter(item => item.id < banks + 1)
        filteredData = filteredData.sort((a, b) => {
        return (a.rates[0].buy_eur - b.rates[0].buy_eur)
        })
        setData(filteredData)
    }

    const filteres_rub_buy_min = () => {
        let filteredData = data
        filteredData = filteredData.filter(item => item.id < banks + 1)
        filteredData = filteredData.sort((a, b) => {
        return (a.rates[0].buy_rub - b.rates[0].buy_rub)
        })
        setData(filteredData)
    }

    const filteres_kzt_buy_min = () => {
        let filteredData = data
        filteredData = filteredData.filter(item => item.id < banks + 1)
        filteredData = filteredData.sort((a, b) => {
        return (a.rates[0].buy_kzt - b.rates[0].buy_kzt)
        })
        setData(filteredData)
    }




    const filteres_usd_sell_min = () => {
        let filteredData = data
        filteredData = filteredData.filter(item => item.id < banks + 1)
        filteredData = filteredData.sort((a, b) => {
         return (a.rates[0].buy_usd - b.rates[0].buy_usd)
        })
        setData(filteredData)
    }

    const filteres_eur_sell_min = () => {
        let filteredData = data
        filteredData = filteredData.filter(item => item.id < banks + 1)
        filteredData = filteredData.sort((a, b) => {
        return (a.rates[0].sell_eur - b.rates[0].sell_eur)
        })
        setData(filteredData)
    }

    const filteres_rub_sell_min = () => {
        let filteredData = data
        filteredData = filteredData.filter(item => item.id < banks + 1)
        filteredData = filteredData.sort((a, b) => {
        return (a.rates[0].sell_rub - b.rates[0].sell_rub)
        })
        setData(filteredData)
    }

    const filteres_kzt_sell_min = () => {
        let filteredData = data
        filteredData = filteredData.filter(item => item.id < banks + 1)
        filteredData = filteredData.sort((a, b) => {
        return (a.rates[0].sell_kzt - b.rates[0].sell_kzt)
        })
        setData(filteredData)
    }

    useEffect(() => {
        getCurrent(setIsLoading, search, setData, banks)
    }, [])

    const handleChange = async (title) => {
        await getCurrent(setIsLoading, search, setData, title)
    }

    const handleSearchReset = async () => {
        await setSearch('');
        await getCurrent(setIsLoading, false, setData, banks)
    };

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
                    <button onClick={() => {
                        setFilteresUsdBuyMax(true)
                        filter()
                    }}>Сначало дороже $ покупка</button>
                    <button onClick={filteres_usd_sell_max}>Сначало дороже $ продажа</button>
                </div>
                <div>
                    <button onClick={() => {
                        setFilteresEurBuyMax(true)
                        filter()
                    }}>Сначало дороже € покупка</button>
                    <button onClick={filteres_eur_sell_max}>Сначало дороже € продажа</button>
                </div>
                <div>
                    <button onClick={() => {
                        setFilteresRubBuyMax(true)
                        filter()
                    }}>Сначало дороже ₽ покупка</button>  
                    <button onClick={filteres_rub_sell_max}>Сначало дороже ₽ продажа</button>                    
                </div>
                <div>
                    <button onClick={() => {
                        setFilteresKztBuyMax(true)
                        filter()
                    }}>Сначало дороже ₸ покупка</button>
                    <button onClick={filteres_kzt_sell_max}>Сначало дороже ₸ продажа</button>
                </div>
                <div>
                    <button onClick={filteres_usd_buy_min}>Сначало дешевле $ покупка</button>
                    <button onClick={filteres_usd_sell_min}>Сначало дешевле $ продажа</button>
                </div>
                <div>
                    <button onClick={filteres_eur_buy_min}>Сначало дешевле € покупка</button>
                    <button onClick={filteres_eur_sell_min}>Сначало дешевле € продажа</button>
                </div>
                <div>
                    <button onClick={filteres_rub_buy_min}>Сначало дешевле ₽ покупка</button>
                    <button onClick={filteres_rub_sell_min}>Сначало дешевле ₽ продажа</button>
                </div>
                <div>
                    <button onClick={filteres_kzt_buy_min}>Сначало дешевле ₸ покупка</button>
                    <button onClick={filteres_kzt_sell_min}>Сначало дешевле ₸ продажа</button>
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

                    {whatData ? 
                        data.map((item, idx) => {
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
                    }) : 
                        data2.map((item, idx) => {
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