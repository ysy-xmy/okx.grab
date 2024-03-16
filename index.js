const axios = require('axios');
const sendemail = require('./sendemail')
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
    async getdetail(instId) {
        const url = 'https://www.nuancebot.com/api/v5/market/ticker?instId=' + instId;
        try {
            const response = await axios.get(url);
            const jsondata = response.data.data;

            return jsondata[0];
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }


    }
}

const okx = new Okx();
okx.getAllInstId().then(currencies => {

})
function delay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

// okx.getdetail('STRK-USDT').then((bi) => {
//     sendemail('小木鱼', '2398581361@qq.com', bi[0].instId, 'pepe币跌到82了<br><h1>这时候可以买入</h1>')

// })

async function main() {
    let pepehassend = false
    let pepelowprice = 0.0000082
    let milohassend = false
    let milolowprice = 0.00000003600
    let aidogehassend = false
    let aidogelowprice = 0.00000000057
    let samohassend = false
    let samolowprice = 0.0165

    while (1) {


        okx.getdetail('PEPE-USDT').then((bi) => {

            console.log(bi.instId, '当前价格:', bi.last)
            if (parseFloat(bi.last) > pepelowprice) {
                pepehassend = false
            }
            else if (parseFloat(bi.last) <= pepelowprice && !pepehassend) {
                sendemail(bi.instId, '2398581361@qq.com', ` ${bi.instId}跌到了${bi.last}`, ` ${bi.instId}跌到了${bi.last}`)
                pepehassend = true
            }

        })

        okx.getdetail('MILO-USDT').then((bi) => {

            console.log(bi.instId, '当前价格:', bi.last)
            if (parseFloat(bi.last) > milolowprice) {
                milohassend = false
            }
            else if (parseFloat(bi.last) <= milolowprice && !milohassend) {
                sendemail(bi.instId, '2398581361@qq.com', ` ${bi.instId}跌到了${bi.last}`, ` ${bi.instId}跌到了${bi.last}`)
                milohassend = true
            }

        })


        okx.getdetail('AIDOGE-USDT').then((bi) => {

            console.log(bi.instId, '当前价格:', bi.last)
            if (parseFloat(bi.last) > aidogelowprice) {
                aidogehassend = false
            }
            else if (parseFloat(bi.last) <= aidogelowprice && !aidogehassend) {
                sendemail(bi.instId, '2398581361@qq.com', ` ${bi.instId}跌到了${bi.last}`, ` ${bi.instId}跌到了${bi.last}`)
                aidogehassend = true
            }

        })

        okx.getdetail('SAMO-USDT').then((bi) => {

            console.log(bi.instId, '当前价格:', bi.last)
            if (parseFloat(bi.last) > samolowprice) {
                samohassend = false
            }
            else if (parseFloat(bi.last) <= samolowprice && !samohassend) {
                sendemail(bi.instId, '2398581361@qq.com', ` ${bi.instId}跌到了${bi.last}`, ` ${bi.instId}跌到了${bi.last}`)
                samohassend = true
            }

        })

        await delay(1000 * 10)


        console.log('-------------------')

    }
}
main();




