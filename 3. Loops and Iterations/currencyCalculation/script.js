async function getUAHtoUSD() {
    try {
        const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
        const data = await response.json();
        const usdRate = data.find(currency => currency.cc === 'USD');

        return usdRate.rate;
    }
    catch (err) {
        return null;
    }
}

async function main() {
    const currency = await getUAHtoUSD();
    if (currency) {
        for(let i = 10; i <= 100; i += 10) {
            console.log(`${i} hryvnias is ${(i / currency).toFixed(2)} dollars at today's exchange rate.`);
        }
    }
}
main();