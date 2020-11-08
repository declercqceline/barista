import './style.css';
import data from './assets/data/coffees.json';

{
  let plantBasedCoffees = [];

  const init = () => {
    loadCoffees();
  };


  const createOrder = order => {
    const $li = document.createElement(`li`);
    $li.classList.add(`order`);
    $li.dataset.id = order.coffee.id;
    $li.innerHTML = `
      <span class="order__name">
        <span class="order__amount">${order.amount} x</span> ${order.coffee.name}
      </span>
      <span class="order__price">&euro; ${order.coffee.prices.medium * order.amount}</span>
      <button class="order__remove">
        x
      </button>
    `;
    $li.querySelector(`.order__remove`).addEventListener(`click`, handleClickRemove);
    return $li;
  };


  const handleClickLi = e => {
    // We zoeken de aangeklikte item in onze globale array
    const clickedCoffee = plantBasedCoffees.find(coffee => coffee.id === parseInt(e.currentTarget.dataset.id));
    addToOrder(clickedCoffee);
  };

  const makeCoffee = coffee => {
    const $li = document.createElement(`li`);
    $li.classList.add(`price`);
    $li.addEventListener(`click`, handleClickLi);
    $li.dataset.id = coffee.id;
    $li.innerHTML = `
      <a class="price__button">
        <span class="price__button__wrapper">
          <span class="price__button__name">${coffee.name}</span>
          <span class="price__button__amount">&euro; ${coffee.prices.medium}</span>
        </span>
        <span class="price__button__plus">+</span>
      </a>
    `;
    document.querySelector(`.prices__list`).appendChild($li);
  };

  const showCoffees = coffees => {
    coffees.forEach(coffee => {
      makeCoffee(coffee);
    });
  };

  const loadCoffees = () => {
    // A. Load JSON with Webpack
    plantBasedCoffees = data.coffees.filter(coffee => coffee.plantbased === true);
    showCoffees(plantBasedCoffees);

    // B. Fetch
    // fetch(`https://api.myjson.com/bins/tcmfq`).then(result => {
    //   return result.json();
    // }).then(result => {
    //   plantBasedCoffees = result.coffees.filter(coffee => coffee.plantbased === true);
    //   showCoffees(plantBasedCoffees);
    // });
  };

  init();
}
