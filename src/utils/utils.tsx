import type { CategoryKey } from "./types";
import { TiShoppingCart } from "react-icons/ti";
import { FaHouseUser } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";
import { MdSubscriptions } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";
import { FaCarSide } from "react-icons/fa";
import { FaPlane } from "react-icons/fa6";

export const symbolToCategoryIcon: Record<CategoryKey, React.ReactNode> = {
  groceries: <TiShoppingCart />,
  house: <FaHouseUser />,
  shopping: <HiShoppingBag />,
  subscriptions: <MdSubscriptions />,
  taxes: <BsBank2 />,
  transportation: <FaCarSide />,
  travel: <FaPlane />,
};
