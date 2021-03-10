const { checkUserInput } = require(__dirname + "/../services/userService");
const { getUser, updateUser } = require(__dirname + "/../models/userModel");
const bcrypt = require("bcrypt");
const { createImage } = require("../helper/indexHelper");
const { validateImage } = require("../helper/validatorHelper");
const fs = require("fs");

const getMyProfile = async function (req, res, next) {
  try {
    const user = await getUser({ userID: req.user }, ["userFrom", "userName", "email", "firstName", "lastName", "image"]);
    return res.send({
      type: "success",
      status: 200,
      body: user,
    });
  } catch (err) {
    next(err);
  }
};
const getProfile = async function (req, res, next) {
  try {
    const error = checkUserInput(req.params, ["userName"]);
    if (error)
      return res.send({
        type: "error",
        status: 400,
        body: error,
      });
    const user = await getUser({ userName: req.params.userName }, ["userFrom", "userName", "firstName", "lastName", "image"]);
    if (user)
      return res.send({
        type: "success",
        status: 200,
        body: user,
      });
    return res.send({
      type: "warning",
      status: 400,
      body: { Eng: "Profile not found", Fr: "Profil non trouvé" },
    });
  } catch (err) {
    next(err);
  }
};
const editProfile = async function (req, res, next) {
  try {
    const error = checkUserInput(req.body, ["userName", "email", "firstName", "lastName", "userFrom"]);
    if (error)
      return res.send({
        type: "error",
        status: 400,
        body: error,
      });
    const user = await getUser({ userID: req.user }, ["userName", "email", "firstName", "lastName"]);
    const listNeedUpdate = {};
    for (const key in req.body) if (req.body[key] !== user[key]) listNeedUpdate[key] = req.body[key];
    if (Object.keys(listNeedUpdate).length > 0) {
      const resultUpdate = await updateUser(req.user, listNeedUpdate);
      if (resultUpdate)
        return res.send({
          type: "success",
          status: 200,
          body: { Eng: "Updated successful", Fr: "Mise à jour réussie" },
        });
    }
    return res.send({
      type: "warning",
      status: 403,
      body: { Eng: "Updated failed", Fr: "Mise à jour a échoué" },
    });
  } catch (err) {
    next(err);
  }
};
const editPassword = async function (req, res, next) {
  try {
    const errorNewPassword = checkUserInput({ password: req.body.newPassword }, ["password"]);
    const errorOldPassword = checkUserInput({ password: req.body.oldPassword }, ["password"]);
    if (errorOldPassword || errorNewPassword)
      return res.send({
        type: "error",
        status: 400,
        body: errorNewPassword || errorOldPassword,
      });
    const user = await getUser({ userID: req.user }, "password");
    const comparePassword = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!comparePassword)
      return res.send({
        type: "error",
        status: 400,
        body: { Eng: "Incorrect password", Fr: "Mot de passe incorrect" },
      });
    const hashNewPassword = await bcrypt.hash(req.body.newPassword, 5);
    const resultUpdate = await updateUser(req.user, { password: hashNewPassword });
    if (resultUpdate)
      return res.send({
        type: "success",
        status: 200,
        body: { Eng: "Updated successful", Fr: "Mise à jour réussie" },
      });
    return res.send({
      type: "warning",
      status: 403,
      body: { Eng: "Updated failed", Fr: "Mise à jour a échoué" },
    });
  } catch (err) {
    next(err);
  }
};
const editImage = async function (req, res, next) {
  try {
    const validImage = await validateImage(req.body.image);
    if (!validImage)
      return res.send({
        type: "error",
        status: 403,
        body: "Incorrect image",
      });
    const imagePath = await createImage(req.body.image);
    const user = await getUser({ userID: req.user }, "image");
    const resultUpdate = await updateUser(req.user, { image: imagePath });
    if (resultUpdate) {
      if (user.image && fs.existsSync(__dirname + "/.." + user.image)) fs.unlink(__dirname + "/.." + user.image, (err) => {});
      return res.send({
        type: "success",
        status: 200,
        body: { Eng: "Updated successful", Fr: "Mise à jour réussie" },
      });
    }
    return res.send({
      type: "warning",
      status: 403,
      body: { Eng: "Updated failed", Fr: "Mise à jour a échoué" },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMyProfile,
  getProfile,
  editProfile,
  editPassword,
  editImage,
};
