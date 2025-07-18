class App {
  constructor() {
    this.notes = []; // Array to hold notes
    this.title = '';
    this.text = '';
    this.noteId = '';

    this.$placeholder = document.querySelector('#placeholder'); // Element for the placeholder
    this.$notes = document.querySelector('#notes'); // Element for the notes container
    this.$formCloseButton = document.querySelector('#form-close-button'); // Element for the form close button
    this.$form = document.querySelector('#form'); // Element for the form
    this.$noteTitle = document.querySelector('#note-title'); // Element for the note title
    this.$noteText = document.querySelector('#note-text'); // Element for the note text
    this.$formButtons = document.querySelector('#form-buttons'); // Elements for the form buttons
    this.$modal = document.querySelector('.modal'); // Element for the modal
    this.$modalTitle = document.querySelector('.modal-title');
    this.$modalText = document.querySelector('.modal-text');
    this.$modalCloseButton = document.querySelector('.modal-close-button');
    this.addEventListeners();
  }

  addEventListeners() {
    document.body.addEventListener('click', (event) => {
      this.handleFormClick(event);
      this.selectNote(event);
      this.openModal(event);
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

    this.$formCloseButton.addEventListener('click', (event) => {
      // Whenever the close button is clicked, click even that we regsiter for the form close button
      // will bubble up to the click event handler of the body and will cause the handle form click to run
      event.stopPropagation(); // Prevent the click event from bubbling up to the body
      this.closeForm();
    });

    this.$modalCloseButton.addEventListener('click', (event) => {
      this.closeModal(event);
    });
  }

  handleFormClick(event) {
    const isFormClicked = this.$form.contains(event.target);

    const title = this.$noteTitle.value.trim();
    const text = this.$noteText.value.trim();
    const hasNote = title || text;

    if (isFormClicked) {
      this.openForm();
    } else if (hasNote) {
      this.addNote({ title, text });
    } else {
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
    this.$noteTitle.value = '';
    this.$noteText.value = '';
  }

  openModal(event) {
    if (event.target.closest('.note')) {
      this.$modal.classList.toggle('open-modal');
      this.$modalTitle.value = this.title;
      this.$modalText.value = this.text;
    }
  }

  closeModal(event) {
    this.editNote();
  }

  addNote(note) {
    const newNote = {
      title: note.title,
      text: note.text,
      color: '#fff', // Default color
      id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1, // Date.now(), // Unique ID based on timestamp
    };
    this.notes = [...this.notes, newNote]; // Add the new note to the notes array
    this.displayNotes();
    this.closeForm();
  }

  editNote() {
    const updatedTitle = this.$modalTitle.value.trim();
    const updatedText = this.$modalText.value.trim();

    this.notes = this.notes.map((note) =>
      note.id === Number(this.noteId)
        ? { ...note, title: updatedTitle, text: updatedText }
        : note,
    );
    this.displayNotes();
    this.$modal.classList.toggle('open-modal');
  }

  selectNote(event) {
    const $selectedNote = event.target.closest('.note');
    // let noteTitle = '';
    // let noteText = '';
    if ($selectedNote) {
      // [noteTitle, noteText] = $selectedNote.children;
      console.log($selectedNote);
      this.title =
        $selectedNote?.querySelector('.note-title')?.textContent || '';
      this.text = $selectedNote?.querySelector('.note-text')?.textContent || '';
      this.noteId = $selectedNote.id; // Get the ID of the selected note
    }
  }

  displayNotes() {
    const hasNotes = this.notes.length > 0;
    this.$placeholder.style.display = hasNotes ? 'none' : 'flex'; // Show or hide the placeholder based on notes

    this.$notes.innerHTML = this.notes
      .map(
        (note) => `
      <div style="background: ${note.color};" class="note" id="${note.id}">
        <div class="${note.title && 'note-title'}">${note.title}</div>
        <div class="note-text">${note.text}</div>
        <div class="toolbar-container">
          <div class="toolbar">
            <img class="toolbar-color" src="/palette.png" alt="Change Color" />
            <img class="toolbar-delete" src="/delete.png" alt="Delete Color" />
          </div>
        </div>
      </div>
    `,
      )
      .join('');
  }
}

new App();
