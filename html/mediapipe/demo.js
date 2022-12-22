const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");

const directionBtn = document.getElementById('direction_btn')
const panBtn = document.getElementById('pan_btn')
const zoomBtn = document.getElementById('zoom_btn')

let directionCheck = false
directionBtn.addEventListener("click", () => {
  directionCheck = !directionCheck
  let text = ''
  if(directionCheck){
    text = '左右检测(取消)'
  }else{
    text = '左右检测'
  }
  
  directionBtn.removeChild(directionBtn.firstChild)
  directionBtn.appendChild(document.createTextNode(text))
})

let panCheck = false
panBtn.addEventListener('click', () => {
  panCheck = !panCheck

  let text = ''
  if(panCheck){
    text = '平移检测(取消)'
  }else{
    text = '平移检测'
  }

  panBtn.removeChild(panBtn.firstChild)
  panBtn.appendChild(document.createTextNode(text))
})

let zoomCheck = false
zoomBtn.addEventListener('click', () => {
  zoomCheck = !zoomCheck

  let text = ''
  if(zoomCheck){
    text = '缩放检测(取消)'
  }else{
    text = '缩放检测'
  }

  zoomBtn.removeChild(zoomBtn.firstChild)
  zoomBtn.appendChild(document.createTextNode(text))
})

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
  //     if (i > 0) {
    
      //   const temp = [];
      //   for (let i = 0, len = list.length; i < len; i++) {
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

  if (index % 2 === 0) {
    checkDirection(results);
  }

  if(zoomCheck){
    checkZoom(results);
  }

  if(panCheck){
    checkScrolling(results)
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
  minDetectionConfidence: 0.8,
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
        appendOutput(`${moment().format("HH:mm:ss")} 向右`);
      } else if (ang_in_degree < previous_angle - angleDifferenceTreshold) {
        appendOutput(`${moment().format("HH:mm:ss")} 向左`);
      }
    }
  }

  previous_angle = ang_in_degree;
}

// 检测放大、缩小
let previous_rectangle_height = null
function checkZoom(results){
  const landmark = results.multiHandLandmarks[0]; 
  if (landmark?.length !== 21) {
    return;
  }

  const yArr = landmark.map(item => item.y)
  const maxY = Math.max(...yArr);
  const minY = Math.min(...yArr)
  const height = maxY - minY

  if(previous_rectangle_height){
    const heightDifferenceFactor = 0.03;

    const heightDifferenceThreshold = height * heightDifferenceFactor;
    if (height < previous_rectangle_height - heightDifferenceThreshold)
    {
      appendOutput(`${moment().format('HH:mm:ss')} 缩小`)
    }
    else if (height > previous_rectangle_height + heightDifferenceThreshold)
    {
      appendOutput(`${moment().format('HH:mm:ss')} 放大`)
    }
  }
  previous_rectangle_height = height;

}

let previous_x_center = null
let previous_y_center = null
function checkScrolling(results){
  const landmark = results.multiHandLandmarks[0]; 

  if (landmark?.length !== 21) {
    return;
  }

  const yArr = landmark.map(item => item.y)
  const maxY = Math.max(...yArr);
  const minY = Math.min(...yArr)
  const height = maxY - minY

  const x_center = landmark[9].x
  const y_center = landmark[9].y
  if (previous_x_center)
  {
      const mouvementDistance = get_Euclidean_DistanceAB(x_center, y_center, previous_x_center, previous_y_center);
      // LOG(INFO) << "Distance: " << mouvementDistance;

      const mouvementDistanceFactor = 0.02; // only large mouvements will be recognized.

      // the height is normed [0.0, 1.0] to the camera window height. 
      // so the mouvement (when the hand is near the camera) should be equivalent to the mouvement when the hand is far.
      const mouvementDistanceThreshold = mouvementDistanceFactor * height;
      if (mouvementDistance > mouvementDistanceThreshold)
      {
          const angle = radianToDegree(getAngleABC(x_center, y_center, previous_x_center, previous_y_center, previous_x_center + 0.1, previous_y_center));
          // LOG(INFO) << "Angle: " << angle;
          if (angle >= -45 && angle < 45)
          {
            // recognized_hand_mouvement_scrolling = new std::string("Scrolling right");
            appendOutput(`${moment().format('HH:mm:ss')} right`)
          }
          else if (angle >= 45 && angle < 135)
          {
            // recognized_hand_mouvement_scrolling = new std::string("Scrolling up");
            appendOutput(`${moment().format('HH:mm:ss')} up`)
          }
          else if (angle >= 135 || angle < -135)
          {
            // recognized_hand_mouvement_scrolling = new std::string("Scrolling left");
            appendOutput(`${moment().format('HH:mm:ss')} left`)
          }
          else if (angle >= -135 && angle < -45)
          {
            appendOutput(`${moment().format('HH:mm:ss')} down`)
            // recognized_hand_mouvement_scrolling = new std::string("Scrolling down");
          }
      }
  }
  previous_x_center = x_center;
  previous_y_center = y_center;
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

function get_Euclidean_DistanceAB(a_x, a_y, b_x, b_y){
  const dist = Math.pow(a_x - b_x, 2) + Math.pow(a_y - b_y, 2)
  return Math.sqrt(dist)
}

function appendOutput(text){
  const output = document.getElementsByClassName("output")[0]
  const tc = document.createTextNode(`${text}`)
  output.appendChild(tc)
  output.appendChild(document.createElement('br'))
}

const clearBtn = document.getElementById('clear_btn')
clearBtn.addEventListener('click', clearOutput)

function clearOutput(){
  const output = document.getElementsByClassName("output")[0]
  while (output.firstChild) {
    output.removeChild(output.firstChild);
  }
}

