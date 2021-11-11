import { WOMEN } from "../data/WOMEN";
import { MEN } from "../data/MEN";
import { KIDS } from "../data/KIDS";
import { BABY } from "../data/BABY";
import { SPORTS } from "../data/SPORTS";
import { SIDEBAR } from "../data/SIDEBAR";
import { findIndex } from "lodash";
const allProduct = {
  WOMEN: WOMEN,
  MEN: MEN,
  KIDS: KIDS,
  BABY: BABY,
  SPORTS: SPORTS,
};
export default {
  getLativ({ catagory, pageIndex }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: allProduct[catagory].slice(
            (pageIndex - 1) * 12,
            pageIndex * 12
          ),
        });
        reject("ERROR");
      }, 300);
    });
  },
  getProduct({ catagory, id }) {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        const index = findIndex(
          allProduct[catagory],
          (x) => x.ProductID.toString() === id
        );
        if (index === -1) reslove({ data: {} });
        else {
          reslove({ data: allProduct[catagory][index] });
        }
        reject("ERROR");
      }, 300);
    });
  },
  getSidebar() {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        reslove({ data: SIDEBAR });
        reject("ERROR");
      }, 300);
    });
  },
};
