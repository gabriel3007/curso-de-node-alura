class BookDao{
    
    constructor(db){
        this._db = db;
    }
    
    listBooks() {
        return new Promise((resolve, reject) => {  
            this._db.all(
                'SELECT * FROM livros',
                (err, results) => {
                    if (err) return reject("Não foi possível listar os livros");
                    return resolve(results);
                }
                );
        });
    }

    listBook(id) {
        return new Promise((resolve, reject) => {
            this._db.all(
                `SELECT * FROM livros WHERE id = ?`,
                [id],
                (err, result) => {
                    if (err) return reject("Não foi possível encontrar o livro");
                    return resolve(result);
                }
            )
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `DELETE * FROM livros WHERE id = ?`,
                [id],
                (err) => {
                    if(err) {
                        console.log(err);
                        return reject("Não foi possível deletar o livro")
                    }
                    return resolve();
                }
            );
        });
    }

    add(book) {
        return new Promise((resolve, reject) => {
            this._db.run(`
            INSERT INTO LIVROS (
                    titulo,
                    preco,
                    descricao
                ) values (?, ?, ?)
            `,
            [
                book.titulo,
                book.preco,
                book.descricao
            ],
            (err) => {
                if(err) {
                    console.log(err);
                    return reject("Não foi possível adicionar o livro");
                }
                resolve();
            }
            );
        });
    };

    update(book) {
        return new Promise((resolve, reject) => {
            this._db.run(`
            UPDATE livros SET
            titulo = ?,
            preco = ?,
            descricao = ?
            WHERE id = ?
            `,
            [
                book.titulo,
                book.preco,
                book.descricao,
                book.id
            ],
            (err) => {
                if(err){
                    console.log(err);
                    return reject("Não foi possível atualizar os dados do livro");
                }
                return resolve();
            }
            );
        });
    }
}

module.exports = BookDao;