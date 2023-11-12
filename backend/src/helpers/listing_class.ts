export interface i_data {
  img_urls: string[];
  title: string;
  description: string;
}

export class listing {
  img_urls: string[] = [];
  //img_path: string = '';
  title: string = '';
  description: string = '';

  constructor(img_urls, title, description) {
    this.img_urls = img_urls;
    this.title = title;
    this.description = description;
  }

  get get_img_url(): string[] {
    return this.img_urls;
  }
  get get_title(): string {
    return this.title;
  }
  get get_description(): string {
    return this.description;
  }

  set set_data({ img_urls, title, description }: i_data) {
    this.img_urls = img_urls;
    this.title = title;
    this.description = description;
  }
}