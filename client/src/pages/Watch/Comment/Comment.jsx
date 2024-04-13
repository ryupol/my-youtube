import "./Comment.scss";

function Comment() {
  return (
    <div className="comment">
      <h1 className="count">1,225 Comments</h1>
      <div className="my-box">
        <div className="profile">
          <img src="https://via.placeholder.com/40x40" alt="" />
        </div>
        <form className="my-comment-box">
          <textarea className="my-comment-input" rows="1" placeholder="Add a comment..." />
          <button className="cancel-btn">Cancel</button>
          <button className="submit-btn">Submit</button>
        </form>
      </div>
      <div className="other-box">
        <div className="profile">
          <img src="https://via.placeholder.com/40x40" alt="" />
        </div>
        <div className="other-info">
          <p className="username">
            @nolate1903 <span className="date">2 months ago</span>
          </p>
          <p className="other-comment">
            โห พี่เอ้กเย็นชามาก คนหมดใจรั้งให้ตายก็ไปอยู่ดี น้ำเสียงนิ่งสุดๆ จึ้กมากกกกกกกก อินอ่ะ
            จากที่เคยเห็นพี่เอกจีบอลิซมาตลอด มันแบบ ฟีลแฟนเก่ามากตอนนี้555566
          </p>
        </div>
      </div>
      <div className="other-box">
        <div className="profile">
          <img src="https://via.placeholder.com/40x40" alt="" />
        </div>
        <div className="other-info">
          <p className="username">
            @nolate1903 <span className="date">2 months ago</span>
          </p>
          <p className="other-comment">
            โห พี่เอ้กเย็นชามาก คนหมดใจรั้งให้ตายก็ไปอยู่ดี น้ำเสียงนิ่งสุดๆ จึ้กมากกกกกกกก อินอ่ะ
            จากที่เคยเห็นพี่เอกจีบอลิซมาตลอด มันแบบ ฟีลแฟนเก่ามากตอนนี้555566
          </p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
