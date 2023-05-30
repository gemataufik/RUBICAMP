import {db} from './connect.js'

export default class User {
    
    
    static username(username,next){
        db.all('SELECT * FROM user WHERE username = ?', [username], (err, rows) => {
            if (err) return console.log('Pencarian username gagal')
            next(rows)
        })
    }

    

}