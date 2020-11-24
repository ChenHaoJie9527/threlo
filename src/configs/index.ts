/**
 * 定义配置对象
 */
import DataBase from "./database.json";
interface IDatabaseConfig {
    username: string,
    password: string,
    host: string,
    dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'mariadb',
    timezome: string
}
const configs = {
    development: {
        server: {
            host: "localhost",
            port: 8080,
        },
        database: DataBase.development as IDatabaseConfig
    },
    tset: {
        server: {
            host: "localhost",
            port: 8080,
        },
        database: DataBase.test as IDatabaseConfig
    },
    production: {
        server: {
            host: "localhost",
            port: 8080,
        },
        database: DataBase.production as IDatabaseConfig
    }
}

//限制字符串类型 必须是对象configs的键名字符串之一;
type configKeys = keyof typeof configs;

//process 读取当前运行环境 是一个node对象 evn定义一个相关的环境变量信息，可以用来区分测试环境 开发环境 运行环境
const NODE_ENV = process.env.NODE_ENV as configKeys || "development";


export default configs[NODE_ENV];

