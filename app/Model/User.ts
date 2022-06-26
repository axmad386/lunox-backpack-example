import { Model, Traitable, Authenticatable } from "lunox";
import type { Authenticatable as Auth } from "lunox/dist/Contracts/Auth/Authenticatable";
import CrudTrait from "./Traits/CrudTrait";
import bcrypt from "bcryptjs";

interface User extends Auth {}
class User extends Traitable(Model).use(Authenticatable, CrudTrait) {
  // this will make typescript happy
  static factory: () => any;
  username!: string;
  email!: string;
  password!: string;
  first_name!: string;
  last_name!: string;
  phone!: string;
  active!: boolean;

  public static fillable = [
    "username",
    "email",
    "password",
    "first_name",
    "last_name",
    "phone",
  ];

  protected static table = "users";

  protected static append = ["full_name"];
  // protected static primaryKey = "id";
  // protected static timestamps = true;

  public setPasswordAttribute(value: string) {
    if (!value) return;
    this.attributes["password"] = bcrypt.hashSync(
      value,
      bcrypt.genSaltSync(10)
    );
  }

  public getFullNameAttribute() {
    return this.first_name + " " + this.last_name;
  }
}
export default User;
