import { inject, injectable } from 'inversify';
import { DevelopersRepository } from '../repositories/developers.repository';
import { IDeveloper } from '../types'

@injectable()
export class DevelopersService {

    constructor(
        @inject('DevelopersRepository') private developersRepository: DevelopersRepository,
    ) {}

    async getDevelopers(): Promise<IDeveloper[]> {
        return this.developersRepository.getDevelopers()
    }

    async getDeveloperById(id: string): Promise<IDeveloper> {
        return this.developersRepository.getDeveloperById(id)
    }

    async getRevenueByDeveloperId(developerId: string): Promise<number> {
        const completedContracts = await this.developersRepository.getCompletedContractsByDeveloperId(developerId);
        return completedContracts.reduce((total, contract) => total + (contract.amount || 0), 0);
    }

    async getDevelopersWithRevenue(): Promise<IDeveloper[]> {
        const developers = await this.getDevelopers();
        const developerPromises = developers.map(async (developer) => {
            const revenue = await this.getRevenueByDeveloperId(developer.id);
            return { ...developer, revenue };
        });
        return Promise.all(developerPromises);
    }
}
