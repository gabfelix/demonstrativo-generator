import currentMonthData from "../../dist/current-month.json";
import lastMonthData from "../../dist/last-month.json";

enum TransactionType {
  DEBIT,
  CREDIT,
}
interface RawTransactionData {
  Data: string;
  Transação?: string;
  "Tipo Transação"?: string;
  Identificação?: string;
  Valor?: string;
}

interface StatementTransaction {
  date: Date;
  description: string;
  type: TransactionType;
  name: string;
  value: number;
}

export class Month {
  transactions: Array<StatementTransaction>;

  constructor(data: Array<RawTransactionData>) {
    this.transactions = data.map((item: RawTransactionData) =>
      this.parseRawTransaction(item)
    );
  }

  getExpenses(): Array<StatementTransaction> {
    return this.transactions.filter(
      (item: StatementTransaction) => item.value < 0
    );
  }

  getLargestExpense(): StatementTransaction {
    return this.getExpenses().reduce((acc, item) => {
      return acc.value < item.value ? acc : item;
    });
  }

  getTotalExpenses(): number {
    return this.getExpenses().reduce(
      (acc: number, item: StatementTransaction) => {
        return acc + item.value;
      },
      0.0
    );
  }

  getIncomes(): Array<StatementTransaction> {
    return this.transactions.filter(
      (item: StatementTransaction) => item.value >= 0
    );
  }

  getLargestIncome(): StatementTransaction {
    return this.getIncomes().reduce((acc, item) => {
      return acc.value > item.value ? acc : item;
    });
  }

  getTotalIncomes(): number {
    return this.getIncomes().reduce(
      (acc: number, item: StatementTransaction) => {
        return acc + item.value;
      },
      0.0
    );
  }

  getBalance(): number {
    return this.getTotalIncomes() + this.getTotalExpenses();
  }

  //#region Private methods
  private parseRawTransaction(
    transaction: RawTransactionData
  ): StatementTransaction {
    return {
      date: new Date(transaction.Data),
      description: transaction.Transação ? transaction.Transação : "",
      type: transaction["Tipo Transação"]
        ? this.parseTransactionType(transaction["Tipo Transação"])
        : TransactionType.CREDIT, // Defaulting to credit
      name: transaction.Identificação ? transaction.Identificação : "",
      value: transaction.Valor ? parseFloat(transaction.Valor) : 0,
    };
  }

  private parseTransactionType(type: string): TransactionType {
    return type === "Débito" ? TransactionType.DEBIT : TransactionType.CREDIT;
  }
}

export function changePercent(current: number, previous: number): number {
  return ((current - previous) / Math.abs(previous)) * 100;
}

export function formatMoney(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function truncateString(str: string, maxLength: number): string {
  return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
}
