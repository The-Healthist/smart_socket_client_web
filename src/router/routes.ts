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
        component: () => import("@/views/home/homePage.vue"),
        meta: {
          title: "首頁"
        }
      },
      {
        path: "order",
        name: "Order",
        component: () => import("@/views/order/orderPage.vue"),
        meta: {
          title: "訂單"
        }
      },
      // 订单详情
      {
        path: "orderDetail",
        name: "OrderDetail",
        component: () => import("@/views/order/orderDetail.vue")
      },
      {
        path: "auth",
        name: "Auth",
        component: () => import("@/views/auth/authPage.vue"),
        meta: {
          title: "我的",
          noCache: true
        }
      },
      {
        path: "setting",
        name: "Setting",
        component: () => import("@/views/setting/settingPage.vue"),
        meta: {
          title: "設置"
        }
      },

      {
        path: "/payDetail/:socketId",
        name: "PayDetail",
        component: () => import("@/views/pay/payDetail.vue"),
        meta: {
          title: "支付詳情"
        }
      },
      {
        path: "/payedAfter",
        name: "PayedAfter",
        component: () => import("@/views/pay/payedAfter.vue"),
        meta: {
          title: "支付成功"
        }
      },
      {
        path: "/payedFailed",
        name: "PayedFailed",
        component: () => import("@/views/pay/payedFaied.vue"),
        meta: {
          title: "支付失敗"
        }
      },
      {
        path: "/orderConfirm",
        name: "OrderConfirm",
        component: () => import("@/views/pay/orderConfirm.vue"),
        meta: {
          title: "訂單確認"
        }
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/auth/login.vue"),
        meta: {
          title: "登錄"
        }
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("@/views/auth/register.vue"),
        meta: {
          title: "註冊"
        }
      },
      {
        path: "/afterRegister",
        name: "AfterRegister",
        component: () => import("@/views/pay/afterRegister.vue"),
        meta: {
          title: "註冊成功"
        }
      }
    ]
  },
  {
    path: "/scanner",
    name: "Scanner",
    component: () => import("@/views/scanner/scannerPage.vue"),
    meta: {
      title: "掃碼"
    }
  }
];

export default routes;
