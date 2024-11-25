import Parse from 'parse/node.js';


const signup = async (req, res) => {
    const { username, password, email } = req.body;

    const user = new Parse.User({
        username: username,
        password: password,
        email: email
    });

    try {
        const newUser = await user.signUp();
        const sessionToken = newUser.getSessionToken;
        res.status(201).json({ sessionToken: sessionToken, message: 'User signed up successfully' });
        console.log(sessionToken)
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Parse.User.logIn(username, password);
        const sessionToken = user.getSessionToken();
        res.status(200).json({
            message: 'User logged in successfully',
            sessionToken: sessionToken,

        });
        console.log(sessionToken);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export { login, signup };  
