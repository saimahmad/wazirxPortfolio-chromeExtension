document.addEventListener('DOMContentLoaded',() => {
    document.querySelector('button').addEventListener('click',onclick,false);
    chrome.tabs.query({currentWindow: true, active: true},
        (tabs)=>{
            chrome.tabs.sendMessage(tabs[0].id, 'hi',setPrice)
        })
   function onclick() {
        chrome.tabs.query({currentWindow: true, active: true},
            (tabs)=>{
                chrome.tabs.sendMessage(tabs[0].id, 'hi',setPrice)
            })
    }

    function id(x) {
        return document.getElementById(x);
    }

    function amountFormat(x) {
        return parseFloat(x).toFixed(2);
    }

    function populateHeader(portfolio) {
        id("total").innerHTML = amountFormat(portfolio.total);
        id("curr").innerHTML = amountFormat(portfolio.curr);
        id("pnl").innerHTML = amountFormat(portfolio.pnl);
        id("pnl").classList.add(portfolio.pnl <0? "red-text":"green-text");
        id("pnlperc").innerHTML = amountFormat(portfolio.pnlperc) + ' %';
        id("pnlperc").classList.add(portfolio.pnl <0? "red-text":"green-text");
    }

    function getItemHTML(item) {
        console.log(item)
        let avg = item.avg>1? parseFloat(item.avg).toFixed(2): item.avg
        let pnlClass = item.pnl<0 ? 'red-text': 'green-text';
        return `
            <div class="row space-between">
                <div class="column">
                    <div class="row">
                       <span class="small-text  grey-text mr-5">Qty</span>
                        <span class="small-text mr-10">${item.qty}</span>
                        <span class="small-text grey-text mr-5">Avg</span>
                        <span class="small-text">${avg}</span>
                    </div>
                    <span class="medium-text">${(item.coin).toUpperCase()}</span>
                    <div class="row">
                        <span class="small-text grey-text mr-5">Invested</span>
                        <span class="small-text">${item.invested}</span>
                    </div>
                </div>
                <div class="column end">
                    <span class="small-text ${pnlClass}">${parseFloat(item.pnlperc).toFixed(2)} %</span>
                    <span class="medium-text ${pnlClass}">${parseFloat(item.pnl).toFixed(2)}</span>
                    <div class="row">
                        <span class="grey-text small-text mr-5">LTP</span>
                        <span class="small-text">${item.curr}</span>
                    </div>
                </div>
            </div>                                                              
        `
        // return `<div class="grey-text">${item.avg}</div>`
    }

    function populateBody(portfolio) {
        var x = '';
        portfolio.list.forEach(item => {
            // x+= `<div>${item.coin}</div>`
            x+= getItemHTML(item);
        });
        id("portfolio").innerHTML = x;
    }

    function setPrice(res) {
        var portfolio = res.portfolio
        populateHeader(portfolio)
        populateBody(portfolio)
    }
}, false)