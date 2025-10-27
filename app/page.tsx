"use client";
import { useEffect, useState } from "react";
import { useHistory } from "./api/chats/HistoryContext";
export default function Home() {
  const templates = ["linkedin", "e-mail", "product advertisement"];
  const [prompt, setPrompt] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const { addHistory, selectedItem, setSelectedItem } = useHistory();
  useEffect(() => {
    if (selectedItem) {
      setPrompt(selectedItem.prompt);
      setSelectedTemplate(selectedItem.title);
      setGeneratedContent(selectedItem.content);
    } else {
      setPrompt("");
      setSelectedTemplate("");
      setGeneratedContent("");
    }
  }, [selectedItem]);
  const handleSubmit = async () => {
    setIsLoading(true);
    setGeneratedContent("");
    if (selectedItem) {
      setSelectedItem(null);
    }
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, selectedTemplate }),
      });
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      setGeneratedContent(data.content);
      addHistory({
        title: data.title,
        prompt,
        content: data.content,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    if (selectedItem) {
      setSelectedItem(null);
    }
  };
  return (
    <>
      <div className="max-w-2xl h-auto p-8 w-full mx-auto rounded-lg shadow-xl flex flex-col gap-6">
        <div className="flex gap-2">
          {templates.map((template) => (
            <button
              key={template}
              className={` rounded-full px-3 py-1 cursor-pointer ${
                selectedTemplate === template
                  ? "bg-[linear-gradient(to_right,#ffa600,#ff6361,#003f5c)] text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              } `}
              onClick={() =>
                setSelectedTemplate(
                  selectedTemplate === template ? "" : template
                )
              }
            >
              {template}
            </button>
          ))}
        </div>
        <div>
          <label htmlFor="text">Your Prompt:</label>
          <textarea
            name="text"
            id="text"
            className="w-full rounded-md border-gray-300 min-h-[150px] border-2 p-2"
            placeholder="enter your request and don't bother yourself if it is messy just provide information as much as you can..."
            value={prompt}
            onChange={handlePromptChange}
          ></textarea>
        </div>
        <button
          className="bg-[linear-gradient(to_right,#ffa600,#ff6361,#003f5c)]  text-white rounded-md p-2 cursor-pointer"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Submit"}
        </button>
        {generatedContent && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50">
            <h3 className="font-semibold mb-2"> Generated Content:</h3>
            <p className="text-gray-700 whitespace-pre-wrap">
              {generatedContent}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
