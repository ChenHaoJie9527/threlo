
import { IsNotEmpty, Length, ValidateIf } from 'class-validator';
import { IsSameValue } from "../custom/IsSameValue";
export class RegisterBody {
    @Length(1, 50, {
        message: '用户名不能为空或者大于50个字符长度'
    })
    name: string;

    @IsNotEmpty({
        message: '密码不能为空'
    })
    password: string;

    // @ValidateIf(o => o.password)
    @IsSameValue("password",{
        message: "两次密码不一致，请重新输入!"
    })
    rePassword: string;
}