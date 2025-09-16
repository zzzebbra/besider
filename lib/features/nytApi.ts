import { NYTArchiveResponse, NYTDoc } from "@/types/nyt/types";

export async function fetchArchive({
  year,
  month,
}: {
  year: number;
  month: number;
}): Promise<NYTDoc[]> {
  const res = await fetch(`/api/nytimes?year=${year}&month=${month}`, {
    cache: "no-store",
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`NYT ${res.status}: ${text.slice(0, 400)}`);
  }

  let json: NYTArchiveResponse;
  try {
    json = JSON.parse(text) as NYTArchiveResponse;
  } catch {
    throw new Error(`Unexpected non-JSON from NYT: ${text.slice(0, 200)}`);
  }

  if (!json?.response || !Array.isArray(json.response.docs)) {
    throw new Error("Unexpected NYT response shape: missing response.docs[]");
  }

  return json.response.docs;
}
