import Axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosResponse,
  type AxiosRequestConfig
} from "axios";
import { ContentTypeEnum } from "@/enums/requestEnum";
import NProgress from "../progress";
import { showFailToast } from "vant";
import "vant/es/toast/style";
import { guestUserLogin } from "@/api/auth";
import { useDialogStore } from "@/store/dialog/dlalogStore";

// 默認的 Axios 配置
const configDefault: AxiosRequestConfig = {
  headers: {
    "Content-Type": ContentTypeEnum.JSON
  },
  timeout: 5000,
  baseURL: "/",
  data: {}
};

// Http 類
class Http {
  private static axiosInstance: AxiosInstance;
  private static axiosConfigDefault: AxiosRequestConfig;

  private httpInterceptorsRequest(): void {
    Http.axiosInstance.interceptors.request.use(
      async config => {
        NProgress.start();
        if (
          !config.url?.includes("login") &&
          !config.url?.includes("guestUserLogin")
        ) {
          const token = localStorage.getItem("common_token");
          if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
          } else {
            try {
              const res: any = await guestUserLogin();
              localStorage.setItem("common_token", res.token);
              localStorage.setItem("isGuest", "true");
              config.headers["Authorization"] = `Bearer ${res.token}`;
            } catch (error) {
              showFailToast("遊客登入失敗");
              return Promise.reject(error);
            }
          }
        }
        return config;
      },
      (error: AxiosError) => {
        showFailToast(error.message);
        return Promise.reject(error);
      }
    );
  }

  private httpInterceptorsResponse(): void {
    Http.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        NProgress.done();
        return response.data;
      },
      (error: AxiosError) => {
        NProgress.done();
        let message = "";
        const dialogStore = useDialogStore();
        const status = error.response?.status;
        switch (status) {
          case 400:
            message = "請求錯誤";
            break;
          case 401:
            message = "未授權，請登入";

            dialogStore.showLogin();
            break;
          case 403:
            message = "拒絕訪問";
            break;
          case 404:
            message = `請求地址出錯: ${error.response?.config?.url}`;
            break;
          case 408:
            message = "請求超時";
            break;
          case 500:
            message = "服務器內部錯誤";

            break;
          case 501:
            message = "服務未實現";
            break;
          case 502:
            // dialogStore.showLogin();
            message = "網關錯誤";
            break;
          case 503:
            message = "服務不可用";
            break;
          case 504:
            message = "網關超時";
            break;
          case 505:
            message = "HTTP 版本不受支持";
            break;
          default:
            message = "網絡連接故障";
        }
        showFailToast(message);
        return Promise.reject(error);
      }
    );
  }

  constructor(config: AxiosRequestConfig) {
    Http.axiosConfigDefault = config;
    Http.axiosInstance = Axios.create(config);
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  public request<T>(paramConfig: AxiosRequestConfig): Promise<T> {
    const config = { ...Http.axiosConfigDefault, ...paramConfig };
    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

// 匯出 Http 實例
export const http = new Http(configDefault);
