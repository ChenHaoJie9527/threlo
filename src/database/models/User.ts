import { Model, AllowNull, AutoIncrement, Column, CreatedAt, DataType, PrimaryKey, Table, Unique, UpdatedAt } from "sequelize-typescript";
const crypto = require("crypto");
//关联表
@Table({
    tableName: "User"
})
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
    @AllowNull(false)
    @Unique
    @Column({
        type: DataType.STRING(50)
    })
    name: string;
    @Column
    set password(val: string) {
        let md5 = crypto.createHash("md5");
        let newPassword = md5.update(`${val}`).digest("hex");
        this.setDataValue("password", newPassword);
    }
    @CreatedAt
    createdAt: string;
    @UpdatedAt
    updatedAt: string;
}