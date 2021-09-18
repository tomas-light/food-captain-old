import { History } from "react-router-dom";

export abstract class HistoryProvider {
  get: () => History;
}
