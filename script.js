const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const getBtn = document.querySelector("form button");
const exIcon = document.querySelector("form .reverse");
const amount = document.querySelector("form .amount input");
const exRateTxt = document.querySelector("form .result");

//Event listener para os doprdowns (selects)

[fromCur, toCur].forEach((select, i) => {
    for (let curCode in Country_List) {
        const selected = (i === 0 && curCode === "USD") || (i === 1 && curCode === "GBP") ? "selected" : "";
        select.insertAdjacentHTML("beforeend", `<option value="${curCode}" ${selected}>${curCode}</option>`);
    }
    select.addEventListener("change", () => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagsapi.com/${Country_List[code]}/flat/48.png`;
    });
});

//Função para obter a taxa de conversão de um api

async function getExchangeRate() {
    const amountVal = amount.value;
    exRateTxt.innerText = "Obtendo taxa de conversão...";
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/9790b31e96c72e1b712a564e/latest/${fromCur.value}`);
        const result = await response.json();
        const exchangeRate = result.conversion_rates[toCur.value];
        const totalExRate = (amountVal * exchangeRate).toFixed(2);
        exRateTxt.innerHTML = `${amountVal} ${fromCur.value} = ${totalExRate} ${toCur.value}`;
    } catch (error) {
        exRateTxt.innerHTML = "Algo deu errado..."
    }
}

//Event listener para o clique do botão e do icone de inversão das moedas
window.addEventListener("load", getExchangeRate);
getBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
});

exIcon.addEventListener("click", () => {
    [fromCur.value, toCur.value] = [toCur.value, fromCur.value];
    [fromCur, toCur].forEach((select) => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagsapi.com/${Country_List[code]}/flat/48.png`;
    });
    getExchangeRate();
})