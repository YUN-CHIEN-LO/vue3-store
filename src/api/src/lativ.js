import { WOMEN } from "../data/WOMEN";
export default {
  getLativ({ pageIndex }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: WOMEN.slice((pageIndex - 1) * 12, pageIndex * 12) });
        reject("ERROR");
      }, 300);
    });
  },
};
