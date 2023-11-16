export const sortByCurrent = (value, sort, setSort, bankList, setBankList) => {
    setSort(!sort)
    let sortedList = [...bankList];
    if (sort) {
        sortedList = sortedList.sort((a, b) => {
            const aUsd = a.rates.length > 0 ? a.rates[0][value] : 0;
            const bUsd = b.rates.length > 0 ? b.rates[0][value] : 0;
            return bUsd - aUsd;
        });
    } else {
        sortedList = sortedList.sort((a, b) => {
            const aUsd = a.rates.length > 0 ? a.rates[0][value] : 0;
            const bUsd = b.rates.length > 0 ? b.rates[0][value] : 0;
            return aUsd - bUsd;
        });
    }
    setBankList(sortedList);
};