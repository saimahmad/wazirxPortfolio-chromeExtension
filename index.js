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

    function setPrice(res) {
        var div = document.getElementById("price")
        div.textContent = res.price;
        div = document.getElementById("tabCheck");
        div.textContent = res.tabCheck;
    }
}, false)