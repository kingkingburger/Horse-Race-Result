"use client";
import { Card, Grid, Text, useTheme } from "@nextui-org/react";
import React from "react";
import { Card1 } from "@/app/custom/Card1";
import { Card2 } from "@/app/custom/Card2";
import { Card3 } from "@/app/custom/Card3";
import { Card4 } from "@/app/custom/Card4";
import { Card5 } from "@/app/custom/Card5";

export default function Example() {
  const { theme } = useTheme();

  return (
    <div>
      <Grid.Container gap={2}>
        <Grid xs={4}>
          <Card isHoverable variant="bordered" css={{ mw: "400px" }}>
            <Card.Header>
              <Text>card의 header 부분 입니다.</Text>
            </Card.Header>
            <Card.Divider></Card.Divider>
            <Card.Body color={"gray600"}>
              <Text>Default card. (shadow)</Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card variant="flat">
            <Card.Body>
              <Text>Flat card.</Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card variant="bordered">
            <Card.Body>
              <Text>Bordered card.</Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={4}>
          <Card1 />
        </Grid>
        <Grid xs={12} sm={4}>
          <Card2 />
        </Grid>
        <Grid xs={12} sm={4}>
          <Card3 />
        </Grid>
        <Grid xs={12} sm={5}>
          <Card4 />
        </Grid>
        <Grid xs={12} sm={7}>
          <Card5 />
        </Grid>
      </Grid.Container>
    </div>
  );
}
