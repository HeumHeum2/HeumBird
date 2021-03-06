const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

const db = require("../models");
const { isLoggedIn } = require("./middleware");
const router = express.Router();
const { Op, fn } = db.Sequelize;

AWS.config.update({
  region: "ap-northeast-2",
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

Set.prototype.difference = (setB) => {
  const difference = new Set(setB);
  for (let elem of setB) {
    difference.delete(elem);
  }
  return difference;
};

const storage = multerS3({
  s3: new AWS.S3(),
  bucket: "heumbird",
  key(req, file, cb) {
    const error =
      file.mimetype === "image/gif" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/tiff" ||
      file.mimetype === "image/svg+xml" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/webp"
        ? null
        : new Error("이미지만 입력해주세요!");
    cb(error, `user/${+new Date()}${path.basename(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post("/image", isLoggedIn, upload.single("image"), async (req, res) => {
  const [image, created] = await db.Image.findOrCreate({
    where: {
      UserId: req.user.id,
    },
    defaults: {
      src: req.file.location,
      UserId: req.user.id,
    },
  });
  if (created) {
    return res.status(200).json({ src: image.src });
  } else {
    await db.Image.update(
      {
        src: req.file.location,
      },
      {
        where: { UserId: req.user.id },
      }
    );
    return res.status(200).json({ src: req.file.location });
  }
});

router.delete("/image", isLoggedIn, async (req, res, next) => {
  try {
    await db.Image.destroy({
      where: {
        UserId: req.user.id,
      },
    });
    return res.status(200).send("success");
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/", isLoggedIn, (req, res) => {
  const user = req.user;
  return res.status(200).json(user);
});

router.get("/:nickname", async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { nickname: decodeURIComponent(req.params.nickname) },
      include: [
        {
          model: db.Post,
          as: "Posts",
          attributes: ["id"],
        },
        {
          model: db.User,
          as: "Followings",
          attributes: ["id", "nickname"],
        },
        {
          model: db.User,
          as: "Followers",
          attributes: ["id", "nickname"],
        },
        {
          model: db.Image,
          attributes: ["src"],
        },
        {
          model: db.Post,
          through: "Like",
          as: "Liked",
          attributes: ["id"],
        },
      ],
      attributes: [
        "id",
        "email",
        "nickname",
        "publictarget",
        "introduce",
        "phonenumber",
      ],
    });
    const jsonUser = user.toJSON();
    jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
    jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
    jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
    return res.status(200).json(jsonUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      try {
        if (loginErr) {
          return next(loginErr);
        }
        const User = await db.User.findOne({
          where: { id: user.id },
          include: [
            {
              model: db.Post,
              as: "Posts",
              attributes: ["id"],
            },
            {
              model: db.User,
              as: "Followings",
              attributes: ["id", "nickname"],
            },
            {
              model: db.User,
              as: "Followers",
              attributes: ["id", "nickname"],
            },
            {
              model: db.Image,
              attributes: ["src"],
            },
            {
              model: db.Post,
              through: "Like",
              as: "Liked",
              attributes: ["id"],
            },
          ],
          attributes: [
            "id",
            "email",
            "nickname",
            "publictarget",
            "introduce",
            "phonenumber",
          ],
        });
        return res.status(200).json(User);
      } catch (e) {
        next(e);
      }
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  return res.status(200).send("logout 성공");
});

router.post("/duplicate", async (req, res, next) => {
  try {
    if (req.body.email) {
      const exUser = await db.User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (exUser) {
        return res.status(403).send("이미 존재하는 이메일입니다!");
      }
      return res.status(200).send("사용 가능한 이메일입니다!");
    } else if (req.body.nickname) {
      const exUser = await db.User.findOne({
        where: {
          nickname: req.body.nickname,
        },
      });
      if (exUser) {
        return res.status(403).send("이미 존재하는 닉네임입니다!");
      }
      return res.status(200).send("사용 가능한 닉네임입니다!");
    }
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await db.User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
      phonenumber: req.body.phoneNumber,
      publictarget: 0,
    });
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.patch("/access", isLoggedIn, async (req, res, next) => {
  try {
    await db.User.update(
      { publictarget: req.body.publictarget },
      { where: { id: req.user.id } }
    );
    res.status(200).send(req.body.publictarget.toString());
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get("/:nickname/followers", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        nickname: decodeURIComponent(req.params.nickname),
      },
    });
    const followers = await user.getFollowers({
      include: [
        {
          model: db.Image,
          attributes: ["src"],
        },
      ],
      attributes: ["id", "nickname"],
      limit: parseInt(req.query.limit, 10),
      offset: parseInt(req.query.offset, 10),
    });
    return res.status(200).json(followers);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/:nickname/followings", isLoggedIn, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        nickname: decodeURIComponent(req.params.nickname),
      },
    });
    const followings = await user.getFollowings({
      include: [
        {
          model: db.Image,
          attributes: ["src"],
        },
      ],
      attributes: ["id", "nickname"],
      limit: parseInt(req.query.limit, 10),
      offset: parseInt(req.query.offset, 10),
    });
    return res.status(200).json(followings);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/:id/follow", isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id },
    });
    await me.addFollowing(req.params.id);
    const user = await db.User.findOne({
      where: { id: req.params.id },
      attributes: ["id", "nickname"],
    });
    return res.status(200).json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete("/:id/follow", isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.user.id },
    });
    await me.removeFollowing(req.params.id);
    return res.status(200).send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/:id/suggested/other", isLoggedIn, async (req, res, next) => {
  try {
    const followingList = req.user.Followings.map((v) => v.id);
    const followingOther = await db.User.findAll({
      where: {
        id: {
          [Op.in]: followingList,
        },
      },
      include: [
        {
          model: db.User,
          as: "Followings",
          where: {
            id: {
              [Op.notIn]: [...followingList, req.user.id],
            },
          },
          include: [
            {
              model: db.Image,
              attributes: ["src"],
            },
          ],
          attributes: ["id", "nickname"],
        },
      ],
      attributes: [],
    });
    let suggestList = followingOther.map((v) => v.Followings);
    suggestList = suggestList.reduce(
      (accumulator, currentValue) => accumulator.concat(currentValue),
      []
    );
    suggestList = suggestList.filter(
      (thing, index, self) => index === self.findIndex((t) => t.id === thing.id)
    );
    return res.status(200).json(suggestList);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/:id/suggested/follow", isLoggedIn, async (req, res, next) => {
  try {
    const followerList = req.user.Followers.map((v) => v.id);
    const followingList = req.user.Followings.map((v) => v.id);

    const setfollowerList = new Set(followerList);
    const setfollowingList = new Set(followingList);
    const difference = new Set(
      [...setfollowerList].filter((x) => !setfollowingList.has(x))
    );
    const differenceArray = Array.from(difference);
    const differenceUser = await db.User.findAll({
      where: {
        id: {
          [Op.in]: differenceArray,
        },
      },
      include: [
        {
          model: db.Image,
          attributes: ["src"],
        },
      ],
      attributes: ["id", "nickname"],
    });
    return res.status(200).json(differenceUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/find", async (req, res, next) => {
  try {
    const result = await db.User.findAll({
      where: {
        nickname: {
          [Op.like]: "%" + req.body.nickname + "%",
        },
      },
      include: [
        {
          model: db.Image,
          attributes: ["src"],
        },
      ],
      attributes: ["nickname"],
    });
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.patch("/edit", isLoggedIn, async (req, res, next) => {
  try {
    let emailCheck;
    let nicknameCheck;
    if (req.user.email !== req.body.email) {
      emailCheck = await db.User.findOne({
        where: {
          email: req.body.email,
        },
      });
    } else if (req.user.nickname !== req.body.nickname) {
      nicknameCheck = await db.User.findOne({
        where: {
          nickname: req.body.nickname,
        },
      });
    }
    if (emailCheck) {
      return res.status(403).send("이미 존재하는 이메일입니다!");
    } else if (nicknameCheck) {
      return res.status(403).send("이미 존재하는 닉네임입니다!");
    } else {
      await req.user.update(req.body).then((user) => {
        return res.status(200).json(user.dataValues);
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.patch("/password", isLoggedIn, async (req, res, next) => {
  try {
    const newPassword = await bcrypt.hash(req.body.newPassword, 12);
    const user = await db.User.findOne({
      where: { id: req.user.id },
      attributes: ["password"],
    });
    const result = await bcrypt.compare(req.body.prePassword, user.password);
    if (result) {
      await db.User.update(
        {
          password: newPassword,
        },
        {
          where: { id: req.user.id },
        }
      );
      return res.status(200).send("성공!");
    } else {
      return res.status(403).send("이전 비밀번호를 확인해주세요!");
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
