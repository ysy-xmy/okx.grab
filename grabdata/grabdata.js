const axios = require('axios');

class Okx {
    constructor() {
        this.currencies = [];
    }

    async getAllInstId() {
        const url = 'https://www.nuancebot.com/api/v5/market/tickers?instType=SPOT';
        try {
            const response = await axios.get(url);
            const jsondata = response.data.data;
            for (const item of jsondata) {
                if (item.instId.includes('USDT')) {
                    const temp = {
                        instId: item.instId,
                        high24h: item.high24h,
                        low24h: item.low24h,
                        last: item.last,
                        sodUtc0: item.sodUtc0,
                        sodUtc8: item.sodUtc8
                    };
                    this.currencies.push(temp);
                }
            }
            return this.currencies;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }
}

const okx = new Okx();
okx.getAllInstId().then(currencies => {
    const Amount = 65;
    currencies.forEach((item, index) => {
        const priceDifference = parseFloat(item.high24h) - parseFloat(item.low24h);
        item.Profit = ((parseFloat(item.high24h) * Amount / parseFloat(item.low24h)) - Amount) * 0.5;
        item.lowpriceFor = (parseFloat(item.high24h) - parseFloat(item.last)) / priceDifference;
    });

    // 按照利润排序
    const sortedData1 = currencies.sort((a, b) => b.Profit - a.Profit);
    sortedData1.forEach((item, index) => {
        console.log(`NO${index + 1}.${item.instId}:投入${Amount}的收益：${item.Profit.toFixed(2)}   当前价格:${item.last}  当前价格占比${item.lowpriceFor.toFixed(2)}   最高价：${item.high24h}  最低价：${item.low24h}`);
    });


    // 按照lowpriceFor排序
    const sortedData2 = currencies.sort((a, b) => b.lowpriceFor - a.lowpriceFor);
    sortedData2.forEach((item, index) => {
        console.log(`NO${index + 1}.${item.instId}:投入${Amount}的收益：${item.Profit.toFixed(2)}   当前价格:${item.last}  当前价格占比${item.lowpriceFor.toFixed(2)}   最高价：${item.high24h}  最低价：${item.low24h}`);
    });



});
