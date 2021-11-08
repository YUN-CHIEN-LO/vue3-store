import { WOMEN } from "../data/WOMEN";
import { MEN } from "../data/MEN";
import { KIDS } from "../data/KIDS";
import { BABY } from "../data/BABY";
import { SPORTS } from "../data/SPORTS";
import { SIDEBAR } from "../data/SIDEBAR";
export default {
  getLativ({ mainCategory, pageIndex }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let target = [];

        switch (mainCategory) {
          case "WOMEN":
            target = WOMEN;
            break;
          case "MEN":
            target = MEN;
            break;
          case "KIDS":
            target = KIDS;
            break;
          case "BABY":
            target = BABY;
            break;
          case "SPORTS":
            target = SPORTS;
            break;
          default:
            break;
        }
        resolve({
          data: target.slice((pageIndex - 1) * 12, pageIndex * 12),
        });
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
