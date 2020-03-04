const radioButton = document.querySelectorAll(".c-radio-button--sort, .c-radio-button--filter, .c-radio-button--filter-icon"); // all option buttons
const radioButtonLabel = document.querySelectorAll(".c-radio-button__label"); // all labels, including the trigger one

//- Generic functionality for radio-button:
//- Add .is-checked helper class to parent if clicked
radioButtonLabel.forEach(function(item) {
  item.addEventListener("click", e => {
    // toggles .is-checked to the target parent .c-radio-button
    item.parentElement.classList.toggle("is-checked");

    handleDropdown(radioButton);

    e.preventDefault();
  });
});

// removes siblings class if they contain .is-checked
function handleDropdown(item) {
  for (var i = 0; i < item.length; i++) {
    item[i].onclick = function() {
      // selects first item of the loop
      let target = item[0];

      while (target) {
        if (target.tagName === "DIV" && target.classList.contains("is-checked")) {
          //remove class
          target.classList.remove("is-checked");

          if(target.classList.contains("c-radio-button--sort")) {
            // define textContent 
            let textToPrint = this.querySelector('.c-radio-button__text').textContent;
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

            // remove .is-checked from toggle to automatically close the options list
            let toggleButton = document.querySelector('.c-radio-button--toggle');

            if(toggleButton.classList.contains('is-checked')) {
              toggleButton.classList.remove('is-checked');
            }
          }
        }

        // continue with the new sibling
        target = target.nextSibling;
      }
      
      // console.log(this); // .c-radio-button.c-radio-button--sort
      this.classList.add("is-checked");

      
    };
  }
}