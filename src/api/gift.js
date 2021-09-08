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
      `${Constant.MEDIA_URL}/api/Cards/video/${id}.mp4`
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
  return Constant.MEDIA_URL + "/api/Cards/video/" + fileId + ".mp4";
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

const GetPreviewVideoInfo = async (password) => {
  try {
    const { data } = await axios.post(
      `${Constant.SERVER_URL}/chiawei/getPreviewVideo`,
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
    case "pomelo":
      return ["銷日文旦"];
    default:
      return null;
  }
};

const detailDict = {
  銷日芒果: {
    "zh-tw": {
      productName: "龍蝦芒果",
      "media-info": "vid",
      "vid-link":
        "https://storage.googleapis.com/agchain/80f106ea-8811-42c4-9bdd-a9665f785e7b-720p.mp4",
      productPhoto: require("../img/mango.jpg").default,
      productText:
        "芒果屬熱帶水果,喜愛高溫、陽光充足的環境。而屏東位於台灣的最南端,氣候上屬熱帶季風氣候,因地理位置靠海,位於北緯2240度,三面環海:東靠太平洋、南接巴士海峽、西鄰臺灣海峽,又有黑潮經過,有大量海鮮出產,也是養殖漁 業重鎮,因此使用龍蝦殼經菌肥分解成甲殼素及鈣 後,有效提供芒果栽培應用。由土壤吸收及葉面施肥,加上陽光充足又有 海風的吹拂,有利於芒果的生長結果,因此種出來 的芒果外觀鮮紅亮麗,果肉經吸收充足的甲殼素與 鈣,果肉扎實甜度高、風味濃郁。",
      farmName: "台鼎龍蝦芒果農場",
      farmPhoto: require("../img/mango-farm.jpg").default,
      farmText:
        "台南縣唯一獲得有機認證種植金煌芒果的瑞林農場，每年的收成僅有其他同面積果園的十分之一，產品價格是他人的十倍，頂級品的金煌芒果禮盒，三顆就賣新台幣一千元，但在有機風潮引領下，還是獲得不少消費者青睞。",
      certificates: [
        require("../img/mango-certificate-1.jpg").default,
        require("../img/mango-certificate-2.jpg").default,
        require("../img/mango-certificate-3.jpg").default,
      ],
      "vid-poster": null,
    },
    jp: {
      productName: "ロブスターマンゴー",
      "media-info": "vid",
      "vid-link":
        "https://storage.googleapis.com/agchain/80f106ea-8811-42c4-9bdd-a9665f785e7b-720p.mp4",
      productPhoto: require("../img/mango.jpg").default,
      productText:
        "マンゴーはトロピカルフルーツで、高温かつ日差しが十分に浴びれる場所を好みます。ロブスターマンゴーは台湾最南端の屏東で生産され、そこはマンゴーの成長に適した熱帯性気候であり、三面は海に囲まれ大量の海鮮が\
        獲れて、養殖業の拠点でもある。ご当地のロブスターの殻を菌体肥料による分解を行い、キチン質とカルシウムにした後、マンゴー栽培の養分の一種にしました。\
        ロブスターマンゴーは土及び葉っぱから肥を与え、十分な日差しを浴び、海風に吹かれ、成長に必要なエッセンスを吸収しています。\
        最新のスマートハウス施設を採用し、マンゴーの成長に必要とした環境を自動的に確認しコントロールする。栄養豊富且つ美味しい輸出用\
        マンゴーを作り出します。果肉はしっかりしていながら、繊維は細かく、香りは濃厚で色は鮮やかな赤、ジューシーで甘いのが特長です。\
        最上質なロブスターマンゴーをピックアップし、航空便で日本へ送る。日本では専門の方が品質検査を行なった後、ヤマト運輸の冷蔵便で\
        宅配。今年の夏は、親族知人に台湾の素晴らしい味を送られては、いかがでしょう。",
      farmName: "台鼎龍蝦芒果農場",
      farmPhoto: require("../img/mango-farm.jpg").default,
      farmText:
        "台南縣唯一獲得有機認證種植金煌芒果的瑞林農場，每年的收成僅有其他同面積果園的十分之一，產品價格是他人的十倍，頂級品的金煌芒果禮盒，三顆就賣新台幣一千元，但在有機風潮引領下，還是獲得不少消費者青睞。",
      certificates: [
        require("../img/mango-certificate-1.jpg").default,
        require("../img/mango-certificate-2.jpg").default,
        require("../img/mango-certificate-3.jpg").default,
      ],
      "vid-poster": null,
    },
  },
  銷日鳳梨: {
    "zh-tw": {
      productName: "金鑽鳳梨",
      "media-info": "img",
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
      "vid-poster": null,
    },
    jp: {
      productName: "金鑽鳳梨",
      "media-info": "img",
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
      "vid-poster": null,
    },
  },
  銷日荔枝: {
    "zh-tw": {
      productName: "玉荷包荔枝",
      "media-info": "img",
      productPhoto: require("../img/lychee.jpg").default,
      productText:
        "玉荷包是所有荔枝中最早熟之品種，而因果形如荷包，果肉如玉般而得名！具高焦核（果核扁小）、果肉多的特色，而且果肉Q而結實，多汁而甜度達20度以上，無論是果粒、品質、市價等級均居台灣現有荔枝品種之冠，可謂是真正的「妃子笑」珍貴品種！",
      farmName: "方境合作社",
      farmPhoto: require("../img/lychee-farm.jpg").default,
      farmText:
        "秉持「關懷土地」與「永續經營」的理念，堅持不用除草劑，使用機肥料，並特製成植物喝的優酪乳，成就一粒粒甜美多汁的玉荷包荔枝，果肉飽 滿、品質絕佳，一次又一次榮獲冠軍獎、特優獎、優良獎，並通過吉園圃安全認證，讓消費者吃得安心又健康。",
      certificates: [require("../img/certificate.jpg").default],
      "vid-poster": null,
    },
    jp: {
      productName: "玉荷包荔枝",
      "media-info": "img",
      productPhoto: require("../img/lychee.jpg").default,
      productText:
        "玉荷包是所有荔枝中最早熟之品種，而因果形如荷包，果肉如玉般而得名！具高焦核（果核扁小）、果肉多的特色，而且果肉Q而結實，多汁而甜度達20度以上，無論是果粒、品質、市價等級均居台灣現有荔枝品種之冠，可謂是真正的「妃子笑」珍貴品種！",
      farmName: "方境合作社",
      farmPhoto: require("../img/lychee-farm.jpg").default,
      farmText:
        "秉持「關懷土地」與「永續經營」的理念，堅持不用除草劑，使用機肥料，並特製成植物喝的優酪乳，成就一粒粒甜美多汁的玉荷包荔枝，果肉飽 滿、品質絕佳，一次又一次榮獲冠軍獎、特優獎、優良獎，並通過吉園圃安全認證，讓消費者吃得安心又健康。",
      certificates: [require("../img/certificate.jpg").default],
      "vid-poster": null,
    },
  },
  銷日文旦: {
    "zh-tw": {
      productName: "楊媽媽 翠玉文旦",
      "media-info": "vid",
      "vid-link":
        "https://storage.googleapis.com/agchain/52d5fc9d-4f91-426c-997d-4003fc564302-720p.mp4",
      productPhoto: require("../img/pomelo/pomelo.jpg").default,
      productText:
        "臺灣東部花蓮縣—瑞穗鄉，北緯23.5°，在海岸山脈中央山脈之間的花東縱谷。廣植文旦達800公頃，位居全國之冠，文旦品質良好，酸甜比例風味佳。楊媽媽耕耘著山腳下這片充滿石墨玉的土地，孕育出翠綠如玉的「翠玉文旦」。 文旦園位於中央山脈支脈虎頭山腳下，50年前，每遇上大雨颱風，伴隨土石沖刷而下，將田地瞬間變成河床，也順道沖下珍貴的—石墨玉。 從滿地的石頭開始，楊媽媽一點一滴耕耘著，這片充滿石墨玉的土地，逐步變成結實纍纍的柚園，孕育出翠綠如玉的文旦柚。 翠玉文旦果肉晶瑩剔透，酸中帶甜，酸甜比例風味絕佳，富含蛋白質、纖維及多種維生素。 每年秋天，白露節氣前十日採收，大約是在8/25-30期間採收，翠綠如玉的果實，成為中秋佳節中的最佳風味。 文旦離株採收後會開始辭水，也就是外表油包的風味會透過辭水進入柚肉，提高文旦柚肉甜味。最佳賞味期就是辭水的10-14天期間。",
      farmName: "台鼎龍蝦芒果農場",
      farmPhoto: require("../img/mango-farm.jpg").default,
      farmText:
        "台南縣唯一獲得有機認證種植金煌芒果的瑞林農場，每年的收成僅有其他同面積果園的十分之一，產品價格是他人的十倍，頂級品的金煌芒果禮盒，三顆就賣新台幣一千元，但在有機風潮引領下，還是獲得不少消費者青睞。",
      certificates: [
        require("../img/pomelo/certificates/resume/1.jpeg").default,
        require("../img/pomelo/certificates/resume/2.jpg").default,
        require("../img/pomelo/certificates/resume/3.jpg").default,
        require("../img/pomelo/certificates/certificate/1.jpg").default,
        require("../img/pomelo/certificates/certificate/2.jpg").default,
        require("../img/pomelo/certificates/certificate/3.jpg").default,
        require("../img/pomelo/certificates/certificate/4.jpg").default,
        require("../img/pomelo/certificates/certificate/5.jpg").default,
      ],
      "vid-poster": require("../img/pomelo/vid-poster.png").default,
    },
    jp: {
      productName: "鶴岡ひすい文旦",
      "media-info": "vid",
      "vid-link":
        "https://storage.googleapis.com/agchain/52d5fc9d-4f91-426c-997d-4003fc564302-720p.mp4",
      productPhoto: require("../img/pomelo/pomelo.jpg").default,
      productText:
        "台湾の一番高い山脈の中央山脈の間に、 “花東縱谷”というところがあり、\
        台湾東部花蓮県-瑞穂郷、北緯 23.5 度、熱帯地方が通過します。\
        恵まれた地理的環境と豊富で優れた水質があるにより、有名な「鶴岡文旦」が生まれました。\
        台湾柚子の栄養価と健康食療法\
        台湾柚子は又の名を文旦といい、種類が豊富です。\
        果肉が厚くジューシーで、甘酸っぱくて香りの良い独特の味はくせになる美味しさです。\
        台湾柚子の栄養価は極めて高く、果肉にはたんぱく質、ビタミン B1・B2・C・P、\
        カロテン、カルシウム、リン、鉄・炭水化物、酒石酸(しゅせきさん)、クエン酸等が多く含まれています。\
        にビタミン C の含有量は果物の中でも多く、レモンの 3 倍、リンゴの 7 倍となっています\
        文旦の皮が黄色くなっているということはすでに適度の水分が抜けているというサインで、果肉の肉質が柔らかく\
        なっており甘みも増しています。\
        文旦は熟度が進んだ状態で収穫しますと果肉が変質しやすく流通に適しませんので、まだ若い皮が緑色の状態で\
        収穫されます。\
        もし時間をおいてから召し上がられたい場合には、皮が緑色の文日を選び、風通しの良い所に置いておき、皮が\
        黄色くなったら召し上がって下さい。",
      farmName: "台鼎龍蝦芒果農場",
      farmPhoto: require("../img/mango-farm.jpg").default,
      farmText:
        "台南縣唯一獲得有機認證種植金煌芒果的瑞林農場，每年的收成僅有其他同面積果園的十分之一，產品價格是他人的十倍，頂級品的金煌芒果禮盒，三顆就賣新台幣一千元，但在有機風潮引領下，還是獲得不少消費者青睞。",
      certificates: [
        require("../img/pomelo/certificates/resume/1.jpeg").default,
        require("../img/pomelo/certificates/resume/2.jpg").default,
        require("../img/pomelo/certificates/resume/3.jpg").default,
        require("../img/pomelo/certificates/certificate/1.jpg").default,
        require("../img/pomelo/certificates/certificate/2.jpg").default,
        require("../img/pomelo/certificates/certificate/3.jpg").default,
        require("../img/pomelo/certificates/certificate/4.jpg").default,
        require("../img/pomelo/certificates/certificate/5.jpg").default,
      ],
      "vid-poster": require("../img/pomelo/vid-poster.png").default,
    },
  },
};

const exampleGreets = {
  "zh-tw": {
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
  },
  jp: {
    開幕: [
      "法律や道徳に乗り沿って正しい道、正当な手段で儲けられますように。",
      "風向きが良いので流れが良い象徴、ビジネス拡大及びもうかりますように。",
      "新装開店縁起が良い、幸運が訪れますように。",
      "ビジネスチャンスがどんどん湧いてきて、儲けがとぎれませんように。",
      "何事も悩む事なくビジネスが成功しますように。",
      "お金が増えますように、お得意様が逃げませんように。",
    ],
    昇格: [
      "昇格してお給料があがりましたので、果物を送りお祝い致します。\n\
      健康と楽しい事がお伴させて頂きます。財源が富むようあなたを追いかけます",
      "やれば必ず報いが得られる。\n\
      行動するなら良いことを行おう！信じています。あなたならきっとできる！。",
      "昨日より今日の方が良い、昨日より今日と毎日進歩する。進歩に進歩を重ねよう！",
      "お祝いの言葉は心から出るものだから、言葉では表しきれない、果物をプレゼントし、昇格をお祝いしよう！今後も事が運びますように。",
    ],
    新居: [
      "親友よ新居で良い生活が過ごせますように。引っ越し祝いを致します！",
      "引っ越し後も平安で幸福でいられますように、時を見計らって引っ越ししましょう。",
      "新居に引っ越した事はとても縁起がいいです。高層階なので、福が来て安全健康に過ごせますように。",
      "新しい地に引っ越してきた事、ともに喜びます。良い新居での生活が送れますように。",
      "いい場所を選ぶ事は美徳、平和に過ごせるのは近所の人の道徳が必要。",
    ],
    お誕生日: [
      "この前私の誕生日をお祝いしてくれたので今度は私があなたの誕生日をお祝いします。今後毎年一緒に誕生日を迎えられる事を願っております。",
      "お誕生日良い日が過ごせますように。　皆さんも一緒に誕生日をお祝いしてくれますように、お誕生日おめでとう。",
      "今日からもまた良い1日が始まります。心からお祝いを申し上げます。あなたにとって成功となる1年になりますように。お誕生日おめでとうございます。",
      "今日あなたの誕生日、おいしい果物をプレゼントします。今年1年もあなたにとって幸せと共に無事に過ごせますように！",
      "誕生日プレゼント以外に、あなたが存在する事それは天から授かったプレゼントです。",
      "今日は唯一無二の日、お誕生日おめでとう。",
      "いつも私を支持してくれてありがとう、お誕生日おめでとう。",
    ],
    新年: [
      "ビジネスが成功し、財源が増えますように。",
      "天、地上、太陽皆穏やかで、人際関係や物事がよく運びますように。",
      "皆が和気あいあいと楽しく、春夏秋冬無事で春節を過ごせますように。",
      "家、国家、物事がよく運びますように。家族団らん、政治や物事が丸く収まりますように。",
    ],
  },
};

const gratitudeExamples = {
  "zh-tw": [
    "你不需要這麼慷慨的，但你還是做了！\n真的謝謝你。",
    "謝謝你的好意，我感受到了。",
    "謝謝你的所作所為！",
    //"我真的欠你一次，下次有需要幫忙務必跟我說。",
    "在這個困難的時刻，因為你的關係，讓我輕鬆了很多，真的謝謝。",
    "請接受我最深切的感謝！",
    //"謝謝你為我著想，比我為自己想的還要周全。",
    //"感謝！我會記得你的好的。",
  ],
  jp: [
    "そんなやさしいことに感謝しております。",
    "ご親切にありがとうございました",
    "いつもたくさんしてくれてありがとう！",
    "この困難な時期に、君のおかげで、私はとても楽になりました。ありがとうございます。",
    "心から感謝します！",
  ],
};

const otherPlatform = "other-platform";

const Poll = ({ fn, validate, interval, maxAttempts }) => {
  console.log("Start poll...");
  let attempts = 0;

  const executePoll = async (resolve, reject) => {
    console.log("- poll");
    const result = await fn();
    attempts++;

    if (validate(result)) {
      return resolve(result);
    } else if (maxAttempts && attempts === maxAttempts) {
      return reject(new Error("Exceeded max attempts"));
    } else {
      setTimeout(executePoll, interval, resolve, reject);
    }
  };

  return new Promise(executePoll);
};

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
  GetPreviewVideoInfo,
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
  otherPlatform,
  Poll,
};
