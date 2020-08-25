const got = require("got");

const response = (movieName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const URL = `http://www.omdbapi.com/?t=${movieName}&apikey=${process.env.API_KEY}`;
      const response = await got(URL);
      const data = JSON.parse(response.body);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = response;
