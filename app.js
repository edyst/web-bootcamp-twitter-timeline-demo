function WhatsOnYourMind({ addTweet }) {
  const handleChange = (event) => {
    if (event.key === "Enter" && event.target.value) {
      addTweet(event.target.value)
      event.target.value = ""
    }
  }
  return (
    <div className="whatsonyourmind">
      <input
        type="textarea"
        placeholder="What's on your mind..."
        onKeyDown={handleChange}
      />
    </div>
  )
}

function LikeButton({ likes = 0 }) {
  const [liked, setLiked] = React.useState(false)

  const handleClick = () => setLiked(!liked)

  return (
    <div className="like-btn">
      <span
        className={liked ? "fa fa-heart text-red" : "far fa-heart"}
        onClick={handleClick}
      />
      <span>{liked ? likes + 1 : likes}</span>
    </div>
  )
}

const TweetMessage = ({ message }) => <p>{message}</p>

const TweetButtons = ({ likes }) => (
  <div className="tweet-buttons">
    <LikeButton likes={likes} />
  </div>
)

function Tweet({ message, likes }) {
  return (
    <article className="tweet">
      <TweetMessage message={message} />
      <TweetButtons likes={likes} />
    </article>
  )
}

function Timeline({ tweets }) {
  return (
    <ul className="timeline">
      {tweets.map(({ message, likes }) => (
        <li>
          <Tweet message={message} likes={likes} />
        </li>
      ))}
    </ul>
  )
}

function App() {
  const [tweets, setTweets] = React.useState([
    { message: "hello world", likes: 10 },
    { message: "Lorem ipsum dolor.", likes: 25 },
  ])

  const addTweet = (message) => {
    const newTweet = { message, likes: 0 }
    const updatedTweets = []
    updatedTweets.push(newTweet)
    tweets.forEach((tweet) => updatedTweets.push(tweet))
    setTweets(updatedTweets)
  }

  return (
    <div>
      <WhatsOnYourMind addTweet={addTweet} />
      <Timeline tweets={tweets} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
