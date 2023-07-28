"use client";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Grid, Row, Text } from "@nextui-org/react";
import { fetchData } from "@/app/util/api";

export default function Page() {
  const [horses, setHorse] = useState<Item[]>([]);
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_API_KEY;
    const fetchDataFromAPI = async () => {
      try {
        const param = {
          serviceKey: key,
        };

        const result = (await fetchData(param)) as ApiResponse;
        console.log(result);
        console.log(result.response.body.items.item);
        setHorse(result.response.body.items.item);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataFromAPI();
  }, []);

  return (
    <div>
      <Grid.Container gap={2}>
        {horses.map((v, i) => {
          return (
            <Grid xs={4} key={i}>
              <Card css={{ w: "100%", h: "400px" }}>
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                  <Col>
                    <Text
                      size={12}
                      weight="bold"
                      transform="uppercase"
                      color="#ffffffAA"
                    >
                      New
                    </Text>
                    <Text h3 color="black">
                      Acme camera
                    </Text>
                  </Col>
                </Card.Header>
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={`/${i + 1}.webp`}
                    alt="태스트이미지"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                  />
                </Card.Body>
                <Card.Footer
                  isBlurred
                  css={{
                    position: "absolute",
                    bgBlur: "#ffffff66",
                    borderTop:
                      "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                    bottom: 0,
                    zIndex: 1,
                  }}
                >
                  <Row>
                    <Col>
                      <Text color="#000" size={12}>
                        연령조건: {v.ageCond}
                      </Text>
                      <Text color="#000" size={12}>
                        순위: {v.ord}
                      </Text>
                      <Text color="#000" size={12}>
                        {v.sex}
                      </Text>
                      <Text color="#000" size={12}>
                        기수명: {v.jkName}
                      </Text>
                      <Text color="#000" size={12}>
                        기수번호: {v.jkNo}
                      </Text>
                      <Text color="#000" size={12}>
                        경마장명: {v.meet}
                      </Text>
                      <Text color="#000" size={12}>
                        마필생산국가: {v.name}
                      </Text>
                      <Text color="#000" size={12}>
                        순위: {v.ord}
                      </Text>
                      <Text color="#000" size={12}>
                        순위비고: {v.ordBigo}
                      </Text>
                      <Text color="#000" size={12}>
                        마주명: {v.owName}
                      </Text>
                      <Text color="#000" size={12}>
                        마주번호: {v.owNo}
                      </Text>
                      <Text color="#000" size={12}>
                        복승식 배당율: {v.plcOdds}
                      </Text>
                      <Text color="#000" size={12}>
                        상금조건: {v.prizeCond}
                      </Text>
                      <Text color="#000" size={12}>
                        등급조건: {v.rank}
                      </Text>
                      <Text color="#000" size={12}>
                        승군순위: {v.rankRise}
                      </Text>
                      <Text color="#000" size={12}>
                        레이팅: {v.rating}
                      </Text>
                      <Text color="#000" size={12}>
                        경주일자: {v.rcDate}
                      </Text>
                      <Text color="#000" size={12}>
                        경주요일: {v.rcDay}
                      </Text>
                      <Text color="#000" size={12}>
                        경주거리: {v.rcDist}
                      </Text>
                      <Text color="#000" size={12}>
                        경주명: {v.rcName}
                      </Text>
                      <Text color="#000" size={12}>
                        경주번호: {v.rcNo}
                      </Text>
                      <Text color="#000" size={12}>
                        경주기록: {v.rcTime}
                      </Text>
                    </Col>
                    <Col>
                      <Row justify="flex-end">
                        <Button flat auto rounded color="secondary">
                          <Text
                            css={{ color: "inherit" }}
                            size={12}
                            weight="bold"
                            transform="uppercase"
                          >
                            Notify Me
                          </Text>
                        </Button>
                      </Row>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid>
          );
        })}
      </Grid.Container>
    </div>
  );
}

// body 속성의 타입을 정의하는 인터페이스
interface ResponseBody {
  items: { item: Item[] }; // items는 Item 인터페이스의 배열로 가정합니다.
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

// header 속성의 타입을 정의하는 인터페이스
interface ResponseHeader {
  resultCode: string;
  resultMsg: string;
}

// response 속성의 타입을 정의하는 인터페이스
interface ApiResponse {
  response: {
    header: ResponseHeader;
    body: ResponseBody;
  };
}

interface Item {
  age: number;
  ageCond: string;
  birthday: number;
  buG1fAccTime: number;
  buG1fOrd: number;
  buG2fAccTime: number;
  buG2fOrd: number;
  buG3fAccTime: number;
  buG3fOrd: number;
  buG4fAccTime: number;
  buG4fOrd: number;
  buG6fAccTime: number;
  buG6fOrd: number;
  buG8fAccTime: number;
  buG8fOrd: number;
  buS1fAccTime: number;
  buS1fOrd: number;
  buS1fTime: number;
  bu_10_8fTime: number;
  bu_1fGTime: number;
  bu_2fGTime: number;
  bu_3fGTime: number;
  bu_4_2fTime: number;
  bu_6_4fTime: number;
  bu_8_6fTime: number;
  budam: string;
  buga1: number;
  buga2: number;
  buga3: number;
  chaksun1: number;
  chaksun2: number;
  chaksun3: number;
  chaksun4: number;
  chaksun5: number;
  chulNo: number;
  diffUnit: string;
  hrName: string;
  hrNo: string;
  hrTool: string;
  ilsu: number;
  jeG1fTime: number;
  jeG3fTime: number;
  jeS1fTime: number;
  je_1cTime: number;
  je_2cTime: number;
  je_3cTime: number;
  je_4cTime: number;
  jkName: string;
  jkNo: string;
  meet: string;
  name: string;
  ord: number;
  ordBigo: string;
  owName: string;
  owNo: number;
  plcOdds: number;
  prizeCond: string;
  rank: string;
  rankRise: number;
  rating: number;
  rcDate: number;
  rcDay: string;
  rcDist: number;
  rcName: string;
  rcNo: number;
  rcTime: number;
  seG1fAccTime: number;
  seG3fAccTime: number;
  seS1fAccTime: number;
  se_1cAccTime: number;
  se_2cAccTime: number;
  se_3cAccTime: number;
  se_4cAccTime: number;
  sex: string;
  sjG1fOrd: number;
  sjG3fOrd: number;
  sjS1fOrd: number;
  sj_1cOrd: number;
  sj_2cOrd: number;
  sj_3cOrd: number;
  sj_4cOrd: number;
  trName: string;
  trNo: string;
  track: string;
  weather: string;
  wgBudam: number;
  wgBudamBigo: string;
  wgHr: string;
  wgJk: number;
  winOdds: number;
}
