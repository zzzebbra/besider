type MultimediaItem = { url: string };

type Headline = { main: string };

export type NewsItem = {
  title: string;
  url: string;
  multimedia: string;
  pub_date: string;
  source: string;
};

export type NYTDoc = {
  _id: string;
  web_url: string;
  headline: Headline;
  pub_date: string;
  source: string;
  multimedia: MultimediaItem[];
};

export type NYTArchiveResponse = {
  status?: string;
  copyright?: string;
  response: { docs: NYTDoc[] };
};
