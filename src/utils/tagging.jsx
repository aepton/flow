export async function generateTagsFromText(text) {
    const tagPrompt = `
Generate a raw JSON list of tags that summarize the topics being discussed by the following text and the techniques being
employed by the author: "${text}"
Do not return anything but a one-level deep list of strings, like ["a", "b", "c"] - your entire response should be a valid
JSON list of strings and nothing else.
`
    console.log('got prompt text', tagPrompt);
    return fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "llama3.2:latest",
            prompt: tagPrompt.trim(),
            stream: false,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((jsonData) => {
            console.log('parsing', jsonData.response);
            return JSON.parse(jsonData.response);
        })
        .catch((error) => {
            console.error("Error:", error);
            return [];
        });
}
