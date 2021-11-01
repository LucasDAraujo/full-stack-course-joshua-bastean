const config = {
    database: {
        username: "admin",
        password: "minhaSenhaMongo*944",
        databaseName:'yelp_games',
        connection: function () {
            return `mongodb+srv://${this.username}:${this.password}@cs-330.vxpgr.mongodb.net/${this.databaseName}?retryWrites=true&w=majority`;
        },
    },
};
//Exports whenever i try to export this package
module.exports = config;
