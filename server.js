const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./routes');
const handlebarsHelpers = require('./helpers/handlebars-helpers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({
    helpers: handlebarsHelpers
});

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes)

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synchronized');
        app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
    }).catch(error => {
        console.error('Error synchronizing the database:', error);
    })
