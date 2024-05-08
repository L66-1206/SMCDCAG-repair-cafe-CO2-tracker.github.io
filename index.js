var treesAbsorbTotal = 0;
var co2PreventedTotal = 0;
var infoType = 'one';
var carbonData = {
  wooden: {
    table: { co2: 15, averageWeight: 5 },
    chair: { co2: 12, averageWeight: 3 },
    // Add more wood products
  },
  'electrical & electronic repairs': {
    Display: { co2: 411, averageWeight: 6.4 },
    Laptop: { co2: 376, averageWeight: 1.9 },
    TV: { co2: 300, averageWeight: 20 },
    'Air conditioner': { co2: 300, averageWeight: 54 },
    'Gas water heater': { co2: 200, averageWeight: 10 },
    'Hedge trimmer': { co2: 200, averageWeight: 15 },
    'Record player': { co2: 150, averageWeight: 10 },
    'Games console': { co2: 140, averageWeight: 3.2 },
    'Hand held electric drill': { co2: 100, averageWeight: 2.5 },
    'Bracker fan': { co2: 100, averageWeight: 3 },
    'Vacuum cleaner': { co2: 100, averageWeight: 4.5 },
    'Electric heater': { co2: 100, averageWeight: 6 },
    Printer: { co2: 100, averageWeight: 10 },
    Dehumidifier: { co2: 100, averageWeight: 12 },
    'Tablet (iPad)': { co2: 80, averageWeight: 0.5 },
    'Electric blanket': { co2: 70, averageWeight: 3 },
    'Ceiling light': { co2: 69, averageWeight: 3 },
    'Mobile phone': { co2: 55, averageWeight: 0.2 },
    Kettle: { co2: 50, averageWeight: 2 },
    Hairdryer: { co2: 50, averageWeight: 2 },
    'Milk frother': { co2: 35, averageWeight: 1.3 },
    'Coffee grinder/Coffee machine': { co2: 351, averageWeight: 1.9 },
    'Remote controlled airplane': { co2: 30, averageWeight: 1.5 },
    'PC accessory': { co2: 27, averageWeight: 0.8 },
    'Digital camera': { co2: 26, averageWeight: 0.8 },
    'Hair straighteners': { co2: 20, averageWeight: 0.5 },
    'Standard chandeliers': { co2: 18, averageWeight: 1.2 },
    'Toy plane': { co2: 15, averageWeight: 0.5 },
    'Wireless headphone': { co2: 14, averageWeight: 0.3 },
    'Apple charger': { co2: 10, averageWeight: 0.3 },
    Toasters: { co2: 9, averageWeight: 1.5 },
    'Wireless earbuds': { co2: 6, averageWeight: 0.05 },
    Juicers: { co2: 5.5, averageWeight: 1.5 },
    'Wired earbuds': { co2: 0.5, averageWeight: 0.02 },
    // Add more electrical & electronic
  },
  leather: {
    Shoes: { co2: 18, averageWeight: 0.5 },
    Belt: { co2: 10, averageWeight: 0.3 },
    // Add more leather goods
  },
  'general mechanical repairs': {
    Umbrella: { co2: 7.1, averageWeight: 0.7 },
    'Sewing machine': { co2: 3.3, averageWeight: 10 },
    // Add more mechanical products
  },
};

// Populate the item name dropdown based on the selected category
function populateItems() {
  var category = document.getElementById('itemCategory').value;
  var itemNameDropdown = document.getElementById('itemName');
  itemNameDropdown.innerHTML = ''; // Clear previous options

  if (category && carbonData.hasOwnProperty(category)) {
    var items = carbonData[category];
    for (var item in items) {
      var option = document.createElement('option');
      option.text = item;
      itemNameDropdown.add(option);
    }
  }
  // Update default weight display
  updateDefaultWeight();
}

// Get the default weight of the selected item
function getDefaultWeight() {
  var category = document.getElementById('itemCategory').value;
  var itemName = document.getElementById('itemName').value;
  if (
    category &&
    itemName &&
    carbonData.hasOwnProperty(category) &&
    carbonData[category].hasOwnProperty(itemName)
  ) {
    return carbonData[category][itemName].averageWeight;
  }
  return '';
}

// Update default weight
function updateDefaultWeight() {
  var defaultWeightInput = document.getElementById('defaultWeight');
  defaultWeightInput.value = getDefaultWeight();
}

// Update default weight after selecting item name
document
  .getElementById('itemName')
  .addEventListener('change', updateDefaultWeight);

// Search item name
function searchItems() {
  var searchInput = document
    .getElementById('itemNameSearch')
    .value.toLowerCase();
  var category = document.getElementById('itemCategory').value;
  var itemNameDropdown = document.getElementById('itemName');

  itemNameDropdown.innerHTML = ''; // Clear previous options

  if (category && carbonData.hasOwnProperty(category)) {
    var items = carbonData[category];
    for (var item in items) {
      if (item.toLowerCase().startsWith(searchInput)) {
        var option = document.createElement('option');
        option.text = item;
        itemNameDropdown.add(option);
      }
    }
  }
}

function add() {
  var itemName = document.getElementById('itemName').value; // Do not convert to lowercase
  var itemWeight = document.getElementById('itemWeight').value;
  var itemQuantity = document.getElementById('itemQuantity').value; // Get item quantity

  // Check if item name is selected
  if (itemName === '') {
    alert('Please select an item name.');
    return; // Stop executing function
  }

  var category = document.getElementById('itemCategory').value;
  var eco2Emission = carbonData[category][itemName]; // Use the same case as the project name

  var defaultWeight = eco2Emission.averageWeight;

  if (!itemWeight) {
    itemWeight = defaultWeight;
  }

  itemWeight = parseFloat(itemWeight);
  itemQuantity = parseInt(itemQuantity); // Parse quantity into integer

  var co2Prevented = Math.round(
      itemWeight * (eco2Emission.co2 / eco2Emission.averageWeight * 0.5) * itemQuantity
  ); // Consider the number of items and round to a whole number

  // Calculate carbon dioxide absorbed by trees, rounded to one decimal place
  var treesAbsorb = Math.round((co2Prevented / 25) * 10) / 10;

  var temp = [itemName, itemWeight, itemQuantity, co2Prevented, treesAbsorb];
  var tableBody = document.getElementById('tableBody');
  var row = document.createElement('tr'); // Create tr element

  temp.forEach(function (item) {
    var cell = document.createElement('td'); // Create tr element
    cell.textContent = item; // Sets the cell content
    row.appendChild(cell); // Adds a cell to the row
  });

  // Creates a delete button cell
  var actionCell = document.createElement('td');
  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  // Add a click event listener for the delete button
  deleteButton.addEventListener('click', function () {
    var cells = row.getElementsByTagName('td');

    co2PreventedTotal =
      (co2PreventedTotal * 10000 - cells[3].textContent * 10000) / 10000;
    treesAbsorbTotal =
      (treesAbsorbTotal * 10000 - cells[4].textContent * 10000) / 10000;
    // Delete current line
    tableBody.removeChild(row);
    var rows = tableBody.getElementsByTagName('tr');
    if (rows.length == 0) {
      document.getElementById('sum').style.display = 'none';
      var resultElement = document.getElementById('result');
      resultElement.innerHTML = '';
      resultElement.style.display = 'none';

      var environmentIcons = document.getElementById('environment-icons');
      environmentIcons.innerHTML = ''; // Clear previous icon
    } else {
      sum();
    }
  });
  actionCell.appendChild(deleteButton);
  row.appendChild(actionCell);

  // Add rows to tbody
  tableBody.appendChild(row);
  co2PreventedTotal += co2Prevented;
  treesAbsorbTotal += treesAbsorb;
  document.getElementById('sum').style.display = 'block';
}

function sum() {
  var resultElement = document.getElementById('result');
  resultElement.innerHTML =
    "Repairing saves <span class='highlight'>" +
    co2PreventedTotal +
    " kg</span> of CO2 emissions. This is equivalent to the amount of CO2 absorbed by <span class='highlight'>" +
    treesAbsorbTotal +
    ' adult trees</span> per year.';

  resultElement.style.display = 'block';
  // Show tree pictures
  displayTrees(treesAbsorbTotal);
}

function calculateCarbon() {
  var itemName = document.getElementById('itemName').value; // Do not convert to lowercase
  var itemWeight = document.getElementById('itemWeight').value;
  var itemQuantity = document.getElementById('itemQuantity').value; // Get item quantity

  // Check if item name is selected
  if (itemName === '') {
    alert('Please select an item name.');
    return; // Stop executing function
  }

  var category = document.getElementById('itemCategory').value;
  var eco2Emission = carbonData[category][itemName]; // Use the same case as the project name

  var defaultWeight = eco2Emission.averageWeight;

  if (!itemWeight) {
    itemWeight = defaultWeight;
  }

  itemWeight = parseFloat(itemWeight);
  itemQuantity = parseInt(itemQuantity); // Parse quantity into integer

    var co2Prevented = Math.round(
        itemWeight * (eco2Emission.co2 / eco2Emission.averageWeight *0.5) * itemQuantity
  ); // Consider the number of items and round to a whole number

  // Calculate carbon dioxide absorbed by trees, rounded to one decimal place
  var treesAbsorb = Math.round((co2Prevented / 25) * 10) / 10;

  var resultElement = document.getElementById('result');
  resultElement.innerHTML =
    'Repairing ' +
    itemName +
    " saves <span class='highlight'>" +
    co2Prevented +
    " kg</span> of CO2 emissions. This is equivalent to the amount of CO2 absorbed by <span class='highlight'>" +
    treesAbsorb +
    ' adult trees</span> per year.';
  resultElement.style.display = 'block';

  // Show tree pictures
  displayTrees(treesAbsorb);
}

// Show tree pictures
function displayTrees(treeCount) {
  var environmentIcons = document.getElementById('environment-icons');
  environmentIcons.innerHTML = ''; // Clear previous icon

  var treesContainer = document.createElement('div'); // Create a container for the trees

  var fullTrees = Math.floor(treeCount);
  var remainder = treeCount - fullTrees; // Decimal part  

  var treeWidth = 30; // Set the width of the tree icon
  var treeHeight = 30; // Set the height of the tree icon

  for (var i = 0; i < fullTrees; i++) {
    var treeImg = document.createElement('img');
    treeImg.src = 'Tree.png';
    treeImg.alt = 'Tree';
    treeImg.classList.add('environment-icon');
    treeImg.style.width = treeWidth + 'px'; // Set width of the tree icon
    treeImg.style.height = treeHeight + 'px'; // Set height of the tree icon
    treesContainer.appendChild(treeImg);
  }

  // Partial tree image showing decimal part
  if (remainder > 0 && remainder < 1) {
    var partialTreeImg = document.createElement('img');
    partialTreeImg.src = 'Tree.png';
    partialTreeImg.alt = 'Partial Tree';
    partialTreeImg.classList.add('environment-icon');
    partialTreeImg.style.width = treeWidth + 'px'; // Set the total width to treeWidth
    partialTreeImg.style.height = treeHeight + 'px';
    partialTreeImg.style.objectFit = 'cover'; // Ensure the image covers the area fully
    partialTreeImg.style.clipPath =
      'inset(0 ' + (100 - remainder * 100) + '% 0 0)'; // Clip only the right side based on remainder
    treesContainer.appendChild(partialTreeImg);
  }

  environmentIcons.appendChild(treesContainer);
}

// Show information popup
function showInfo(type) {
  infoType = type;
  var infoPopup = document.getElementById('info-popup');
  infoPopup.style.display = 'block';
  var infoDom = document.getElementById(`info-${type}`);
  infoDom.style.display = 'block';
}

// Close information popup
function closeInfo() {
  var infoDom = document.getElementById(`info-${infoType}`);
  infoDom.style.display = 'none';

  var infoPopup = document.getElementById('info-popup');
  infoPopup.style.display = 'none';
}

// Initial binding click event
document.getElementById('calculate').addEventListener('click', calculateCarbon);

document.addEventListener('DOMContentLoaded', function () {
  // Get all menu items
  var menuItems = document.querySelectorAll('.menu li');

  // Add click event listener for each menu item
  menuItems.forEach(function (menuItem) {
    menuItem.addEventListener('click', function () {
      menuItems.forEach(function (item) {
        item.classList.remove('active');
      });
      this.classList.add('active');
      var resultElement = document.getElementById('result');
      resultElement.innerHTML = '';
      resultElement.style.display = 'none';

      var environmentIcons = document.getElementById('environment-icons');
      environmentIcons.innerHTML = ''; // Clear previous icon

      // Shows the content area associated with the current menu item
      var contentId = this.getAttribute('data-content');
      var calculatorDom = document.getElementById('calculator');
      var totalDom = document.getElementById('total');
      var myButton = document.getElementById('calculate');
      if (contentId == 'complex') {
        totalDom.style.display = 'block';
        calculatorDom.style.width = '40%';
        calculatorDom.style.left = '1%';

        myButton.removeEventListener('click', calculateCarbon);
        myButton.addEventListener('click', add);
      } else {
        totalDom.style.display = 'none';
        calculatorDom.style.width = '40%';
        calculatorDom.style.left = '30%';

        myButton.removeEventListener('click', add);
        myButton.addEventListener('click', calculateCarbon);
      }
    });
  });
});
