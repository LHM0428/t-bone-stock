import React, { useState, useEffect, useMemo } from 'react';
import Grid4Columns from '../../components/Grid/Grid4Columns';
import Table from '../../components/Table/Table';
import { CONSTANTS } from '../../common/Constant';
import { utils } from '../../common/Utils';
import { getAllSectors } from '../../services/sectorService';
import { getLastFourQuaterConsensus } from '../../services/consensusService'
import * as stockService from '../../services/stockService';

const Main = () => {
    const [selectedItem, setSelectedItem] = useState(0);
    const [lastFourQuaterConsensus, setLastFourQuaterConsensus] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [tableData, setTableData] = useState([]); 
    const data = useMemo(() => tableData, [tableData]);
    
    function importIcons(r) {
        const icons = [];
        r.keys().forEach((key, index) => (icons.push({ ...r(key), key, index})));
        return icons;
    }

    useEffect(() => {
        const fetchSector = async () => {
            const { data } = await getAllSectors();
            const icons = importIcons(require.context('../../images/icons/sections', true, /\.png$/));
            const result = icons.filter((icon) => {
                let { key } = icon;
                for(let {sectorCode, market, sectorName} of data){
                    if(key.includes(`${market}${sectorCode}`)){
                        icon.sectorName = sectorName;
                        icon.market = market;
                        return true;
                    }
                }
                return false;
            })
            setSectors(result);
        }

        const fetchLastFourQuaterConsensus = async () => {
            const { data } = await getLastFourQuaterConsensus();
            setLastFourQuaterConsensus(data);
        }
        
        fetchSector();
        fetchLastFourQuaterConsensus();
    }, [])

    function onClickGridItem(item) {
        setSelectedItem(item);
        stockService.getRecentStocksBySectorName(item.sectorName)
        .then(({ data }) => {
            let stockValuations = parseStocksAndConsensusToValuations(data, lastFourQuaterConsensus);
            setTableData(stockValuations);
        });
    }

    function parseStocksAndConsensusToValuations(stocks, lastFourQuaterConsensus){
        let stockValuations = stocks.filter(stock => {
            const { marketCap, companyCode } = stock;
            const { ASSET, LIABILITIES, OPERATING_INCOME_LOSS, CHANGE_RATE, CHANGE_PRICE,
                 REVENUE, PER, PBR, PSR, ROA } = CONSTANTS;
            
            if(lastFourQuaterConsensus[companyCode]){
                let consensus = lastFourQuaterConsensus[companyCode];

                if(consensus[OPERATING_INCOME_LOSS] > 0) {
                    stock[PER] = utils.roundNumberWithDigit(marketCap/consensus[OPERATING_INCOME_LOSS] / 100000000, 3);
                    stock[ROA] = utils.roundNumberWithDigit(consensus[OPERATING_INCOME_LOSS]/consensus[ASSET]*100, 3);
                    //TO DO : dart 수치 활용하여 ROE, EV_EBITDA 계산
                }else{
                    stock[PER] = 999;
                    stock[ROA] = 999;
                }
                if(consensus[LIABILITIES] > 0) stock[PBR] = utils.roundNumberWithDigit(marketCap/consensus[LIABILITIES] / 100000000, 3);
                if(consensus[REVENUE] > 0) stock[PSR] = utils.roundNumberWithDigit(marketCap/consensus[REVENUE] / 100000000, 3);
                
                stock[CHANGE_RATE] = utils.roundNumberWithDigit(stock[CHANGE_RATE], 3);
                stock[CHANGE_RATE] = stock[CHANGE_PRICE] < 0 ? -1*stock[CHANGE_RATE] : stock[CHANGE_RATE];
                stock[ASSET] = consensus[ASSET];
                stock[LIABILITIES] = consensus[LIABILITIES];
                stock[OPERATING_INCOME_LOSS] = consensus[OPERATING_INCOME_LOSS];
                stock[REVENUE] = consensus[REVENUE];
                
                return true;
            }
            return false;
        });

        return stockValuations;
    }
    
    return (
    <>
        <div className="container mx-auto grid grid-flow-col grid-cols-2 gap-2">
            <div>
                <div className="rounded border">
                    <Grid4Columns
                        items={sectors}
                        gridItemComponentType={CONSTANTS.GRID_ICON}
                        onClickGridItem={onClickGridItem}
                    />
                </div>
            </div>

            <div>
                {tableData.length > 0 &&
                <div className="bg-white shadow-md rounded">
                        <Table 
                            selectedItem={selectedItem}
                            data={data}
                        />
                </div>
                }
            </div>
        </div>
    </>
    )
}

export default Main;