const express = require("express");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const hpp = require("hpp");
const helmet = require("helmet");

const passportConfig = require("./passport");
const db = require("./models");
const userAPIRouter = require("./routes/user");

const prod = process.env.NODE_ENV === "production";

dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

if (prod) {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan("combined"));
  app.use(
    cors({
      origin: "http://heumbird.com",
      credentials: true
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(cors({ origin: true, credentials: true }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false, // 매번 새션 강제 저장
    saveUninitialized: false, //빈 값도 저장
    secret: process.env.COOKIE_SECRET, // 쿠키에 대한 암호화
    cookie: {
      // 쿠키 설정
      httpOnly: true, // 쿠키를 자바스크립트에서 접근을 못함
      secure: false, // https를 쓸 때 true로 해줘야함.
      domain: prod && ".heumbird.com"
    },
    name: "duzee"
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("heumbird 백엔드 정상 동작!");
});

app.use("/api/user", userAPIRouter);

app.listen(prod ? process.env.PORT : 3060, () => {
  console.log(`server is running on ${prod ? process.env.PORT : 3060}`);
});
