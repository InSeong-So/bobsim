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
  height: 420,
  speeds: [],
  r: [],
  reels: [
    ['한식', '중식', '일식', '양식', '분식', '패스트 푸드'],
    ['coffee filter', 'tea strainer', 'espresso tamper'],
    ['coffee grounds', 'loose tea', 'ground espresso beans']
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
      sm.speeds[i] = Math.random() + .5;
      sm.r[i] = (Math.random() * 3 | 0) * (sm.reels[i].length * 70) / 3;
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
      console.log(sm.$reels[i].scrollTop);
      break;
    }

    sm.$reels[i].scrollTop = 70;

    if (t < sm.tMax) {
      requestAnimationFrame(sm.animate);
    } else {
      sm.start = 0;
      console.log(sm.reels[1][(sm.r[0] / 70 + 1) % 3 | 0].split(' ')[0]);
    }
  }
};
