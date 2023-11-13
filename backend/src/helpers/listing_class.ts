export interface i_data {
  img_url: string;
  title: string;
  description: string;
}

export class c_listings {
  img_urls: string[] = [];
  titles: string[] = [];
  descriptions: string[] = [];

  get get_img_urls(): string[] {
    return this.img_urls;
  }
  get get_titles(): string[] {
    return this.titles;
  }
  get get_descriptions(): string[] {
    return this.descriptions;
  }

  set add_img_url(img_url: string) {
    this.img_urls.push(img_url);
  }
  set add_title(title: string) {
    this.titles.push(title);
  }
  set add_description(description: string) {
    this.descriptions.push(description);
  }
}