import Home from "../../Pages/Home/Home";
import NotFound from "../NotFound/NotFound";
import Contact from "../../Pages/Manage/Contact/Contact";
import Products from "../../Pages/Products/Products";
import ProducrsDetails from "../../Pages/Products/ProducrsDetails";
import Coursel from "../../Pages/Coursel/Coursel";
import MangeCoursel from "../../Pages/Manage/coursel/MangeCoursel";

import OrderIssues from "../../Pages/Orders/OrderIssues"
import ProductsManage from "../../Pages/Manage/Products/ProductsManage";





const route = [
  { path: "/", element: <Home /> },
  { path: "/products-name", element: <Products /> },
  { path: "/products-details", element: <ProducrsDetails /> },
  { path: "/coursel-get", element: <Coursel /> },

  { path: "/manage/products", element: <ProductsManage /> },
  { path: "/manage/userIssues", element: <OrderIssues /> },
  { path: "/manage/coursel", element: <MangeCoursel /> },





  { path: "/manage/contact", element: <Contact /> },
  { path: "*", element: <NotFound /> },
];

export default route;
