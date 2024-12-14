import { SurgicalSchema } from '@/schema/form.schema';
import { z } from 'zod';

export interface ServiceInfo {
  _id?: string;
  name: string;
  description: string;
  status: string;
}

export type SurgicalSchemaType = z.infer<typeof SurgicalSchema>;

export interface ServiceFormProps {
  isOpen: boolean;
  onClose: () => void;
}
