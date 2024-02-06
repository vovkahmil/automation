export class Navigation {
    constructor(page) {
        this.page = page;
        this.projectsLink = page.getByRole('link', { name: 'Project' });
    }

    goToProjectPage = async () => {
        await this.projectsLink.waitFor();
        await this.projectsLink.click()
    }

}