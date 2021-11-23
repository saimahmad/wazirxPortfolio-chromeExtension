//alert("check extensions")
// chrome.runtime.onMessage.addListener((request,sender, sendResponse) => {
//     const re = new RegExp('bear','gi');
//     const matches = document.documentElement.innerHTML.match(re);
//     sendResponse({count: matches.length})
// })

//const re = new RegExp('bear','gi');
//const matches = document.documentElement.innerHTML.match(re);
var portfolio = {}
var currentPrice = {}
var profitLoss = {}

function populatePortfolio() {
    let elements = document.querySelectorAll("body>div>div>div")[document.querySelectorAll("body>div>div>div").length -1].querySelectorAll("div")[0].querySelectorAll(":scope>div")[2].querySelectorAll(":scope>div")[2].querySelectorAll(":scope>div")[1].querySelectorAll(":scope>div>div>div")[2].querySelectorAll(":scope>div>div>div");
    //delete
    //elements.forEach(data =>console.log(getComputedStyle(data,':after').background.split(')')[0]))
    let buyElements = Array.from(elements).filter(data => getComputedStyle(data,':after').background.split(')')[0] == "rgba(35, 172, 80, 0.1");
    let sellElements = Array.from(elements).filter(data => getComputedStyle(data,':after').background.split(')')[0] == "rgba(241, 67, 47, 0.1");

    buyElements.forEach(data => {
        var coin = data.querySelectorAll(".underline")[0].innerHTML;
        var amount = Number(data.querySelectorAll(".underline")[1].innerHTML.split(",").join(""))
        var price = Number(data.querySelectorAll(":scope>div>div>span")[3].innerHTML.split(",").join(""))
        if(portfolio[coin]) {
            portfolio[coin].amount += amount;
            portfolio[coin].price += price
        }

        else {
            portfolio[coin] = {};
            portfolio[coin].amount = amount;
            portfolio[coin].price = price;
        }

        //console.log(coin +" "+ amount + " "+ price.split(",").join(""))
    })

    sellElements.forEach(data => {
        var coin = data.querySelectorAll(".underline")[0].innerHTML;
        var amount = Number(data.querySelectorAll(".underline")[1].innerHTML.split(",").join(""))
        var price = Number(data.querySelectorAll(":scope>div>div>span")[3].innerHTML.split(",").join(""))

        if(portfolio[coin]) {
            portfolio[coin].amount -= amount;
            portfolio[coin].price -= price
        }

        else {
            portfolio[coin].amount = amount*(-1);
            portfolio[coin].price = price*(-1);
        }
        //console.log(coin +" "+ amount + " "+ price.split(",").join(""))
    })
    console.log(portfolio)
}

function populateCurrentPrice() {
    var priceItems = document.querySelectorAll("body>div>div>div")[document.querySelectorAll("body>div>div>div").length -1].querySelectorAll("div")[0].querySelectorAll(":scope>div")[0].querySelectorAll(":scope>div>div")[1].querySelectorAll(":scope>a");
    priceItems.forEach(data => {
        var coin = data.querySelector(".market-name-text").innerHTML.split("<")[0];
        var price = Number(data.querySelector(".price-text.ticker-price").innerHTML.slice(1).split(",").join(""))
        currentPrice[coin] = price;
    })
    console.log(currentPrice)
}

function populateProfitLoss() {
    profitLoss.list = [];
    profitLoss.total = 0;
    profitLoss.curr = 0;
    profitLoss.pnl = 0;

    for (var coin of Object.keys(portfolio)) {
        var item = {};
        item.qty = portfolio[coin].amount;
        item.avg = Number((portfolio[coin].price)/(portfolio[coin].amount));
        item.coin = coin;
        item.invested = portfolio[coin].price;
        item.pnl = (currentPrice[coin])*(portfolio[coin].amount) - portfolio[coin].price;  
        item.pnlperc = (item.pnl*100)/(item.invested);         
        item.curr = currentPrice[coin];

        profitLoss.total += item.invested;
        profitLoss.pnl += item.pnl;
        profitLoss.curr += item.invested + item.pnl;
        profitLoss.list.push(item);
    }
    profitLoss.pnlperc = (profitLoss.pnl*100)/profitLoss.total;
    console.log(profitLoss)
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    portfolio = {}
  currentPrice = {}
  profitLoss = {}
  let tab;
tab = document.querySelectorAll("body>div>div>div")[document.querySelectorAll("body>div>div>div").length -1].querySelectorAll(":scope>div")[0].querySelectorAll(":scope>div")[2].querySelectorAll(":scope>div")[2].querySelectorAll(":scope>div")[0].querySelectorAll(":scope>div")
  let tabClickNeeded = tab[0].classList.contains("selected")
  console.log(tabClickNeeded)
  if(tabClickNeeded ) {
  tab[1].click();
  }

  //selecting inr currency tab
  document.querySelectorAll("body>div>div>div")[document.querySelectorAll("body>div>div>div").length -1].querySelectorAll("div")[0].querySelectorAll(":scope>div")[0].querySelectorAll(":scope>div>div")[0].querySelectorAll(":scope>div")[0].querySelector("label").click()

  setTimeout(() => {
    // const tabCheck =
    //   document.querySelector(".sc-bwzfXH.bKFhPM>.underline").innerHTML;
    //console.log(tabCheck);

    populatePortfolio();
    populateCurrentPrice();
    populateProfitLoss();

    sendResponse({
        portfolio: profitLoss
      });

    // if(tabClickNeeded) { 
    //     document.getElementsByClassName("sc-krvtoX flKLqN")[0].click(); 
    // }
  },500);

  return true;
  // const tabCheck = document.getElementsByClassName("sc-bwzfXH bKFhPM")[0].innerHTML
  // console.log(tabCheck)
  // sendResponse({
  //     price: price,
  //     tabCheck: tabCheck,
  // })
});

// const price = document.getElementsByClassName("price-text")[0].innerHTML

// chrome.runtime.sendMessage({
//     price: price
// })
