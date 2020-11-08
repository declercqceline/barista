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
