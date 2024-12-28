import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { DataState } from 'src/core/resources/data.state';
import { RolesGuard } from 'src/features/user-management/guards/roles/roles.guard';
import { GetAllBankAccountUsecase } from 'src/features/master-data/domain/usecases/bank-account/getAll-bank-account.usecase';
import { UpdateBankAccountUsecase } from 'src/features/master-data/domain/usecases/bank-account/update-bank-account.usecase';
import { AddBankAccountUseCase } from 'src/features/master-data/domain/usecases/bank-account/add-bank-account.usecase';
import { DeleteBankAccountUseCase } from 'src/features/master-data/domain/usecases/bank-account/delete-bank-account.usecase';
import { BankAccountEntity } from 'src/features/master-data/domain/entities/bank-account.entity';
import { CreateBankAccountPipe } from 'src/features/master-data/pipes/bank-account/create-bank-account.pipe';
import { UpdateBankAccountPipe } from 'src/features/master-data/pipes/bank-account/update-bank-account.pipe';

@Controller('/api/bank-accounts')
@UseGuards(RolesGuard)
@Roles(['Admin'])
export class BankAccountController {
  private readonly logger = new Logger(BankAccountController.name);

  constructor(
    private readonly getAllBankAccountUsecase: GetAllBankAccountUsecase,
    private readonly createBankAccountUsecase: AddBankAccountUseCase,
    private readonly updateBankAccountUsecase: UpdateBankAccountUsecase,
    private readonly deleteBankAccountUsecase: DeleteBankAccountUseCase,
  ) {}

  @Get()
  async getBankAccounts(): Promise<DataState<BankAccountEntity[]>> {
    try {
      this.logger.debug('Getting all bank-accounts');
      const result = await this.getAllBankAccountUsecase.execute();

      this.logger.log('Successfully retrieved all bank-accounts');
      return result;
    } catch (error) {
      this.logger.error('Failed to get bank-accounts', {
        error: error.message,
      });
      throw error;
    }
  }

  @Post()
  async createBankAccount(
    @Body(CreateBankAccountPipe) request: BankAccountEntity,
  ): Promise<DataState<BankAccountEntity>> {
    try {
      this.logger.debug('Creating bank-account', { request });
      const result = await this.createBankAccountUsecase.execute(request);

      this.logger.log('Successfully created bank-account');
      return result;
    } catch (error) {
      this.logger.error('Failed to create bank-account', {
        error: error.message,
      });
      throw error;
    }
  }

  @Patch(':id')
  async updateBankAccount(
    @Param('id', ParseIntPipe) id: number,
    @Body(UpdateBankAccountPipe) request: BankAccountEntity,
  ): Promise<DataState<BankAccountEntity>> {
    try {
      this.logger.debug('Updating bank-account', { id, request });
      const result = await this.updateBankAccountUsecase.execute({
        id,
        ...request,
      });

      this.logger.log('Successfully updated bank-account');
      return result;
    } catch (error) {
      this.logger.error('Failed to update bank-account', {
        error: error.message,
      });
      throw error;
    }
  }

  @Delete(':id')
  async deleteBankAccount(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DataState<string>> {
    try {
      this.logger.debug('Deleting bank-account', { id });
      const result = await this.deleteBankAccountUsecase.execute(id);

      this.logger.log('Successfully deleted bank-account');
      return result;
    } catch (error) {
      this.logger.error('Failed to delete bank-account', {
        error: error.message,
      });
      throw error;
    }
  }
}
