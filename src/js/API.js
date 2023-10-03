// eslint-disable-next-line no-undef
const endpoint = `http${SERVER_USESSL ? 's' : ''}://${SERVER_HOST}:${SERVER_PORT}`;

export default class API {
  static async getAllNews() {
    let data;
    const response = await fetch(`${endpoint}/news/all`);
    try {
      data = await response.json();
      console.log(data);
    } catch (error) {
      throw new Error('Формат ответа не соответствует требованиям.');
    }
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data;
  }
}
