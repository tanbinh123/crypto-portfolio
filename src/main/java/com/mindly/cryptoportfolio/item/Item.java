package com.mindly.cryptoportfolio.item;

import com.fasterxml.jackson.annotation.JsonFormat;
import javax.persistence.*;
import java.util.Date;

@Entity
public class Item {
    private Integer itemId;
    private CurrencyType currencyType;
    private Float amount;
    private Date createdAt;
    private String walletLocation;
    private Float marketPrice;

    public Item(){

    }

    public Item(Integer itemId, CurrencyType currencyType, Float amount, Date createdAt, String walletLocation, Float marketPrice) {
        this.itemId = itemId;
        this.currencyType = currencyType;
        this.amount = amount;
        this.createdAt = createdAt;
        this.walletLocation = walletLocation;
        this.marketPrice = marketPrice;
    }

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    @Enumerated(EnumType.STRING)
    public CurrencyType getCurrencyType() {
        return currencyType;
    }

    public void setCurrencyType(CurrencyType currencyType) {
        this.currencyType = currencyType;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    //This notation for returning date format to the front-end without time
    @JsonFormat(pattern="yyyy-MM-dd")
    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getWalletLocation() {
        return walletLocation;
    }

    public void setWalletLocation(String walletLocation) {
        this.walletLocation = walletLocation;
    }

    public Float getMarketPrice() {
        return marketPrice;
    }

    public void setMarketPrice(Float marketPrice) {
        this.marketPrice = marketPrice;
    }

    public enum CurrencyType{
        Bitcoin, Ethereum, Ripple
    }
}
