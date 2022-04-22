import express from "express";
import cors from 'cors';

const app = express();
app.use(cors());

const users = [
    {
        username: "bobesponja",
        avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
    }
];
const tweets = [
    {
        username: "bobesponja",
        avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
        tweet: "eu amo o hub"
    }

];


app.post("/sign-up", (req, res) => {
    // users.push({
    //     username: 'bobesponja',
    //     avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
    // });
    res.send("OK")
})

app.post("/tweets", (req, res) => {
    processTweets(
        {
            username: "bobesponja",
            tweet: "eu não odeio o hub"
        })

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