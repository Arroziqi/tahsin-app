import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateRoleUsecase } from '../../../domain/usecases/role/create.usecase';
import { RoleModel } from '../../../data/models/role.model';
import { DataState } from 'src/core/resources/data.state';
import { GetAllRoleUsecase } from '../../../domain/usecases/role/get.all.usecase';
import { UpdateRoleUsecase } from '../../../domain/usecases/role/update.usecase';
import { DeleteRoleUsecase } from '../../../domain/usecases/role/delete.usecase';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from '../../../guards/roles/roles.guard';

@Controller('/api/roles')
@UseGuards(RolesGuard)
@Roles(['Admin'])
export class RoleController {
  private readonly logger = new Logger(RoleController.name);

  constructor(
    private readonly createRoleUsecase: CreateRoleUsecase,
    private readonly getAllRoleUsecase: GetAllRoleUsecase,
    private readonly updateRoleUsecase: UpdateRoleUsecase,
    private readonly deleteRoleUsecase: DeleteRoleUsecase,
  ) {}

  @Get()
  async getRoles(): Promise<DataState<RoleModel[]>> {
    try {
      this.logger.debug('Getting all roles');

      const result = await this.getAllRoleUsecase.execute();

      this.logger.debug('Successfully retrieved all roles');

      return result;
    } catch (error) {
      this.logger.error('Failed to get roles', {
        error: error.message,
      });

      throw error;
    }
  }

  @Post('/create')
  async createRole(@Body() request: RoleModel): Promise<DataState<RoleModel>> {
    try {
      return await this.createRoleUsecase.execute(request);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('/update/:id')
  async updateRole(
    @Body() request: RoleModel,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DataState<RoleModel>> {
    try {
      return await this.updateRoleUsecase.execute({
        id: id,
        name: request.name,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/delete/:id')
  async deleteRole(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DataState<string>> {
    try {
      await this.deleteRoleUsecase.execute(id);

      return {
        data: 'OK',
        error: null,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
