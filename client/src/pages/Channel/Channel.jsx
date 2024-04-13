import "./Channel.scss";

function Channel() {
  return (
    <div className="channel">
      <div className="banner">
        <img
          src="https://yt3.googleusercontent.com/4hsLXfPp78kGbpbrGBu9fojBGZrgqPhfrO1LgIRIugQAa3zyjb5nYJZtAPDqzhJbuPpPAXzUQQ=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
          alt="Banner Image"
        />
      </div>
      <header className="user-header">
        <div className="profile">
          <img src="http://localhost:3000/images/defaultProfile.png" alt="Profile" />
        </div>
        <div className="info">
          <div className="text-box">
            <h1 className="name">HEARTROCKER</h1>
            <p className="user-info">@HEARTROCK ‧ 8.8M subscribers ‧ 1 video</p>
            <p className="description">Descriptions</p>
          </div>
          <div className="button-box">
            <button className="unsub">Subscribe</button>
            <button className="sub">Subscribed</button>
          </div>
        </div>
      </header>
      <hr />
      <section className="container">
        <a href="/channel" className="card">
          <div className="thumbnail">
            <img
              src="	https://i.ytimg.com/vi/Ww73SFXYwEs/hqdefault.jpg?s…AFwAcABBg==&rs=AOn4CLCNWMuF2K2_JvoWdIWneih0z1loUA"
              alt="Video Thumbnail"
            />
          </div>
          <p className="title">
            มาเล่นกัน Detriot Become Human กันเถอะ เย่ เย่ อิอิอิอิ Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Rem mollitia nesciunt ut non molestiae dolor sunt perferendis similique temporibus quas, nisi cumque
            dolorum voluptas esse animi laborum qui et cupiditate.
          </p>
          <p className="view">การดู 1 ครั้ง • 2 days ago</p>
        </a>
      </section>
    </div>
  );
}

export default Channel;
