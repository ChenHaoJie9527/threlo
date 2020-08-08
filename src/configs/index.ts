import { type } from "os";
import { types } from "util";

/**
 * 定义配置对象
 */
const configs = {
    development: {
        server: {
            host: "localhost",
            port: 8080
        }
    },
    tset: {
        server: {
            host: "localhost",
            port: 8080
        }
    },
    production: {
        server: {
            host: "localhost",
            port: 8080
        }
    }
}

//限制字符串类型 必须是对象configs的键名字符串之一;
type configKeys = keyof typeof configs;

//process 读取当前运行环境 是一个node对象 evn定义一个相关的环境变量信息，可以用来区分测试环境 开发环境 运行环境
const NODE_ENV = process.env.NODE_ENV as configKeys || "development";


export default configs[NODE_ENV];

