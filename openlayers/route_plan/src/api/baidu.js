import axios from "axios";

/**
 * 
 * @param {*} origin 
 * @param {*} destination 
 * @param {*} tactics 
 *  0：默认
    3：不走高速
    4：高速优先
    5：躲避拥堵
    6：少收费
    7：躲避拥堵&高速优先
    8：躲避拥堵&不走高速
    9：躲避拥堵&少收费
    10：躲避拥堵&不走高速&少收费
    11：不走高速&少收费
 */
export function driving(origin, destination, tactics) {
  return axios({
    url: "/direction/v2/driving",
    method: "get",
    params: {
      ak: "7CvvRepDRLFpqOwdxqaEYQhQLh26Uess",
      coord_type: "wgs84", //参数坐标类型
      ret_coordtype: "gcj02", //返回结果坐标类型
      alternatives: 1,
      origin,
      destination,
      tactics
    }
  });
}

export function placeSuggestion(query) {
  return axios({
    url: "/place/v2/suggestion",
    method: "get",
    params: {
      ak: "7CvvRepDRLFpqOwdxqaEYQhQLh26Uess",
      query,
      region: "全国",
      ret_coordtype: "gcj02ll",
      output: "json"
    }
  });
}
