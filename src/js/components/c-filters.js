const toggleButton = document.querySelector('.c-radio-button--toggle');
const sortFilterButton = document.querySelectorAll('.c-radio-button--sort');
const filterButton = document.querySelectorAll('.c-radio-button--filter');
const filterIconButton = document.querySelectorAll('.c-radio-button--filter-icon');
const radioButton = document.getElementsByClassName("c-radio-button"); // all option buttons
const radioButtonLabel = document.querySelectorAll(".c-radio-button__label"); // all labels, including the trigger one

//- Declare Dropdown example toggle UI
const toggleExample = document.getElementById('dropdownExample');
let dropdownEl = document.getElementById('dropdownEl');

//- add event listener to toggle example input
if(toggleExample) {
  toggleExample.addEventListener("click", e => {
    let target = e.target;
  
    console.log(target);
  
    // check checkbox state
    if(target.checked === true) {
      console.log('checkbox checked');
      console.log(target.parentElement.parentElement.lastElementChild);
  
      // target.parentElement.parentElement.lastElementChild.classList.add('c-filter--inline');
      // target.parentElement.parentElement.lastElementChild.classList.remove('c-filter--dropdown');

      dropdownEl.classList.add('c-filter--inline');
      dropdownEl.classList.remove('c-filter--dropdown');
  
    } else {
      console.log('checkbox unchecked');
  
      // target.parentElement.parentElement.lastElementChild.classList.add('c-filter--dropdown');
      // target.parentElement.parentElement.lastElementChild.classList.remove('c-filter--inline');

      dropdownEl.classList.remove('c-filter--inline');
      dropdownEl.classList.add('c-filter--dropdown');
    }
  });
}


//- Event Handler for c-radio-button:
radioButtonLabel.forEach(function(target) {
  target.addEventListener("click", e => {
    // console.log(filterItem.parentElement.parentElement); //- .c-filter--dropdown 
    // console.log(e.target.parentElement); //- .c-radio-button...

    let key = e.target.parentElement;

    //- If click on Dropdown box => toggle class
    if(key.classList.contains("c-radio-button--toggle")) {
      // console.log('Toggle Dropdown');
      toggleIsChecked(e.target); 
    }

    // Other Filter type needs to be handle in different way than toggle class:
    // If dropdown 
    if(key.classList.contains("c-radio-button--sort")) {
      // console.log('Dropdown Options');
      toggleIsChecked(e.target);
      printContentOnDropdownBox(e.target);
      // console.log(sortFilterButton);
      handleFilters(sortFilterButton);
      // console.log(e.target); // .c-radio-button.c-radio-button--sort.is-checked
      // console.log(key); // .c-radio-button--sort.is-checked
    }

    // Other Filter type needs to be handle in different way than toggle class.
    if(key.classList.contains("c-radio-button--filter")) {
      // console.log('Filters');
      handleFilters(filterButton);
    }

    // Other Filter type needs to be handle in different way than toggle class.
    if(key.classList.contains("c-radio-button--filter-icon")) {
      // console.log('Filter Icons');
      handleFilters(filterIconButton);
    }

    // Other Filter type needs to be handle in different way than toggle class.
    // if(e.target.parentElement.classList.contains("c-radio-button")) {
    //   console.log('Generic button');
    // }

    e.preventDefault();
  });
});

// Toggle Dropdown Filter
// common to all filter types
function toggleIsChecked(item) {
  item.parentElement.classList.toggle("is-checked");
}

// function Clear Checked Siblings
// common to all filter types
function printContentOnDropdownBox(item) {
  // define textContent 
  let textToPrint = item.querySelector('.c-radio-button__text').textContent;
  // console.log(textToPrint);

  // define element to print textContent
  let destinationToPrint = document.querySelector(
    ".c-radio-button--toggle .c-radio-button__text"
  );

  if(textToPrint != null) {
    // console.log('textToPrint not null ' + textToPrint);
    destinationToPrint.textContent = textToPrint;

    // console.log(destinationToPrint.textContent = textToPrint);
  }
}

// removes siblings class if they contain .is-checked
// handles Dropdown
function handleFilters(item) {
  // console.log(item); // NodeList of all .c-radio-button.c-radio-button--type
  
  for (i = 0; i < item.length; i++) {
    // console.log(item.length);

    item[i].onclick = function() {
      // selects first item of the loop
      let indexedItem = item[0];
      
      while (indexedItem) {
        if (indexedItem.tagName === "DIV" && indexedItem.classList.contains("is-checked")) {
          let toggle = indexedItem.parentElement.previousElementSibling;

          //remove class
          indexedItem.classList.remove("is-checked");

          // console.log(indexedItem);

          // console.log(indexedItem.parentElement.previousElementSibling.classList); //- .c-radio-button.c-radio-button--toggle

          // if condition, remove .is-checked from toggle to automatically close the options list
          if(toggle !== null && toggle.classList.contains('c-radio-button--toggle')) {
            toggle.classList.remove('is-checked');
          }
        }

        // continue with the new sibling
        indexedItem = indexedItem.nextSibling;
      }
      
      // console.log(this); // .c-radio-button.c-radio-button--sort
      this.classList.add("is-checked");
    };
  }
}