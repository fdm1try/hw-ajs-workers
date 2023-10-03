const { faker } = require('@faker-js/faker');

function getAllNews() {
  let count = Math.round(Math.random() * 3) + 4;
  const posts = [];
  while (count) {
    posts.push({
      id: faker.string.uuid(),
      title: faker.company.catchPhrase(),
      image: faker.image.urlLoremFlickr({ width: 200, height: 200, category: 'movie' }),
      content: faker.lorem.lines({ min: 10, max: 20 }),
    });
    count -= 1;
  }
  return posts;
}

module.exports = getAllNews;
