class App {
  constructor() {
    this.notes = []; // Array to hold notes
    this.$form = document.querySelector('#form'); // Element for the form
    this.$noteTitle = document.querySelector('#note-title'); // Element for the note title
    this.$noteText = document.querySelector('#note-text'); // Element for the note text
    this.$formButtons = document.querySelector('#form-buttons'); // Elements for the form buttons
    this.addEventListeners();
  }

  addEventListeners() {
    document.body.addEventListener('click', (event) => {
      this.handleFormClick(event);
    });

    this.$form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the default form submission
      const title = this.$noteTitle.value.trim();
      const text = this.$noteText.value.trim();

      const hasNote = title || text; // Check if there's any note content
      if (hasNote) {
        this.addNote({ title, text });
      }
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

  addNote(note) {
    const newNote = {
      title: note.title,
      text: note.text,
      color: '#fff', // Default color
      id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1, // Date.now(), // Unique ID based on timestamp
    };
    this.notes = [...this.notes, newNote]; // Add the new note to the notes array
    console.log(this.notes);
  }
}

new App();
