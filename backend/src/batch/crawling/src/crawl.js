const axios = require("axios");

const getRestaurantList = searchKeywords => {
    const result = Promise.all(
        searchKeywords.map((keyword) => {
            const url = "https://www.mangoplate.com/search/" + encodeURI(keyword) + "?keyword=" + encodeURI(keyword) + "&page=1";
            return axios.get(url).then(response => response.data)
        })
    );

    return result;
};

module.exports = {getRestaurantList};