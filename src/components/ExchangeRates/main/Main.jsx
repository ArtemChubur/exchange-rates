import React, {useEffect, useState} from 'react';
import {getCurrent} from "../../../requests/current";
import {numberBanks} from "../../../constans/numberBanks";
import {currents} from "../../../constans/currents";
import {Link} from "react-router-dom";
import {filterByNumber} from "../../../filters/filterByNumber";
import {sortByCurrent} from "../../../filters/sortByCurrent";
import './Main.css'

const CurrentPage = () => {

    const [bankList, setBankList] = useState([])
    const [fullList, setFullList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [sort, setSort] = useState(true)

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            try {
                const response = await getCurrent()
                setBankList(response.data)
                setFullList(response.data)
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])




    return (
        <div>
            {isLoading ? 
                <div className='loading'>Loading...</div>
            :
                <div>
                    <div>
                        <div className="current-filters">
                            <span>Показать банков:</span>
                            {numberBanks.map((item, idx) => {
                                return (
                                    <input type='button' key={idx} value={item.value} className='filt_btn' onClick={() => filterByNumber(item.number, fullList, setBankList)}/>
                                )
                            })}
                        </div>
                    </div>
                    <table className='table'>
                        <tr >
                            <td className='tab-number'>№</td>
                            <td className='tab-name'>Название</td>
                            {currents.map((item, idx) => {
                                return (     
                                    <td key={idx} className='pointer' onClick={() => sortByCurrent(item.value, sort, setSort, bankList, setBankList)}>{item.title}</td>
                                )
                            })}
                        </tr>
                        {bankList.map((item, idx) => {
                            let tabBack = ''
                            if ((idx + 1) % 2 == 0) {
                                tabBack='tabBack1'
                            } else{
                                tabBack='tabBack2'
                            }
                            return (
                                <tr className={tabBack} key={idx}>
                                    <td>
                                        {idx + 1}
                                    </td>
                                    <td>
                                        {item.title}
                                    </td>
                                    <td>
                                        {item.rates.length > 0 && (
                                            <span key={0}>
                                                {item.rates[0].buy_usd}
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {item.rates.length > 0 && (
                                            <span key={0}>
                                                {item.rates[0].buy_eur}
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {item.rates.length > 0 && (
                                            <span key={0}>
                                                {item.rates[0].buy_rub}
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {item.rates.length > 0 && (
                                            <span key={0}>
                                                {item.rates[0].buy_kzt}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            }

        </div>
    );
};

export default CurrentPage;