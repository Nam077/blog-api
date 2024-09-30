/* eslint-disable*/

async function  createUser(body) {
  return await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
}

const list =  []
for (let i = 0; i < 100; i++) {
    list.push({
        name: `user${i}`,
        email: `demo${i}@gmail.com`,
        password: `password${i}`,
        role: 'user'
    });
}

(async () => {
    let promises = list.map(user => createUser(user));
    await Promise.all(promises);
})();