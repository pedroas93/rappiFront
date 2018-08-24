import { RappiFrontPage } from './app.po';

describe('rappi-front App', () => {
  let page: RappiFrontPage;

  beforeEach(() => {
    page = new RappiFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
