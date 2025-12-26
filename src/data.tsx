import { BiCategoryAlt } from "react-icons/bi";
import { RiMoneyEuroCircleFill } from "react-icons/ri";

export const categories = [
  {
    title: "House",
    amount: 750,
    symbol: <BiCategoryAlt />,
    details: [
      {
        detailTitle: "Comunication",
        amount: 45,
        symbol: <RiMoneyEuroCircleFill />,
      },
      {
        detailTitle: "Gas & Electricity",
        amount: 90,
        symbol: <RiMoneyEuroCircleFill />,
      },
      {
        detailTitle: "Cleaning",
        amount: 200,
        symbol: <RiMoneyEuroCircleFill />,
      },
      {
        detailTitle: "Comunication",
        amount: 45,
        symbol: <RiMoneyEuroCircleFill />,
      },
      {
        detailTitle: "Gas & Electricity",
        amount: 90,
        symbol: <RiMoneyEuroCircleFill />,
      },
      {
        detailTitle: "Cleaning",
        amount: 200,
        symbol: <RiMoneyEuroCircleFill />,
      },
    ],
  },
  {
    title: "Transportation",
    amount: 750,
    symbol: <BiCategoryAlt />,
    details: [
      {
        detailTitle: "Maintenance",
        amount: 300,
        symbol: <RiMoneyEuroCircleFill />,
      },
      { detailTitle: "Gas", amount: 60, symbol: <RiMoneyEuroCircleFill /> },
      {
        detailTitle: "Car Insurance",
        amount: 200,
        symbol: <RiMoneyEuroCircleFill />,
      },
      { detailTitle: "Uber", amount: 15, symbol: <RiMoneyEuroCircleFill /> },
    ],
  },
  {
    title: "Groceries",
    amount: 750,
    symbol: <BiCategoryAlt />,
    details: [
      {
        detailTitle: "Continente",
        amount: 80,
        symbol: <RiMoneyEuroCircleFill />,
      },
      {
        detailTitle: "Wholesale",
        amount: 200,
        symbol: <RiMoneyEuroCircleFill />,
      },
      {
        detailTitle: "Mercadona",
        amount: 30,
        symbol: <RiMoneyEuroCircleFill />,
      },
    ],
  },
  {
    title: "Taxes",
    amount: 750,
    symbol: <BiCategoryAlt />,
    details: [
      {
        detailTitle: "Property",
        amount: 90,
        symbol: <RiMoneyEuroCircleFill />,
      },
      { detailTitle: "IRS", amount: 1000, symbol: <RiMoneyEuroCircleFill /> },
      { detailTitle: "IUC", amount: 120, symbol: <RiMoneyEuroCircleFill /> },
    ],
  },
  {
    title: "Shopping",
    amount: 750,
    symbol: <BiCategoryAlt />,
    details: [
      { detailTitle: "Clothes", amount: 80, symbol: <RiMoneyEuroCircleFill /> },
      { detailTitle: "TV", amount: 500, symbol: <RiMoneyEuroCircleFill /> },
      { detailTitle: "Couch", amount: 1500, symbol: <RiMoneyEuroCircleFill /> },
    ],
  },
  {
    title: "Travel",
    amount: 750,
    symbol: <BiCategoryAlt />,
    details: [
      { detailTitle: "Madrid", amount: 800, symbol: <RiMoneyEuroCircleFill /> },
      { detailTitle: "Asia", amount: 5000, symbol: <RiMoneyEuroCircleFill /> },
      {
        detailTitle: "Ski Trip",
        amount: 1500,
        symbol: <RiMoneyEuroCircleFill />,
      },
    ],
  },
  {
    title: "Subscriptions",
    amount: 750,
    symbol: <BiCategoryAlt />,
    details: [
      { detailTitle: "ChatGPT", amount: 25, symbol: <RiMoneyEuroCircleFill /> },
      { detailTitle: "Alpha", amount: 50, symbol: <RiMoneyEuroCircleFill /> },
      { detailTitle: "Spotify", amount: 15, symbol: <RiMoneyEuroCircleFill /> },
    ],
  },
];
