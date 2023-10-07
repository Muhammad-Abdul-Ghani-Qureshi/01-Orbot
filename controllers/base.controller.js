
const db = require('../data/database')
async function getHome(req, res) {
     const posts = await db.getDb().collection('posts').find({} , {title:1,summary:1}).toArray()
  res.render("authors/index" , {posts:posts});
}



module.exports = {
  getHome: getHome,

};
