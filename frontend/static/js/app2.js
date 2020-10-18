(function (w) {
  let lastTime = 0;
  let vendors = ['webkit', /*'moz',*/ 'o', 'ms'];
  for (let i = 0; i < vendors.length && !w.requestAnimationFrame; i++) {
    w.requestAnimationFrame = w[vendors[i] + 'RequestAnimationFrame'];
    w.cancelAnimationFrame = w[vendors[i] + 'CancelAnimationFrame']
      || w[vendors[i] + 'CancelRequestAnimationFrame'];
  }

  if (!w.requestAnimationFrame) {
    w.requestAnimationFrame = function (callback, element) {
      const currTime = +new Date(),
        timeToCall = Math.max(0, 16 - (currTime - lastTime)),
        id = w.setTimeout(function () {
          callback(currTime + timeToCall)
        }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!w.cancelAnimationFrame) {
    w.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
})(this);

$(document).ready(function () {
  sm.init();
});

/*
	Slot Machine
*/
const sm = {
  tMax: 1000,
  speeds: [],
  r: [],
  reels: [
    ['한식', '중식', '일식', '양식', '분식', '패스트 푸드'],
    ['닭갈비', '순두부', '코다리', '쭈꾸미', '찜닭'],
    ['연안식당', '순두부정식', '맛나리식당']
  ],
  $reels: [],
  start: 0,

  // 돌림판 셋업
  init: function () {
    sm.$reels = $('.reel').each(function (i, el) {
      el.innerHTML = '<div><p>' + sm.reels[i].join('</p><p>') + '</p></div><div><p>' + sm.reels[i].join('</p><p>') + '</p></div>'
    });
  },

  // 돌리기
  action: function () {
    if (sm.start !== 0) {
      return;
    }

    for (let i = 0; i < 3; i++) {
      sm.speeds[i] = Math.random() * sm.reels[i].length + .5;
      sm.r[i] = (Math.random() * (sm.reels[i].length / 2) | 0) * (sm.reels[i].length * 70) / (sm.reels[i].length / 2);
    }

    sm.animate();
  },

  animate: function (now) {
    if (!sm.start) {
      sm.start = now;
    }

    const t = now - sm.start || 0;

    for (let i = 0; i < 3; i++) {
      sm.$reels[i].scrollTop = (sm.speeds[i] / sm.tMax / 2 * (sm.tMax - t) * (sm.tMax - t) + sm.r[i]) % (sm.reels[i].length * 70) | 0;
      // $reels[i].scrollTop = (speeds[i] / tMax / 2 * (tMax - t) * (tMax - t) + r[i]) % height | 0;
    }

    if (t < sm.tMax) {
      console.log("==구분");
      requestAnimationFrame(sm.animate);
    } else {
      sm.start = 0;
      // console.log(sm.reels[1][(sm.r[0] / 70 + 1) % 3 | 0].split(' ')[0]);
    }
  }
};
