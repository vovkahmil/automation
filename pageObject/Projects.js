export class Projects {
  constructor(page) {
    this.page = page;

    this.searchInput = page.getByPlaceholder('Search for project name');
    this.sortButton = page.getByRole('button', { name: 'Sort' });
    this.accountManagerButton = page.getByRole('button', { name: 'Account manager' });
    this.mainTitle = page.getByRole('heading', { name: 'Projects' });
    this.projectsTile = page.locator('xpath=//input[@placeholder="Search for project name"]/parent::div/following-sibling::section[1]/child::div');
    this.inProgressProjectTab = page.getByRole('link', { name: 'In Progress' });
    this.deleteIcon = page.locator('xpath=//label/following-sibling::a/button');
    this.deleteInput = page.getByPlaceholder('Type DELETE to confirm');
    this.deleteBriefButton = page.getByRole('button', { name: 'Delete project' });
  }

  clickInProgressTab = async () => {
    await this.inProgressProjectTab.waitFor();
    await this.inProgressProjectTab.click();
  };

  openLastProject = async () => {
    await this.projectsTile.last().waitFor();
    await this.projectsTile.last().click();
  };

  clickDeleteIcon = async () => {
    await this.deleteIcon.waitFor();
    await this.deleteIcon.click();
  };

  fillDeleteInput = async () => {
    await this.deleteInput.waitFor();
    await this.deleteInput.fill('DELETE');
  };

  clickDeleteProjectButton = async () => {
    await this.deleteBriefButton.waitFor();
    await this.deleteBriefButton.click();
  };

  getProjectAmount = async () => {
    await this.projectsTile.last().waitFor();
    const itemsBeforeRemoval = await this.projectsTile.count();
    return itemsBeforeRemoval;
  };
}
