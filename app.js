const { Select, Input } = require('enquirer');
const { User, Phone } = require('./db/models');
const {
  addUserInput, startSelect, addPhoneInput, phoneActionSelect,
} = require('./promptConsts');

async function run() {
  while (true) {
    const startPrompt = new Select(startSelect);
    const action = await startPrompt.run();
    if (action === 'add') {
      const addUserPrompt = new Input(addUserInput);
      const newName = await addUserPrompt.run();
      const newUser = await User.create({ name: newName });
      console.log('Adding new user', newUser);
    }
    if (action === 'show') {
      const allUsers = await User.findAll(); // name
      const chooseUserPrompt = new Select({
        name: 'allUsers',
        message: 'All users:',
        choices: allUsers.map((user) => ({ message: user.name, name: user.id })),
      });
      const chosenUserId = await chooseUserPrompt.run();
      //   console.log('ID?', chosenUserId);
      const allPhones = await Phone.findAll({
        where: {
          userId: chosenUserId,
        },
      });
      const userPhones = new Select({
        name: 'allPhones',
        message: 'This user`s phones',
        choices: [{ message: 'Add a number', name: 'addNum' },
          ...allPhones.map((phone) => ({ message: phone.value, name: phone.id }))],
      });
      const chosenPhoneId = await userPhones.run();
      if (chosenPhoneId === 'addNum') {
        const addPhonePrompt = new Input(addPhoneInput);
        const newPhone = await addPhonePrompt.run();
        await Phone.create({ value: newPhone, userId: chosenUserId });
      } else { // Мы знаем, что chosenPhoneId - это реальный id
        const phoneActionPrompt = new Select(phoneActionSelect);
        const phoneAction = await phoneActionPrompt.run();
        if (phoneAction === 'delete') {
          await Phone.destroy({
            where: {
              id: chosenPhoneId,
            },
          });
          console.log('Phone deleted!');
        } else {
          console.log('Edit function is not ready yet');
        }
      }
    }
  }
}

run();

// startPrompt.run()
//   .then((answer) => console.log('Answer:', answer))
//   .catch(console.error);
