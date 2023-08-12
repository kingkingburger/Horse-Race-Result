import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { CardFooter } from "@nextui-org/card";

export const Card5 = () => (
  <Card>
    <CardHeader>Your day your way Your checklist for better sleep</CardHeader>
    <CardBody>
      <Image
        src="https://nextui.org/images/card-example-5.jpeg"
        width="100%"
        height="100%"
        alt="Relaxing app background"
      />
    </CardBody>
    <CardFooter>
      <Image
        src="https://nextui.org/images/breathing-app-icon.jpeg"
        height={40}
        width={40}
        alt="Breathing app icon"
      />
      Breathing App Get a good nights sleep.
      <Button>Get App</Button>
    </CardFooter>
  </Card>
);
