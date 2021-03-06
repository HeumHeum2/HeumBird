module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.TEXT
      },
      publictarget: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci"
    }
  );
  Post.associate = db => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Image);
    db.Post.hasMany(db.Comment);
    db.Post.belongsTo(db.Post, { as: "Share" });
    db.Post.belongsToMany(db.Hashtag, {
      through: db.PostHashtag,
      foreignKey: "PostId"
    });
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
  };

  return Post;
};
