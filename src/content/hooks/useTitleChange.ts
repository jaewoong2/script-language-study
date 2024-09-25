// src/hooks/useTitleChange.ts
import { useEffect } from "react";

/**
 * <title> 요소의 변경을 감지하는 커스텀 Hook
 * @param onChange - <title>이 변경될 때 실행할 콜백 함수
 */
const useTitleChange = (onChange: (newTitle: string) => void) => {
  useEffect(() => {
    const titleElement =
      document.querySelector<HTMLTitleElement>("head > title");

    if (!titleElement) {
      console.warn("<title> 요소를 찾을 수 없습니다.");
      return;
    }

    let previousTitle = titleElement.textContent || "";

    // MutationObserver 콜백 함수
    const observerCallback: MutationCallback = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          const currentTitle = titleElement.textContent || "";
          if (currentTitle !== previousTitle) {
            previousTitle = currentTitle;
            onChange(currentTitle);
          }
        }
      }
    };

    // MutationObserver 설정
    const observer = new MutationObserver(observerCallback);
    observer.observe(titleElement, { childList: true });

    // 클린업: 컴포넌트 언마운트 시 MutationObserver 해제
    return () => {
      observer.disconnect();
    };
  }, [onChange]);
};

export default useTitleChange;
