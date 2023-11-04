import {productRoutes} from "./product";
import {categoryRoutes} from "./category";
import {usersRoutes} from "@/routes/users";
import {homePageRoutes} from "@/routes/home-page";
import {blogRoutes} from "@/routes/blog";

export default {
  ...productRoutes,
  ...categoryRoutes,
  ...usersRoutes,
  ...homePageRoutes,
  ...blogRoutes,
}