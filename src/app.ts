import configs from "./configs";
import Koa, { Context } from "koa";
import KoaRouter, { url } from "koa-router";
import path from "path";
import KoaBody from "koa-body";
import { Sequelize } from "sequelize-typescript";
/**
 * 关于路由处理，可以选择基于koa的koa-router进行集中式管理，也可以采用ts装饰器中的koa-ts-controllers
 * 该装饰器可以直接在指定类的某个方法中对其路由进行绑定，通过它提供的功能，可以更方便就能实现RESTful规范的接口
 * bootstrapControllers： 注册路由
 * 
 */
import { bootstrapControllers, Ctx } from "koa-ts-controllers";


//注册路由，接受两个参数 app params配置选项
// 示例：http://localhost:8080/api/v1/test/hello
(async () => {

    const router = new KoaRouter();
    const db = new Sequelize({
        ...configs.database,
        models: [__dirname + '/database/models/**/*']
    })

    const app = new Koa();
    app.use(KoaBody({
        multipart: true
    }))
    // 会将router回调函数进行类管理，通过类来实现接口
    // koa-ts-controllers并不具备koa-router的功能，只是用于将ts装饰器对koa接口进行管理和装饰
    await bootstrapControllers(app, {
        router, // 路由器
        basePath: "/api", //  /api
        versions: [1], // /v1
        controllers: [
            path.resolve(__dirname, "controllers/**/*.ts") //加载的文件夹中的所有ts文件
        ],
        // 捕获错误，并输出到前端
        //  ctx: Context属于Koa的Context
        errorHandler: async (err: any, ctx: Context) => {
            // 响应服务器错误
            let status = 500;
            let body: any = {
                "statusCode": status,
                "error": "Internal Server error",
                "message": "An internal server error occurred"
            };
            // 响应验证错误
            if (err.output) {
                status = err.output.statusCode;
                body = {
                    ...err.output.payload
                }
                if (err.data) {
                    body.errorData = err.data;
                }
            }
            ctx.status = status;
            ctx.body = body;
        }
    })
    app.use(router.routes());

    app.listen(configs.server.port, configs.server.host, () => {
        console.log("服务已开启", `http://${configs.server.host}:${configs.server.port}`)
    }
    )

})();

// function echo<T, U>(tuple: [T, U]) {
//     return [tuple[1], tuple[0]];
// }
// const res1 = echo<string, number>(["123", 123])

// function LIX<T>(val: T) {
//     return val;
// }
// const res2 = LIX<string>("zhangfei")

// function echoWithArr<T>(arg: T[]): T[] {
//     console.log(arg.length)
//     return arg
// }
// const arrs = echoWithArr<number | string>([1, 2, 3, "123"])
// interface IWithLength {
//     length: number
// }
// function echoWithLength<T extends IWithLength>(arg: T): T {
//     console.log(arg.length)
//     return arg
// }

// const str = echoWithLength('str')
// const str1 = echoWithLength({ length: 10, width: "12" });
// const str2 = echoWithLength([1, 2, 3, 4, 5])

// class Queue<T> {
//     private data = [];
//     push(item: T){
//         return this.data.push(item)
//     }
//     pop(): T {
//         return this.data.shift()
//     }
// }
// const queue = new Queue<number>()
// queue.push(1)
// console.log(queue.pop().toFixed())

// interface keyPair<T, U> {
//     key: T,
//     val: U
// };
// let kp1: keyPair<number, string> = {
//     key: 10,
//     val: "123"
// };
// let kp2: keyPair<string, number> = {
//     key: "1",
//     val: 123
// }

// interface Iname {
//     name: string
// };
// interface Icode {
//     age: number
// };
// type Iwar = Iname & Icode;
// const Im: Iwar = {
//     name: "123",
//     age: 123
// }



/**
 * 如何启动服务器，将TS文件编译的同时也能进行热重载
 * 插件：ts-node-dev + typescript
 *
 */
