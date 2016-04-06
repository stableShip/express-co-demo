var config = {};

// 数据库配置
config.db = {
    HOST: 'localhost',
    PORT: '27017',
    DATABASE: 'test',
    USERNAME: 'root',
    PASSWORD: '123456',
    OPTIONS: ""
};

// redis地址
config.redis = {
    host: '',
    //port : 6379,
    //password :'',
    database: 0
};

module.exports = config;


module.exports.db.dbUri = (function () {
    var MDB = config.db;
    var pass = '';
    var host = '';
    var port = '';
    var database = '';
    var options = '';

    if (MDB.USERNAME != '' && MDB.PASSWORD != '') {
        pass = MDB.USERNAME + ':' + MDB.PASSWORD + "@";
    }

    if (MDB.HOST != "") {
        host = MDB.HOST;
    }

    if (MDB.PORT != '') {
        port = ":" + MDB.PORT;
    }

    if (MDB.DATABASE != "") {
        database = "/" + MDB.DATABASE;
    }

    if (MDB.OPTIONS != "") {
        options = "?" + MDB.options
    }

    return "mongodb://" + pass + host + port + database + options;
}());