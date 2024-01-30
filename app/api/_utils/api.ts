const createURL = (path: string) => {
  return window.location.origin + path;
};

export const createNewEntry = async () => {
  const response = await fetch(createURL("/api/journal"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const json = await response.json();
    return json.data;
  }
};

export const updateEntry = async (id: string, content: string) => {
  const response = await fetch(createURL(`/api/journal/${id}`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
    }),
  });

  if (response.ok) {
    const json = await response.json();
    return json.data;
  }
};
