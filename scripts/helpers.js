import { month_tr } from "./constants.js";

// bugunun tarihini gun ay ismi cinsinden geri dondurur
export const getDate = () => {
  const date = new Date();
  const day = date.getDate();
  const monthIndex = date.getMonth();
  //console.log(day, month + 1);
  return day + "" + month_tr[monthIndex];
};
