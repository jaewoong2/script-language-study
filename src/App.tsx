import "./App.css";
import init from "./content";

import.meta.env.DEV ? init() : null;

function App() {
  return (
    <>
      <div className="wrapper tw-z-[1000]" style={{ maxWidth: "600px" }}>
        <nav className="nav">
          <h1>Noting</h1>
        </nav>
        <main className="main">
          <div className="image-wrapper">
            <img
              src="/icons/jeans.png"
              alt="이미지"
              className="avatar"
              style={{ maxWidth: "400px" }}
            />
          </div>
          <div className="description">
            인사이트를 저장하고, 항상 무료로 확인할 수 있어요
          </div>
          <div>저장한 답변 보러가기 🚀</div>
        </main>
      </div>
    </>
  );
}

export default App;
