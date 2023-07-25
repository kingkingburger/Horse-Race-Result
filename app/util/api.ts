// 예를 들어, utils/api.js라는 파일을 생성하고 다음과 같이 Axios를 활용하여 API를 호출하는 함수를 만듭니다.

import axios from "axios";

const api = axios.create({
  baseURL: "https://apis.data.go.kr/B551015/API214_1/RaceDetailResult_1", // API 엔드포인트의 기본 URL을 설정합니다.
  // 다른 Axios 설정을 필요에 따라 추가할 수 있습니다.
});

export const fetchData = async (params: unknown) => {
  try {
    const response = await api.get("", { params });
    return response.data;
  } catch (error) {
    throw new Error("API 호출에 실패했습니다.");
  }
};
