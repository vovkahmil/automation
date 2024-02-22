export class Customer {
  constructor(page) {
    this.page = page;
    this.startNewProjectBtn = page.getByRole('button', { name: 'Start a new project' });
    this.nextBtn = page.getByRole('button', { name: 'Next' });
    this.projectCategoryLocator = page.locator('xpath=//p[contains(normalize-space(), \'Original Creative\')]/../../div').first();

    this.projectTitleLocator = page.getByPlaceholder('Give your project a title');
    this.brandProfileLocator = page.getByPlaceholder('Select brand profile');
    this.brandOptionLocator = page.locator('xpath=//ul/div/div[1]');
    this.audienceLocator = page.getByPlaceholder('Let us know - a sentence is fine!');
    this.objectiveLocator = page.getByPlaceholder('What narrative or message are you aiming to convey?');

    this.conceptNameLocator = page.getByPlaceholder('Name your concept');

    this.creativeStyleOption = page.locator('xpath=//p[contains (text(), \'Lifestyle\')]/parent::section/preceding-sibling::div');
    this.productNameLocator = page.getByPlaceholder('Name of the product or range');
    this.productDescriptionLocator = page.getByPlaceholder('Provide guidance on the best ways to use or showcase your product');
    this.uploadAreaLocator = page.locator('xpath=//label[contains (text(), \'Share your inspiration\')]//following::fieldset/label/input');

    this.deleteProjectBtn = page.getByRole('button', { name: 'Delete this project' });
    this.deleteInputLocator = page.getByPlaceholder('Type DELETE to confirm');
    this.deleteBriefBtn = page.getByRole('button', { name: 'Delete brief' });

    this.quantityLocator = page.locator('xpath=//label[contains (text(), \'Quantity\')]/following-sibling::div/input');
    this.placementLocator = page.locator('xpath=//label[contains (text(), \'Placement\')]/following-sibling::div/input');
    this.productOption = page.locator('xpath=//div[contains (text(), \'No product\')]/preceding-sibling::input[@type=\'radio\']/parent::label');
    this.contentSharingOption = page.locator('xpath=//div[contains (text(), \'No, not ever\')]/preceding-sibling::input[@type=\'radio\']/parent::label');
    this.proceedToSummaryBtn = page.getByRole('button', { name: 'Proceed to summary' });
    this.allUploadedImages = page.locator('xpath=//label[contains (text(), \'Share your inspiration\')]/parent::section/descendant::img');
    this.projectCard = page.locator('xpath=//p[contains (text(), \'projectTitle\')]/parent::p/parent::section/parent::div');
  }

  async startNewProject() {
    await this.startNewProjectBtn.click();
  }

  async selectProjectCategory() {
    await this.projectCategoryLocator.click();
  }

  async clickNextBtn() {
    await this.nextBtn.click();
  }

  async selectCreativeStyle() {
    await this.creativeStyleOption.click();
  }

  async fillOverviewSection() {
    await this.projectTitleLocator.fill('projectTitle');
    await this.brandProfileLocator.click();
    await this.brandOptionLocator.click();
    await this.audienceLocator.fill('Test audience');
    await this.objectiveLocator.fill('Test objective');
  }

  async fillProductSection() {
    await this.productNameLocator.fill('Test product Name');
    await this.productDescriptionLocator.fill('Test product description');
  }

  async uploadFile() {
    await this.uploadAreaLocator.setInputFiles('./upload/1.jpeg');
  }

  async setDeliverbles() {
    await this.quantityLocator.fill('5');
    await this.placementLocator.fill('test');
  }

  async fillLogistics() {
    await this.productOption.click();
    await this.contentSharingOption.click();
  }

  async goToSummary() {
    await this.proceedToSummaryBtn.click();
  }

  async deleteProject() {
    await this.deleteProjectBtn.click();
    await this.deleteInputLocator.fill('DELETE');
    await this.deleteBriefBtn.click();
  }

  async openProject() {
    await this.projectCard.click();
  }
}
