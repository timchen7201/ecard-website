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
    case "dragonfruit":
      return ["銷日火龍果"];
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
      productPhoto: require("../img/mango/mango.jpg").default,
      productText:
        "芒果屬熱帶水果,喜愛高溫、陽光充足的環境。而屏東位於台灣的最南端,氣候上屬熱帶季風氣候,因地理位置靠海,位於北緯2240度,三面環海:東靠太平洋、南接巴士海峽、西鄰臺灣海峽,又有黑潮經過,有大量海鮮出產,也是養殖漁 業重鎮,因此使用龍蝦殼經菌肥分解成甲殼素及鈣 後,有效提供芒果栽培應用。由土壤吸收及葉面施肥,加上陽光充足又有 海風的吹拂,有利於芒果的生長結果,因此種出來 的芒果外觀鮮紅亮麗,果肉經吸收充足的甲殼素與 鈣,果肉扎實甜度高、風味濃郁。",
      farmName: "台鼎龍蝦芒果農場",
      farmPhoto: require("../img/mango-farm.jpg").default,
      farmText:
        "台南縣唯一獲得有機認證種植金煌芒果的瑞林農場，每年的收成僅有其他同面積果園的十分之一，產品價格是他人的十倍，頂級品的金煌芒果禮盒，三顆就賣新台幣一千元，但在有機風潮引領下，還是獲得不少消費者青睞。",
      certificates: [
        require("../img/mango/certificates/resume/1.jpg").default,
        require("../img/mango/certificates/resume/2.jpg").default,
        require("../img/mango/certificates/resume/3.jpg").default,
        require("../img/mango/certificates/resume/4.jpg").default,
        require("../img/mango/certificates/resume/5.jpg").default,
        require("../img/mango/certificates/certificate/1.jpg").default,
        require("../img/mango/certificates/certificate/2.jpg").default,
        require("../img/mango/certificates/certificate/3.jpg").default,
      ],
      "vid-poster": null,
    },
    jp: {
      productName: "ロブスターマンゴー",
      "media-info": "vid",
      "vid-link":
        "https://storage.googleapis.com/agchain/80f106ea-8811-42c4-9bdd-a9665f785e7b-720p.mp4",
      productPhoto: require("../img/mango/mango.jpg").default,
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
        require("../img/mango/certificates/resume/1.jpg").default,
        require("../img/mango/certificates/resume/2.jpg").default,
        require("../img/mango/certificates/resume/3.jpg").default,
        require("../img/mango/certificates/resume/4.jpg").default,
        require("../img/mango/certificates/resume/5.jpg").default,
        require("../img/mango/certificates/certificate/1.jpg").default,
        require("../img/mango/certificates/certificate/2.jpg").default,
        require("../img/mango/certificates/certificate/3.jpg").default,
      ],
      "vid-poster": null,
    },
  },
  銷日鳳梨: {
    "zh-tw": {
      productName: "金鑽鳳梨",
      "media-info": "vid",
      "vid-link":
        "https://storage.googleapis.com/agchain/26dca087-93ba-4b4a-bf54-bd8178c3cb07-720p.mp4",
      productPhoto: require("../img/pineapple/pineapple.jpg").default,
      productText:
        "「金鑽鳳梨」是台灣為人熟悉的品種，但其實台灣鳳梨有18個品種。而由於金鑽鳳梨酸甜平衡，纖維細小，產量穩定，因此備受追捧，台灣市面上接近9成均是金鑽鳳梨（台農17號）。",
      farmName: "傑農合作農場",
      farmPhoto: require("../img/pineapple-farm.jpeg").default,
      farmText:
        "傑農合作農場擁有30年多年果品輸日經驗，所產果品皆通過農藥檢定合格，秉持著讓費者能吃的安心為信念，推廣優質水果。",
      certificates: [
        require("../img/pineapple/certificates/certificate.jpg").default,
      ],
      "vid-poster": null,
    },
    jp: {
      productName: "台農17号 パイナップル",
      "media-info": "vid",
      "vid-link":
        "https://storage.googleapis.com/agchain/26dca087-93ba-4b4a-bf54-bd8178c3cb07-720p.mp4",
      productPhoto: require("../img/pineapple/pineapple.jpg").default,
      productText:
        "台湾から入荷するパインは主に台農17号という品種で樹の上で熟度をあげた完熟パインとなります。そのためとても甘いパインとなります。\n\
        舌がヒリヒリしにくく、食べやすいパインと言われております。",
      farmName: "傑農合作農場",
      farmPhoto: require("../img/pineapple-farm.jpeg").default,
      farmText:
        "傑農合作農場擁有30年多年果品輸日經驗，所產果品皆通過農藥檢定合格，秉持著讓費者能吃的安心為信念，推廣優質水果。",
      certificates: [
        require("../img/pineapple/certificates/certificate.jpg").default,
      ],
      "vid-poster": null,
    },
  },
  銷日荔枝: {
    "zh-tw": {
      productName: "玉荷包荔枝",
      "media-info": "img",
      productPhoto: require("../img/lychee/lychee.jpg").default,
      productText:
        "玉荷包是荔枝的品種之一，產期在5月下旬至6月上旬。玉荷包外皮顏色較一般荔枝青綠，外觀紅透帶點綠，外皮扎扎刺刺的，果實顏色由綠轉紅（紅色帶微綠）時糖度最高，香氣濃郁，果肉豐厚肥碩 ，籽小濃郁多汁．甜度高，尾韻帶荔枝的微酸，風味比其他品種更好，且吃起來不膩，特別受到大家的喜愛。",
      farmName: "",
      farmPhoto: require("../img/lychee/lychee_2.jpg").default,
      farmText:
        "採收後，全程冷藏空運宅配日本全地區，確保每顆玉荷包荔枝都是最新鮮。我們推出了珍貴的玉荷包荔枝禮盒，希望能讓台灣寶島的水果拓展到日本市場，更讓台灣農人的努力被世界看見！國際宅配禮盒，使用最高磅數牛皮紙製造包裝，質感超群，國際級禮盒質感，推薦企業跨國送禮到日本，傳達台灣心意！",
      certificates: [require("../img/lychee/certificates/certificate.jpg").default],
      "vid-poster": null,
    },
    jp: {
      productName: "玉荷包ライチ",
      "media-info": "img",
      productPhoto: require("../img/lychee/lychee.jpg").default,
      productText:
        "玉荷包はライチの一種で、生産期間は5月下旬から6月上旬です。台湾の気候は冬・春は乾燥し、夏・秋は雨が多く、ライチの成長に適しています。産地は中南部が中心です。主に、次の品種があります。玉荷包－これは肉質が繊細で、さくさく感と爽やかな甘さがあり、ほのかな香りと渋みが特徴です。",
      farmName: "",
      farmPhoto: require("../img/lychee/lychee_2.jpg").default,
      farmText:
        "収穫後、最も新鮮になるように、プロセス全体が冷蔵され、日本全国に空輸されます。国際宅配ギフトボックスは、最高ポンドのクラフト紙を使用してパッケージを作成しています。",
      certificates: [require("../img/lychee/certificates/certificate.jpg").default],
      "vid-poster": null,
    },
  },
  銷日文旦: {
    "zh-tw": {
      productName: "楊媽媽 翠玉文旦",
      "media-info": "vid",
      "vid-link":
        "https://storage.googleapis.com/agchain/5afd783f-9142-4385-aa98-f06938b40ddb-720p.mp4",
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
      // "vid-poster": require("../img/pomelo/vid-poster.png").default,
      "vid-poster": "",
    },
    jp: {
      productName: "鶴岡ひすい文旦",
      "media-info": "vid",
      "vid-link":
        "https://storage.googleapis.com/agchain/5e38bfba-82b1-421b-8e47-abbe2a080b98-720p.mp4",
      productPhoto: require("../img/pomelo/pomelo.jpg").default,
      productText:
        "「花蓮県瑞穂郷」は「花東縦谷」に位置し、台湾一番高い中央山脈と海岸山脈に抱かれ、北回帰線（北緯23.5度）が経過しています。自然に恵まれた環境及び清らかな水により、有名な「鶴岡文旦柚子」の産地です。台湾文旦の果肉は厚く、ジューシーで甘酸っぱくて香りの良い独特の味はくせになる美味しさです。文旦は栄養価が極めて高く、たんぱく質、ビタミン B1・B2・C・P、 カロテン、カルシウム、リン、鉄、酒石酸(しゅせきさん)、クエン酸等が多く含まれています。特にビタミンCの含有量は果物の中でも多く、レモンの 3 倍、リンゴの 7 倍となっています。食べ頃の見分け方ですが、文旦の皮が黄色くなった場合はすでに適度の水分が抜けているというサインで、果肉の肉質が柔らかくなっており、甘みも増しています。追熟したい場合、風通しの良い所に置いて下さい。",
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
      // "vid-poster": require("../img/pomelo/vid-poster.png").default,
      "vid-poster": "",
    },
  },
  銷日火龍果: {
    "zh-tw": {
      productName: "大龍王 火龍果",
      "media-info": "vid",
      "vid-link":
        "https://storage.googleapis.com/agchain/c72d9187-5026-4f2a-b3ff-b8abced3644d-720p.mp4",
      productPhoto: require("../img/dragonfruit/dragonfruit.jpg").default,
      productText:
        "飽滿、火紅的紅龍果外銷加拿大,大龍王火龍果近幾年不單只提供台灣市場,更將台灣優良的水果品質讓世界知道。\n\
        蜜寶火龍果達人-劉世權種植紅龍果已經20年了,直率的劉老闆說起紅龍果的種植流程鉅細靡遺,如今兒子也加入紅龍果的生產流程準備接班家族產業。\n\
        觀顛覆傳統念,蜜寶火龍果能在冬天也能有如此大量的產出皆出自於劉老闆多年的經驗。\n\
        近年與清華大學合作導入AI至生產流程,讓冬產火龍果的品質以及產量更佳的穩定,未來屏東縣政府將以大龍王農場作為範本,將大龍王農場的成功經驗導入其他農場,以平衡夏冬兩季果實產量不平均的問題也更能穩定價格。\n\
        在台灣擁有20幾座成功農場經驗的清華大學電機系的協助下,大龍王的種植技術以及AI的應用,讓大龍王農場受到東南亞政府的青睞,成為台灣首座打進印尼生產流程的智慧農場\n\
        在東北亞地區幾乎沒有熱帶水果種植地,因此火龍果幾乎是供不應求的,而台灣所生產的火龍果無論是在品質以及口感在主要的東南亞生產區中遙遙領先。\n\
        未來談到大龍王火龍果園不單只是精品水果的產地,更是將台灣的水果揚名國際的品牌。",
      farmName: "台鼎龍蝦芒果農場",
      farmPhoto: require("../img/mango-farm.jpg").default,
      farmText:
        "台南縣唯一獲得有機認證種植金煌芒果的瑞林農場，每年的收成僅有其他同面積果園的十分之一，產品價格是他人的十倍，頂級品的金煌芒果禮盒，三顆就賣新台幣一千元，但在有機風潮引領下，還是獲得不少消費者青睞。",
      certificates: [
        require("../img/dragonfruit/certificates/1.jpeg").default,
        require("../img/dragonfruit/certificates/2.jpeg").default,
        require("../img/dragonfruit/certificates/3.jpeg").default,
      ],
      // "vid-poster": require("../img/pomelo/vid-poster.png").default,
      "vid-poster": "",
    },
    jp: {
      productName: "大龍王 火龍果",
      "media-info": "vid",
      "vid-link":
        "https://storage.googleapis.com/agchain/c72d9187-5026-4f2a-b3ff-b8abced3644d-720p.mp4",
      productPhoto: require("../img/dragonfruit/dragonfruit.jpg").default,
      productText:
        "ドラゴンフルーツは英語でpitaya（ピタヤ）、漢字で火龍果と表記されます。\
        熱帯アメリカでは数属のサボテン類を総称してピタヤといい、その中の果実で竜のうろこのような果皮をしているものをドラゴンフルーツと呼びます。乾燥地帯のサボテンとは違い、ジャングルで木に抱きつくように伸びるつる植物の習性を持つ柱サボテンの一種です。\
        実の大きさは10～15センチほどで大人の手のひらサイズ。皮は食べず、果肉と果肉の中に散らばっている黒ごまのような種子を食べます。\
        果肉はやわらかくサクっとした食感、さっぱりとした甘さで酸味は少なく果汁が多い。種子はシャリシャリとした歯ざわりがします。100gあたり50kcal、1個（約260g）あたりでは約130kcalとカロリーも低く、ヘルシーな果物にもかかわらずスーパーフードとよばれるくらい栄養が豊富です。",
      farmName: "台鼎龍蝦芒果農場",
      farmPhoto: require("../img/mango-farm.jpg").default,
      farmText:
        "台南縣唯一獲得有機認證種植金煌芒果的瑞林農場，每年的收成僅有其他同面積果園的十分之一，產品價格是他人的十倍，頂級品的金煌芒果禮盒，三顆就賣新台幣一千元，但在有機風潮引領下，還是獲得不少消費者青睞。",
      certificates: [
        require("../img/dragonfruit/certificates/1.jpeg").default,
        require("../img/dragonfruit/certificates/2.jpeg").default,
        require("../img/dragonfruit/certificates/3.jpeg").default,
      ],
      // "vid-poster": require("../img/pomelo/vid-poster.png").default,
      "vid-poster": "",
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
