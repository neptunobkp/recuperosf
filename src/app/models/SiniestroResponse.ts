import { Siniestro, SiniestroMono } from "./Siniestro";

export interface SiniestroResponse {
  items: Siniestro[];
  total: number;
  totalGlobal: number;
}

export interface SiniestroMonoResponse {
  items: SiniestroMono[];
  total: number;
  totalGlobal: number;
}
