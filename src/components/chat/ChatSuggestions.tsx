const EXAMPLE_QUESTIONS = [
  "Өнөөдөр ямар бараа байгаа вэ?",
  "Хүргэлт хэдэн төгрөг вэ?",
  "Дансаар яаж төлөх вэ?",
  "Хаанаас очиж авах вэ?",
];

/** First screen of the chat: a greeting and example questions the buyer can tap. */
export function ChatSuggestions({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="max-w-[85%] rounded-2xl rounded-bl-md border border-line px-4 py-2.5 text-ink">
        Сайн байна уу! Бараа, үнэ, хүргэлт, төлбөрийн талаар асуугаарай. Хаасан ч яриа хадгалагдана.
      </p>
      <p className="text-muted-foreground">Жишээ асуулт (дарна уу):</p>
      <div className="flex flex-wrap gap-2">
        {EXAMPLE_QUESTIONS.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => onPick(question)}
            className="min-h-11 rounded-full border border-brand px-4 text-left font-semibold text-brand hover:bg-brand-50"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
