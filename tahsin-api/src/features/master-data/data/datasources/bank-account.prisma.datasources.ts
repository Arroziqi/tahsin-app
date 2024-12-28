import {
  DataFailed,
  DataState,
  DataSuccess,
} from 'src/core/resources/data.state';
import { BankAccountModel } from '../models/bank-account.model';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ErrorEntity } from 'src/core/domain/entities/error.entity';
import { PrismaService } from 'src/common/services/prisma.service';

export interface BankAccountPrismaDatasources {
  findById(id: number): Promise<DataState<BankAccountModel>>;

  findByName(name: string): Promise<DataState<BankAccountModel>>;

  findAll(): Promise<DataState<BankAccountModel[]>>;

  create(bankAccount: BankAccountModel): Promise<DataState<BankAccountModel>>;

  update(bankAccount: BankAccountModel): Promise<DataState<BankAccountModel>>;

  delete(id: number): Promise<DataState<string>>;
}

@Injectable()
export class BankAccountPrismaDatasourcesImpl
  implements BankAccountPrismaDatasources
{
  private readonly logger = new Logger(BankAccountPrismaDatasourcesImpl.name);

  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: number): Promise<DataState<BankAccountModel>> {
    this.logger.log(`Finding bank account with id: ${id}`);
    try {
      const data = await this.prismaService.bankAccounts.findFirst({
        where: { id },
      });

      if (!data) {
        this.logger.warn(`Bank account with id ${id} not found`);
        throw new NotFoundException('Bank account not found');
      }

      this.logger.log(`Successfully found bank account with id: ${id}`);
      return new DataSuccess(new BankAccountModel(data));
    } catch (error) {
      this.logger.error(
        `Error finding bank account with id ${id}: ${error.message}`,
      );
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findByName(name: string): Promise<DataState<BankAccountModel>> {
    this.logger.log(`Finding bank account with name: ${name}`);
    try {
      const data = await this.prismaService.bankAccounts.findFirst({
        where: { account_name: name },
      });

      if (!data) {
        this.logger.warn(`Bank account with name ${name} not found`);
        return new DataFailed(new ErrorEntity(404, 'account name not found'));
      }

      this.logger.log(`Successfully found bank account with name: ${name}`);
      return new DataSuccess(new BankAccountModel(data));
    } catch (error) {
      this.logger.error(
        `Error finding bank account with name ${name}: ${error.message}`,
      );
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findAll(): Promise<DataState<BankAccountModel[]>> {
    this.logger.log(`Finding all bank accounts`);
    try {
      const data = await this.prismaService.bankAccounts.findMany({
        orderBy: {
          id: 'asc',
        },
      });

      if (!data) {
        this.logger.warn(`No bank accounts found`);
        throw new NotFoundException('Bank accounts not found');
      }

      this.logger.log(`Successfully found all bank accounts`);
      return new DataSuccess(data.map((item) => new BankAccountModel(item)));
    } catch (error) {
      this.logger.error(`Error finding all bank accounts: ${error.message}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async create(
    bankAccount: BankAccountModel,
  ): Promise<DataState<BankAccountModel>> {
    this.logger.log(`Creating bank account`);
    try {
      const data = await this.prismaService.bankAccounts.create({
        data: {
          id: bankAccount.id,
          account_name: bankAccount.accountName,
          account_number: bankAccount.accountNumber,
          bank_name: bankAccount.bankName,
        },
      });

      this.logger.log(`Successfully created bank account`);
      return new DataSuccess(new BankAccountModel(data));
    } catch (error) {
      this.logger.error(`Error creating bank account: ${error.message}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async update(
    bankAccount: BankAccountModel,
  ): Promise<DataState<BankAccountModel>> {
    this.logger.log(`Updating bank account with id: ${bankAccount.id}`);
    try {
      const data = await this.prismaService.bankAccounts.update({
        where: { id: bankAccount.id },
        data: {
          account_name: bankAccount.accountName,
          account_number: bankAccount.accountNumber,
          bank_name: bankAccount.bankName,
          is_active: bankAccount.is_active,
        },
      });

      if (!data) {
        this.logger.warn(`Bank account with id ${bankAccount.id} not found`);
        throw new NotFoundException('Bank accounts not found');
      }

      this.logger.log(
        `Successfully updated bank account with id: ${bankAccount.id}`,
      );
      return new DataSuccess(new BankAccountModel(data));
    } catch (error) {
      this.logger.error(`Error updating bank account: ${error.message}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async delete(id: number): Promise<DataState<string>> {
    this.logger.log(`Deleting bank account with id: ${id}`);
    try {
      await this.prismaService.bankAccounts.delete({ where: { id } });

      this.logger.log(`Successfully deleted bank account with id: ${id}`);
      return new DataSuccess('OK');
    } catch (error) {
      this.logger.error(
        `Error deleting bank account with id ${id}: ${error.message}`,
      );
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }
}
