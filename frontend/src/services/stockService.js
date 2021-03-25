import axios from 'axios';

export const getStockValuationsInSectorName = (sectorName) => {
    let params = new URLSearchParams();
    params.append('sectorName', sectorName);

    return axios.get('/stocks/valuation', { params })
}

export const getRecentStocksBySectorName = (sectorName) => {
    let params = new URLSearchParams();
    params.append('sectorName', sectorName);

    return axios.get('/stocks/recent', { params })
}