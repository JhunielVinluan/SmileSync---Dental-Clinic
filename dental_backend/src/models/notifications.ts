import { notificationSchema } from '@/models/schema/notifications';
import { Document, model } from 'mongoose';

export interface INotification {
    userId: string;
    dateVisit: Date;
    notes: string;
    medicine: string
}

export interface NotificationDoc extends INotification, Document { }

export const NotificationModel = model<NotificationDoc>('Notification', notificationSchema);
