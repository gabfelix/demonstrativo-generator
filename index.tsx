import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Deck,
  DefaultTemplate,
  Slide,
  FlexBox,
  Heading,
  SpectacleLogo,
  Text,
} from "spectacle";
import * as fs from "fs";
import * as Papa from "papaparse";
import lastMonthData from "./dist/last-month.json";

const Presentation = () => {
  console.log(lastMonthData);
  return (
    <Deck template={() => <DefaultTemplate />}>
      <Slide>
        <FlexBox height="100%">
          <Heading>demonstrativo-generator</Heading>
        </FlexBox>
      </Slide>
      <Slide>
        <FlexBox height="100%">
          <Heading fontSize="h2">Made with</Heading>
          <SpectacleLogo size={300} />
        </FlexBox>
      </Slide>
      <Slide>
        <FlexBox height="100%">
          <Text>{lastMonthData.data[1].Identificação}</Text>
          <Text>{lastMonthData.data[1].Valor}</Text>
        </FlexBox>
      </Slide>
    </Deck>
  );
};

createRoot(document.getElementById("app")!).render(<Presentation />);
