import express from "express";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];


app.post("/sign-up", (req, res) => {
    const newUser = req.body;
    const { username, avatar } = newUser;
    users.push({
        username: username,
        avatar: avatar
    });
    res.send("OK");
})

app.post("/tweets", (req, res) => {
    const newTweet = req.body;
    processTweets(newTweet)
    res.send("OK");
})

app.get("/tweets", (req, res) => {
    const lastTenTweets = tweets.filter((tweet, index) => {
        if (index > (tweets.length - 1) - 10) return tweet;
    })
    res.send(lastTenTweets.reverse());
});



app.listen(5000, () => {
    console.log("Server is running...");
})



function processTweets(tweet) {
    const userFound = users.find((user) => {
        const { username, avatar } = user;
        if (username === tweet.username) return avatar;
    });

    const newTweet = { ...userFound, tweet: tweet.tweet };
    tweets.push(newTweet);
}