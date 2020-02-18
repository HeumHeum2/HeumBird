const db = require("../models");

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    // isAuthenticated => express랑 passport에서 사용하는 로그인 여부 함수
    next();
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // isAuthenticated => express랑 passport에서 사용하는 로그인 여부 함수
    next();
  } else {
    res.status(401).send("로그인 한 사용자는 접근할 수 없습니다.");
  }
};
