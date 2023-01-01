getAndShowCupcakesOnStart();

const $cupcakeList = $("#cupcake-list");

// Get a list of cupcakes from the api
async function getAndShowCupcakesOnStart() {
  let response = await axios("/api/cupcakes");
  let cupcakes = response.data.cupcakes;
  putCupcakesOnPage(cupcakes);
}

function putCupcakesOnPage(cupcakes) {
  // loop through all of our cupcakes and generate HTML for them
  for (let cupcake of cupcakes) {
    const $cupcake = generateCupcakeMarkup(cupcake);
    $cupcakeList.append($cupcake);
  }
}

function generateCupcakeMarkup(cupcake) {
  return $(`
        <div class="col-sm-3">
            <div>
            <img src="${cupcake.image}", class ="img-fluid">
            </div>
            <div>
            <p class="mr mb-0">Flavor: ${cupcake.flavor}</p>
            <p class="mr mb-0">Rating: ${cupcake.rating}</p>
            <p class="mr mb-0">Size: ${cupcake.size}</p>
            </div>
        </div>
      `);
}

async function submitNewCupcake(evt) {
  console.log(evt);
  evt.preventDefault();

  // grab all info from form
  let flavor = $("#flavor").val();
  let size = $("#size").val();
  let rating = $("#rating").val();
  let image = $("#image").val();

  const response = await axios.post("/api/cupcakes", {
    flavor: flavor,
    size: size,
    rating: rating,
    image: image,
  });

  const new_cupcake = response.data.cupcake;
  addNewCupcakeOnPage(new_cupcake);
}

const $submitForm = $("#cupcake-form");
$submitForm.on("submit", submitNewCupcake);

function addNewCupcakeOnPage(cupcake) {
  const $cupcake = generateCupcakeMarkup(cupcake);
  $cupcakeList.append($cupcake);
}
