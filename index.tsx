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
import { formatMoney, Month } from "./src/utils/data";
import currentMonthData from "./dist/current-month.json";
import lastMonthData from "./dist/last-month.json";

const Presentation = () => {
  const currentMonth = new Month(currentMonthData.data);

  console.log(currentMonth.transactions);
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
          <Text>{formatMoney(currentMonth.getTotalExpenses())}</Text>
          <Text>{formatMoney(currentMonth.getLargestExpense().value)}</Text>
          <Text>{formatMoney(currentMonth.getLargestIncome().value)}</Text>
        </FlexBox>
      </Slide>
    </Deck>
  );
};

createRoot(document.getElementById("app")!).render(<Presentation />);
