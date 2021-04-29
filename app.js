function WhatsOnYourMind({ addTweet }) {
  function handleChange(event) {
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
      {tweets.map(({ id, message, likes }) => (
        <li key={id}>
          <Tweet message={message} likes={likes} />
        </li>
      ))}
    </ul>
  )
}

function App() {
  const [tweets, setTweets] = React.useState([])

  function addTweet(message) {
    const latestTweetId = tweets.length > 0 ? tweets[0].id : 0
    const newTweet = { id: latestTweetId + 1, message, likes: 0 }
    setTweets([newTweet, ...tweets])
  }

  return (
    <div>
      <WhatsOnYourMind addTweet={addTweet} />
      <Timeline tweets={tweets} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
