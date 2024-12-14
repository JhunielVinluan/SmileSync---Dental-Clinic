import { Document, model } from "mongoose";
import { surgicalSchema } from "./schema/surgical";

export interface ISurgical {
  name: String;
  description: String;
  status: String;
}

export interface SurgicalDoc extends Document, ISurgical {}
export const SurgicalModel = model<SurgicalDoc>("Surgical", surgicalSchema);
