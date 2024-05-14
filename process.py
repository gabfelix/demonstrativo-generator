#!/usr/bin/env python3

import csv

PREV_MONTH_CSV: str = "./march.csv"
CURRENT_MONTH_CSV: str = "./april.csv"


def change_percent(original: float, new: float) -> float:
    return (new - original) / abs(original)


def read_bank_statement(file_path: str, header_row=True, grouping=False) -> dict:
    with open(file_path, encoding="utf-8") as csvfile:
        reader = csv.reader(csvfile)
        # Skip header row
        if header_row:
            next(reader, None)

        if not grouping:
            return {row[3].lower().title(): float(row[4]) for row in reader}
        else:
            grouped_values = {}
            for row in reader:
                identification = row[3].lower().title()
                value = float(row[4])

                if not grouped_values.get(identification):
                    grouped_values[identification] = 0
                grouped_values[identification] += value

            return grouped_values


def list_sorted_transactions(d: dict) -> dict:
    for n, p in {
        k: v for k, v in sorted(d.items(), key=lambda item: item[1], reverse=True)
    }.items():
        print(f"{n}: R$ {p:.2f}")


print("-- PREVIOUS MONTH --")
prev_stmt = read_bank_statement(PREV_MONTH_CSV, grouping=True)
prev_incomes = sum([v for _, v in prev_stmt.items() if v > 0])
prev_expenses = sum([v for _, v in prev_stmt.items() if v < 0])
print(f"incomes: R$ {prev_incomes:.2f}")
print(f"expenses: R$ {sum([v for _, v in prev_stmt.items() if v < 0]):.2f}")
prev_balance = sum(prev_stmt.values())
print(f"balance: R$ {prev_balance:.2f}")
prev_largest_income = max(prev_stmt, key=prev_stmt.get)
prev_largest_expense = min(prev_stmt, key=prev_stmt.get)
print(
    f"largest income: {prev_largest_income} - R$ {prev_stmt[prev_largest_income]:.2f}"
)
print(
    f"largest expense: {prev_largest_expense} - R$ {prev_stmt[prev_largest_expense]:.2f}"
)

print("-- CURRENT MONTH --")
current_stmt = read_bank_statement(CURRENT_MONTH_CSV, grouping=True)
current_largest_income = max(current_stmt, key=current_stmt.get)
incomes = sum([v for _, v in current_stmt.items() if v > 0])
expenses = sum([v for _, v in current_stmt.items() if v < 0])
print(f"incomes: R$ {incomes:.2f} ({change_percent(prev_incomes, incomes):+.2%})")
print(
    f"expenses: R$ {expenses:.2f} ({change_percent(abs(prev_expenses), abs(expenses)):+.2%})"
)
current_balance = sum(current_stmt.values())
print(
    f"balance: R$ {current_balance:.2f} ({change_percent(prev_balance, current_balance):+.2%})"
)
current_largest_expense = min(current_stmt, key=current_stmt.get)
print(
    f"largest income: {current_largest_income} - R$ {current_stmt[current_largest_income]:.2f}"
)
print(
    f"largest expense: {current_largest_expense} - R$ {current_stmt[current_largest_expense]:.2f}"
)
