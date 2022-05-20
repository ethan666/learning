const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");

// const list = [];
// const checkLen = 10;
let index = 0;
// 检测频率，每秒30下。
function onResults(results) {
  index++;
  // console.log(`${moment().format("HH:mm:ss")},${index}`);
  // 检测运动方向代码
  // if (results.multiHandLandmarks[0]?.length === 21) {
  //   const point = results.multiHandLandmarks[0][8];
  //   list.push(point.x);

  //   const temp = [];
  //   for (let i = 0, len = list.length; i < len; i++) {
  //     if (i > 0) {
  //       const direction = list[i] - list[i - 1] > 0;
  //       let num;
  //       if (
  //         temp[temp.length - 1] &&
  //         temp[temp.length - 1].direction === direction
  //       ) {
  //         num = temp[temp.length - 1].num + 1;
  //       } else {
  //         num = 1;
  //       }
  //       temp.push({ direction, num });
  //       if (
  //         num === 1 &&
  //         temp[temp.length - 2] &&
  //         temp[temp.length - 2].num >= checkLen
  //       ) {
  //         console.log(
  //           "方向：",
  //           temp[temp.length - 2].direction ? "向左" : "向右"
  //         );
  //         console.log("temp:", temp);
  //         list.length = 0;
  //         break;
  //       }
  //     }
  //   }
  // } else {
  //   list.length = 0;
  // }

  if(index % 2 === 0){
    checkDirection(results);
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

let previous_angle = null;
function checkDirection(results) {
  const landmark = results.multiHandLandmarks[0];
  if (landmark?.length !== 21) {
    return;
  }

  const wrist = landmark[0];
  const MCP_of_second_finger = landmark[9];

  const ang_in_radian = getAngleABC(
    MCP_of_second_finger.x,
    MCP_of_second_finger.y,
    wrist.x,
    wrist.y,
    wrist.x + 0.1,
    wrist.y
  );

  const ang_in_degree = radianToDegree(ang_in_radian);
  // console.log(`Angle:${ang_in_degree}`);

  if (previous_angle) {
    const angleDifferenceTreshold = 12;
    if (previous_angle >= 80 && previous_angle <= 100) {
      if (ang_in_degree > previous_angle + angleDifferenceTreshold) {
        appendOutput(`${moment().format('HH:mm:ss')} 向右`)
      } else if (ang_in_degree < previous_angle - angleDifferenceTreshold) {
        appendOutput(`${moment().format('HH:mm:ss')} 向左`)
      }
    }
  }

  previous_angle = ang_in_degree;
}

function getAngleABC(a_x, a_y, b_x, b_y, c_x, c_y) {
  const ab_x = b_x - a_x;
  const ab_y = b_y - a_y;
  const cb_x = b_x - c_x;
  const cb_y = b_y - c_y;

  const dot = ab_x * cb_x + ab_y * cb_y;
  const cross = ab_x * cb_y - ab_y * cb_x;

  const alpha = Math.atan2(cross, dot);
  return alpha;
}

function radianToDegree(radian) {
  return Number.parseInt((radian * 180) / Math.PI + 0.5);
}


function appendOutput(text){
  const output = document.getElementsByClassName("output")[0]
  const tc = document.createTextNode(`${text}`)
  output.appendChild(tc)
  output.appendChild(document.createElement('br'))
}