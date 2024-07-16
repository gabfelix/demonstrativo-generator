# demonstrativo-generator

Projeto interno da COFE para geração automática de demonstrativos financeiros usando a biblioteca [Spectacle](https://github.com/FormidableLabs/spectacle/).

## TODO

- Agrupar valor de transações com mesma identificação
- Classificação de gastos (ver [classificador da COIN](https://github.com/Nikomania/Counter-Redbull-Brownie))
- Aliasing de identificações (exemplo: Empresa Junior De Pesquisas Em Direito -> Advocatta)

## Rodando o projeto

Instale as dependências:

```sh
yarn install
```

Baixe os extratos do Cora dos meses que você deseja criar o demonstrativo. Chame-os de `last-month.csv` e `current-month.csv`. O script `processCSVData.ts` irá pre-processar os dados do seu conteúdo e produzir arquivos JSON em `dist` usados pela aplicação.

Execute a apresentação:

```sh
yarn start
```

## Build da apresentação

Esse recurso da biblioteca provavelmente não será muito usado, mas é possível fazer uma build da apresentação para compartilhar com alguém sem necessitar das ferramentas de build:

```sh
yarn build
```

Os arquivos serão colocados na pasta `dist`.
