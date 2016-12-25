import { GrocerybotYyPage } from './app.po';

describe('grocerybot-yy App', function() {
  let page: GrocerybotYyPage;

  beforeEach(() => {
    page = new GrocerybotYyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
