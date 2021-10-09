const express = require('express');
const handlebars = require('express-handlebars');
const {Article, Comment} = require('./models');


const app = express();


app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.engine('handlebars', handlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


app.get('/', async (req, res) => {
    res.end();
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
            ...req.body,
            errorText: JSON.parse(JSON.stringify(err.errors[0])).message
        });
    }

    res.redirect('/');
});


app.listen(5000, () => {
    console.log("Server started");
})