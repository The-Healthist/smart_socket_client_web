<template>
  <div
    :class="`font-${text} theme-color-${currentTheme} theme-rounded-${currrentRounded} theme-fontsize-${currentFontSize} font-${text} `"
  >
    <div class="scaner">
      <div class="cover">
        <div class="box">
          <p
            class="line absolute top-1/2 left-1/2 w-48 h-0.5 bg-gradient-to-r from-skin-primary/40 via-skin-primary/90 via-50% to-skin-primary/40 to-100% transform -translate-x-1/2 -translate-y-1/2 animate-scan"
          />

          <!-- 扫码框的四个角 -->
          <span
            class="absolute top-0 left-0 border-t-[3px] border-l-[3px] border-primary w-8 h-8"
          />
          <span
            class="absolute top-0 right-0 border-t-[3px] border-r-[3px] border-primary w-8 h-8"
          />
          <span
            class="absolute bottom-0 left-0 border-b-[3px] border-l-[3px] border-primary w-8 h-8"
          />
          <span
            class="absolute bottom-0 right-0 border-b-[3px] border-r-[3px] border-primary w-8 h-8"
          />

          <!-- 扫码框的边 -->
          <span
            class="absolute top-1/2 left-0 border-l-[3px] border-primary w-12 h-12 transform -translate-y-1/2"
          />
          <span
            class="absolute top-0 left-1/2 border-t-[3px] border-primary w-12 h-12 transform -translate-x-1/2"
          />
          <span
            class="absolute bottom-1/2 right-0 border-r-[3px] border-primary w-12 h-12 transform translate-y-1/2"
          />
          <span
            class="absolute bottom-0 right-1/2 border-b-[3px] border-primary w-12 h-12 transform translate-x-1/2"
          />
        </div>
      </div>
      <!-- <div
        class="top-[60%] absolute w-full h-[42px] flex justify-center items-center"
      >
        <span
          class="w-[187px] text-large rounded-button bg-primary opacity- text-inverted text-center p-2.5 z-10"
          >掃不到?手動輸入</span
        >
      </div> -->
      <!-- 视频播放元素 -->
      <video
        v-show="showPlay"
        ref="video"
        class="source"
        :width="videoWH.width"
        :height="videoWH.height"
        controls
      />
      <!-- 画布元素 -->
      <canvas v-show="!showPlay" ref="canvas" />

      <!-- 开始扫描按钮 -->
      <!-- <button v-show="showPlay" @click="run">开始</button> -->
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import adapter from "webrtc-adapter"; // WebRTC 适配器
import jsQR from "jsqr"; // QR 码解析库
import { useThemeStore } from "@/store/theme/themeStore";
import { useRoundedStore } from "@/store/theme/roundStore";
import { useFontSizeStore } from "@/store/theme/fontsizeStore";
import { useTextStore } from "@/store/theme/textStore";
import { useRouter } from "vue-router";

export default {
  name: "Scaner",
  props: {
    useBackCamera: { type: Boolean, default: true },
    stopOnScaned: { type: Boolean, default: true },
    drawOnfound: { type: Boolean, default: true },
    lineColor: { type: String, default: "#ffa500" },
    lineWidth: { type: Number, default: 2 },
    videoWidth: {
      type: Number,
      default: document.documentElement.clientWidth || document.body.clientWidth
    },
    videoHeight: {
      type: Number,
      default:
        document.documentElement.clientHeight || document.body.clientHeight
    },
    responsive: { type: Boolean, default: false }
  },
  setup() {
    const themeStore = useThemeStore();
    const roundedStore = useRoundedStore();
    const fontsizeStore = useFontSizeStore();
    const textStore = useTextStore();
    const router = useRouter();

    const currentTheme = computed(() => themeStore.getTheme);
    const currrentRounded = computed(() => roundedStore.getRounded);
    const currentFontSize = computed(() => fontsizeStore.getFontSize);
    const text = computed(() => textStore.getText);
    const texts = computed(() => textStore.getTexts);

    return {
      themeStore,
      roundedStore,
      fontsizeStore,
      textStore,
      router,
      currentTheme,
      currrentRounded,
      currentFontSize,
      text,
      texts
    };
  },
  data() {
    return {
      showPlay: false,
      showBanner: true,
      containerWidth: null,
      active: false
    };
  },
  computed: {
    videoWH() {
      if (this.containerWidth) {
        const width = this.containerWidth;
        const height = width * 0.75;
        return { width, height };
      }
      return { width: this.videoWidth, height: this.videoHeight };
    }
  },
  watch: {
    active: {
      immediate: true,
      handler(active) {
        if (!active) {
          this.fullStop();
        }
      }
    }
  },
  mounted() {
    this.setup();
  },
  beforeUnmount() {
    this.fullStop();
  },
  methods: {
    drawLine(begin, end) {
      this.canvas.beginPath();
      this.canvas.moveTo(begin.x, begin.y);
      this.canvas.lineTo(end.x, end.y);
      this.canvas.lineWidth = this.lineWidth;
      this.canvas.strokeStyle = this.lineColor;
      this.canvas.stroke();
    },
    drawBox(location) {
      if (this.drawOnfound) {
        this.drawLine(location.topLeftCorner, location.topRightCorner);
        this.drawLine(location.topRightCorner, location.bottomRightCorner);
        this.drawLine(location.bottomRightCorner, location.bottomLeftCorner);
        this.drawLine(location.bottomLeftCorner, location.topLeftCorner);
      }
    },
    // 扫描的宽度画布
    tick() {
      if (
        this.$refs.video &&
        this.$refs.video.readyState === this.$refs.video.HAVE_ENOUGH_DATA
      ) {
        this.$refs.canvas.height = this.videoWH.height;
        this.$refs.canvas.width = this.videoWH.width * 1.6;
        this.canvas.drawImage(
          this.$refs.video,
          0,
          0,
          this.$refs.canvas.width,
          this.$refs.canvas.height
        );
        const imageData = this.canvas.getImageData(
          0,
          0,
          this.$refs.canvas.width,
          this.$refs.canvas.height
        );
        let code = false;
        try {
          code = jsQR(imageData.data, imageData.width, imageData.height);
        } catch (e) {
          console.error(e);
        }
        if (code) {
          this.drawBox(code.location);
          this.found(code.data);
        }
      }
      this.run();
    },
    setup() {
      if (this.responsive) {
        this.$nextTick(() => {
          this.containerWidth = this.$refs.scaner.clientWidth;
        });
      }
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.previousCode = null;
        this.parity = 0;
        this.active = true;
        this.canvas = this.$refs.canvas.getContext("2d");
        const facingMode = this.useBackCamera
          ? { exact: "environment" }
          : "user";
        const handleSuccess = stream => {
          if (this.$refs.video.srcObject !== undefined) {
            this.$refs.video.srcObject = stream;
          } else if (window.videoEl.mozSrcObject !== undefined) {
            this.$refs.video.mozSrcObject = stream;
          } else if (window.URL.createObjectURL) {
            this.$refs.video.src = window.URL.createObjectURL(stream);
          } else if (window.webkitURL) {
            this.$refs.video.src = window.webkitURL.createObjectURL(stream);
          } else {
            this.$refs.video.src = stream;
          }
          this.$refs.video.playsInline = true;
          const playPromise = this.$refs.video.play();
          playPromise.catch(() => (this.showPlay = true));
          playPromise.then(this.run);
        };
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode } })
          .then(handleSuccess)
          .catch(() => {
            navigator.mediaDevices
              .getUserMedia({ video: true })
              .then(handleSuccess)
              .catch(error => {
                this.$emit("error-captured", error);
              });
          });
      }
    },
    run() {
      if (this.active) {
        requestAnimationFrame(this.tick);
      }
    },
    found(code) {
      if (this.previousCode !== code) {
        this.previousCode = code;
      } else if (this.previousCode === code) {
        this.parity += 1;
      }
      if (this.parity > 2) {
        this.active = this.stopOnScaned ? false : true;
        this.parity = 0;
        this.$emit("code-scanned", code);
      }
    },
    fullStop() {
      if (this.$refs.video && this.$refs.video.srcObject) {
        this.$refs.video.srcObject.getTracks().forEach(t => t.stop());
      }
    }
  }
};
</script>

<style lang="css" scoped>
.scaner {
  position: relative;
  width: 100vw;
  height: 100vh;
}

/* 遮罩层 */
.scaner .cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(1, 0, 5, 0);
  z-index: 1;
}

/* 创建不遮罩区域 */
.scaner .cover .box {
  content: "";
  position: absolute;
  top: 34%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 220px;
  height: 220px;
  background: rgba(1, 16, 1, 0);
  z-index: 2;
  border: 1px solid transparent;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
}
span {
  border-radius: 3px;
}

.line {
  -webkit-animation: scan 1.75s infinite linear;
  -moz-animation: scan 1.75s infinite linear;
  -ms-animation: scan 1.75s infinite linear;
  -o-animation: scan 1.75s infinite linear;
  animation: scan 1.75s infinite linear; /* 扫码线动画 */
  -webkit-animation-fill-mode: both;
  -moz-animation-fill-mode: both;
  -ms-animation-fill-mode: both;
  -o-animation-fill-mode: both;
  animation-fill-mode: both;
  border-radius: 1px;
}
.scaner .cover .square {
  display: inline-block;
  height: 30px;
  width: 30px;
  position: absolute;
}

/* 提示信息样式 */
.scaner .cover .tips {
  position: absolute;
  bottom: -78px;
  width: 100%;
  background: var(--color-background-primary);
  font-size: 14px;
  opacity: 0.8;
}

/* 扫码线动画效果 */
@-webkit-keyframes scan {
  0% {
    top: 0;
  }
  25% {
    top: 50px;
  }
  50% {
    top: 100px;
  }
  75% {
    top: 150px;
  }
  100% {
    top: 200px;
  }
}
@-moz-keyframes scan {
  0% {
    top: 0;
  }
  25% {
    top: 50px;
  }
  50% {
    top: 100px;
  }
  75% {
    top: 150px;
  }
  100% {
    top: 200px;
  }
}
@-o-keyframes scan {
  0% {
    top: 0;
  }
  25% {
    top: 50px;
  }
  50% {
    top: 100px;
  }
  75% {
    top: 150px;
  }
  100% {
    top: 200px;
  }
}
@keyframes scan {
  0% {
    top: 0;
  }
  25% {
    top: 50px;
  }
  50% {
    top: 100px;
  }
  75% {
    top: 150px;
  }
  100% {
    top: 200px;
  }
}
</style>
