const currrencyEl_one=document.getElementById('currency-one');
const amountEl_one=document.getElementById('amount-one');
const currencyEl_two=document.getElementById('currency-two');
const amountEl_two=document.getElementById('amount-two');

const rateEl =document.getElementById('rate');
const swap = document.getElementById('swap');


// fetch exchange rates and updtate the DOM

function calculate(){
    const currency_one=currrencyEl_one.value;
    const currency_two=currencyEl_two.value;
    fetch(`https://v6.exchangerate-api.com/v6/f91d28495a97b8236c06867e/latest/${currency_one}`)
    .then(res=>res.json())
    .then(data=>{
    
      const rate=data.conversion_rates[currency_two];
      console.log(rate);
      rateEl.innerText=`1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value=(amountEl_one.value*rate).toFixed(2);
    });
}


//EVENT LISTENERS
amountEl_one.addEventListener('input',calculate);
currrencyEl_one.addEventListener('change',calculate);

amountEl_two.addEventListener('input',calculate);
currencyEl_two.addEventListener('change',calculate);
swap.addEventListener('click',()=>{
    const temp=currrencyEl_one.value;
    currrencyEl_one.value=currencyEl_two.value;
    currencyEl_two.value=temp;
    calculate();
})
calculate();