const NONE = 0, INSERT = 1, ROLL = 2, STO = 3, RCL = 4;
let action = NONE;
let xs = '';
let l = 0, x = 0, y = 0, z = 0, t = 0;
let regten = 0;
let regs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let decimals = 2;

window.onload = show;

function stackup() {
  t = z;
  z = y;
  y = x;
}

function stackdown() {
  x = y;
  y = z;
  z = t;
}

function insert(c) {
  if (action == STO) {
    action = ROLL;
    regs[regten + c] = x;
    regten = 0;
    return show();
  }
  else if (action == RCL) {
    action = ROLL;
    x = regs[regten + c];
    regten = 0;
    return show();
  }
  else if (action == ROLL) {
    stackup();
  }
  regten = 0;

  if (action == NONE || action == ROLL) xs = '';

  xs = xs + c;
  x = parseFloat(xs || 0);

  action = INSERT;
  show();
}

function show() {
  display.innerHTML =
    "<small>" + t.toFixed(decimals) + "</small><br>" +
    "<small>" + z.toFixed(decimals) + "</small><br>" +
    "<small>" + y.toFixed(decimals) + "</small><br>" +
    (action == INSERT ? xs : x.toFixed(decimals));
}

function decimal() {
  if (action == STO || action == RCL) {
    return regten = 10;
  }
  else if (action == NONE || action == ROLL) {
    action = INSERT;
    stackup();
    xs = '0';
  }

  if (!xs.includes(".")) xs = xs + '.';
  show();
}

function enter() {
  action = NONE;
  stackup();
  show();
}

function add() {
  action = ROLL;
  l = x;
  stackdown();
  x = x + l;
  show();
}

function sub() {
  action = ROLL;
  l = x;
  stackdown();
  x = x - l;
  show();
}

function mul() {
  action = ROLL;
  l = x;
  stackdown();
  x = x * l;
  show();
}

function div() {
  action = ROLL;
  l = x;
  stackdown();
  x = x / l;
  show();
}

function swap() {
  action = ROLL;
  let current = x;
  x = y;
  y = current;
  show();
}

function rotate() {
  action = ROLL;
  let current = x;
  stackdown();
  t = current;
  show();
}

function clx() {
  action = NONE;
  x = 0;
  show();
}

function chs() {
  xs = '-' + xs;
  x = -1 * x;
  show();
}

function lstx() {
  action = ROLL;
  stackup();
  x = l;
  show();
}

function percent() {
  action = ROLL;
  l = x;
  x = x / 100 * y;
  show();
}

function deltapercent() {
  action = ROLL;
  l = x;
  x = (x - y) * 100 / y;
  show();
}

function sto() {
  action = STO;
}

function rcl() {
  if (action) stackup();
  action = RCL;
}

function square() {
  action = ROLL;
  l = x;
  x = x ** 2;
  show();
}

function power() {
  action = ROLL;
  l = x;
  stackdown();
  x = x ** l;
  show();
}

function root() {
  action = ROLL;
  l = x;
  x = Math.sqrt(x);
  show();
}

function overx() {
  action = ROLL;
  l = x;
  x = 1/x;
  show();
}

function exp() {
  action = ROLL;
  l = x;
  x = Math.exp(x);
  show();
}

