"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

import { fetchData } from "@/app/util/api";

export default function Page() {
  const fields: { name: string; value: keyof Item }[] = [
    { name: "연령조건", value: "ageCond" },
    { name: "순위", value: "ord" },
    { name: "성별", value: "sex" },
    { name: "기수명", value: "jkName" },
    { name: "기수번호", value: "jkNo" },
    { name: "경마장명", value: "meet" },
    { name: "마필생산국가", value: "name" },
    { name: "순위비고", value: "ordBigo" },
    { name: "마주명", value: "owName" },
    { name: "마주번호", value: "owNo" },
    { name: "복승식 배당율", value: "plcOdds" },
    { name: "상금조건", value: "prizeCond" },
    { name: "등급조건", value: "rank" },
    { name: "승군순위", value: "rankRise" },
    { name: "레이팅", value: "rating" },
    { name: "경주일자", value: "rcDate" },
    { name: "경주요일", value: "rcDay" },
    { name: "경주거리", value: "rcDist" },
    { name: "경주명", value: "rcName" },
    { name: "경주번호", value: "rcNo" },
    { name: "경주기록", value: "rcTime" },
  ];

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
      <div className="flex">
        {horses.map((v, i) => {
          // @ts-ignore
          return (
            <div className="flex">
              <Card>
                <CardHeader>
                  <div className="col-auto">Acme camera</div>
                </CardHeader>
                <CardBody>
                  <Image
                    src={`/${i + 1}.webp`}
                    alt="태스트이미지"
                    width="100%"
                    height="100%"
                  />
                </CardBody>
                <CardFooter>
                  <div className="row-auto">
                    <div className="col-auto">
                      {fields.map((field) => (
                        // <Text color="#000" size={12} key={field.value}>
                        <div>
                          {field.name}: {v[field.value]}
                        </div>
                        // </Text>
                      ))}
                    </div>
                    <div className="col-auto">
                      <div className="row-auto justify-center">
                        <Button>
                          <div
                          // css={{ color: "inherit" }}
                          // size={12}
                          // weight="bold"
                          // transform="uppercase"
                          >
                            Notify Me
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>
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
