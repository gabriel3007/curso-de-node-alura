const db = require('../../config/database');
const BookDao = require('../infra/book-dao');


module.exports = (app) => {
    app.get('/', (req, resp) => {
        resp.send(`<h1>Hello World</h1>`);
    });

    app.get('/books', (req, resp) => {
        const bookDao = new BookDao(db);

        bookDao.listBooks()
                .then(books => resp.marko(
                    require('../views/list/list.marko'),
                    {
                        books
                    }
                ))
                .catch(err => console.log(err));
    });

    app.get('/books/:id', (req, resp) => {
        const bookDao = new BookDao(db);
        const id = req.params.id;
        bookDao.listBook(id)
                .then(book => console.log(book))
                .catch(err => console.log(err));
    });

    app.get('/books/form', (req, resp) => {
        resp.marko(require('../views/form/form.marko'));
    });


    app.post('/books', (req, resp) => {
        const bookDao = new BookDao(db);

        bookDao.add(req.body)
                .then(resp.redirect('/books'))
                .catch(err => console.log(err))
    });

    app.delete('/books/:id', (req, resp) => {
        const bookDao = new BookDao(db);
        const id = req.params.id
        bookDao.remove(id)
                .then(() => resp.status(200).end())
                .catch(err => console.log(err))
    });
}