export type TNewsCard = {
  title: string;
  url: string;
  multimedia: string;
  pub_date: string;
  source: string;
};

export type NYTDoc = {
  _id: string;
  web_url: string;
  headline: { main: string };
  pub_date: string;
  source: string;
  multimedia: Array<{ url: string }>;
};

export type NYTArchiveResponse = {
  status?: string;
  copyright?: string;
  response: { docs: NYTDoc[] };
};
