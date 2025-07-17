class App {
  constructor() {
    this.$form = document.querySelector('#form'); // Element for the form
    this.$noteTitle = document.querySelector('#note-title'); // Element for the note title
    this.$formButtons = document.querySelector('#form-buttons'); // Elements for the form buttons
    this.addEventListeners();
  }

  addEventListeners() {
    document.body.addEventListener('click', (event) => {
      this.handleFormClick(event);
    });
  }

  handleFormClick(event) {
    const isFormClicked = this.$form.contains(event.target);

    if (isFormClicked) {
      // Open the form if clicked
      this.openForm();
    } else {
      // Close the form if clicked outside
      this.closeForm();
    }
  }

  openForm() {
    this.$form.classList.add('form-open');
    this.$noteTitle.style.display = 'block';
    this.$formButtons.style.display = 'block';
  }

  closeForm() {
    this.$form.classList.remove('form-open');
    this.$noteTitle.style.display = 'none';
    this.$formButtons.style.display = 'none';
  }
}

new App();
