let coinData;
window.onload = async function () {
  try {
    coinData = await fetchCoinData();

    const searchInput = document.getElementById("search");
    searchInput.addEventListener("click", () => {
      const prevousVal = searchInput.value;
      if (searchInput.value === "Search currency...") {
        searchInput.value = "";
      }
      searchInput.removeAttribute("readonly");
      searchInput.focus();
      searchInput.addEventListener("blur", (e) => {
        if (searchInput.value === "") {
          searchInput.value = prevousVal;
          searchInput.setAttribute("readonly", true);
        }
      });
    });

    // Sort Crypto Array to the top rated coin
    const topRated = coinData.coins.find((coin) => coin.rank === 1);
    dispayTopRated(topRated);

    // Pick two random coins and display them below
    const highRank = coinData.coins.filter((coin) => coin.rank <= 2);
    //displayRankedCoin(highRank);
    listRankedCoin(highRank);

    // List all this coins
    listAllCoins(coinData.coins);
  } catch (error) {
    console.log(error);
  }
};

async function fetchCoinData() {
  const url =
    "https://api.coinstats.app/public/v1/coins?skip=0&limit=100&currency=USD";
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

function dispayTopRated(coin) {
  const topRated = document.querySelector("#top-rated");
  const price = document.querySelector("#price");
  const percent = document.querySelector("#percent");
  const img = document.querySelector("#img");
  const name = document.querySelector("#name");

  percent.innerHTML = `${coin.priceChange1h}%`;
  const bClass = `${coin.priceChange1h < 0.0 ? "bearish" : "bullish"}`;
  percent.classList.add = bClass;
  price.innerHTML = `${formatCurrency(parseFloat(coin.price).toFixed(2))}`;
  img.src = coin.icon;
  name.innerHTML = coin.name;
  topRated.style.opacity = "1";
}

function listRankedCoin(coins) {
  const cardDiv = document.querySelector("#card");
  let list = coins
    .map(
      (coin, index) => `
      <div id="${index}" class="card-item ${coin.rank === 1 ? "top" : "next"}">
        <p>${coin.priceChange1h}%</p>
        <p class="price">${formatCurrency(
          parseFloat(coin.price).toFixed(2)
        )}</p>
        <p>${coin.symbol}</p>
      </div>
    `
    )
    .join("");
  cardDiv.innerHTML = list;
}

// function displayRankedCoin(coin) {
//   coin.forEach((c) => {
//     const cardDiv = document.querySelector("#card");

//     // Creating div and ps
//     const cardItemDiv = document.createElement("div");
//     const perc = document.createElement("p");
//     const pPrice = document.createElement("p");
//     const name = document.createElement("p");

//     // Assigning class to our divs and ps
//     cardItemDiv.classList.add("card-item");
//     pPrice.classList.add("price");

//     // Check if rank is 1 then add the top class to the card-item div else otherwise
//     if (c.rank === 1) {
//       cardItemDiv.classList.add("top");
//     } else {
//       cardItemDiv.classList.add("next");
//     }

//     // Assign values to our elements
//     perc.innerHTML = `${c.priceChange1h}%`;
//     pPrice.innerHTML = `${formatCurrency(parseFloat(c.price).toFixed(2))}`;
//     name.innerHTML = `${c.symbol}`;

//     // Append the ps to the card item div
//     cardItemDiv.appendChild(perc);
//     cardItemDiv.appendChild(pPrice);
//     cardItemDiv.appendChild(name);

//     // Append card-item div to the card div
//     cardDiv.appendChild(cardItemDiv);
//   });
// }

function listAllCoins(coins) {
  const listDiv = document.querySelector("#list");
  let list = coins
    .map(
      (coin, index) => `
        <div id="${index}" class="list-item-holder">
          <div class="list-items">
            <div class="list-img-name">
              <img src="${coin.icon}" alt="${coin.name}">
              <p>${coin.symbol}</p>
            </div>
            <div class="list-price">
              <p class="price">${formatCurrency(
                parseFloat(coin.price).toFixed(2)
              )}</p>
              <p class="mc">1d chg <span class="${
                coin.priceChange1d < 0.0 ? "bearish" : "bullish"
              }">${coin.priceChange1d}%</span></p>
            </div>
          </div>
          <div class="more">
            <p class="name">
              <img src="${coin.icon}" alt="${coin.name}">
              <span>${coin.name}</span>
            </p>
            <p class="txt"><span>Max Supply</span><span>${parseInt(
              coin.totalSupply
            ).toFixed(0)}</span></p>
            <p class="txt"><span>Av. Supply</span><span>${parseInt(
              coin.availableSupply
            ).toFixed(0)}</span></p>
            <p class="txt"><span>Mk. Cap.</span><span>${
              coin.marketCap
            }</span></p>
            <p class="txt"><span>1d Price</span><span class="${
              coin.priceChange1d < 0.0 ? "bearish" : "bullish"
            }">${coin.priceChange1d}%</span></p>
            <a class="exp" href=${coin.exp[0]}">Explore</a>
          </div>
        </div>
      `
    )
    .join("");
  listDiv.innerHTML = list;
}

// function listCoins(coin) {
//   coin.forEach((c) => {
//     const listDiv = document.querySelector("#list");
//     const listItemHolder = document.createElement("div");

//     const listItemDiv = document.createElement("div");
//     const listImgName = document.createElement("div");
//     const coinImg = document.createElement("img");
//     const coinName = document.createElement("p");
//     const listPriceDiv = document.createElement("div");
//     const coinPrice = document.createElement("p");
//     const coinMC = document.createElement("p");
//     const moreDiv = document.createElement("div");
//     const pName = document.createElement("p");
//     const pMaxSup = document.createElement("p");
//     const pAvSup = document.createElement("p");
//     const pMk = document.createElement("p");
//     const _1dp = document.createElement("p");
//     const exp = document.createElement("a");

//     // Assign classes to each
//     listItemHolder.classList.add("list-item-holder");
//     listItemDiv.classList.add("list-items");
//     listImgName.classList.add("list-img-name");
//     listPriceDiv.classList.add("list-price");
//     coinPrice.classList.add("price");
//     coinMC.classList.add("mc");
//     moreDiv.classList.add("more");
//     pName.classList.add("name");
//     pMaxSup.classList.add("txt");
//     pAvSup.classList.add("txt");
//     pMk.classList.add("txt");
//     _1dp.classList.add("txt");
//     exp.classList.add("exp");

//     // Assign values to the elements
//     coinImg.src = c.icon;
//     coinImg.alt = c.name;
//     coinName.innerHTML = c.symbol;
//     coinPrice.innerHTML = `${formatCurrency(parseFloat(c.price).toFixed(2))}`;
//     coinMC.innerHTML = `1d chg <span class="${
//       c.priceChange1d < 0.0 ? "bearish" : "bullish"
//     }">${c.priceChange1d}%</span>`;
//     pName.innerHTML = `<img src="${c.icon}" alt="${c.name}" /> <span>${c.name}</span>`;
//     pMaxSup.innerHTML = `<span>Max Supply</span><span>${parseInt(
//       c.totalSupply
//     ).toFixed(0)}</span>`;
//     pAvSup.innerHTML = `<span>Av. Supply</span><span>${parseInt(
//       c.availableSupply
//     ).toFixed(0)}</span>`;
//     pMk.innerHTML = `<span>Mk. Cap.</span><span>${c.marketCap}</span>`;
//     _1dp.innerHTML = `<span>1d Price</span><span class="${
//       c.priceChange1d < 0.0 ? "bearish" : "bullish"
//     }">${c.priceChange1d}%</span>`;
//     exp.href = c.exp[0];
//     exp.innerHTML = "Explore";

//     // Append element to each other
//     listImgName.appendChild(coinImg);
//     listImgName.appendChild(coinName);
//     listPriceDiv.appendChild(coinPrice);
//     listPriceDiv.appendChild(coinMC);
//     listItemDiv.appendChild(listImgName);
//     listItemDiv.appendChild(listPriceDiv);
//     moreDiv.appendChild(pName);
//     moreDiv.appendChild(pMaxSup);
//     moreDiv.appendChild(pAvSup);
//     moreDiv.appendChild(pMk);
//     moreDiv.appendChild(_1dp);
//     moreDiv.appendChild(exp);
//     listItemHolder.appendChild(listItemDiv);
//     listItemHolder.appendChild(moreDiv);
//     listDiv.appendChild(listItemHolder);
//   });
// }

function formatCurrency(number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
  return formatter;
}
