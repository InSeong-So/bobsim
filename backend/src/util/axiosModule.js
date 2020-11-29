const axios = require("axios");
const {api} = require("../enviroment/properties")

const getMangoplateHtml = searchKeywords => {
    let urls = [];

    for (let index = 0; index < searchKeywords.length; index++) {
        for (let pageNumber = 1; pageNumber < 11; pageNumber++) {
            const url = "https://www.mangoplate.com/search/" + encodeURI(searchKeywords[index]) + "?keyword=" + encodeURI(searchKeywords[index]) + "&page=" + pageNumber;
            urls.push(url);
        }
    }

    const result = Promise.all(
        urls.map((loopUrl) => {
            return axios.get(loopUrl, {
                validateStatus: function (status) {
                    // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
                    return status < 500;
                }
            }).then(response => response.data).catch((error) => {
                if (error.response) {
                    // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답.
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    // 요청이 이루어 졌으나 응답을 받지 못함.
                    // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                    // Node.js의 http.ClientRequest 인스턴스.
                    // console.log(error.request);
                } else {
                    // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생.
                    // console.log('Error', error.message);
                }
                // console.log(error.enviroment);
            })
        })
    )

    return result;
};

const getKakaoMapJson = searchKeyword => {
    searchKeyword = encodeURI(searchKeyword);
    const url = "https://dapi.kakao.com/v2/local/search/keyword.json?query=" + searchKeyword;

    let config = {
        headers: {
            "Authorization": "KakaoAK " + api.getKaKaoKey().rest
        }
    }

    axios.get(url, config).then(response => {
        const documents = response.data.documents;

        const result = [];

        documents.map((list) => {
            const temp = {
                locationDetail: list.address_name,
                category: list.category_group_name,
                number: list.phone,
                restaurantNm: list.place_name,
                note: list.road_address_name,
            }

            result.push(temp);
        })
    }).catch((err) => {
        // TODO
    })
}

const getCurrentAddress = locationInfo => {
    const longitude = locationInfo.x;
    const latitude = locationInfo.y;
    const url = "https://dapi.kakao.com/v2/local/geo/coord2address.json?x=" + longitude + "&y=" + latitude;

    let config = {
        headers: {
            "Authorization": "KakaoAK " + api.getKaKaoKey().rest
        }
    }

    axios.get(url, config).then(response => {
        const documents = response.data.documents;
        console.log(documents);
    }).catch((err) => {
        // TODO
    })
};

module.exports = {getMangoplateHtml, getKakaoMapJson, getCurrentAddress};