const commentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector("#comment-content").value.trim();
  const post_id = window.location.pathname.split("/").pop();

  if (content) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ post_id, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to post comment");
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
