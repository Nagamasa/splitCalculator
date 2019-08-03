let price = document.getElementById('price');
let num = document.getElementById('num');
let unit = document.getElementById('unit');
let btn = document.getElementById('btn');
let result = document.getElementById('result');
let reset = document.getElementById('reset');

price.focus();

// Event 
btn.addEventListener('click', function() {
    let payLess;
    let short;
    let payMore;
    let over;
    let str;
    let payOk;
    let change;
    
    if (this.classList.contains('disabled') === true) {
        return;
    }
    // 金額の計算
    payLess = Math.floor(price.value / num.value / unit.value) * unit.value;
    short = price.value - (payLess * num.value); 
    payMore = Math.ceil(price.value / num.value / unit.value) * unit.value;
    over = Math.abs(price.value - (payMore * num.value));
    payOk = Math.ceil(price.value / num.value);
    change = payOk * num.value - price.value;

    if (over === 0 && short === 0) {
        str = `一人 ${price.value / num.value} 円です。`
    } else {
        str = 
        `一人 ${payLess} 円だと ${short} 円足りません。
         一人 ${payMore} 円だと ${over} 円余ります。
         結果的に一人 ${payOk} 円払えば支払い可能です(${change}円のお釣りです)。`; 
    }

    result.textContent = str;
    reset.classList.remove('hidden');
});

price.addEventListener('keyup', checkInput);
num.addEventListener('keyup', checkInput);

reset.addEventListener('click', function() {
    result.textContent = '結果表示';
    price.value = '';
    num.value = '';
    unit.value = 100;
    btn.classList.add('disabled');
    reset.classList.add('hidden');
    price.focus();
})

// function
function checkInput() {
    let priceCheck = price.value.match(/^[1-9][0-9]*$/);
    let numCheck = num.value.match(/^[1-9][0-9]*$/);
    // inputareaに数字が入力されているとき
    if (priceCheck != null && numCheck != null) {
        btn.classList.remove('disabled');
    }else {
        btn.classList.add('disabled');
    }
}

