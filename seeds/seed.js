const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require("./user.json");
const postData = require("./post.json");
const commentData = require("./comment.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const post of postData) {
      await Post.create({
        ...post,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }

    await Comment.bulkCreate(commentData,{
        returning:true
    })
  
    process.exit(0);
  };
  
  seedDatabase();

