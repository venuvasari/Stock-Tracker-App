import { Quote } from "./quote.model";
import { StockSymbols } from "./stock-symbols.model";

export interface Stckinfo {
    stockSymbols: StockSymbols;
    quotes: Quote;
}
