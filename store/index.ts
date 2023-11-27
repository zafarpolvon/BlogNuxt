export async function fetchPosts(params: object) {
  const url = `https://jsonplaceholder.typicode.com/posts?${new URLSearchParams(params).toString()}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}
export async function fetchPostId(id: number) {
  const url = `https://jsonplaceholder.typicode.com/comments/${id}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}
export async function fetchComments(params: object) {
  const url = `https://jsonplaceholder.typicode.com/comments?${new URLSearchParams(params).toString()}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}
export async function fetchCommentsByPost(params: object) {
  const url = `https://jsonplaceholder.typicode.com/posts/${params}/comments`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}
