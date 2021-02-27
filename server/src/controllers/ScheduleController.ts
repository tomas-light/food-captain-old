/*******************************************************************************
 * Copyright (c) 2021 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 ******************************************************************************/
import { ScheduleService } from '../services';
import { Schedule } from '../services/models';
import { ControllerBase } from './base';

class ScheduleController extends ControllerBase {
  static __constructorParams: InstanceType<any>[] = [ScheduleService]
    .concat(ControllerBase.__constructorParams);

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
    logger,
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
