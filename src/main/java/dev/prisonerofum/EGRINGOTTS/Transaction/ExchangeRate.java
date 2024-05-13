package dev.prisonerofum.EGRINGOTTS.Transaction;

// Class to represent exchange rates between currencies
class ExchangeRate<T> {
    CurrencyNode<T> targetNode;
    double value;
    double processingFee;

    public ExchangeRate(CurrencyNode<T> targetNode, double value, double processingFee) {
        this.targetNode = targetNode;
        this.value = value;
        this.processingFee = processingFee;
    }
}
