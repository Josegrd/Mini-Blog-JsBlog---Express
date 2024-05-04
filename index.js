import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = []

app.get("/", (req, res) => {
    res.render("home.ejs");
})

app.get("/about", (req, res) => {
    res.render("about.ejs");
})

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
})

app.get("/blog", (req, res) => {
    res.render("index.ejs", { posts: posts });
})

app.get("/write", (req, res) => {
    res.render("write.ejs");
})

app.get('/edit/:index', (req, res) => {
    const index = req.params.index
    const post = posts[index]
    res.render('edit.ejs', { post, index })
})

app.get('/post/:index', (req, res) => {
    const index = req.params.index;
    const post = posts[index];
    res.render('post.ejs', { post });
});

app.post('/edit/:index', (req, res) => {
    const index = req.params.index
    const { title, content } = req.body
    posts[index] = { title, content }
    res.redirect("/blog")
})

app.post("/write", (req, res) => {
    const { title, content } = req.body
    posts.push({ title, content })
    res.redirect("/write")
})

app.post('/delete/:index', (req, res) => {
    const index = req.params.index
    posts.splice(index, 1)
    res.redirect("/blog")
})




app.listen(port, () => {
    console.log(`Listening in port ${port}`);
})