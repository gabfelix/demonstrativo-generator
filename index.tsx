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
import { MonthSummarySlide } from "./src/components/MonthSummary";

const Presentation = () => {
  const lastMonth = new Month(lastMonthData.data);
  const currentMonth = new Month(currentMonthData.data);

  console.log(currentMonth.transactions);
  return (
    <Deck template={() => <DefaultTemplate />}>
      <Slide>
        <FlexBox height="100%">
          <Heading>demonstrativo-generator</Heading>
        </FlexBox>
        <FlexBox height="100%">
          <Heading fontSize="h2">Feito com</Heading>
          <SpectacleLogo size={150} />
        </FlexBox>
      </Slide>
      <MonthSummarySlide month={lastMonth} slideTitle="Abril" />
      <MonthSummarySlide
        month={currentMonth}
        slideTitle="Maio"
        previousMonth={lastMonth}
      />
    </Deck>
  );
};

createRoot(document.getElementById("app")!).render(<Presentation />);
