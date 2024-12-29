import './App.css';
import init from './content';

import.meta.env.DEV ? init() : null;

function App() {
  return (
    <>
      <div
        className="wrapper tw-z-[1000]"
        style={{ maxWidth: '600px' }}
      >
        <nav className="nav">
          <h1>Video Script Study</h1>
        </nav>
        <main className="main">
          <div className="image-wrapper">
            <img
              src="/icons/jeans.png"
              alt="이미지"
              className="avatar"
              style={{ maxWidth: '400px' }}
            />
          </div>
          <div className="description">
            유튜브 비디오의 자막을 통해 단어와 문장을
            학습해요 !
          </div>
          <div>돈이 될때까지 무료 🚀</div>
        </main>
      </div>
    </>
  );
}

export default App;
