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
  const lastMonth = new Month(currentMonthData.data);
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
      <Slide>
        <Heading>Último mês</Heading>
        <Text>Receitas: {formatMoney(lastMonth.getTotalIncomes())}</Text>
        <Text>Gastos: {formatMoney(lastMonth.getTotalExpenses())}</Text>
        <Text>Saldo: {formatMoney(lastMonth.getBalance())}</Text>
        <Text>
          Maior despesa: {formatMoney(lastMonth.getLargestExpense().value)} (
          {lastMonth.getLargestExpense().name})
        </Text>
        <Text>
          Maior receita: {formatMoney(lastMonth.getLargestIncome().value)} (
          {lastMonth.getLargestIncome().name})
        </Text>
      </Slide>
      <Slide>
        <FlexBox height="100%">
          <Text>{formatMoney(currentMonth.getTotalExpenses())}</Text>
          <Text>{formatMoney(currentMonth.getLargestIncome().value)}</Text>
        </FlexBox>
      </Slide>
    </Deck>
  );
};

createRoot(document.getElementById("app")!).render(<Presentation />);
