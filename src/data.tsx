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

export const categoriesSeed = [
  {
    title: "House",
    amount: 750,
    iconKey: "category",
    details: [
      { detailTitle: "Comunication", amount: 45, iconKey: "euro" },
      { detailTitle: "Gas & Electricity", amount: 90, iconKey: "euro" },
      { detailTitle: "Cleaning", amount: 200, iconKey: "euro" },
      { detailTitle: "Comunication", amount: 45, iconKey: "euro" },
      { detailTitle: "Gas & Electricity", amount: 90, iconKey: "euro" },
      { detailTitle: "Cleaning", amount: 200, iconKey: "euro" },
    ],
  },
  {
    title: "Transportation",
    amount: 750,
    iconKey: "category",
    details: [
      { detailTitle: "Maintenance", amount: 300, iconKey: "euro" },
      { detailTitle: "Gas", amount: 60, iconKey: "euro" },
      { detailTitle: "Car Insurance", amount: 200, iconKey: "euro" },
      { detailTitle: "Uber", amount: 15, iconKey: "euro" },
    ],
  },
  {
    title: "Groceries",
    amount: 750,
    iconKey: "category",
    details: [
      { detailTitle: "Continente", amount: 80, iconKey: "euro" },
      { detailTitle: "Wholesale", amount: 200, iconKey: "euro" },
      { detailTitle: "Mercadona", amount: 30, iconKey: "euro" },
    ],
  },
  {
    title: "Taxes",
    amount: 750,
    iconKey: "category",
    details: [
      { detailTitle: "Property", amount: 90, iconKey: "euro" },
      { detailTitle: "IRS", amount: 1000, iconKey: "euro" },
      { detailTitle: "IUC", amount: 120, iconKey: "euro" },
    ],
  },
  {
    title: "Shopping",
    amount: 750,
    iconKey: "category",
    details: [
      { detailTitle: "Clothes", amount: 80, iconKey: "euro" },
      { detailTitle: "TV", amount: 500, iconKey: "euro" },
      { detailTitle: "Couch", amount: 1500, iconKey: "euro" },
    ],
  },
  {
    title: "Travel",
    amount: 750,
    iconKey: "category",
    details: [
      { detailTitle: "Madrid", amount: 800, iconKey: "euro" },
      { detailTitle: "Asia", amount: 5000, iconKey: "euro" },
      { detailTitle: "Ski Trip", amount: 1500, iconKey: "euro" },
    ],
  },
  {
    title: "Subscriptions",
    amount: 750,
    iconKey: "category",
    details: [
      { detailTitle: "ChatGPT", amount: 25, iconKey: "euro" },
      { detailTitle: "Alpha", amount: 50, iconKey: "euro" },
      { detailTitle: "Spotify", amount: 15, iconKey: "euro" },
    ],
  },
];
