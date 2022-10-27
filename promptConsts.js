const startSelect = {
  name: 'start',
  message: 'Choose:',
  choices: [
    {
      value: 'value',
      name: 'show',
      message: 'Show all users',
    },
    {
      value: 'value',
      name: 'add',
      message: 'Add a user',
    }],
};

const addUserInput = {
  message: 'Enter user name:',
};

const addPhoneInput = {
  message: 'Enter new phone number:',
};

const phoneActionSelect = {
  name: 'actions',
  message: 'Choose one:',
  choices: [
    {
      name: 'delete',
      message: 'Delete this phone number',
    },
    {
      name: 'edit',
      message: 'Edit this phone number',
    }],
};

module.exports = {
  startSelect, addUserInput, addPhoneInput, phoneActionSelect,
};
