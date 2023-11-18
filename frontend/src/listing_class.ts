export class c_listing {
  private img_url: string = '';
  private title: string = '';
  private description: string = '';

  get get_img_url(): string {
    return this.img_url;
  }
  get get_title(): string {
    return this.title;
  }
  get get_description(): string {
    return this.description;
  }

  set set_img_url(img_url: string) {
    this.img_url = img_url;
  }
  set set_title(title: string) {
    this.title = title;
  }
  set set_description(description: string) {
    this.description = description;
  }
}