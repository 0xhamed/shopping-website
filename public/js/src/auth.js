import { login } from "./controllers/auth/login.js";
import { register } from "./controllers/auth/register.js";

if (document.querySelector('#login-form')) login()
else register()
