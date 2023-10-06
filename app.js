const express = require("express");

const { join } = require("path");

const indexRoutes = require("./routes/index.routes");

const app = express();

app.set("use engine" , join(__dirname , "views"));
app.set('use engine' , 'ejs')
app.use(indexRoutes);
app.listen(3000);
