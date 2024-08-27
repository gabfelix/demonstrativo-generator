import { JsxElement } from "typescript";
import {
  changePercent,
  formatMoney,
  Month,
  truncateString,
} from "../../utils/data";
import { Heading, Slide, Text } from "spectacle";

interface MonthSummarySlideProps {
  month: Month;
  slideTitle: string;
  previousMonth?: Month;
}

export function MonthSummarySlide({
  month,
  slideTitle,
  previousMonth,
}: MonthSummarySlideProps): JSX.Element {
  const ACCOUNT_NAME_MAXLENGTH = 18;
  return (
    <Slide>
      <Heading>{slideTitle}</Heading>
      <Text>
        Receitas: {formatMoney(month.getTotalIncomes())}
        {previousMonth &&
          ` (${changePercent(
            month.getTotalIncomes(),
            previousMonth.getTotalIncomes()
          ).toFixed(2)}%)`}
      </Text>
      <Text>
        Gastos: {formatMoney(month.getTotalExpenses())}
        {previousMonth &&
          ` (${changePercent(
            month.getTotalExpenses(),
            previousMonth.getTotalExpenses()
          ).toFixed(2)}%)`}
      </Text>
      <Text>
        Saldo: {formatMoney(month.getBalance())}
        {previousMonth &&
          ` (${changePercent(
            month.getBalance(),
            previousMonth.getBalance()
          ).toFixed(2)}%)`}
      </Text>
      <Text>
        Maior despesa: {formatMoney(month.getLargestExpense().value)} (
        {truncateString(month.getLargestExpense().name, ACCOUNT_NAME_MAXLENGTH)}
        )
      </Text>
      <Text>
        Maior receita: {formatMoney(month.getLargestIncome().value)} (
        {truncateString(month.getLargestIncome().name, ACCOUNT_NAME_MAXLENGTH)})
      </Text>
    </Slide>
  );
}
