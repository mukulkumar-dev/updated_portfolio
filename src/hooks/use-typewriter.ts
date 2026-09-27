import { useEffect, useState } from "react";

interface UseTypewriterOptions {
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export function useTypewriter(
  words: string[],
  { typingSpeed = 80, deletingSpeed = 40, pauseTime = 1600 }: UseTypewriterOptions = {},
) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    if (!isDeleting && text === currentWord) {
      const timeout = window.setTimeout(() => setIsDeleting(true), pauseTime);
      return () => window.clearTimeout(timeout);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    const timeout = window.setTimeout(
      () => {
        setText((prev) =>
          isDeleting ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1),
        );
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => window.clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}
