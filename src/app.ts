import configs from "./configs";
import Koa from "koa";
import { config } from "process";
import KoaRouter from "koa-router";
import path from "path";
/**
 * 关于路由处理，可以选择基于koa的koa-router进行集中式管理，也可以采用ts装饰器中的koa-ts-controllers
 * 该装饰器可以直接在指定类的某个方法中对其路由进行绑定，通过它提供的功能，可以更方便就能实现RESTful规范的接口
 * bootstrapControllers： 注册路由
 * 
 */
import { bootstrapControllers } from "koa-ts-controllers";


//注册路由，接受两个参数 app params配置选项
// 示例：http://localhost:8080/api/v1/test/hello
(async () => {

    const router = new KoaRouter();

    const app = new Koa();
    // 会将router回调函数进行类管理，通过类来实现接口
    await bootstrapControllers(app, {
        router, // 路由器
        basePath: "/api", //  /api
        versions: [1], // /v1
        controllers: [
            path.resolve(__dirname, "controllers/**/*.ts") //加载的文件夹中的所有ts文件
        ]
    })

    app.use(router.routes());

    app.listen(configs.server.port, configs.server.host, () => {
        console.log("服务已开启", `http://${configs.server.host}:${configs.server.port}`)
    }
    )

})();


/**
 * 如何启动服务器，将TS文件编译的同时也能进行热重载
 * 插件：ts-node-dev + typescript
 *
 */
