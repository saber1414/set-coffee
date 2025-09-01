import axios from "axios";

export const getFetchComments = async () => {
  const res = await axios.get("/api/comments", { withCredentials: true });
  return res.data?.comments;
};

export const getFetchRejectComment = async (id: string) => {
  const res = await axios.patch(
    "/api/comments/reject",
    { commentId: id },
    { withCredentials: true }
  );
  return res.data?.comment;
};

export const getFetchAcceptComment = async (id: string) => {
  const res = await axios.patch(`/api/comments/${id}/approve`, null, {
    withCredentials: true,
  });
  return res.data?.comment;
};

export const getFetchAnswerComment = async (
  id: string,
  body: string,
  author: string
) => {
  try {
    const res = await axios.put(
      "/api/comments/reply",
      {
        commentId: id,
        replyBody: body,
        replyAuthor: author,
      },
      { withCredentials: true }
    );

    return res.data?.comment;
  } catch (error) {
    console.error("خطا در ارسال پاسخ:", error);
    throw new Error("ارسال پاسخ با مشکل مواجه شد");
  }
};

export const getFetchDeleteComment = async (id: string) => {
  try {
    const res = await axios.delete(`/api/comments/${id}`, {
      withCredentials: true,
    });
    return res.data.comment;
  } catch (err) {
    console.error("خطا در حذف دیدگاه:", err);
    throw new Error("حذف دیدگاه با مشکل مواجه شد");
  }
};
