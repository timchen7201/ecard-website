import axios from "axios";
import Constant from "../constants";

const UploadGift = async (body) => {
  try {
    // alert(JSON.stringify(body));
    const { data } = await axios.post(`${Constant.SERVER_URL}/chiawei`, body);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};
const FetchVideo = async (id) => {
  try {
    const response = await axios.get(`${Constant.MEDIA_URL}/video/${id}`);
    console.log(response);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};
const FetchPreViewVideo = async (id) => {
  try {
    const response = await axios.get(
      `${Constant.MEDIA_URL}/api/Cards/streaming/${id}`
    );
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
};
const GetVideo = async (password) => {
  console.log("------");
  try {
    const { data } = await axios.post(
      `${Constant.SERVER_URL}/chiawei/getVideo`,
      { password: password }
    );
    const { standardDefinition } = data;
    console.log("video_url", standardDefinition);
    return standardDefinition;
  } catch (error) {
    return Promise.reject(error);
  }
};

const GetText = async (password) => {
  try {
    const { data } = await axios.post(
      `${Constant.SERVER_URL}/chiawei/getGiftText`,
      { password: password }
    );
    console.log("===", data);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const UploadReturn = async (body) => {
  try {
    // alert(JSON.stringify(body));
    const { data } = await axios.post(
      `${Constant.SERVER_URL}/chiawei/sendback`,
      body
    );
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const GetReturnCardExist = async (orderNumber) => {
  try {
    const { data } = await axios.post(
      `${Constant.SERVER_URL}/chiawei/getReturnCardExist`,
      { orderNumber: orderNumber }
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const GetReturnVideoInfo = async (orderNumber) => {
  try {
    const { data } = await axios.post(
      `${Constant.SERVER_URL}/chiawei/returnVideo`,
      { orderNumber: orderNumber }
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const GetReturnText = async (orderNumber) => {
  try {
    const { data } = await axios.post(
      `${Constant.SERVER_URL}/chiawei/returnText`,
      { orderNumber: orderNumber }
    );
    console.log("===", data);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const registerByXlsx = async (body) => {
  try {
    const { data } = await axios.post(
      `${Constant.SERVER_URL}/chiawei/xlsx`,
      body
    );
    return data;
  } catch (error) {}
};

const IsOrderNumberValid = async (orderNumber) => {
  try {
    const { data } = await axios.post(
      `${Constant.SERVER_URL}/chiawei/validOrderNumber`,
      { orderNumber: orderNumber }
    );
    console.log("===", data);
    return data;
  } catch (error) {
    return false;
  }
};

const GetPassword = async (orderNumber) => {
  try {
    const { data } = await axios.post(
      `${Constant.SERVER_URL}/chiawei/getPassword`,
      { orderNumber: orderNumber }
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const GetOrderNumber = async (password) => {
  try {
    const { data } = await axios.post(
      `${Constant.SERVER_URL}/chiawei/getOrderNumber`,
      { password: password }
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const GetOrderInfo = async (orderNumber) => {
  try {
    const { data } = await axios.post(
      `${Constant.SERVER_URL}/chiawei/orderInfo`,
      { orderNumber: orderNumber }
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const VideoUploadInstance = axios.create({
  baseURL: Constant.MEDIA_URL + "/api/Cards/UploadProject",
});

const VideoPreviewUrl = (fileId) => {
  return Constant.MEDIA_URL + "/api/Cards/streaming/" + fileId;
};

const GetVideoInfo = async (password) => {
  try {
    const { data } = await axios.post(
      `${Constant.SERVER_URL}/chiawei/getVideo`,
      { password: password }
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const GetViewNumber = async (orderNumber) => {
  try {
    const { data } = await axios.post(
      `${Constant.SERVER_URL}/chiawei/getViewNumber`,
      { orderNumber: orderNumber }
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const IsPasswordValid = async (password) => {
  try {
    const { data } = await axios.post(
      `${Constant.SERVER_URL}/chiawei/validPassword`,
      { password: password }
    );
    console.log("===", data);
    return data;
  } catch (error) {
    return false;
  }
};

const itemProductsMap = (item) => {
  switch (item) {
    case "mango":
      return ["銷日芒果"];
    case "pineapple":
      return ["銷日鳳梨"];
    case "lychee":
      return ["銷日荔枝"];
    default:
      return null;
  }
};

const detailDict = {
  銷日芒果: {
    productName: "龍蝦芒果",
    productPhoto: require("../img/mango.jpeg").default,
    productText:
      "南方艷陽的沐浴下 屏東縣吃龍蝦長大的愛文芒果們果皮更鮮紅、果肉更香甜。",
    farmName: "台鼎龍蝦芒果農場",
    farmPhoto: require("../img/mango-farm.jpg").default,
    farmText:
      "台南縣唯一獲得有機認證種植金煌芒果的瑞林農場，每年的收成僅有其他同面積果園的十分之一，產品價格是他人的十倍，頂級品的金煌芒果禮盒，三顆就賣新台幣一千元，但在有機風潮引領下，還是獲得不少消費者青睞。",
    certificates: [
      require("../img/certificate.jpg").default,
      require("../img/certificate.jpg").default,
      require("../img/certificate.jpg").default,
    ],
  },
  銷日鳳梨: {
    productName: "金鑽鳳梨",
    productPhoto: require("../img/pineapple.jpg").default,
    productText:
      "「金鑽鳳梨」是台灣為人熟悉的品種，但其實台灣鳳梨有18個品種。而由於金鑽鳳梨酸甜平衡，纖維細小，產量穩定，因此備受追捧，台灣市面上接近9成均是金鑽鳳梨（台農17號）。",
    farmName: "傑農合作農場",
    farmPhoto: require("../img/pineapple-farm.jpeg").default,
    farmText:
      "傑農合作農場擁有30年多年果品輸日經驗，所產果品皆通過農藥檢定合格，秉持著讓費者能吃的安心為信念，推廣優質水果。",
    certificates: [
      require("../img/certificate.jpg").default,
      require("../img/certificate.jpg").default,
    ],
  },
  銷日荔枝: {
    productName: "玉荷包荔枝",
    productPhoto: require("../img/lychee.jpg").default,
    productText:
      "玉荷包是所有荔枝中最早熟之品種，而因果形如荷包，果肉如玉般而得名！具高焦核（果核扁小）、果肉多的特色，而且果肉Q而結實，多汁而甜度達20度以上，無論是果粒、品質、市價等級均居台灣現有荔枝品種之冠，可謂是真正的「妃子笑」珍貴品種！",
    farmName: "方境合作社",
    farmPhoto: require("../img/lychee-farm.jpg").default,
    farmText:
      "秉持「關懷土地」與「永續經營」的理念，堅持不用除草劑，使用機肥料，並特製成植物喝的優酪乳，成就一粒粒甜美多汁的玉荷包荔枝，果肉飽 滿、品質絕佳，一次又一次榮獲冠軍獎、特優獎、優良獎，並通過吉園圃安全認證，讓消費者吃得安心又健康。",
    certificates: [require("../img/certificate.jpg").default],
  },
};

const exampleGreets = {
  開幕: [
    "根深葉茂無疆業\n源遠流長有道財",
    "東風利市春來有象\n生意興隆日進無疆",
    "新店開張喜喜慶\n熱熱鬧鬧吉兆頭",
    "生意定會滾滾來\n財源肯定不間斷",
    "祝你生意好，萬事無煩惱。",
    "祝你財源廣，賓客趕不跑。",
  ],
  升遷: [
    "升職加薪好事到，送盒果禮祝福你，健康快樂陪伴你，財源滾滾追隨你。",
    "付出總會有回報，要做就做最好的，我相信你，你一定行！",
    "今天比昨天好，一天比一天高！\n高升高升再高升！",
    "祝福是份真心意，不是千言萬語的表白。\n一盒果禮，祝你升遷事事如意！",
  ],
  新居: [
    "新家好生活，真心老朋友。\n祝賀你喬遷之喜！",
    "喬遷大喜平安幸福\n良辰吉日慶喬遷",
    "遷入新宅吉祥如意\n搬進高樓福壽安康",
    "喬遷喜天地人共喜\n新居榮福祿壽全榮",
    "擇里仁為美\n安居德有鄰",
  ],
  生日: [
    "上次你幫我過生日，今天換我幫你過生日，願彼此每年都可以一起過生日。",
    "願你的生日充滿了喜悅以及所有人的祝福，生日快樂。",
    "又是一個美好的開始，願我虔誠的祝福，帶給你成功的一年，祝你生日快樂！",
    "在你生日的這一天，將美味的水果，作為禮物送給你，願你一年 365 天快快樂樂，平平安安 !",
    "生日禮物之外，你的存在也是老天給我的禮物。",
    "今天是如此獨一無二，生日快樂！",
    "感謝你的愛與支持，生日快樂！",
  ],
  新年: [
    "生意興隆通四海\n財源廣進達三家",
    "天泰地泰三陽泰\n人和事和萬事和",
    "和氣吉祥皆快樂\n四季平安過新年",
    "家興國興事事興\n家圓國圓事事圓",
  ],
};

const gratitudeExamples = [
  "你不需要這麼慷慨的，但你還是做了！\n真的謝謝你。",
  "謝謝你的好意，我感受到了。",
  "謝謝你的所作所為！",
  "我真的欠你一次，下次有需要幫忙務必跟我說。",
  "在這個困難的時刻，因為你的關係，讓我輕鬆了很多，真的謝謝。",
  "請接受我最深切的感謝！",
  "謝謝你為我著想，比我為自己想的還要周全。",
  "感謝！我會記得你的好的。",
];

export {
  UploadGift,
  FetchVideo,
  FetchPreViewVideo,
  GetVideo,
  GetText,
  registerByXlsx,
  IsOrderNumberValid,
  GetPassword,
  GetOrderInfo,
  GetOrderNumber,
  VideoUploadInstance,
  VideoPreviewUrl,
  GetVideoInfo,
  IsPasswordValid,
  itemProductsMap,
  detailDict,
  exampleGreets,
  gratitudeExamples,
  UploadReturn,
  GetReturnVideoInfo,
  GetReturnText,
  GetViewNumber,
  GetReturnCardExist,
};
