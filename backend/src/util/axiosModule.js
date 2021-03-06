const axios = require("axios");
const {api} = require("../../../root/enviroment/properties")
const logger = require("../log/logger")

const getMangoplateHtml = searchKeywords => {
    let urls = [];

    for (let index = 0; index < searchKeywords.length; index++) {
        for (let pageNumber = 1; pageNumber < 11; pageNumber++) {
            const url = "https://www.mangoplate.com/search/" + encodeURI(searchKeywords[index]) + "?keyword=" + encodeURI(searchKeywords[index]) + "&page=" + pageNumber;
            urls.push(url);
        }
    }

    const urlRequest = urls.map((url) =>
        new Promise(resolve => setTimeout(() => resolve(fetchData(url)), 10000)));

    return Promise.all(urlRequest);
};


const fetchData = (url) => axios.get(url)
    .then(({data}) => {
        console.log('성공')
        return data;
    })
    .catch(function (error) {
        // { emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7 }
        logger.log('error', error.message)
        fetchData(url).then(r => console.log(r));
    });


// return axios.get(url, {
//     validateStatus: function (status) {
//         // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
//         return status < 500;
//     }
// }).then(response => response.data).catch((error) => {
//     if (error.response) {
//         // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답.
//         // console.log(error.response.data);
//         // console.log(error.response.status);
//         // console.log(error.response.headers);
//     } else if (error.request) {
//         // 요청이 이루어 졌으나 응답을 받지 못함.
//         // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
//         // Node.js의 http.ClientRequest 인스턴스.
//         // console.log(error.request);
//     } else {
//         // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생.
//         // console.log('Error', error.message);
//     }
//     // console.log(error.enviroment);
// });

const getKakaoMapToKeyword = (searchKeyword, x, y) => {
    return new Promise((resolve, reject) => {
        searchKeyword = encodeURI(searchKeyword);

        const url = "https://dapi.kakao.com/v2/local/search/keyword.json?query=" + searchKeyword;

        let config = {
            headers: {
                "Authorization": "KakaoAK " + api.getKaKaoKey().rest
            }
        }

        // Latitude = 위도 y
        // Longitude = 경도 x
        const compareDistance = (currentLatitude, currentLongitude, targetLatitude, targetLongitude) => {
            const theta = currentLongitude - targetLongitude;

            const deg2rad = deg => {
                return (deg * Math.PI / 180);
            }
            const rad2deg = rad => {
                return (rad * 180 / Math.PI);
            }

            let dist = Math.sin(deg2rad(currentLatitude)) * Math.sin(deg2rad(targetLatitude)) + Math.cos(deg2rad(currentLatitude))
                * Math.cos(deg2rad(targetLatitude)) * Math.cos(deg2rad(theta));
            dist = Math.acos(dist);
            dist = rad2deg(dist);
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344;
            return Number(dist * 1000).toFixed(2);
        }

        axios.get(url, config).then(response => {
            const documents = response.data.documents;

            const result = [];

            documents.map((list) => {
                let distance = compareDistance(x, y, list.x, list.y);
                list["distanceFormat"] = Math.round(parseFloat(distance)) / 1000 + "km";
                list["distance"] = distance;
                result.push(list);
            });

            result.sort((a, b) => {
                return (Number(a["distance"]) > Number(b["distance"])) ? 1 : ((Number(a["distance"]) < Number(b["distance"])) ? -1 : 0);
            })

            resolve(result);
        }).catch((err) => {
            // TODO
        });
    });
}

const getKakaoMapToAddress = searchAddress => {
    return new Promise(resolve => {
        searchAddress = encodeURI(searchAddress);
        const url = "https://dapi.kakao.com/v2/local/search/address.json?query=" + searchAddress;

        let config = {
            headers: {
                "Authorization": "KakaoAK " + api.getKaKaoKey().rest
            }
        }

        axios.get(url, config).then(response => {
            const documents = response.data.documents;
            documents.map((list) => {
                const result = {
                    address_name: list.address.address_name,
                    road_address: list.road_address.address_name,
                    x: list.address.x,
                    y: list.address.y,
                }
                resolve(result)
            })
        }).catch((err) => {
            // TODO
        })
    })
}

const getCurrentAddress = locationInfo => {
    return new Promise((resolve, reject) => {
        const longitude = locationInfo.x;
        const latitude = locationInfo.y;
        const url = "https://dapi.kakao.com/v2/local/geo/coord2address.json?x=" + longitude + "&y=" + latitude;

        let config = {
            headers: {
                "Authorization": "KakaoAK " + api.getKaKaoKey().rest
            }
        }

        axios.get(url, config).then(response => {
            resolve(response.data.documents);
        }).catch((err) => {
            reject(err);
        })
    })
};


// getKakaoMapToAddress("덕암동 7-3").then(r => {
//     console.log(r)
// });

// getKakaoMapToKeyword("두찜").then(data => {
//     console.log(data);
// });

module.exports = {getMangoplateHtml, getKakaoMapToKeyword, getKakaoMapToAddress, getCurrentAddress};