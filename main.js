$(document).ready(function () {
  let register_first = "0";
  let register_second = "0";
  let register_params = "";
  //state 1:first, 2:params, 3:second
  let state = 1;
  //div0error
  const ERRORCODE = "error!";

  $("#B0").click(function () { setRegister("0"); });
  $("#B00").click(function () { setRegister("00"); });
  $("#B1").click(function () { setRegister("1"); });
  $("#B2").click(function () { setRegister("2"); });
  $("#B3").click(function () { setRegister("3"); });
  $("#B4").click(function () { setRegister("4"); });
  $("#B5").click(function () { setRegister("5"); });
  $("#B6").click(function () { setRegister("6"); });
  $("#B7").click(function () { setRegister("7"); });
  $("#B8").click(function () { setRegister("8"); });
  $("#B9").click(function () { setRegister("9"); });

  $("#Bpriod").click(function () { setRegister("."); });

  $("#Bplus").click(function () { setParams("+"); });
  $("#Bminus").click(function () { setParams("-"); });
  $("#Bmulti").click(function () { setParams("*"); });
  $("#Bdiv").click(function () { setParams("/"); });

  $("#BAC").click(function () { setBlank(); });
  $("#Bequal").click(function () { Cal(); });


  function calEval(obj) {
    let i = new BigNumber(register_first);
    let j = new BigNumber(register_second);
    switch (register_params) {
      case "+":
        return i.plus(j);
      case "-":
        return i.minus(j);
      case "*":
        return i.times(j);
      case "/":
        return i.div(j);
    }
  }

  function Cal() {
    if (state === 2) {
      switch (register_params) {
        case "+":
        case "*":
          register_second = register_first;
      }
    }
    let work;
    if (register_params === "/" && register_second == 0) {
      work = ERRORCODE + "div0";
    } else if (state === 1) {
      work = register_first;
    } else
      work = calEval();
    setBlank();
    register_first = work;
    refreshResult();
  }

  function refreshResult() {
    console.log("f:" + register_first + " p:" + register_params + " s:" + register_second);
    if (state < 3) $("#result").text(register_first + register_params);
    if (state === 3) $("#result").text(register_first + register_params + register_second);
  }

  function modRegister(register, str) {
    if (register.toString().includes(".") && str === ".") return register;
    else if (!register.toString().includes(".") && str === ".") return register + str;
    else if (register.toString().includes(".")) return register + str;
    else return Number(register + str).toString();
  }

  function setRegister(str) {
    console.log("now:" + str);
    if (register_first.toString().includes(ERRORCODE)) return 0;
    if (state === 2) state = 3;
    if (state === 1) {
      register_first = modRegister(register_first, str);
    } else if (state === 3) {
      register_second = modRegister(register_second, str);
    }
    refreshResult();
  }

  function setParams(str) {
    if (register_first.toString().includes(ERRORCODE)) return 0;
    if (state === 1) state = 2;
    if (state === 3) {
      Cal();
      state = 2;
    }
    register_params = str;
    refreshResult();
  }

  function setBlank() {
    register_first = "0";
    register_second = "0";
    register_params = "";
    state = 1;
    refreshResult();
  }
});