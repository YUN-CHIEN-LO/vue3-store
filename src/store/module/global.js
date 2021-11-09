export const global = {
  state: () => ({
    catagory: "WOMEN",
    item: {
      ProductName: "寬版水手領針織衫-女",
      Color: "淺棕",
      image_140: "/i/54911/54911011/5491101_360.jpg",
      image_220: "/i/54911/54911011/5491101_220.jpg",
      Sort: 102,
      IsTop: false,
      IsPants: false,
      IsAcc: false,
      Col: [
        { Sn: "54911011", Size: "M", invt: 50 },
        { Sn: "54911012", Size: "L", invt: 50 },
        { Sn: "54911021", Size: "M", invt: 50 },
        { Sn: "54911022", Size: "L", invt: 50 },
      ],
      OutfitPic: ["/i/54911/54911_M_01.jpg"],
      ColorOutfitPic: null,
      isExtend: false,
      ProductID: 22817,
      Price: 690,
      IsActivities: false,
      ActivityPrice: 0,
      IsAddPurchase: false,
      ActitivyType: 0,
      AppPrice: 0,
      info: [
        {
          color: "淺棕",
          colorImg: "/i/54911/54911011/5491101_48.jpg",
          ItemList: [
            {
              size: "M",
              尺寸後綴: "",
              invt: 50,
              sn: "54911011",
              img140: "/i/54911/54911011/5491101_360.jpg",
              img280: "/i/54911/54911011/5491101_500.jpg",
              img900: "/i/54911/54911011/5491101_1500.jpg",
              isNotify: false,
              isNewArrival: true,
              isExtend: false,
              Price: 690,
              LastEditTime: "/Date(1636019160000)/",
            },
            {
              size: "L",
              尺寸後綴: "",
              invt: 50,
              sn: "54911012",
              img140: "/i/54911/54911011/5491101_360.jpg",
              img280: "/i/54911/54911011/5491101_500.jpg",
              img900: "/i/54911/54911011/5491101_1500.jpg",
              isNotify: false,
              isNewArrival: true,
              isExtend: false,
              Price: 690,
              LastEditTime: "/Date(1636019160000)/",
            },
          ],
          ExchangeRate: [
            {
              文化特性: "en-us",
              匯率: 27.8650017,
            },
            {
              文化特性: "zh-cn",
              匯率: 4.6837,
            },
          ],
        },
        {
          color: "黑色",
          colorImg: "/i/54911/54911021/5491102_48.jpg",
          ItemList: [
            {
              size: "M",
              尺寸後綴: "",
              invt: 50,
              sn: "54911021",
              img140: "/i/54911/54911021/5491102_360.jpg",
              img280: "/i/54911/54911021/5491102_500.jpg",
              img900: "/i/54911/54911021/5491102_1500.jpg",
              isNotify: false,
              isNewArrival: false,
              isExtend: false,
              Price: 690,
              LastEditTime: "/Date(1636019160000)/",
            },
            {
              size: "L",
              尺寸後綴: "",
              invt: 50,
              sn: "54911022",
              img140: "/i/54911/54911021/5491102_360.jpg",
              img280: "/i/54911/54911021/5491102_500.jpg",
              img900: "/i/54911/54911021/5491102_1500.jpg",
              isNotify: false,
              isNewArrival: false,
              isExtend: false,
              Price: 690,
              LastEditTime: "/Date(1636019160000)/",
            },
          ],
          ExchangeRate: [
            {
              文化特性: "en-us",
              匯率: 27.8650017,
            },
            {
              文化特性: "zh-cn",
              匯率: 4.6837,
            },
          ],
        },
      ],
    },
  }),

  actions: {
    setCatagory({ commit }, val) {
      commit("setCatagory", val);
    },
    setItem({ commit }, val) {
      commit("setItem", val);
    },
  },

  mutations: {
    setCatagory(state, val) {
      state.catagory = val;
    },
    setItem(state, val) {
      state.item = val;
    },
  },

  getters: {
    getCatagory(state) {
      return state.catagory;
    },
    getItem(state) {
      return state.item;
    },
  },
};
