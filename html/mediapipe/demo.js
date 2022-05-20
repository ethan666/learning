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

  checkDirection(results);

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
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  },
});
hands.setOptions({
  maxNumHands: 1,
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

// 3. FEATURE - Slide left / right
// if (frameCounter->Get() % 2 == 0) // each odd Frame is skipped. For a better result.
// {
//     NormalizedLandmark wrist = landmarkList.landmark(0);
//     NormalizedLandmark MCP_of_second_finger = landmarkList.landmark(9);

//     // angle between the hand (wirst and MCP) and the x-axis.
//     const float ang_in_radian = this->getAngleABC(MCP_of_second_finger.x(), MCP_of_second_finger.y(), wrist.x(), wrist.y(), wrist.x() + 0.1, wrist.y());
//     const int ang_in_degree = this->radianToDegree(ang_in_radian);
//     // LOG(INFO) << "Angle: " << ang_in_degree;
//     if (this->previous_angle)
//     {
//         const float angleDifferenceTreshold = 12;
//         if (this->previous_angle >= 80 && this->previous_angle <= 100)
//         {
//             if (ang_in_degree > this->previous_angle + angleDifferenceTreshold)
//             {
//                 recognized_hand_mouvement_sliding = new std::string("Slide left");
//                 LOG(INFO) << *recognized_hand_mouvement_sliding;
//             }
//             else if (ang_in_degree < this->previous_angle - angleDifferenceTreshold)
//             {
//                 recognized_hand_mouvement_sliding = new std::string("Slide right");
//                 LOG(INFO) << *recognized_hand_mouvement_sliding;
//             }
//         }
//     }
//     this->previous_angle = ang_in_degree;
// }

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
  console.log(`Angle:${ang_in_degree}`);

  if (previous_angle) {
    const angleDifferenceTreshold = 12;
    if (previous_angle >= 80 && previous_angle <= 100) {
      if (ang_in_degree > previous_angle + angleDifferenceTreshold) {
        console.log("Slide left");
      } else if (ang_in_degree < previous_angle - angleDifferenceTreshold) {
        console.log("Slide right");
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
  return Math.parseInt((radian * 180) / Math.PI + 0.5);
}
