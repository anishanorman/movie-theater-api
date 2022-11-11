const { Show } = require('./Show')
const { User } = require('./User')

Show.belongsToMany(User, { through: "userShows" })
User.belongsToMany(Show, { through: "userShows" })


module.exports = {Show, User}
