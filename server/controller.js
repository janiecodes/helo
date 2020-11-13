const bcrypt = require('bcrypt');
module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body
        const [foundUser] = await db.check_user(username);
        if(foundUser) {
            return res.status(400).send("Username already exists")
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const [newUser] = await db.register_user([username, hash])
        req.session.user = {
            userId: newUser.user_id,
            username: newUser.username,   
        }
        res.status(200).send(req.session.user)
    },

    login: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body
        const [foundUser] = await db.check_user(username);
        if(!foundUser){
            return res.status(401).send("Incorrect login information")
        }

        const authenticated = bcrypt.compareSync(password, foundUser.password)
        if(authenticated){
            req.session.user = {
                userId: foundUser.user_id,
                username: foundUser.username,
            }
            res.status(200).send(req.session.user)
        }else{
            res.status(401).send("Incorrect login information")
        }
    },

    logoutUser: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },

    getUser: (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        }else{
            res.status(404).send("Please login")
        }
    }
}