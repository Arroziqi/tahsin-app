import { Global, Module } from '@nestjs/common';
import {
  BANK_ACCOUNT_REPO_TOKEN,
  COMPONENT_REPO_TOKEN,
  COURSE_FEE_REPO_TOKEN,
  DAY_REPO_TOKEN,
  EVENT_REPO_TOKEN,
  LEVEL_REPO_TOKEN,
  SCHEDULE_REPO_TOKEN,
  TIME_REPO_TOKEN,
} from 'src/core/const/provider.token';
import { LevelPrismaDataSourcesImpl } from './data/datasources/level.prisma.datasources';
import { AddLevelUsecase } from './domain/usecases/level/add-level.usecase';
import { UpdateLevelUsecase } from './domain/usecases/level/update-level.usecase';
import { DeleteLevelUsecase } from './domain/usecases/level/delete-level.usecase';
import { GetAllLevelUsecase } from './domain/usecases/level/getAll-level.usecase';
import { LevelController } from './presentation/controllers/level/level.controller';
import { EventPrismaDataSourcesImpl } from './data/datasources/event.prisma.datasources';
import { ComponentPrismaDataSourcesImpl } from './data/datasources/component.prisma.datasources';
import { TimePrismaDataSourcesImpl } from './data/datasources/time.prisma.datasources';
import { DayPrismaDataSourcesImpl } from './data/datasources/day.prisma.datasources';
import { UpdateEventUsecase } from './domain/usecases/event/update-event.usecase';
import { UpdateTimeUsecase } from './domain/usecases/time/update-time.usecase';
import { UpdateDayUsecase } from './domain/usecases/day/update-day.usecase';
import { UpdateComponentUsecase } from './domain/usecases/component/update-component.usecase';
import { DeleteEventUsecase } from './domain/usecases/event/delete-event.usecase';
import { DeleteComponentUsecase } from './domain/usecases/component/delete-component.usecase';
import { DeleteDayUsecase } from './domain/usecases/day/delete-day.usecase';
import { DeleteTimeUsecase } from './domain/usecases/time/delete-time.usecase';
import { AddDayUsecase } from './domain/usecases/day/add-day.usecase';
import { AddComponentUsecase } from './domain/usecases/component/add-component.usecase';
import { AddTimeUsecase } from './domain/usecases/time/add-time.usecase';
import { AddEventUsecase } from './domain/usecases/event/add-event.usecase';
import { DayController } from './presentation/controllers/day/day.controller';
import { TimeController } from './presentation/controllers/time/time.controller';
import { ComponentController } from './presentation/controllers/component/component.controller';
import { EventController } from './presentation/controllers/event/event.controller';
import { GetAllDayUsecase } from './domain/usecases/day/getAll-day';
import { GetAllComponentUsecase } from './domain/usecases/component/getAll-component.usecase';
import { GetAllTimeUsecase } from './domain/usecases/time/getAll-time.usecase';
import { GetAllEventUsecase } from './domain/usecases/event/getAll-event.usecase';
import { BankAccountPrismaDatasourcesImpl } from './data/datasources/bank-account.prisma.datasources';
import { CourseFeePrismaDatasourcesImpl } from './data/datasources/course-fee.prisma.datasources';
import { AddBankAccountUseCase } from 'src/features/master-data/domain/usecases/bank-account/add-bank-account.usecase';
import { UpdateBankAccountUsecase } from 'src/features/master-data/domain/usecases/bank-account/update-bank-account.usecase';
import { DeleteBankAccountUseCase } from 'src/features/master-data/domain/usecases/bank-account/delete-bank-account.usecase';
import { GetAllBankAccountUsecase } from 'src/features/master-data/domain/usecases/bank-account/getAll-bank-account.usecase';
import { AddCourseFeeUsecase } from 'src/features/master-data/domain/usecases/course-fee/add-course-fee.usecase';
import { UpdateCourseFeeUsecase } from 'src/features/master-data/domain/usecases/course-fee/update-course-fee.usecase';
import { DeleteCourseFeeUsecase } from 'src/features/master-data/domain/usecases/course-fee/delete-course-fee.usecase';
import { GetAllCourseFeeUsecase } from 'src/features/master-data/domain/usecases/course-fee/getAll-course-fee.usecase';
import { BankAccountController } from 'src/features/master-data/presentation/controllers/bank-account/bank-account.controller';
import { CourseFeeController } from 'src/features/master-data/presentation/controllers/course-fee/course-fee.controller';
import { TimeService } from 'src/features/master-data/domain/services/time.service';
import { SchedulePrismaDatasourcesImpl } from './data/datasources/schedule.prisma.datasources';
import { ScheduleService } from './domain/services/schedule.service';
import { AddScheduleUsecase } from './domain/usecases/schedule/add-schedule.usecase';
import { UpdateScheduleUsecase } from './domain/usecases/schedule/update-schedule.usecase';
import { DeleteScheduleUsecase } from './domain/usecases/schedule/delete-schedule.usecase';
import { GetAllScheduleUsecase } from './domain/usecases/schedule/getAll-schedule';
import { ScheduleController } from './presentation/controllers/schedule/schedule.controller';
import { LevelService } from './domain/services/level.service';

@Global()
@Module({
  controllers: [
    LevelController,
    DayController,
    TimeController,
    ComponentController,
    EventController,
    BankAccountController,
    CourseFeeController,
    ScheduleController,
  ],
  providers: [
    // Level
    AddLevelUsecase,
    UpdateLevelUsecase,
    DeleteLevelUsecase,
    GetAllLevelUsecase,

    // Day
    AddDayUsecase,
    UpdateDayUsecase,
    DeleteDayUsecase,
    GetAllDayUsecase,

    // Time
    AddTimeUsecase,
    UpdateTimeUsecase,
    DeleteTimeUsecase,
    GetAllTimeUsecase,

    // Component
    AddComponentUsecase,
    UpdateComponentUsecase,
    DeleteComponentUsecase,
    GetAllComponentUsecase,

    // Event
    AddEventUsecase,
    UpdateEventUsecase,
    DeleteEventUsecase,
    GetAllEventUsecase,

    // Bank Account
    AddBankAccountUseCase,
    UpdateBankAccountUsecase,
    DeleteBankAccountUseCase,
    GetAllBankAccountUsecase,

    // Course Fee
    AddCourseFeeUsecase,
    UpdateCourseFeeUsecase,
    DeleteCourseFeeUsecase,
    GetAllCourseFeeUsecase,

    // Schedule
    AddScheduleUsecase,
    UpdateScheduleUsecase,
    DeleteScheduleUsecase,
    GetAllScheduleUsecase,

    // service
    TimeService,
    ScheduleService,
    LevelService,

    // Repository
    {
      provide: LEVEL_REPO_TOKEN,
      useClass: LevelPrismaDataSourcesImpl,
    },
    {
      provide: EVENT_REPO_TOKEN,
      useClass: EventPrismaDataSourcesImpl,
    },
    {
      provide: COMPONENT_REPO_TOKEN,
      useClass: ComponentPrismaDataSourcesImpl,
    },
    {
      provide: TIME_REPO_TOKEN,
      useClass: TimePrismaDataSourcesImpl,
    },
    {
      provide: DAY_REPO_TOKEN,
      useClass: DayPrismaDataSourcesImpl,
    },
    {
      provide: BANK_ACCOUNT_REPO_TOKEN,
      useClass: BankAccountPrismaDatasourcesImpl,
    },
    {
      provide: COURSE_FEE_REPO_TOKEN,
      useClass: CourseFeePrismaDatasourcesImpl,
    },
    {
      provide: SCHEDULE_REPO_TOKEN,
      useClass: SchedulePrismaDatasourcesImpl,
    },
  ],
  exports: [LevelService],
})
export class MasterDataModule {}
