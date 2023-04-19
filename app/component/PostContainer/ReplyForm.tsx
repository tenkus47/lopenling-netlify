import { useFetcher, useLoaderData } from "@remix-run/react";
import { useRef, useEffect, useState } from "react";

type ReplyFormPropsType = {
  closeReply: () => void;
  topicId: number;
  updateReplyCount: () => void;
};

export default function ReplyForm({
  closeReply,
  topicId,
  updateReplyCount,
}: ReplyFormPropsType) {
  const postFetcher = useFetcher();
  const textareaRef = useRef(null);
  const loaderData = useLoaderData();
  const [textArea, setTextArea] = useState("");
  useEffect(() => {
    if (postFetcher.type === "done") {
      updateReplyCount();
      closeReply();
    }
  }, [postFetcher.submission, loaderData.posts, topicId]);
  if (postFetcher.submission) {
    if (textareaRef.current) textareaRef.current.value = "";
  }
  return (
    <div className="flex justify-between mt-3">
      <div
        style={{
          borderLeft: "4px solid #e5e7eb",
          height: 180,
        }}
      ></div>
      <postFetcher.Form
        action="/api/reply"
        method="post"
        className="flex w-11/12 flex-col justify-center"
        style={{
          opacity: postFetcher.state !== "idle" ? 0.5 : 1,
          cursor: postFetcher.state !== "idle" ? "not-allowed" : "auto",
        }}
      >
        <input hidden defaultValue={topicId} name="topicId" />
        <textarea
          name="postString"
          required={true}
          placeholder="Write your reply here ..."
          className="flex-1"
          style={{ maxHeight: 108 }}
          autoFocus
          id="textArea"
          ref={(ref) => (textareaRef.current = ref)}
          value={textArea}
          onChange={(e) => setTextArea(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={closeReply}
            className="bg-gray-300 text-black px-3 py-2 text-xs font-medium text-center  rounded-lg  focus:ring-4 focus:outline-none "
            type="reset"
          >
            cancel
          </button>
          <button
            className="bg-green-400 text-white  px-3 py-2 text-xs font-medium text-center  rounded-lg  focus:ring-4 focus:outline-none "
            type="submit"
            disabled={textArea === "" || postFetcher.state !== "idle"}
          >
            {postFetcher.state === "submitting" ? (
              <div>submiting</div>
            ) : postFetcher.state === "loading" ? (
              <div>post created</div>
            ) : (
              <div>respond</div>
            )}
          </button>
        </div>
      </postFetcher.Form>
    </div>
  );
}