const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");

const list = [];
const checkLen = 10;
let index = 0;
// 检测频率，每秒30下。
function onResults(results) {
  index++;
  // console.log(`${moment().format("HH:mm:ss")},${index}`);
  // 检测运动方向代码
  if (results.multiHandLandmarks[0]?.length === 21) {
    const point = results.multiHandLandmarks[0][8];
    list.push(point.x);

    const temp = [];
    for (let i = 0, len = list.length; i < len; i++) {
      if (i > 0) {
        const direction = list[i] - list[i - 1] > 0;
        let num;
        if (
          temp[temp.length - 1] &&
          temp[temp.length - 1].direction === direction
        ) {
          num = temp[temp.length - 1].num + 1;
        } else {
          num = 1;
        }
        temp.push({ direction, num });
        if (
          num === 1 &&
          temp[temp.length - 2] &&
          temp[temp.length - 2].num >= checkLen
        ) {
          console.log(
            "方向：",
            temp[temp.length - 2].direction ? "向左" : "向右"
          );
          console.log("temp:", temp);
          list.length = 0;
          break;
        }
      }
    }
  } else {
    list.length = 0;
  }
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 5,
      });
      drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
    }
  }
  canvasCtx.restore();
}

const hands = new Hands({
  locateFile: (file) => {
    return `https://unpkg.com/@mediapipe/hands@0.4.1646424915/${file}`;
  },
});
hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 1280,
  height: 720,
});
camera.start();
