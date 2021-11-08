import { WOMEN } from "../data/WOMEN";
import { SIDEBAR } from "../data/SIDEBAR";
export default {
  getLativ({ pageIndex }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: WOMEN.slice((pageIndex - 1) * 12, pageIndex * 12) });
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
