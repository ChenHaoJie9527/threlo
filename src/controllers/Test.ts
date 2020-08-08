import { Controller, Get } from 'koa-ts-controllers';


// 通过类来实现路由的的接口 http://localhost:8080/api/v1/test/hello
@Controller("/test")
class TestController {
    // @Get是TS提供的控制器接口
    @Get("/hello")
    // 该接口提供的方法 hello
    async hello() {
        return {
            status: 200,
            message: "查询成功"
        }
    }
}