import Parse from 'parse/node.js';

const authenticate = async (req, res, next) => {
    const sessionToken = req.headers['authorization']?.split(' ')[1];

    if (!sessionToken) {
        return res.status(401).json({ message: 'No session token provided' });
    }
    try {
        const currentUser = await Parse.User.become(sessionToken);
        req.user = currentUser;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid session token' });
    }
};


app.get('/api/protectedRoute', authenticate, (req, res) => {
    res.status(200).json({ message: 'Protected content accessed', user: req.user });
});
