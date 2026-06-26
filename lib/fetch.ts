export async function parseJSONResponse(response: Response) {
  try {
    const text = await response.text();
    if (!text) return null;
    return JSON.parse(text);
  } catch (err) {
    return null;
  }
}
