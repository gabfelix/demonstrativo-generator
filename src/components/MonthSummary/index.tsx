import { JsxElement } from "typescript";
import { changePercent, formatMoney, Month } from "../../utils/data";
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
          ` (${(
            changePercent(
              month.getTotalExpenses(),
              previousMonth.getTotalExpenses()
            ) * -1
          ) // Expenses are negative because that makes more intuitive sense even if not mathematically sound
            .toFixed(2)}%)`}
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
        {month.getLargestExpense().name})
      </Text>
      <Text>
        Maior receita: {formatMoney(month.getLargestIncome().value)} (
        {month.getLargestIncome().name})
      </Text>
    </Slide>
  );
}
