export const filterByNumber = (num, fullList, setBankList) => {
    let filter = fullList
    if (num) {
        filter = filter.filter(item => item.id <= num)
        setBankList(filter)
    } else {
        setBankList(fullList)
    }
}