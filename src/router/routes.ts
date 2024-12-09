const routes = [
  {
    path: "/",
    name: "root",
    component: () => import("@/layout/index.vue"),
    redirect: { name: "Home" },
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/HomePage.vue"),
        meta: {
          title: "首頁"
        }
      },
      {
        path: "order",
        name: "Order",
        component: () => import("@/views/order/OrderPage.vue"),
        meta: {
          title: "訂單"
        }
      },
      // 订单详情
      {
        path: "orderDetail",
        name: "OrderDetail",
        component: () => import("@/views/order/OrderDetail.vue")
      },
      {
        path: "auth",
        name: "Auth",
        component: () => import("@/views/auth/AuthPage.vue"),
        meta: {
          title: "我的",
          noCache: true
        }
      },
      {
        path: "setting",
        name: "Setting",
        component: () => import("@/views/setting/SettingPage.vue"),
        meta: {
          title: "設置"
        }
      },

      {
        path: "/payDetail/:socketId",
        name: "PayDetail",
        component: () => import("@/views/pay/PayDetail.vue"),
        meta: {
          title: "支付詳情"
        }
      },
      {
        path: "/payedAfter",
        name: "PayedAfter",
        component: () => import("@/views/pay/PayedAfter.vue"),
        meta: {
          title: "支付成功"
        }
      },
      {
        path: "/payedFailed",
        name: "PayedFailed",
        component: () => import("@/views/pay/PayedFaied.vue"),
        meta: {
          title: "支付失敗"
        }
      },
      {
        path: "/orderConfirm",
        name: "OrderConfirm",
        component: () => import("@/views/pay/OrderConfirm.vue"),
        meta: {
          title: "訂單確認"
        }
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/auth/Login.vue"),
        meta: {
          title: "登錄"
        }
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("@/views/auth/Register.vue"),
        meta: {
          title: "註冊"
        }
      },
      {
        path: "/afterRegister",
        name: "AfterRegister",
        component: () => import("@/views/pay/AfterRegister.vue"),
        meta: {
          title: "註冊成功"
        }
      }
    ]
  },
  {
    path: "/scanner",
    name: "Scanner",
    component: () => import("@/views/scanner/ScannerPage.vue"),
    meta: {
      title: "掃碼"
    }
  }
];

export default routes;
