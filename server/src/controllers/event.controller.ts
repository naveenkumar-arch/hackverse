import { Response } from 'express';
import { EventService } from '../services/event.service';
import { ApiResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export class EventController {
  private eventService: EventService;

  constructor() {
    this.eventService = new EventService();
  }

  public getAllEvents = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const events = await this.eventService.getAllEvents(req.query);
    return ApiResponse.success(res, 'Events retrieved successfully', events);
  });

  public getEventBySlug = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const event = await this.eventService.getEventBySlug(req.params.slug);
    return ApiResponse.success(res, 'Event details retrieved successfully', event);
  });

  public createEvent = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const event = await this.eventService.createEvent(req.user!.id, req.body);
    return ApiResponse.created(res, 'Event created successfully', event);
  });

  public updateEvent = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const event = await this.eventService.updateEvent(req.params.id, req.body);
    return ApiResponse.success(res, 'Event updated successfully', event);
  });

  public deleteEvent = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const result = await this.eventService.deleteEvent(req.params.id);
    return ApiResponse.success(res, 'Event deleted successfully', result);
  });

  public toggleRegistration = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const event = await this.eventService.toggleRegistrationStatus(req.params.id);
    return ApiResponse.success(res, 'Event registration status toggled', event);
  });

  public toggleSubmission = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const event = await this.eventService.toggleSubmissionStatus(req.params.id);
    return ApiResponse.success(res, 'Event submission status toggled', event);
  });

  public getAllEventsAdmin = asyncHandler(async (_req: AuthenticatedRequest, res: Response) => {
    const events = await this.eventService.getAllEventsAdmin();
    return ApiResponse.success(res, 'All events loaded for Admin', events);
  });
}
