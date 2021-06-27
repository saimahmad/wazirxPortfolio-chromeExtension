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

    function setPrice(res) {
        var portfolio = res.portfolio
        id("total").innerHTML = amountFormat(portfolio.total);
        id("curr").innerHTML = amountFormat(portfolio.curr);
        id("pnl").innerHTML = amountFormat(portfolio.pnl);
        id("pnl").classList.add(portfolio.pnl <0? "red-text":"green-text");
        // var div = document.getElementById("price")
        // div.textContent = res.price;
        // div = document.getElementById("tabCheck");
        //div.textContent = res.tabCheck;
    }
}, false)