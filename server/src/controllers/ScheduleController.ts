import { Logger } from '@utils/loggers';
import { metadata } from '@utils/metadata';
import { ScheduleService } from '../services';
import { Schedule } from '../services/models';
import { ControllerBase } from './base';

@metadata
class ScheduleController extends ControllerBase {
  static area = '/api/schedule';
  static get = {
    '': nameof<ScheduleController>(o => o.getSchedulesAsync),
  };
  static post = {
    '': nameof<ScheduleController>(o => o.addScheduleAsync),
  };
  static put = {
    ':scheduleId': nameof<ScheduleController>(o => o.updateScheduleAsync),
  };
  static delete = {
    ':scheduleId': nameof<ScheduleController>(o => o.deleteScheduleAsync),
  };

  constructor(
    private readonly scheduleService: ScheduleService,
    logger: Logger,
    request,
    response
  ) {
    super(logger, request, response);
  }

  async getSchedulesAsync() {
    const result = await this.scheduleService.getAllAsync();
    return this.ok(result);
  }

  async addScheduleAsync(schedule: Schedule) {
    const result = await this.scheduleService.addAsync(schedule);
    return this.ok(result);
  }

  async updateScheduleAsync(scheduleId: number, schedule: Schedule) {
    const result = await this.scheduleService.updateAsync(schedule);
    return this.ok(result);
  }

  async deleteScheduleAsync(scheduleId: number) {
    const schedule = await this.scheduleService.getScheduleByIdAsync(scheduleId);
    if (!schedule) {
      return this.notFound('schedule not found');
    }

    const result = await this.scheduleService.deleteAsync(schedule);
    if (result) {
      return this.noContent();
    }
    return this.badRequest('Deletion is failed');
  }
}

export default ScheduleController;
