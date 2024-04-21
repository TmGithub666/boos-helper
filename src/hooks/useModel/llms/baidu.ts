import axios from "axios";
import { llm, llmConf, llmInfo, messageReps } from "../type";
import { desc, other } from "../common";

export type baiduLLMConf = llmConf<
  "baidu",
  {
    url: string;

    access_token: string;
    advanced: {
      stream?: boolean;
      temperature?: number;
      top_p?: number;
      max_output_tokens?: number;
      disable_search?: boolean;
      penalty_score?: number;
    };
  } & other
>;

const info: llmInfo<baiduLLMConf> = {
  mode: {
    mode: "baidu",
    label: "文心一言",
    disabled: true,
    icon: `<svg t="1713626816913" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7655" width="200" height="200"><path d="M96.20121136 636.3124965c-0.1472897-113.41305959-0.29457937-226.8261192-0.29457937-340.23917879 0-14.87625845 7.65906378-26.51214381 20.4732666-34.02391789 45.51251353-26.65943349 91.02502705-53.31886698 136.83211997-79.53643141 71.1409192-40.94653321 142.42912809-81.59848704 213.71733698-122.39773055 7.36448439-4.12411126 14.58167909-8.3955122 21.50429441-13.2560719 19.44223878-13.40336159 39.03176725-16.05457598 60.09419263-3.53495252 27.39588193 16.34915535 54.93905355 32.25644163 82.48222516 48.16372793 88.0792333 50.96223197 176.30575629 101.77717426 264.38498958 152.59211653 9.86840908 5.74429781 19.88410785 11.19401627 29.60522725 17.0856038 14.13981003 8.54280189 21.50429441 21.06242535 21.50429443 37.70616007 0 147.73155685 0.29457937 295.46311371-0.1472897 443.19467057 0 15.46541722-7.2171947 28.57419943-21.7988738 36.96971163-34.7603663 20.17868721-70.55176044 38.88447758-104.57567833 59.94690293-48.90017634 30.19438599-100.00969801 56.11737105-148.76258466 86.60633642-29.01606849 18.11663161-59.50503387 34.02391789-89.11026112 50.96223197-13.10878221 7.51177407-26.07027474 15.17083783-39.03176726 22.9771913-13.84523065 8.3955122-27.83775099 8.83738127-41.97756102 0.73644843-56.41195043-32.55102101-112.82390085-65.10204201-169.38314098-97.653063-61.86166887-35.64410444-123.72333775-71.1409192-185.4377169-106.78502365-11.19401627-6.48074626-22.24074286-12.81420285-32.99289009-19.88410785-11.48859565-7.65906378-17.08560379-19.14765941-17.08560378-32.69831069-0.1472897-34.7603663 0.1472897-69.52073264 0.29457938-104.28109895 1.62018657-0.58915875 1.62018657-1.62018657-0.29457938-2.65121438z m356.58833414-225.500512c2.20934532-1.76747625 4.41869063-3.68224221 6.77532565-5.15513907 68.93157389-39.62092601 137.86314777-79.24185204 206.94201135-118.86277807 2.79850407-1.62018657 6.48074626-1.62018657 6.62803594-6.18616688 0.1472897-4.8605597-4.12411126-4.71327001-6.77532564-6.18616688-40.65195383-23.56635005-81.59848704-46.83812071-122.10315117-70.84633984-16.79102442-10.01569877-32.84560039-8.54280189-48.45830728 0.58915876-45.9543826 26.51214381-91.46689612 53.61344636-137.27398903 80.42016953-31.96186226 18.70579035-64.21830387 37.11700133-96.32745581 55.67550198-18.41121097 10.60485751-27.54317163 25.33382629-27.24859225 47.72185885 0.88373813 89.55213018 0.58915875 179.10426036 0.14728969 268.65639053-0.1472897 20.17868721 9.27925033 33.58204881 25.33382629 43.15587853 31.3727035 18.70579035 63.18727606 37.11700133 95.14913832 54.93905355 10.89943689 6.03887719 21.06242535 13.99252034 35.79139414 18.41121096V505.51925374c6.48074626 19.58952848 18.55850066 34.02391789 36.67513226 44.6287754 27.83775099 16.20186565 63.18727606 12.51962347 86.31175705-10.45756784 26.95401286-26.65943349 28.72148912-62.89269668 12.81420282-90.14128893-16.34915535-28.42690974-43.59774757-37.55887038-74.38129233-38.73718787z m82.48222517 429.64401928c14.28709972-3.82953187 25.92298506-13.99252034 38.88447758-21.35700473 40.94653321-23.27177067 81.30390766-47.72185885 122.54502023-70.55176046 26.95401286-15.02354815 52.87699792-31.66728287 80.71474891-45.21793415 16.79102442-8.10093283 29.60522723-22.53532223 29.60522726-43.4504579 0.1472897-92.939793 0.29457937-185.73229631 0.14728969-278.6720893 0-11.19401627-5.15513907-13.99252034-13.84523067-7.06990501-26.51214381 20.76784598-57.29568854 34.46578693-86.16446735 51.25681135-54.49718448 31.81457257-109.14165865 63.33456576-163.78613282 95.00184862-8.54280189 4.8605597-11.78317502 10.45756784-11.63588535 20.47326662 0.29457937 96.18016613 0.1472897 192.50762194 0.1472897 288.68778806-0.29457937 3.5349525-1.47289687 7.65906378 3.38766282 10.8994369z" fill="#066AF3" p-id="7656"></path><path d="M96.20121136 636.3124965c1.91476594 1.03102783 1.91476594 2.06205563 0 3.09308345v-3.09308345z" fill="#4372E0" p-id="7657"></path><path d="M391.3697457 505.37196405c-5.44971845-44.33419602 13.84523065-74.08671296 61.4197998-94.55997955 30.93083443 1.17831749 58.03213699 10.31027814 74.38129233 38.5898982 15.75999659 27.39588193 14.13981003 63.48185543-12.81420282 90.14128893-23.27177067 22.97719129-58.47400606 26.65943349-86.31175705 10.45756783-18.11663161-10.60485751-30.34167568-25.03924691-36.67513226-44.62877541z" fill="#002A9A" p-id="7658"></path></svg>`,
  },
  url: {
    type: "input",
    required: true,
    config: {
      placeholder:
        "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions",
    },
    desc: "不同模型不同地址~多少带点*",
  },
  access_token: {
    type: "input",
    required: true,
    desc: "虽然有30天的时效,但也提高了安全.",
  },
  advanced: {
    value: {
      stream: { type: "switch", value: false },
      temperature: {
        type: "slider",
        value: 0.65,
        config: { min: 0, max: 1, step: 0.5 },
        desc: desc.temperature,
      },
      top_p: {
        type: "slider",
        value: 0.65,
        config: { min: 0, max: 1, step: 0.5 },
        desc: desc.top_p,
      },
      max_output_tokens: {
        type: "slider",
        value: 2048,
        config: { min: 2, max: 2048, step: 2 },
        desc: "指定模型最大输出token数",
      },
      disable_search: {
        type: "switch",
        desc: "是否强制关闭实时搜索功能，默认false，表示不关闭",
      },
      penalty_score: {
        type: "slider",
        value: 1.0,
        config: { min: 1, max: 2, step: 0.1 },
        desc: "通过对已生成的token增加惩罚，减少重复生成的现象。值越大表示惩罚越大",
      },
    },
    label: "高级配置",
    alert: "warning",
    desc: "小白勿动",
  },
  other,
};

export const baidu = {
  info,
};
