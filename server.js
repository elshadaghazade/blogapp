const express = require('express');
const handlebars = require('express-handlebars');
const striptags = require('striptags');
const {Article, Comment} = require('./models');


const app = express();


app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers: {
        teqleritemizle: function(options) {
            return striptags(options.fn(this));
        },
        shortcontent: function(options) {
            return options.fn(this).substr(0, 1000) + '...';
        }
    }
}));
app.set('view engine', 'handlebars');


app.get('/', async (req, res) => {
    let data = null;
    let error = null;

    try {
        data = await Article.findAll({
            limit: 50,
            order: [['publishDate', 'desc']],
            raw: true
        });
    } catch (err) {
        error = err.toString();
    }
    
    res.render('home', {
        data, error
    });
});


app.get('/create', async (req, res) => {
    res.render('create');
});

app.post('/create', async (req, res) => {
    const { title, slug, content, publishdate, publishtime } = req.body;
    
    try {
        await Article.create({
            title,
            slug,
            content,
            publishdate,
            publishtime
        });
    } catch(err) {
        return res.render('create', {
            errorText: "Formanı tam doldurmamısınız",
            title, slug, content, publishdate, publishtime
        });
    }

    res.redirect('/');
});


app.listen(5000, () => {
    console.log("Server started");
})