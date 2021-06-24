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

function populatePortfolio() {
    let buyElements = document.querySelectorAll(".sc-bdVaJa.sc-iuJeZd.eVNcjS");
    let sellElements = document.querySelectorAll(".sc-bdVaJa.sc-iuJeZd.blXZKS");

    buyElements.forEach(data => {
        var coin = data.querySelector(".cur-ptr.sc-bwzfXH.foOypC .underline").innerHTML;
        var amount = Number(data.querySelector(".sc-bwzfXH.bKFhPM .underline").innerHTML.split(",").join(""))
        var price = Number(data.querySelector(".sc-bdVaJa.sc-esOvli.iLUXV .sc-bwzfXH.bKFhPM").innerHTML.split(",").join(""))

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
        var coin = data.querySelector(".cur-ptr.sc-bwzfXH.foOypC .underline").innerHTML;
        var amount = Number(data.querySelector(".sc-bwzfXH.bKFhPM .underline").innerHTML.split(",").join(""))
        var price = Number(data.querySelector(".sc-bdVaJa.sc-esOvli.iLUXV .sc-bwzfXH.bKFhPM").innerHTML.split(",").join(""))

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
    var priceItems = document.querySelectorAll(".sc-iELTvK.bZNgpE .ticker-item");

}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    portfolio = {}
  currentPrice = {}
  const price = document.getElementsByClassName("price-text")[0].innerHTML;
  document.getElementsByClassName("sc-gojNiO jCLtlH")[0].click();

  setTimeout(() => {
    const tabCheck =
      document.querySelector(".sc-bwzfXH.bKFhPM>.underline").innerHTML;
    //console.log(tabCheck);
    sendResponse({
      price: price,
      tabCheck: tabCheck,
    });

    populatePortfolio();

    document.getElementsByClassName("sc-gojNiO jCLtlH")[0].click();
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
